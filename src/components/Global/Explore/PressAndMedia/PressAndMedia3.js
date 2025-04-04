import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  useMediaQuery,
  Stack,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import AutoLogin from '../../../../services/AutoLogin';
import { selectData } from '../../../../services/dataService';
import API_URL from '../../../../flieapi';

// Import icons
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// Simple in-memory cache for images and API responses
const imageCache = new Map();
const apiCache = new Map();

// Helper function to construct the full URL for images
const constructImageUrl = (filePath) => {
  if (!filePath) return 'https://via.placeholder.com/380x250?text=No+Image';
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
      return 'https://via.placeholder.com/380x250?text=Image+Not+Found';
    }
  } catch (error) {
    console.error("Error fetching image:", error);
    return 'https://via.placeholder.com/380x250?text=Image+Not+Found';
  }
};

// Helper to truncate text
const truncateText = (text, maxLength = 100) =>
  text.length <= maxLength ? text : text.substring(0, maxLength) + '...';

const PressAndMedia3 = () => {
  const [mediaData, setMediaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Fetch data with caching
  const fetchData = useCallback(async () => {
    setLoading(true);
    const cacheKey = 'press_media_country_3';

    if (apiCache.has(cacheKey)) {
      const cachedData = apiCache.get(cacheKey);
      setMediaData(cachedData);
      setLoading(false);
      return;
    }

    try {
      // Step 1: Fetch news_countries entries for country_id = 3 and is_active = true
      const newsCountriesResponse = await selectData('news_countries', { country_id: 3, is_active: true });

      if (!newsCountriesResponse.data || newsCountriesResponse.data.length === 0) {
        setMediaData([]);
        setLoading(false);
        return;
      }

      // Step 2: Extract news_ids
      const newsIds = newsCountriesResponse.data.map(entry => entry.news_id);

      // Step 3: Fetch press items where id is in newsIds and is_active = true
      const pressResponse = await selectData('news_press', { id: newsIds, is_active: true });

      if (!pressResponse.data || pressResponse.data.length === 0) {
        setMediaData([]);
        setLoading(false);
        return;
      }

      // Step 4: Fetch images and social media links in parallel, and format press data
      const formattedMedia = await Promise.all(
        pressResponse.data.map(async (press) => {
          const imageUrl = await fetchImage(press.image);
          const socialMediaResponse = await selectData('news_social_media', { news_id: press.id, is_active: true });
          const socialMedia = socialMediaResponse?.data || [];
          return {
            id: press.id,
            title: press.title,
            short_description: press.short_description,
            long_description: press.long_description,
            image: imageUrl,
            posted_date: press.posted_date,
            social_media: socialMedia, // Add social media links
          };
        })
      );

      // Sort by posted_date (newest first)
      formattedMedia.sort((a, b) => new Date(b.posted_date) - new Date(a.posted_date));

      // Cache the formatted data
      apiCache.set(cacheKey, formattedMedia);
      setMediaData(formattedMedia);
    } catch (error) {
      console.error('Failed to fetch press and media data:', error);
      setMediaData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Memoize the rendering of media cards
  const [latestEvent, ...otherMedia] = mediaData;

  const mediaCards = useMemo(() => {
    return otherMedia.map((media, index) => (
      <Grid item xs={12} sm={6} md={4} key={media.id}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <Card
            sx={{
              width: "100%",
              height: isMobile ? 450 : 500, // Fixed height for the card
              display: "flex",
              flexDirection: "column",
              position: "relative",
              boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: "0 10px 25px rgba(21, 101, 192, 0.2)",
              },
            }}
          >
            <Box sx={{ position: "relative", width: "100%", height: isMobile ? 200 : 250 }}>
              <CardMedia
                component="img"
                src={media.image}
                alt={media.title}
                loading="lazy"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  background: "linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))",
                  padding: "12px",
                  color: "white",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="caption" sx={{ fontSize: "15px", opacity: 0.8 }}>
                  {new Date(media.posted_date).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>

            <CardContent
              sx={{
                flexGrow: 1,
                textAlign: "center",
                p: isMobile ? 2 : 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                overflow: "hidden", // Handle overflow if content is too long
              }}
            >
              <Box>
                <Typography
                  gutterBottom
                  variant="h6"
                  fontWeight="bold"
                  sx={{ color: "#0D47A1", fontSize: "1.2rem" }}
                >
                  {truncateText(media.title, 50)}
                </Typography>

                <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
                  {truncateText(media.short_description, 100)}
                </Typography>
              </Box>
            </CardContent>

            <CardActions sx={{ pb: 2, justifyContent: "space-between", px: 2, mt: "auto" }}>
              <Button
                size="small"
                sx={{
                  color: "#3669A6",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
                onClick={() => navigate(`/press-&-media/${media.id}`, { state: { media } })}
              >
                Read More →
              </Button>

              <Stack direction="row" spacing={1}>
                {media.social_media.some(social => social.platform === "Facebook") && (
                  <FacebookIcon
                    sx={{ fontSize: 25, color: "#3b5998", cursor: "pointer" }}
                    onClick={() => window.open(media.social_media.find(social => social.platform === "Facebook").link, '_blank')}
                  />
                )}
                {media.social_media.some(social => social.platform === "Instagram") && (
                  <InstagramIcon
                    sx={{ fontSize: 25, color: "#E1306C", cursor: "pointer" }}
                    onClick={() => window.open(media.social_media.find(social => social.platform === "Instagram").link, '_blank')}
                  />
                )}
                {media.social_media.some(social => social.platform === "LinkedIn") && (
                  <LinkedInIcon
                    sx={{ fontSize: 25, color: "#0077b5", cursor: "pointer" }}
                    onClick={() => window.open(media.social_media.find(social => social.platform === "LinkedIn").link, '_blank')}
                  />
                )}
              </Stack>
            </CardActions>
          </Card>
        </motion.div>
      </Grid>
    ));
  }, [otherMedia, isMobile, navigate]);

  return (
    <Container sx={{ py: 8 }}>
      <AutoLogin />
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : mediaData.length === 0 ? (
        <Typography variant="h6" align="center" color="textSecondary">
          No press and media items available for this country.
        </Typography>
      ) : (
        <>
          {/* Featured Latest Event - Full Display */}
          <Grid container spacing={4} alignItems="center" sx={{ mb: 6 }}>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={latestEvent.image}
                alt={latestEvent.title}
                sx={{
                  width: '100%',
                  height: { xs: 250, md: 400 },
                  objectFit: 'cover',
                  borderRadius: 2,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {truncateText(latestEvent.title, 60)}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {truncateText(latestEvent.short_description, 250)}
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Button
                  variant="outlined"
                  size="medium"
                  onClick={() => navigate(`/press-&-media/${latestEvent.id}`, { state: { media: latestEvent } })}
                >
                  Read More →
                </Button>
              </Box>

              {/* Social Icons under the featured card */}
              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                {latestEvent.social_media.some(social => social.platform === "Facebook") && (
                  <FacebookIcon
                    sx={{ fontSize: 25, color: "#3b5998", cursor: "pointer" }}
                    onClick={() => window.open(latestEvent.social_media.find(social => social.platform === "Facebook").link, '_blank')}
                  />
                )}
                {latestEvent.social_media.some(social => social.platform === "Instagram") && (
                  <InstagramIcon
                    sx={{ fontSize: 25, color: "#E1306C", cursor: "pointer" }}
                    onClick={() => window.open(latestEvent.social_media.find(social => social.platform === "Instagram").link, '_blank')}
                  />
                )}
                {latestEvent.social_media.some(social => social.platform === "LinkedIn") && (
                  <LinkedInIcon
                    sx={{ fontSize: 25, color: "#0077b5", cursor: "pointer" }}
                    onClick={() => window.open(latestEvent.social_media.find(social => social.platform === "LinkedIn").link, '_blank')}
                  />
                )}
              </Stack>

              <Typography variant="subtitle2" sx={{ color: 'gray', fontWeight: 500 }}>
                {new Date(latestEvent.posted_date).toLocaleDateString()}
              </Typography>
            </Grid>
          </Grid>

          {/* Other Media Cards */}
          {mediaCards.length === 0 ? (
            <Typography variant="h6" align="center" color="textSecondary">
              No additional press and media items available.
            </Typography>
          ) : (
            <Grid container spacing={4} justifyContent="center">
              {mediaCards}
            </Grid>
          )}
        </>
      )}
    </Container>
  );
};

export default PressAndMedia3;