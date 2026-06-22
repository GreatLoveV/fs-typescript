import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";
import { Diagnosis, Patient, Entry } from "./types";

import patientService from "./services/patients";
import diagnosisService from "./services/diagnoses";
import PatientListPage from "./components/PatientListPage";
import PatientInfoPage from "./components/PatientListPage/PatientInfoPage";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchDiagnosesList = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnosesList();
  }, []);

  const patientMatch = useMatch("/patients/:id");
  const matchedPatient = patientMatch
    ? patients.find((p) => p.id === patientMatch.params.id)
    : null;

  const onEntryAdded = (patientId: string, entry: Entry) => {
    setPatients(
      patients.map((p) =>
        p.id === patientId
          ? { ...p, entries: [...p.entries, entry] }
          : p,
      ),
    );
  };

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" sx={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider sx={{ marginY: 2 }} />
        <Routes>
          <Route
            path="/"
            element={
              <PatientListPage patients={patients} setPatients={setPatients} />
            }
          />
          <Route
            path="/patients/:id"
            element={
              <PatientInfoPage
                patient={matchedPatient}
                diagnoses={diagnoses}
                onEntryAdded={onEntryAdded}
              />
            }
          />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
