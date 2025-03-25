import React, { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Solutions = forwardRef((_, ref) => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleButtonClick = () => {
    navigate("/brn/solution"); // Navigate to the desired route
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      ref={ref}
      id="solutions"
      sx={{
        height: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg,rgb(1, 87, 38), #070054)",
        color: "white",
        padding: 2,
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        {/* Left Content */}
        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Typography
            variant={isMobile ? "h4" : "h1"}
            sx={{
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              fontWeight: "bold",
              lineHeight: 1.2,
              color: "white",
            }}
          >
            A value-driven <br /> global leader in <br />
            <span style={{ color: "#000000" }}>technology ecosystem</span>
          </Typography>
        </Box>

        {/* Right Content */}
        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Typography
            variant={isMobile ? "body2" : "body1"}
            sx={{
              fontSize: { xs: "1rem", md: "1.2rem" },
              lineHeight: 2,
              marginBottom: 3,
              color: "white",
            }}
          >
            Driving innovation and trust with Revolutionary advancements/
            Next-generation solutions, seamless integration and expert-driven
            value to empower businesses and shape a smarter, connected future.
          </Typography>
          <Button
            onClick={handleButtonClick}
            sx={{
              backgroundColor: "transparent",
              color: "white",
              border: "2px solid white",
              padding: { xs: "10px 20px", md: "12px 50px" },
              fontSize: { xs: "0.875rem", md: "0.8rem" },
              fontWeight: "bold",
              textTransform: "uppercase",
              width: { xs: "auto", md: "300px" },
              textAlign: "center",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "white",
                color: "#053701",
                borderColor: "white", // Ensure border color stays white on hover
              },
            }}
          >
            Explore Our Solutions
          </Button>
        </Box>
      </Container>
    </Box>
  );
});

export default Solutions;
