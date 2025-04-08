import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

// Styled Components (unchanged)
const LeftColumn = styled(Box)(({ theme }) => ({
  backgroundColor: "#001F3F",
  color: "white",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  padding: "60px",
  height: "60vh",
  [theme.breakpoints.down('md')]: {
    height: "auto",
    padding: "40px",
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
    height: "auto",
    padding: "40px",
  },
}));

const GradientText = styled(Typography)(({ theme }) => ({
  fontSize: "32px",
  fontWeight: "bold",
  background: "linear-gradient(90deg, #1a9fd9, #24b24c)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  [theme.breakpoints.down('md')]: {
    fontSize: "24px",
  },
}));

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
    fontSize: "14px",
    padding: "8px 16px",
  },
}));

function Aboutsec3() {
  const navigate = useNavigate(); // Initialize the navigate function

  // Handler functions for button clicks
  const handleLeadershipClick = () => {
    navigate("/leadership");
  };

  const handleCareersClick = () => {
    navigate("/careers");
  };

  return (
    <Grid container spacing={0}>
      {/* Left Column */}
      <Grid item xs={12} md={6}>
        <LeftColumn>
          <GradientText variant="h4">Our Leadership</GradientText>
          <Typography variant="body1" sx={{ mt: 4, color: "white", textAlign: "justify" }}>
            At <strong>Connex Information Technologies</strong>, our leadership team drives innovation, excellence, and transformation in the IT sector.
            With a wealth of industry experience, we empower businesses with cutting-edge digital solutions, ensuring long-term growth and technological advancement.
          </Typography>
          <CustomButton 
            variant="outlined" 
            onClick={handleLeadershipClick} // Add click handler
          >
            Meet Our Leaders
          </CustomButton>
        </LeftColumn>
      </Grid>

      {/* Right Column */}
      <Grid item xs={12} md={6}>
        <RightColumn>
          <GradientText variant="h4">Our Careers</GradientText>
          <Typography variant="body1" sx={{ mt: 4, textAlign: "justify" }}>
            Explore a world of opportunities and be part of a fast-growing company that values talent, innovation, and teamwork. Grow with us and make an impact in a dynamic, forward-thinking environment.
          </Typography>
          <CustomButton 
            variant="outlined" 
            sx={{ mt: 4 }}
            onClick={handleCareersClick} // Add click handler
          >
            Hireme
          </CustomButton>
        </RightColumn>
      </Grid>
    </Grid>
  );
}

export default Aboutsec3;