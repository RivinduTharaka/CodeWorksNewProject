import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import video from "../../../assets/video/CNXBackgropund.mp4";

// Styled Neon Effect
const NeonLinesOverlay = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: `
    linear-gradient(45deg, rgba(255,0,191,0.1) 0%, rgba(0,255,255,0.1) 100%),
    linear-gradient(135deg, rgba(255,0,0,0.1) 0%, rgba(255,255,0,0.1) 100%)
  `,
  backgroundBlendMode: 'overlay',
  opacity: 0.3,
});

function LeadershipHeroSection() {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "80vh",
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
        <Typography
          variant="h1"
          sx={{
            fontSize: '4rem',
            fontWeight: 700,
            marginBottom: '10px',
            textShadow: '0 0 10px rgba(0,0,0,0.5)',
          }}
        >
          Our Leadership Team
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: '18px',
            opacity: 0.8,
            mt: '10px',
          }}
        >
          Agile, centre-weighted leadership team and inherent structure.
        </Typography>
      </Box>

      {/* Neon-like lines effect */}
      <NeonLinesOverlay />
    </Box>
  );
}

export default LeadershipHeroSection;
