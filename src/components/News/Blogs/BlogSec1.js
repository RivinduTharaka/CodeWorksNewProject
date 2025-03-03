import React from 'react';
import { Box, Typography, Container, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import video from "../../../assets/video/CNXBackgropund.mp4";

const BlogSec1 = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                height: { xs: "70vh", sm: "80vh", md: "90vh" }, // Adjust height based on screen size
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                color: "white",
                px: { xs: 2, md: 4 }, // Responsive padding
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
                        fontWeight={900}
                        sx={{
                            textTransform: "uppercase",
                            lineHeight: 1.2,
                            fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3.5rem" }, // Responsive font sizes
                        }}
                        gutterBottom
                    >
                        Connex Blog
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: "14px", sm: "16px", md: "18px" }, // Adjust font size for responsiveness
                            opacity: 0.8,
                            mt: "10px",
                            px: { xs: 2, md: 6 }, // Adjust padding for better text layout
                        }}
                    >
                        Transforming Knowledge into Action.
                    </Typography>
                </motion.div>
            </Container>
        </Box>
    );
};

export default BlogSec1;
