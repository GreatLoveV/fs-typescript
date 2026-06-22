import patientsData from "../../data/patients.ts";
import type {
  Entry,
  EntryWithoutId,
  NewPatientEntry,
  NonSensitivePatient,
  Patient,
} from "../types.ts";
import { v1 as uuid } from "uuid";

const getPatients = (): Patient[] => {
  return patientsData;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patientsData.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    }),
  );
};

const findById = (id: string): Patient | undefined => {
  const patient = patientsData.find((p) => p.id === id);
  return patient;
};
const addPatient = (object: NewPatientEntry): Patient => {
  const typedNewPatient = {
    id: uuid(),
    ...object,
  };
  patientsData.push(typedNewPatient);
  return typedNewPatient;
};

const addEntry = (
  patientId: string,
  entry: EntryWithoutId,
): Entry | undefined => {
  const patient = patientsData.find((p) => p.id === patientId);
  if (!patient) return undefined;

  const newEntry = { id: uuid(), ...entry };
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  addPatient,
  getNonSensitivePatients,
  findById,
  addEntry,
};
