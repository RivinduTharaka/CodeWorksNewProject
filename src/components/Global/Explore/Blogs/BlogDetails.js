import React from "react";
import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";

const BlogDetails = () => {
  const { id } = useParams(); // Get blog ID from URL
  const location = useLocation(); // Get state data from navigation
  const blog = location.state?.blog; // Retrieve blog data

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the component mounts
  }, []);

  if (!blog) {
    return <Container sx={{ py: 12}}><Typography variant="h6" sx={{ textAlign: "center", mt: 5 }}>Blog not found.</Typography></Container>;
  }
  return (
    <Container sx={{ py: 15}}>
      <Box sx={{ maxWidth: "800px", mx: "auto", textAlign: "left" }}>
        <Typography variant="h4" fontWeight="bold">{blog.title}</Typography>
        <Typography variant="subtitle2" sx={{ color: "gray", mt: 1 }}>
          By {blog.author} | {blog.date} | Category: {blog.category}
        </Typography>
        <Box sx={{ mt: 2, height: "400px", backgroundImage: `url(${blog.image})`, backgroundSize: "cover", backgroundPosition: "center" }}></Box>
        <Typography variant="body1" sx={{ mt: 3, lineHeight: 1.8 }}>{blog.description}</Typography>
        <Typography variant="body1" sx={{ mt: 3, lineHeight: 1.8 }}>{blog.content}</Typography>
      </Box>
    </Container>
  );
};
export default BlogDetails;