import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, CardMedia, CardActions, Button, useMediaQuery, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { selectData } from '../../../../services/dataService';
import API_URL from '../../../../flieapi';

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
      return 'https://via.placeholder.com/380x250?text=Image+Not+Found';
    }
  } catch (error) {
    console.error("Error fetching image:", error);
    return 'https://via.placeholder.com/380x250?text=Image+Not+Found';
  }
};

const SLBlogSec2 = () => {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Memoize fetchData to prevent unnecessary re-renders
  const fetchData = useCallback(async () => {
    setLoading(true);
    const cacheKey = 'blogs_country_1'; // Cache key for Sri Lanka (country_id = 1)

    // Check if the data is already in the cache
    if (apiCache.has(cacheKey)) {
      const cachedData = apiCache.get(cacheKey);
      setBlogData(cachedData);
      setLoading(false);
      return;
    }

    try {
      // Step 1: Fetch blog_countries entries for country_id = 1 and is_active = true
      const blogCountriesResponse = await selectData('blog_countries', { country_id: 1, is_active: true });

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
      <Grid item xs={12} sm={6} md={4} key={blog.id}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <Card
            sx={{
              width: "100%",
              maxWidth: isMobile ? "100%" : 380,
              height: 500,
              margin: "auto",
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
            {/* Article Image with Overlay */}
            <Box sx={{ position: "relative" }}>
              <CardMedia
                sx={{ height: isMobile ? 200 : 250 }}
                image={blog.image}
                title={blog.title}
                component="img"
                loading="lazy" // Enable lazy loading for images
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
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: "bold", fontSize: "14px" }}>
                    {blog.author}
                  </Typography>
                  <Typography variant="caption" sx={{ fontSize: "12px", opacity: 0.8 }}>
                    {new Date(blog.date).toLocaleDateString()}
                  </Typography>
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    opacity: 0.8,
                    textTransform: "uppercase",
                  }}
                >
                  {blog.category_id === 1 ? "Backend API" : blog.category_id ? "Unknown Category" : blog.category}
                </Typography>
              </Box>
            </Box>

            {/* Card Content */}
            <CardContent sx={{ flexGrow: 1, textAlign: "center", p: isMobile ? 2 : 3 }}>
              <Typography
                gutterBottom
                variant="h6"
                fontWeight="bold"
                sx={{ color: "#0D47A1", fontSize: "1.2rem" }}
              >
                {blog.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {blog.description}
              </Typography>
            </CardContent>

            {/* Card Actions */}
            <CardActions sx={{ pb: 2 }}>
              <Button
                size="small"
                sx={{
                  color: "#3669A6",
                  fontWeight: "bold",
                  px: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
                onClick={() => navigate(`/SL/blog/${blog.id}`, { state: { blog } })}
              >
                Read More →
              </Button>
            </CardActions>
          </Card>
        </motion.div>
      </Grid>
    ));
  }, [blogData, isMobile, navigate]);

  return (
    <Container sx={{ py: 8 }}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : blogData.length === 0 ? (
        <Typography variant="h6" align="center" color="textSecondary">
          No blogs available for Sri Lanka.
        </Typography>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {blogCards}
        </Grid>
      )}
    </Container>
  );
};

export default SLBlogSec2;