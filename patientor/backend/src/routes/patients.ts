import express from "express";
import type { Request, Response } from "express";
import patientsService from "../services/patientsService.ts";
import type {
  NonSensitivePatient,
  Patient,
  NewPatientEntry,
  Entry,
  EntryWithoutId,
} from "../types.ts";
import {
  newPatientParser,
  newEntryParser,
  errorMiddleware,
} from "../middleware.ts";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientsService.getNonSensitivePatients());
});

router.get("/:id", (req, res) => {
  const patient = patientsService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
    const addedPatient = patientsService.addPatient(req.body);
    res.json(addedPatient);
  },
);

router.post(
  "/:id/entries",
  newEntryParser,
  (
    req: Request<{ id: string }, unknown, EntryWithoutId>,
    res: Response<Entry>,
  ) => {
    const patientId = req.params.id;
    const addedEntry = patientsService.addEntry(patientId, req.body);
    if (addedEntry) {
      res.json(addedEntry);
    } else {
      res.sendStatus(404);
    }
  },
);
router.use(errorMiddleware);

export default router;
