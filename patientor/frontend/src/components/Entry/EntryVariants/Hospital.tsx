import { Box, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

import { type Entry } from "../../../types";
const Hospital = ({ entry }: { entry: Entry }) => {
  return (
    <Box sx={{ border: "1px solid black", borderRadius: 1, p: 1, mb: 1 }}>
      <Typography
        variant="body2"
        color="text.primary"
        sx={{ fontWeight: "medium" }}
      >
        {entry.date} {"    "}
        <MedicalServicesIcon sx={{ color: "black" }} /> <br />
        {entry.description} <br />
        <FavoriteIcon sx={{ color: "yellow" }} />
      </Typography>
      <Typography variant="body2" color="text.secondary">
        diagnose by {entry.specialist}
      </Typography>
    </Box>
  );
};

export default Hospital;
