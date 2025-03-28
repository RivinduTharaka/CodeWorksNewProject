import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Box, Typography, Container, Grid, Avatar, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import { selectData } from '../../../../services/dataService';
import API_URL from '../../../../flieapi'; // Import API_URL for image fetching
import image from '../../../../assets/image/OIP.jpg'; // Fallback image
import AutoLogin from '../../../../services/AutoLogin';

// Scroll Animation Variants
const fadeInVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

// Section Styling
const SectionContainer = styled(Box)({
  mt: 5,
  backgroundColor: '#f9f9f9',
  padding: '4rem 0',
});

// Section Title
const SectionTitle = styled(Typography)({
  fontSize: '1.4rem',
  fontWeight: '800',
  color: '#0D47A1',
  textAlign: 'center',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  marginBottom: '3rem',
});

// Styled CEO Image
const CeoImage = styled(Avatar)({
  width: '280px',
  height: '280px',
  borderRadius: '5px',
});

// Simple in-memory cache for images and API responses
const imageCache = new Map();
const apiCache = new Map();

// Helper function to construct the full URL for images
const constructImageUrl = (filePath) => {
  if (!filePath) return image; // Use fallback image if no file path
  const baseUrl = `${API_URL}`;
  const cleanedFilePath = filePath.replace(/^\/+/, "");
  const fullUrl = `${baseUrl}/${cleanedFilePath}`;
  return fullUrl;
};

// Helper function to fetch image with caching
const fetchImage = async (filePath) => {
  const imageUrl = constructImageUrl(filePath);

  // Check if the image is already in the cache
  if (imageCache.has(imageUrl)) {
    return imageCache.get(imageUrl);
  }

  try {
    const response = await fetch(imageUrl);
    if (response.ok) {
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      imageCache.set(imageUrl, objectUrl); // Cache the object URL
      return objectUrl;
    } else {
      console.error("Failed to fetch image:", response.statusText);
      return image; // Fallback to imported image
    }
  } catch (error) {
    console.error("Error fetching image:", error);
    return image; // Fallback to imported image
  }
};

const CeoWordsSection = () => {
  // State to store CEO data and loading status
  const [ceoData, setCeoData] = useState({
    name: '',
    designation: '',
    message: '',
    image: image, // Fallback to the imported image
  });
  const [loading, setLoading] = useState(true);

  // Memoize fetchCeoData to prevent unnecessary re-renders
  const fetchCeoData = useCallback(async () => {
    setLoading(true);
    const cacheKey = 'ceo_message_data';

    // Check if the data is already in the cache
    if (apiCache.has(cacheKey)) {
      const cachedData = apiCache.get(cacheKey);
      setCeoData(cachedData);
      setLoading(false);
      return;
    }

    try {
      // Fetch data from the 'ceomessage' table where is_active is true
      const response = await selectData('ceomessage', { is_active: true });

      // Check if data exists
      if (response.data && response.data.length > 0) {
        const ceo = response.data[0]; // Assuming only one active CEO message
        const imageUrl = await fetchImage(ceo.ceo_image); // Fetch image with caching
        const formattedData = {
          name: ceo.ceo_name || 'Suresh Wijesinghe',
          designation: ceo.ceo_designation || 'Founder & CEO, Connex Information Technologies',
          message: ceo.ceo_message || "At Connex Information Technologies, our mission is to drive innovation and excellence in technology distribution. We believe in building strong relationships with our partners and delivering state-of-the-art solutions to meet the ever-evolving market needs. Our success is built on passion, expertise, and a commitment to exceeding expectations.",
          image: imageUrl,
        };
        apiCache.set(cacheKey, formattedData); // Cache the formatted data
        setCeoData(formattedData);
      } else {
        // If no data is found, use fallback values
        const fallbackData = {
          name: 'Suresh Wijesinghe',
          designation: 'Founder & CEO, Connex Information Technologies',
          message: "At Connex Information Technologies, our mission is to drive innovation and excellence in technology distribution. We believe in building strong relationships with our partners and delivering state-of-the-art solutions to meet the ever-evolving market needs. Our success is built on passion, expertise, and a commitment to exceeding expectations.",
          image: image,
        };
        apiCache.set(cacheKey, fallbackData);
        setCeoData(fallbackData);
      }
    } catch (error) {
      console.error('Failed to fetch CEO data:', error);
      // On error, use fallback values
      const fallbackData = {
        name: 'Suresh Wijesinghe',
        designation: 'Founder & CEO, Connex Information Technologies',
        message: "At Connex Information Technologies, our mission is to drive innovation and excellence in technology distribution. We believe in building strong relationships with our partners and delivering state-of-the-art solutions to meet the ever-evolving market needs. Our success is built on passion, expertise, and a commitment to exceeding expectations.",
        image: image,
      };
      apiCache.set(cacheKey, fallbackData);
      setCeoData(fallbackData);
    } finally {
      setLoading(false);
    }
  }, []);

  // Run fetchCeoData on mount
  useEffect(() => {
    fetchCeoData();
  }, [fetchCeoData]);

  // Memoize the rendering of the CEO section to prevent unnecessary re-renders
  const ceoContent = useMemo(() => (
    <Grid container spacing={6} alignItems="center">
      {/* Left Side: CEO Image */}
      <Grid item xs={12} md={5} display="flex" justifyContent="center">
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <CeoImage src={ceoData.image} alt={ceoData.name} loading="lazy" />
        </motion.div>
      </Grid>

      {/* Right Side: CEO Speech */}
      <Grid item xs={12} md={7}>
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Typography variant="h4" fontWeight="700" color="#070054" sx={{ mb: 2 }}>
            {ceoData.name}
          </Typography>
          <Typography variant="h6" fontWeight="500" color="green" sx={{ mb: 3 }}>
            {ceoData.designation}
          </Typography>
          <Typography variant="body1" fontWeight="400" color="#555" lineHeight={1.6}>
            {ceoData.message}
          </Typography>
        </motion.div>
      </Grid>
    </Grid>
  ), [ceoData]);

  return (
    <SectionContainer>
      <AutoLogin />
      <Container maxWidth="lg">
       

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <CircularProgress />
          </Box>
        ) : (
          ceoContent
        )}
      </Container>
    </SectionContainer>
  );
};

export default CeoWordsSection;