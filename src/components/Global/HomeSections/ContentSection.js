import React, { useState, useEffect, useRef } from "react";
import { Box, Container, Typography, Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { selectData } from '../../../services/dataService'; // Import the selectData service

import icon1 from "../../../assets/image/1 (1).png";
import icon2 from "../../../assets/image/1 (2).png";
import icon3 from "../../../assets/image/1 (3).png";
import icon4 from "../../../assets/image/1 (4).png";

const WhoweareSection = ({ ref }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState({
    founded_year: "2014", // Default values in case fetching fails
    partners: "70+",
    total_countries: "5",
    global_vendors: "75+",
    employees: "350+",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sectionRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // console.log("Step: IntersectionObserver - Section is visible");
          setIsVisible(true);
        } else {
          // console.log("Step: IntersectionObserver - Section is not visible");
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      // console.log("Step: IntersectionObserver - Observing sectionRef");
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        // console.log("Step: IntersectionObserver - Cleaning up observer");
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // console.log("Step: WhoweareSection - Fetching stats data for country_id = 3");
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        // console.log("Step: fetchStats - Calling selectData for country_stats");
        const response = await selectData('country_stats', { country_id: 3, is_active: 1 });
        // console.log("Step: fetchStats - API response", response);

        if (response.data && response.data.length > 0) {
          const data = response.data[0]; // Assuming one record for country_id = 3
          // console.log("Step: fetchStats - Data received", data);
          setStats({
            founded_year: data.founded_year || "2014", // Fallback if null
            partners: data.partners ? `${data.partners}+` : "70+", // Add "+" for display
            total_countries: data.total_countries || "5",
            global_vendors: data.global_vendors ? `${data.global_vendors}+` : "75+",
            employees: data.employees ? `${data.employees}+` : "350+",
          });
        } else {
          // console.log("Step: fetchStats - No data found for country_id = 3");
          setError("No stats found for this country.");
        }
      } catch (err) {
        // console.log("Step: fetchStats - Error fetching data", err);
        setError("Failed to fetch stats. Using default values.");
      } finally {
        // console.log("Step: fetchStats - Fetching complete, setting loading to false");
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  console.log("Step: WhoweareSection - Rendering component", { loading, error, stats });

  return (
    <Box
      ref={(node) => {
        sectionRef.current = node;
        if (ref) {
          ref.current = node;
        }
      }}
      id="about"
      sx={{
        background: '#0a192f',
        color: "#ffffff",
        py: { xs: 4, md: 6 },
        textAlign: "center",
      }}
    >
      <Container maxWidth="md">
        {loading ? (
          <Typography variant="h6" sx={{ color: "#e0f7fa" }}>
            Loading stats...
          </Typography>
        ) : error ? (
          <Typography variant="h6" sx={{ color: "#ff6f61" }}>
            {error}
          </Typography>
        ) : (
          <>
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
              A premier value-added IT distributor, delivering next-generation technologies and
              cutting-edge digital solutions. With deep industry expertise and specialised training, we
              empower our partners with scalable, Top-tier solutions to drive innovation and
              accelerate growth. From advanced infrastructure and cybersecurity to cloud computing
              and AI-driven solutions, we provide the technology, expertise, and support businesses
              need to stay ahead in a rapidly evolving digital world. At Connex, we don’t just enable
              success—we committed to redefine it.
            </Typography>

            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={6} md={2.4}>
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
                    Founded <br /> in {stats.founded_year}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={6} md={2.4}>
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
                    {stats.partners} <br /> Global Partners
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={6} md={2.4}>
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
                    {stats.total_countries} <br /> Countries
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={6} md={2.4}>
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
                    {stats.global_vendors} <br /> Global Vendors
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={6} md={2.4}>
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
                    {stats.employees} <br /> Employees
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </Box>
  );
};

export default WhoweareSection;