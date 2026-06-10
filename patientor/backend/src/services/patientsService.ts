import patientsData from "../../data/patients.ts";
import type {
  NewPatientEntry,
  NonSensitivePatient,
  Patient,
} from "../types.ts";
import { v1 as uuid } from "uuid";

const getPatients = (): Patient[] => {
  return patientsData;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};
const addPatient = (object: NewPatientEntry): Patient => {
  const typedNewPatient = {
    id: uuid(),
    ...object,
  };
  patientsData.push(typedNewPatient);
  return typedNewPatient;
};

export default {
  getPatients,
  addPatient,
  getNonSensitivePatients,
};
