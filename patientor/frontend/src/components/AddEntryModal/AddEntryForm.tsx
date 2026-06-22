import { useState, SyntheticEvent } from "react";

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from "@mui/material";

import { EntryWithoutId, Diagnosis } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  diagnoses: Diagnosis[];
}

type EntryType = "HealthCheck" | "Hospital" | "OccupationalHealthcare";

const ratingOptions = [
  { value: 0, label: "Healthy" },
  { value: 1, label: "LowRisk" },
  { value: 2, label: "HighRisk" },
  { value: 3, label: "CriticalRisk" },
];

const AddEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  const [entryType, setEntryType] = useState<EntryType>("HealthCheck");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [selectedDiagnosisCodes, setSelectedDiagnosisCodes] = useState<
    string[]
  >([]);

  const [healthCheckRating, setHealthCheckRating] = useState(0);

  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      setEntryType(event.target.value as EntryType);
    }
  };

  const onRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      setHealthCheckRating(Number(event.target.value));
    }
  };

  const onDiagnosisCodesChange = (
    event: SelectChangeEvent<string[]>,
  ) => {
    const value = event.target.value;
    setSelectedDiagnosisCodes(
      typeof value === "string" ? value.split(",") : value,
    );
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const base = {
      description,
      date,
      specialist,
      diagnosisCodes:
        selectedDiagnosisCodes.length > 0
          ? selectedDiagnosisCodes
          : undefined,
    };

    switch (entryType) {
      case "HealthCheck":
        onSubmit({
          ...base,
          type: "HealthCheck",
          healthCheckRating: healthCheckRating as 0 | 1 | 2 | 3,
        });
        break;
      case "Hospital":
        onSubmit({
          ...base,
          type: "Hospital",
          discharge: { date: dischargeDate, criteria: dischargeCriteria },
        });
        break;
      case "OccupationalHealthcare":
        onSubmit({
          ...base,
          type: "OccupationalHealthcare",
          employerName,
          sickLeave:
            sickLeaveStartDate || sickLeaveEndDate
              ? {
                  startDate: sickLeaveStartDate,
                  endDate: sickLeaveEndDate,
                }
              : undefined,
        });
        break;
    }
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <InputLabel sx={{ marginTop: 2.5 }}>Entry type</InputLabel>
        <Select
          label="Entry type"
          fullWidth
          value={entryType}
          onChange={onTypeChange}
        >
          <MenuItem value="HealthCheck">Health check</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
          <MenuItem value="OccupationalHealthcare">
            Occupational healthcare
          </MenuItem>
        </Select>

        <TextField
          label="Description"
          fullWidth
          sx={{ marginTop: 2 }}
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Date"
          type="date"
          fullWidth
          sx={{ marginTop: 2 }}
          slotProps={{
            inputLabel: { shrink: true },
          }}
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          sx={{ marginTop: 2 }}
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        <InputLabel sx={{ marginTop: 2.5 }}>Diagnosis codes</InputLabel>
        <Select
          label="Diagnosis codes"
          multiple
          fullWidth
          value={selectedDiagnosisCodes}
          onChange={onDiagnosisCodesChange}
          input={<OutlinedInput label="Diagnosis codes" />}
          renderValue={(selected) => selected.join(", ")}
        >
          {diagnoses.map((d) => (
            <MenuItem key={d.code} value={d.code}>
              <Checkbox
                checked={selectedDiagnosisCodes.indexOf(d.code) > -1}
              />
              <ListItemText primary={`${d.code} - ${d.name}`} />
            </MenuItem>
          ))}
        </Select>

        {entryType === "HealthCheck" && (
          <>
            <InputLabel sx={{ marginTop: 2.5 }}>
              Health check rating
            </InputLabel>
            <Select
              label="Health check rating"
              fullWidth
              value={String(healthCheckRating)}
              onChange={onRatingChange}
            >
              {ratingOptions.map((option) => (
                <MenuItem key={option.value} value={String(option.value)}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </>
        )}

        {entryType === "Hospital" && (
          <>
            <TextField
              label="Discharge date"
              type="date"
              fullWidth
              sx={{ marginTop: 2 }}
              slotProps={{
                inputLabel: { shrink: true },
              }}
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              label="Discharge criteria"
              fullWidth
              sx={{ marginTop: 2 }}
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </>
        )}

        {entryType === "OccupationalHealthcare" && (
          <>
            <TextField
              label="Employer name"
              fullWidth
              sx={{ marginTop: 2 }}
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <TextField
              label="Sick leave start date"
              type="date"
              fullWidth
              sx={{ marginTop: 2 }}
              slotProps={{
                inputLabel: { shrink: true },
              }}
              value={sickLeaveStartDate}
              onChange={({ target }) => setSickLeaveStartDate(target.value)}
            />
            <TextField
              label="Sick leave end date"
              type="date"
              fullWidth
              sx={{ marginTop: 2 }}
              slotProps={{
                inputLabel: { shrink: true },
              }}
              value={sickLeaveEndDate}
              onChange={({ target }) => setSickLeaveEndDate(target.value)}
            />
          </>
        )}

        <Grid
          container
          justifyContent="space-between"
          sx={{ marginTop: 2 }}
        >
          <Grid size="auto">
            <Button
              color="secondary"
              variant="contained"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid size="auto">
            <Button type="submit" variant="contained">
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
