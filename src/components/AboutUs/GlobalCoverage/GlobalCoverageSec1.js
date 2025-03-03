import React from "react";
import { Box, Typography, Container, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import video from "../../../assets/video/CNXBackgropund.mp4";

const GlobalCoverageSec1 = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "90vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
          px: 2,
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
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography
              variant={isSmallScreen ? "h4" : isMediumScreen ? "h3" : "h2"}
              fontWeight={700}
              sx={{fontSize: '4rem',
                fontWeight: '700',
                color: '#ffffff',
                marginBottom: theme.spacing(2),
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Added for better readability on video
                marginBottom: theme.spacing(2),
                [theme.breakpoints.down('sm')]: {
                  fontSize: '2.5rem',
                }, }}
              gutterBottom
            >
              Our Regional Offices
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "1rem",
                fontWeight: "400",
                color: "#ffffff",
                maxWidth: "800px",
                margin: "0 auto",
                lineHeight: "1.6",
                textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)", // Added for better readability on video
                [theme.breakpoints.down("sm")]: {
                  fontSize: "0.9rem",
                  maxWidth: "90%",
                },
              }}
            >
              Expanding Borders, Strengthening Connections.
            </Typography>
          </motion.div>
        </Container>
      </Box>
    </>
  );
};

export default GlobalCoverageSec1;
