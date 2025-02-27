import React from 'react';
import { Box, Typography, Button } from '@mui/material';
// Import your map image (adjust the path/name as needed)
import MapImage from '../../assets/image/map.png'; // Add your map image file

function Contact3() {
    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '95vh',
                background: 'linear-gradient(135deg, rgb(1, 87, 38), #070054)',
                color: 'white',
                fontFamily: 'Arial, sans-serif',
               
                boxSizing: 'border-box',
                flexDirection: { xs: 'column', md: 'row' }, // Stack on mobile, row on desktop
                paddingLeft: { xs: 0, md: 20 }, // No padding on mobile, padding on desktop
                paddingRight: { xs: 0, md: 20 }, // No padding on mobile, padding on desktop
            }}
        >
            {/* Left Column - 30% width */}
            <Box
                sx={{
                    width: { xs: '100%', md: '40%' }, // Full width on mobile, 40% on desktop
                    padding: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start', // Align text to the left
                    justifyContent: 'center', // Keeps vertical centering
                }}
            >
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        // color: '#D81B60', 
                        fontWeight: 'bold',
                        fontSize: '3.5rem',
                    }}
                >
                    Connex Sri Lanka
                </Typography>
                <Typography variant="body1" sx={{ mb: 5, fontSize: '1.2rem' }}>
                    20, Quai du Point du Jour,
                    <br />
                    Arcs de Seine, 92100
                    <br />
                    Boulogne Billancourt, France
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                    Tel: +33 (0)1 41 31 53 04
                </Typography>
                {/* <Typography variant="body2" sx={{ mb: 2 }}>
                    Fax: +33 (0)1 41 31 47 86
                </Typography> */}
                <Button
                    variant="outlined"
                    sx={{
                        marginBottom: 2,
                        borderColor: '#00eeff', // Matching the pink border color from the image
                        color: '#00eeff', // Matching pink text color
                        '&:hover': {
                            borderColor: 'white', // Slightly darker shade for hover
                            color: 'white', // White text on hover
                            backgroundColor: 'transparent', // Keep background transparent on hover
                        },
                        textTransform: 'none', // Remove uppercase transformation
                        padding: '8px 16px',
                        borderWidth: 2, // Slightly thicker border to match the image
                  marginTop:2
                    }}
                >
                    Get Directions
                </Button>
            </Box>

            {/* Right Column - 70% width with Map */}
            <Box
                sx={{
                    width: { xs: '100%', md: '60%' }, 
                    mt: { xs: 5, md: 0 }, // Margin top on mobile, no margin on desktop
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box
                    component="img"
                    src={MapImage}
                    alt="Location Map"
                    sx={{
                        width: '100%',
                        // height: '50%',
                        maxHeight: '100vh',
                        // objectFit: 'cover',
                        padding: 2,
                    
                    }}
                />
            </Box>
        </Box>
    );
}

export default Contact3;