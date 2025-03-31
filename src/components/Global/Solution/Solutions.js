import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Container, Typography, Grid, Box, useMediaQuery, CircularProgress } from '@mui/material';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import PillarCard from './PillarCard';
import PillarModal from './PillarModal';
import Solution1 from './Solution1';
import AutoLogin from '../../../services/AutoLogin';
import { selectData } from '../../../services/dataService';
import API_URL from '../../../flieapi'; // Adjust the import path as needed

// Simple in-memory cache for images and API responses
const imageCache = new Map();
const apiCache = new Map();

// Helper function to construct the full URL for images
const constructImageUrl = (filePath) => {
  if (!filePath) return 'https://via.placeholder.com/380x250?text=No+Image';
  const baseUrl = `${API_URL}`;
  // Remove any leading slashes and invalid characters, and handle local paths
  const cleanedFilePath = filePath.replace(/^\/+/, '').replace(/^C:\\.*\\Main-Back.*$/i, '');
  const fullUrl = `${baseUrl}/${cleanedFilePath}`;
  console.log(`Constructed image URL: ${fullUrl}`); // Debug log
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
      console.error(`Failed to fetch image at ${imageUrl}: ${response.statusText}`);
      return 'https://via.placeholder.com/380x250?text=Image+Not+Found';
    }
  } catch (error) {
    console.error(`Error fetching image at ${imageUrl}:`, error);
    return 'https://via.placeholder.com/380x250?text=Image+Not+Found';
  }
};

const Solutions = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedPillar, setSelectedPillar] = useState(null);
  const [pillars, setPillars] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for data fetching

  // Memoize fetchPillars to prevent unnecessary re-renders
  const fetchPillars = useCallback(async () => {
    setLoading(true);
    const cacheKey = 'pillars_country_3'; // Cache key for country_id = 3

    // Check if the data is already in the cache
    if (apiCache.has(cacheKey)) {
      const cachedData = apiCache.get(cacheKey);
      setPillars(cachedData);
      setLoading(false);
      return;
    }

    try {
      // Step 1: Fetch main_pillar_countries entries for country_id = 3 and is_active = true
      const pillarCountriesResponse = await selectData('main_pillar_countries', { country_id: 3, is_active: true });
      console.log('pillarCountriesResponse:', pillarCountriesResponse);

      if (!pillarCountriesResponse.data || pillarCountriesResponse.data.length === 0) {
        setPillars([]);
        setLoading(false);
        return;
      }

      // Step 2: Extract main_pillar_ids
      const pillarIds = pillarCountriesResponse.data.map(entry => entry.main_pillar_id);

      // Step 3: Fetch pillars where id is in pillarIds and is_active = true
      const pillarsResponse = await selectData('main_pillars', { id: pillarIds, is_active: true });
      console.log('pillarsResponse:', pillarsResponse);

      if (!pillarsResponse.data || pillarsResponse.data.length === 0) {
        setPillars([]);
        setLoading(false);
        return;
      }

      // Step 4: Fetch subpillars for each pillar and format pillar data
      const formattedPillars = await Promise.all(
        pillarsResponse.data.map(async (pillar) => {
          // Fetch subpillars for the current main_pillar_id
          const subPillarsResponse = await selectData('sub_pillars', { main_pillar_id: pillar.id, is_active: true });
          console.log(`subPillarsResponse for pillar ${pillar.id}:`, subPillarsResponse);

          // Format subpillars as subCategories, including sub_pillar_id
          const subCategories = subPillarsResponse.data?.map(subPillar => ({
            id: subPillar.id, // Include sub_pillar_id for fetching vendors
            name: subPillar.title,
            vendors: [], // Vendors will be fetched dynamically in PillarModal
          })) || [];

          const imageUrl = await fetchImage(pillar.image_link); // Use image_link as per the database schema
          return {
            id: pillar.id,
            title: pillar.title,
            image: imageUrl,
            description: pillar.description,
            subCategories, // Attach the fetched subpillars as subCategories
          };
        })
      );

      // Cache the formatted pillars
      apiCache.set(cacheKey, formattedPillars);
      setPillars(formattedPillars);
    } catch (error) {
      console.error('Failed to fetch pillars:', error);
      setPillars([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch pillars when the component mounts
  useEffect(() => {
    fetchPillars();
    window.scrollTo(0, 0); // Scroll to top when the component mounts
  }, [fetchPillars]);

  // Memoize the rendering of pillar cards to prevent unnecessary re-renders
  const pillarCards = useMemo(() => {
    return pillars.map((pillar, index) => (
      <Grid item xs={12} sm={6} md={4} key={pillar.id || index}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <Box
            sx={{
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'scale(1.03)',
                boxShadow: '0 8px 20px rgba(21, 101, 192, 0.2)',
              },
            }}
          >
            <PillarCard
              image={pillar.image}
              title={pillar.title}
              description={pillar.description}
              icon={<BusinessCenterIcon sx={{ color: '#1565C0', fontSize: '2.5rem' }} />}
              onClick={() => setSelectedPillar(pillar)}
            />
          </Box>
        </motion.div>
      </Grid>
    ));
  }, [pillars, isMobile]);

  return (
    <>
      <Solution1 />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Solutions Grid Section */}
        <Container sx={{ py: 8 }}>
          <AutoLogin />
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
              <CircularProgress />
            </Box>
          ) : pillars.length === 0 ? (
            <Typography variant="h6" align="center" color="textSecondary">
              No pillars available for this country.
            </Typography>
          ) : (
            <Grid container spacing={4}>
              {pillarCards}
            </Grid>
          )}
        </Container>

        {/* Why Choose Us Section - Updated UI */}
        <Box
          sx={{
            width: '85%',
            margin: 'auto',
            background: 'linear-gradient(45deg, rgb(5, 30, 68), rgb(3, 59, 24))', // Dark blue to dark green gradient
            py: 6,
            px: 3,
            textAlign: 'center',
            borderRadius: '20px',
            mt: 6,
            mb: 6,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)', // Added shadow for depth
          }}
        >
          <Container>
            <Typography
              variant={isMobile ? 'h5' : 'h4'}
              fontWeight="bold"
              sx={{
                mb: 3,
                color: '#ffffff', // White text for contrast against gradient
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', // Subtle shadow for readability
              }}
            >
              Why Partner with Us?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                opacity: 0.95,
                mx: 'auto',
                textAlign: 'center',
                maxWidth: '900px',
                lineHeight: 1.7,
                color: '#ffffff', // White text for contrast
                fontSize: isMobile ? '0.95rem' : '1.1rem', // Slightly larger text on desktop
                textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)', // Subtle shadow for readability
              }}
            >
              We deliver more than just solutions—we offer a partnership built on trust, expertise, and innovation.
              Our cutting-edge security technologies and tailored networking services protect your assets, streamline operations,
              and ensure compliance with global standards. Whether it’s fortifying your endpoints, securing your network,
              or managing identities, we provide scalable, reliable, and cost-effective options that grow with your business.
              Choose us to stay ahead of threats and empower your success.
            </Typography>
          </Container>
        </Box>

        {/* Modal for Pillar Details */}
        <PillarModal open={!!selectedPillar} onClose={() => setSelectedPillar(null)} pillar={selectedPillar} />
      </motion.div>
    </>
  );
};

export default Solutions;