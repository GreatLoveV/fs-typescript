import { type Entry } from "../../types";
import HealthCheck from "./EntryVariants/HealthCheck";
import OccupationalHealthcare from "./EntryVariants/OccupationalHealthcare";
import Hospital from "./EntryVariants/Hospital";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheck entry={entry} />;
    case "Hospital":
      return <Hospital entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} />;
    default:
      assertNever(entry);
  }
};

export default EntryDetails;
