import { Box, Typography } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";

import { type Entry } from "../../../types";
const OccupationalHealthcare = ({ entry }: { entry: Entry }) => {
  return (
    <Box sx={{ border: "1px solid black", borderRadius: 1, p: 1, mb: 1 }}>
      <Typography
        variant="body2"
        color="text.primary"
        sx={{ fontWeight: "medium" }}
      >
        {entry.date} {"    "}
        <WorkIcon sx={{ color: "black" }} /> FBI <br />
        {entry.description} <br />
      </Typography>
      <Typography variant="body2" color="text.secondary">
        diagnose by {entry.specialist}
      </Typography>
    </Box>
  );
};

export default OccupationalHealthcare;
