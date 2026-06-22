import { useState } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
} from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Diagnosis, Patient, Entry, EntryWithoutId } from "../../types";
import EntryDetails from "../Entry/EntryDetails";
import AddEntryModal from "../AddEntryModal";
import patientService from "../../services/patients";

const PatientInfoPage = ({
  patient,
  diagnoses,
  onEntryAdded,
}: {
  patient: Patient | null | undefined;
  diagnoses: Diagnosis[];
  onEntryAdded: (patientId: string, entry: Entry) => void;
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState<string | undefined>();

  if (!patient) {
    return <div>Patient Not Found</div>;
  }

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      const entry = await patientService.addEntry(patient.id, values);
      onEntryAdded(patient.id, entry);
      setModalOpen(false);
      setError(undefined);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e.response.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            "",
          );
          setError(message);
        } else if (
          e?.response?.data &&
          typeof e.response.data === "object"
        ) {
          const errorData = e.response.data as {
            error?: Array<{ message: string }>;
          };
          const message = errorData.error
            ?.map((e) => e.message)
            .join(", ");
          setError(message || "Unknown error");
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        setError("Unknown error");
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Card elevation={3}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 2,
            }}
          >
            <Typography
              variant="h4"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              {patient.name}
            </Typography>
            {patient.gender === "male" && <MaleIcon color="primary" />}
            {patient.gender === "female" && (
              <FemaleIcon sx={{ color: "#E91E63" }} />
            )}
            {patient.gender === "other" && <HelpOutlineIcon color="disabled" />}
          </Box>

          <Divider sx={{ mb: 2 }} />

          <Box display="flex" flexDirection="column" gap={2}>
            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: "medium" }}
              >
                ssn:
              </Typography>
              <Typography variant="body1" sx={{ ml: 1 }}>
                {patient.ssn ? patient.ssn : "-"}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: "medium" }}
              >
                occupation:
              </Typography>
              <Typography variant="body1" sx={{ ml: 1 }}>
                {patient.occupation}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: "medium" }}
              >
                date of birth:
              </Typography>
              <Typography variant="body1" sx={{ ml: 1 }}>
                {patient.dateOfBirth}
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                entries
              </Typography>
              {patient.entries.map((entry) => {
                return <EntryDetails entry={entry} key={entry.id} />;
              })}
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />
          <Button
            variant="contained"
            onClick={() => setModalOpen(true)}
          >
            Add New Entry
          </Button>
          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={error}
            onClose={() => {
              setModalOpen(false);
              setError(undefined);
            }}
            diagnoses={diagnoses}
          />
        </CardContent>
      </Card>
    </Container>
  );
};

export default PatientInfoPage;
