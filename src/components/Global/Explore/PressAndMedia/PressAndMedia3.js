import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, CardMedia, useMediaQuery, CircularProgress, Divider, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import AutoLogin from '../../../../services/AutoLogin';
import { selectData } from '../../../../services/dataService';
import API_URL from '../../../../flieapi';

// Simple in-memory cache for images and API responses
const imageCache = new Map();
const apiCache = new Map();

// Helper function to construct the full URL for images
const constructImageUrl = (filePath) => {
  if (!filePath) return 'https://via.placeholder.com/150x150?text=No+Image';
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
      return 'https://via.placeholder.com/150x150?text=Image+Not+Found';
    }
  } catch (error) {
    console.error("Error fetching image:", error);
    return 'https://via.placeholder.com/150x150?text=Image+Not+Found';
  }
};

const PressAndMedia3 = () => {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(1024)); // Breakpoint at 1024px

  // Memoize fetchData to prevent unnecessary re-renders
  const fetchData = useCallback(async () => {
    setLoading(true);
    const cacheKey = 'blogs_country_3'; // Cache key for global site (country_id = 3)

    // Check if the data is already in the cache
    if (apiCache.has(cacheKey)) {
      const cachedData = apiCache.get(cacheKey);
      setBlogData(cachedData);
      setLoading(false);
      return;
    }

    try {
      // Step 1: Fetch blog_countries entries for country_id = 3 and is_active = true
      const blogCountriesResponse = await selectData('blog_countries', { country_id: 3, is_active: true });

      if (!blogCountriesResponse.data || blogCountriesResponse.data.length === 0) {
        setBlogData([]);
        setLoading(false);
        return;
      }

      // Step 2: Extract blog_ids
      const blogIds = blogCountriesResponse.data.map(entry => entry.blog_id);

      // Step 3: Fetch blogs where id is in blogIds and is_active = true
      const blogsResponse = await selectData('blogs', { id: blogIds, is_active: true });

      if (!blogsResponse.data || blogsResponse.data.length === 0) {
        setBlogData([]);
        setLoading(false);
        return;
      }

      // Step 4: Fetch images in parallel and format blog data
      const formattedBlogs = await Promise.all(
        blogsResponse.data.map(async (blog) => {
          const imageUrl = await fetchImage(blog.image);
          return { ...blog, image: imageUrl };
        })
      );

      // Cache the formatted blogs
      apiCache.set(cacheKey, formattedBlogs);
      setBlogData(formattedBlogs);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setBlogData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Memoize the rendering of blog cards to prevent unnecessary re-renders
  const blogCards = useMemo(() => {
    return blogData.map((blog, index) => (
      <Grid item xs={12} md={6} key={blog.id}> {/* 1 card per row on mobile, 2 cards per row on laptop */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              height: 200, // Fixed height for consistency
              boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
              overflow: 'hidden',
              transition: 'transform 0.3s, box-shadow 0.3s',
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            {/* Image Section */}
            <Box sx={{ position: 'relative', width: '30%', flexShrink: 0 }}>
              <CardMedia
                component="img"
                image={blog.image}
                alt={blog.title}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                loading="lazy"
              />
              {/* Date and Category Overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: '4px',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: '10px',
                    color: 'white',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    padding: '2px 6px',
                    borderRadius: '3px',
                  }}
                >
                  {new Date(blog.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  }).toUpperCase()}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: '10px',
                    fontWeight: 'bold',
                    color: 'white',
                    backgroundColor: '#D32F2F', // Red background for category
                    padding: '2px 6px',
                    borderRadius: '3px',
                    textTransform: 'uppercase',
                  }}
                >
                  {blog.category_id === 1 ? "Lifestyle" : "Unknown Category"}
                </Typography>
              </Box>
            </Box>

            {/* Divider */}
            <Divider orientation="vertical" flexItem sx={{  backgroundColor: '#e0e0e0' }} />

            {/* Content Section */}
            <CardContent
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between', // Space between content and button
                padding: '16px',
                backgroundColor: '#fff',
              }}
            >
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    color: '#333',
                    mb: 1,
                  }}
                >
                  {blog.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#666',
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2, // Reduced to 2 lines to make space for the button
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {blog.description}
                </Typography>
              </Box>

              {/* Read More Button */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  size="small"
                  sx={{
                    color: "#3669A6",
                    fontWeight: "bold",
                    px: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    textTransform: 'none',
                  }}
                  onClick={() => navigate(`/blog/${blog.id}`, { state: { blog } })}
                >
                  Read More →
                </Button>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Grid>
    ));
  }, [blogData, navigate]);

  return (
    <Container sx={{ py: 8 }}>
      <AutoLogin />
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : blogData.length === 0 ? (
        <Typography variant="h6" align="center" color="textSecondary">
          No blogs available for this country.
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {blogCards}
        </Grid>
      )}
    </Container>
  );
};

export default PressAndMedia3;