import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, Stack, CircularProgress } from '@mui/material';
import AutoLogin from '../../../../services/AutoLogin';
import { selectData } from '../../../../services/dataService';
import API_URL from '../../../../flieapi';

// Import social icons
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// Simple in-memory cache for images and API responses
const imageCache = new Map();
const apiCache = new Map();

// Helper function to construct the full URL for images
const constructImageUrl = (filePath) => {
  if (!filePath) return 'https://via.placeholder.com/800x400?text=No+Image';
  const baseUrl = `${API_URL}`;
  const cleanedFilePath = filePath.replace(/^\/+/, "");
  const fullUrl = `${baseUrl}/${cleanedFilePath}`;
  return fullUrl;
};

// Helper function to fetch image with caching
const fetchImage = async (filePath) => {
  const imageUrl = constructImageUrl(filePath);

  if (imageCache.has(imageUrl)) {
    return imageCache.get(imageUrl);
  }

  try {
    const response = await fetch(imageUrl);
    if (response.ok) {
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      imageCache.set(imageUrl, objectUrl);
      return objectUrl;
    } else {
      console.error("Failed to fetch image:", response.statusText);
      return 'https://via.placeholder.com/800x400?text=Image+Not+Found';
    }
  } catch (error) {
    console.error("Error fetching image:", error);
    return 'https://via.placeholder.com/800x400?text=Image+Not+Found';
  }
};

const PressDetails = () => {
  const { id } = useParams(); // Get the press item ID from the URL
  const navigate = useNavigate();
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch press item data
  const fetchPressData = useCallback(async () => {
    setLoading(true);
    setError(null);

    const cacheKey = `press_item_${id}`;

    // Check if the data is already in the cache
    if (apiCache.has(cacheKey)) {
      const cachedData = apiCache.get(cacheKey);
      setMedia(cachedData);
      setLoading(false);
      return;
    }

    try {
      // Step 1: Verify the press item is associated with country_id = 3 and is_active = true
      const newsCountriesResponse = await selectData('news_countries', {
        news_id: id,
        country_id: 3,
        is_active: true,
      });

      if (!newsCountriesResponse.data || newsCountriesResponse.data.length === 0) {
        throw new Error('Press item not found for this country.');
      }

      // Step 2: Fetch the press item from news_press
      const pressResponse = await selectData('news_press', { id: parseInt(id), is_active: true });

      if (!pressResponse.data || pressResponse.data.length === 0) {
        throw new Error('Press item not found.');
      }

      const pressItem = pressResponse.data[0];

      // Step 3: Fetch the image
      const imageUrl = await fetchImage(pressItem.image);

      // Step 4: Fetch social media links
      const socialMediaResponse = await selectData('news_social_media', { news_id: id, is_active: true });
      const socialMedia = socialMediaResponse?.data || [];

      // Step 5: Format the press item data
      const formattedMedia = {
        id: pressItem.id,
        title: pressItem.title,
        short_description: pressItem.short_description, // Already included, but ensuring it's clear
        long_description: pressItem.long_description,
        image: imageUrl,
        posted_date: pressItem.posted_date,
        social_media: socialMedia,
      };

      // Cache the formatted data
      apiCache.set(cacheKey, formattedMedia);
      setMedia(formattedMedia);
    } catch (err) {
      console.error('Failed to fetch press item:', err);
      setError(err.message || 'Failed to load press item.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on mount
    fetchPressData();
  }, [fetchPressData]);

  if (loading) {
    return (
      <Container sx={{ py: 12 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error || !media) {
    return (
      <Container sx={{ py: 12 }}>
        <Typography variant="h6" align="center" color="error" sx={{ mt: 5 }}>
          {error || 'Media item not found.'}
        </Typography>
        <Box display="flex" justifyContent="center" mt={4}>
          <Button variant="contained" onClick={() => navigate('/press-&-media')}>
            Go Back
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 15 }}>
      <AutoLogin />
      <Box sx={{ maxWidth: '800px', mx: 'auto', textAlign: 'left' }}>
        {/* Title */}
        <Typography variant="h4" fontWeight="bold">
          {media.title}
        </Typography>

        {/* Date */}
        <Typography variant="subtitle2" sx={{ color: 'gray', mt: 1 }}>
          {new Date(media.posted_date).toLocaleDateString()}
        </Typography>

        {/* Image */}
        <Box mt={3}>
          <img
            src={media.image}
            alt={media.title}
            style={{
              width: '100%',
              maxHeight: 400,
              objectFit: 'cover',
              borderRadius: 8,
            }}
          />
        </Box>

        {/* Short Description */}
        <Typography variant="body1" sx={{ mt: 3, lineHeight: 1.8, fontStyle: 'italic', color: 'text.secondary' }}>
          {media.short_description}
        </Typography>

        {/* Gap between Short and Long Description */}
        <Box sx={{ my: 3 }} /> {/* Adds vertical spacing between short and long description */}

        {/* Long Description */}
        <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
          {media.long_description}
        </Typography>

        {/* Social Media Icons */}
        <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
          {media.social_media.some(social => social.platform === "Facebook") && (
            <FacebookIcon
              sx={{ fontSize: 28, color: "#3b5998", cursor: "pointer" }}
              onClick={() => window.open(media.social_media.find(social => social.platform === "Facebook").link, '_blank')}
            />
          )}
          {media.social_media.some(social => social.platform === "Instagram") && (
            <InstagramIcon
              sx={{ fontSize: 28, color: "#E1306C", cursor: "pointer" }}
              onClick={() => window.open(media.social_media.find(social => social.platform === "Instagram").link, '_blank')}
            />
          )}
          {media.social_media.some(social => social.platform === "LinkedIn") && (
            <LinkedInIcon
              sx={{ fontSize: 28, color: "#0077b5", cursor: "pointer" }}
              onClick={() => window.open(media.social_media.find(social => social.platform === "LinkedIn").link, '_blank')}
            />
          )}
        </Stack>

        {/* Back Button */}
        <Box mt={5}>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            ← Back to Press & Media
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default PressDetails;