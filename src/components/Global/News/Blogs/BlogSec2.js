import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, CardMedia, CardActions, Button, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import AutoLogin from '../../../../services/AutoLogin';
import { selectData } from '../../../../services/dataService';
import API_URL from '../../../../flieapi'; // Import API_URL for consistency

// Helper function to construct the full URL for images
const constructImageUrl = (filePath) => {
  if (!filePath) return 'https://via.placeholder.com/380x250?text=No+Image'; // Fallback if filePath is missing
  const baseUrl = `${API_URL}`; // Use API_URL for consistency with CourseContentManagement
  const cleanedFilePath = filePath.replace(/^\/+/, ""); // Remove leading slashes
  const fullUrl = `${baseUrl}/${cleanedFilePath}`;
  console.log('Constructed Image URL:', fullUrl); // Debug the constructed URL
  return fullUrl;
};

// Helper function to fetch image as a blob (similar to CourseContentManagement)
const fetchImage = async (filePath) => {
  try {
    const response = await fetch(constructImageUrl(filePath));
    if (response.ok) {
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } else {
      console.error("Failed to fetch image:", response.statusText);
      return 'https://via.placeholder.com/380x250?text=Image+Not+Found';
    }
  } catch (error) {
    console.error("Error fetching image:", error);
    return 'https://via.placeholder.com/380x250?text=Image+Not+Found';
  }
};

const BlogSec2 = () => {
  const [blogData, setBlogData] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch blogs directly from the blogs table
      const blogsResponse = await selectData('blogs', { is_active: true });
      console.log('Fetched blogs:', blogsResponse.data || []);

      // Fetch images dynamically and format blog data
      const formattedBlogs = await Promise.all(
        (blogsResponse.data || []).map(async (blog) => {
          const imageUrl = await fetchImage(blog.image); // Fetch image dynamically
          return {
            ...blog,
            image: imageUrl, // Use the fetched image URL
          };
        })
      );

      setBlogData(formattedBlogs);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setBlogData([]); // Set empty array on error to avoid breaking the render
    }
  };

  return (
    <Container sx={{ py: 8 }}>
      <AutoLogin />
      {blogData.length === 0 ? (
        <Typography variant="h6" align="center" color="textSecondary">
          No blogs available.
        </Typography>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {blogData.map((blog, index) => (
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
                      image={blog.image} // Use the pre-fetched URL
                      title={blog.title}
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
                          {new Date(blog.date).toLocaleDateString()} {/* Format the date */}
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
                        {blog.category_id === 1 ? "Backend API" : "Unknown Category"} {/* Map category_id to a name */}
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
                      sx={{ color: "#3669A6", fontWeight: "bold", px: 3, display: "flex", alignItems: "center", gap: "8px" }}
                      onClick={() => navigate(`/blog/${blog.id}`, { state: { blog } })} // Use blog.id for routing
                    >
                      Read More →
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default BlogSec2;