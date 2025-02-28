import React from 'react'
import { Box, Typography, Button, Stack } from "@mui/material";
import { styled } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";
import worldMapImage from "../../../assets/image/Global-presence/GlobalCoverage.jpg"; 

// Styled Components using MUI
const Section = styled(Box)(({ theme }) => ({
background: 'linear-gradient(135deg, rgb(1, 87, 38), #070054)',
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "60px",
  minHeight: "80vh",
  color: "white",
  textAlign: "center",
}));


const GlobalCoverageSec1 = () => {
    
  return (
    <>
    <Section component="section">
        <Typography
                variant="h1"
                sx={{
                  fontSize: '4rem',
                  fontWeight: 700,
                  marginBottom: '10px',
                  textShadow: '0 0 10px rgba(0,0,0,0.5)',
                  zIndex: 1, // Ensure text stays above the overlay
                }}
              >
                Our Regional Offices
              </Typography>
          
                <Typography
                        variant="body1"
                        sx={{
                          fontSize: '18px',
                          opacity: 0.8,
                          zIndex: 1, // Ensure text stays above the overlay
                          mt: '10px',
                        }}
                      >
                       Expanding Borders, Strengthening Connections.
                      </Typography>
      </Section>

      
    </>
  )
}

export default GlobalCoverageSec1