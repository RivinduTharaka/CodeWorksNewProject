import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";

// Styled Components
const LeftColumn = styled(Box)(({ theme }) => ({
  backgroundColor: "#0a192f", // Dark Blue background
  color: "white",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  padding: "60px",
  height: "60vh",
  [theme.breakpoints.down('md')]: {
    height: "auto", // Adjust height for smaller screens
    padding: "40px", // Reduced padding for mobile
  },
}));

const RightColumn = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  color: "black",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  padding: "60px",
  height: "60vh",
  borderTop: "2px solid black",
  borderBottom: "2px solid black",
  [theme.breakpoints.down('md')]: {
    height: "auto", // Adjust height for smaller screens
    padding: "40px", // Reduced padding for mobile
  },
}));

// Gradient Title (Updated Colors)
const GradientText = styled(Typography)(({ theme }) => ({
  fontSize: "32px",
  fontWeight: "bold",
  background: "linear-gradient(90deg, #1a9fd9, #24b24c)", // Updated gradient
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  [theme.breakpoints.down('md')]: {
    fontSize: "24px", // Adjust font size for mobile
  },
}));

// Styled Button
const CustomButton = styled(Button)(({ theme }) => ({
  marginTop: "20px",
  border: "2px solid #24b24c",
  color: "#24b24c",
  padding: "10px 20px",
  fontSize: "16px",
  fontWeight: "bold",
  textTransform: "uppercase",
  "&:hover": {
    backgroundColor: "#24b24c",
    color: "white",
  },
  [theme.breakpoints.down('md')]: {
    fontSize: "14px", // Adjust button text size for mobile
    padding: "8px 16px", // Adjust padding for mobile
  },
}));

function Aboutsec3() {
  return (
    <Grid container spacing={0}>
      {/* Left Column */}
      <Grid item xs={12} md={6}>
        <LeftColumn>
          <GradientText variant="h4" >Our Leadership</GradientText>
          <Typography variant="body1" sx={{ mt: 4, color: "white", textAlign: "justify" }}>
            At <strong>Connex Information Technologies</strong>, our leadership team drives innovation, excellence, and transformation in the IT sector.
            With a wealth of industry experience, we empower businesses with cutting-edge digital solutions, ensuring long-term growth and technological advancement.
          </Typography>
          <CustomButton variant="outlined">Meet Our Leaders</CustomButton>
          {/* <Typography variant="body2" sx={{ mt: 2, fontWeight: "bold", color: "white" }}>
            #WeAreConnex
          </Typography> */}
        </LeftColumn>
      </Grid>

      {/* Right Column */}
      <Grid item xs={12} md={6}>
        <RightColumn>
          <GradientText variant="h4">Our Careers</GradientText>
          <Typography variant="body1" sx={{ mt: 4, textAlign: "justify" }}>
            Explore a world of opportunities and be part of a fast-growing company that values talent, innovation, and teamwork. Grow with us and make an impact in a dynamic, forward-thinking environment.
          </Typography>
          <CustomButton variant="outlined" sx={{ mt: 4 }}>JOBHUB</CustomButton>
        </RightColumn>
      </Grid>
    </Grid>
  );
}

export default Aboutsec3;