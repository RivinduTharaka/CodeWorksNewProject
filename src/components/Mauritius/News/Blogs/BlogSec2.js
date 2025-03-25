import React from "react";
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
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

// Sample Blog Data
const blogData = [
  {
    id: 1,
    title: "The Future of AI",
    description:
      "Explore how AI is transforming industries and shaping the future of technology.Explore how AI is transforming industries and shaping the future of technology.Explore how AI is transforming industries and shaping the future of technology.",
    image:
      "https://www.mindinventory.com/blog/wp-content/uploads/2024/02/ai-technology-trends.webp",
    author: "Olivia Rhye",
    date: "20 Jan 2022",
    category: "Design",
    content: "Full article content about AI trends and its future impact...",
  },
  {
    id: 2,
    title: "Cloud Computing Trends",
    description:
      "Discover the latest advancements in cloud computing and how businesses are leveraging them.",
    image:
      "https://media.licdn.com/dms/image/v2/D5612AQGcwhYREbZ9BA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1695193456420?e=2147483647&v=beta&t=VxcxFKwMjp9uK-wZnGPPsOScCdopxuvWrQpBUp1GYuQ",
    author: "John Doe",
    date: "10 Feb 2023",
    category: "Technology",
    content: "Full article content about cloud computing trends...",
  },
  {
    id: 3,
    title: "Cybersecurity Best Practices",
    description:
      "Learn essential cybersecurity tips to protect your data and stay safe online.",
    image:
      "https://assets.bizclikmedia.net/580/c51068cac67d1d76553cdc9666e1080f:9775d5ea0aece926871e68f020aff8ca/gettyimages-1296090038-20-283-29-jpg.webp",
    author: "Jane Smith",
    date: "5 Mar 2023",
    category: "Cybersecurity",
    content: "Full article content about cybersecurity best practices...",
  },
  {
    id: 4,
    title: "Cybersecurity Best Practices",
    description:
      "Learn essential cybersecurity tips to protect your data and stay safe online.",
    image:
      "https://assets.bizclikmedia.net/580/c51068cac67d1d76553cdc9666e1080f:9775d5ea0aece926871e68f020aff8ca/gettyimages-1296090038-20-283-29-jpg.webp",
    author: "Jane Smith",
    date: "5 Mar 2023",
    category: "Cybersecurity",
    content: "Cloud computing is evolving rapidly. Learn how businesses are leveraging the latest trends...",
  },
  {
    id: 5,
    title: "The Future of AI",
    description:
      "Explore how AI is transforming industries and shaping the future of technology.",
    image:
      "https://www.mindinventory.com/blog/wp-content/uploads/2024/02/ai-technology-trends.webp",
    author: "Olivia Rhye",
    date: "20 Jan 2022",
    category: "Design",
    content: "Full article content about AI trends and its future impact...",
  },
];

const BlogSec2 = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container sx={{ py: 8 }}>
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
                  <CardMedia sx={{ height: isMobile ? 200 : 250 }} image={blog.image} />
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
                        {blog.date}
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
                      {blog.category}
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
                    onClick={() => navigate(`/mu/blog/${blog.title}`, { state: { blog } })}
                  >
                    Read More →
                  </Button>
                </CardActions>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BlogSec2;