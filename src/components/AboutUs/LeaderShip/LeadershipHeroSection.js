import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useTheme } from '@mui/material/styles';
import video from "../../../assets/video/CNXBackgropund.mp4";

// Styled Neon Effect
const NeonLinesOverlay = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: `
    linear-gradient(45deg, rgba(255,0,191,0.1) 0%, rgba(0,255,255,0.1) 100%),
    linear-gradient(135deg, rgba(255,0,0,0.1) 0%, rgba(255,255,0,0.1) 100%)
  `,
  backgroundBlendMode: "overlay",
  opacity: 0.3,
});

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '4rem',
  fontWeight: '700',
  color: '#ffffff',
  marginBottom: theme.spacing(2),
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Added for better readability on video
  animation: 'fadeInSlideUp 1s ease-out forwards', // Animation added
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.5rem',
  },
  '@keyframes fadeInSlideUp': {
    '0%': {
      opacity: 0,
      transform: 'translateY(50px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));

const Description = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: '400',
  color: '#ffffff',
  maxWidth: '800px',
  margin: '0 auto',
  lineHeight: '1.6',
  textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
  animation: 'fadeInSlideUp 1s ease-out forwards', // Animation added
  animationDelay: '0.3s', // Slight delay for staggered effect
  opacity: 0, // Initial state for animation
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.875rem', // Slightly smaller for mobile
  },
  '@keyframes fadeInSlideUp': {
    '0%': {
      opacity: 0,
      transform: 'translateY(50px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));

function LeadershipHeroSection() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "90vh",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
        overflow: "hidden", // Ensures the neon lines stay within bounds
      }}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src={video} type="video/mp4" />
      </video>

      {/* Content Overlay */}
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Title variant="h1">
          Our Leadership Team
        </Title>
        <Description variant="body1">
          Agile, centre-weighted leadership team and inherent structure.
        </Description>
      </Box>

      {/* Neon-like lines effect */}
      <NeonLinesOverlay />
    </Box>
  );
}

export default LeadershipHeroSection;