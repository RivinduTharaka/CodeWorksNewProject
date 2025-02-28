import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import worldMapImage from "../../../assets/image/Global-presence/GlobalCoverage.jpg"; 

const TwoColumns = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "40px",
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "60px 20px",
  flexDirection: "row", // Default to row layout
  [theme.breakpoints.down("md")]: {
    flexDirection: "column", // Stack vertically on smaller screens
    textAlign: "center",
  },
}));

const Column = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

const GradientHeading = styled(Typography)({
  fontSize: "2.5rem",
  fontWeight: "bold",
  marginBottom: "20px",
  lineHeight: 1.2,
  color: "#070054", // Fixed color property
});

const GlobalCoverageSec2 = () => {
  return (
    <TwoColumns>
      {/* Left Column */}
      <Column>
        <GradientHeading component="h1">
          An ever-expanding global presence
        </GradientHeading>
        <Typography sx={{ fontSize: "1.25rem", marginBottom: "20px", color: "#0000009e", lineHeight: 1.6 }}>
          Since 2014, we have massively expanded our global coverage and now have offices in over 14 countries across 4 continents.
        </Typography>
        <Typography sx={{ fontSize: "1rem", color: "#000", marginBottom: "40px", lineHeight: 1.6 }}>
          <strong>Interact with the map to locate your nearest office</strong>
        </Typography>
      </Column>

      {/* Right Column */}
      <Column sx={{ alignItems: "center" }}>
        <Box
          component="img"
          src={worldMapImage}
          alt="World Map"
          sx={{
            maxWidth: "100%",
            height: "auto",
            borderRadius: "10px",
          }}
        />
      </Column>
    </TwoColumns>
  );
};

export default GlobalCoverageSec2;
