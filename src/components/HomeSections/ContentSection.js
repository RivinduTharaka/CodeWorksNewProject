import React, { useState, useEffect, useRef } from "react";
import { Box, Container, Typography, Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import icon1 from "../../assets/image/1 (1).png";
import icon2 from "../../assets/image/1 (2).png";
import icon3 from "../../assets/image/1 (3).png";
import icon4 from "../../assets/image/1 (4).png";

const WhoweareSection = ({ ref }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Cleanup
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <Box
      ref={(node) => {
        sectionRef.current = node;
        if (ref) {
          ref.current = node; // Preserve the original ref if provided
        }
      }}
      id="about"
      sx={{
        background: '#0a192f',  // Changed from gradient to solid color
        color: "#ffffff",
        py: { xs: 4, md: 6 },
        textAlign: "center",
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant={isMobile ? "h4" : "h2"}
          sx={{
            fontWeight: 700,
            color: "#fffff",
            mb: 2,
          }}
        >
          We Are
        </Typography>
        <Typography
          variant={isMobile ? "h5" : "h2"}
          sx={{
            fontWeight: 800,
            background: "linear-gradient(90deg, #01ad01, #00ff99)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 4,
          }}
        >
          Connex Information Technologies
        </Typography>
        <Typography
          variant={isMobile ? "body1" : "h6"}
          sx={{
            fontWeight: 600,
            lineHeight: 1.6,
            maxWidth: 900,
            mx: "auto",
            color: "#e0f7fa",
            mb: 5,
          }}
        >
          Connex Information Technologies is a leading technology distributor specializing in
          cutting-edge solutions, including distribution, consultancy, training, and TAC support.
          With a decade of expertise, Connex thrives on adapting to the ever-changing world,
          building strong relationships with clients and partners to meet dynamic market needs.
          Their commitment to innovation, integrity, and partnership drives mutual growth and
          sets new industry benchmarks.
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={6} md={3}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Box
                component="img"
                src={icon1}
                alt="Sales Icon"
                sx={{
                  width: { xs: 50, md: 90 },
                  height: { xs: 50, md: 90 },
                  mb: 2,
                }}
              />
              <Typography
                variant={isMobile ? "body2" : "body1"}
                sx={{ fontWeight: 600, color: "#ffffff" }}
              >
                Driving Growth <br /> and Innovation
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6} md={3}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Box
                component="img"
                src={icon2}
                alt="Offices Icon"
                sx={{
                  width: { xs: 50, md: 90 },
                  height: { xs: 50, md: 90 },
                  mb: 2,
                }}
              />
              <Typography
                variant={isMobile ? "body2" : "body1"}
                sx={{ fontWeight: 600, color: "#ffffff" }}
              >
                1500+ <br /> Global Partners
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6} md={3}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Box
                component="img"
                src={icon3}
                alt="Customers Icon"
                sx={{
                  width: { xs: 50, md: 90 },
                  height: { xs: 50, md: 90 },
                  mb: 2,
                }}
              />
              <Typography
                variant={isMobile ? "body2" : "body1"}
                sx={{ fontWeight: 600, color: "#ffffff" }}
              >
                Offices in <br /> 14 countries
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6} md={3}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Box
                component="img"
                src={icon4}
                alt="Engineers Icon"
                sx={{
                  width: { xs: 50, md: 90 },
                  height: { xs: 50, md: 90 },
                  mb: 2,
                }}
              />
              <Typography
                variant={isMobile ? "body2" : "body1"}
                sx={{ fontWeight: 600, color: "#ffffff" }}
              >
                1:2 ratio of technical <br /> engineers to sales
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Typography
          variant="caption"
          sx={{
            fontStyle: "italic",
            color: "rgba(255, 255, 255, 0.7)",
            mt: 3,
          }}
        >
          *Statistics based on the global Connex Information Technologies group
        </Typography>
      </Container>
    </Box>
  );
};

export default WhoweareSection;