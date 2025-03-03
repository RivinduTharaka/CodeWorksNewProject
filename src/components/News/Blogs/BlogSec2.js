import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  Container,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import { Facebook, Twitter, LinkedIn, Instagram, Email, Phone, LocationOn } from '@mui/icons-material';
// // Share Media Button
// const SocialIconButton = styled(IconButton)(({ bg }) => ({
//     color: '#ffffff',
//     backgroundColor: bg,
//     margin: '0.3rem',
//     transition: 'transform 0.3s ease-in-out',
//     '&:hover': {
//       transform: 'scale(1.1)',
//     },
//   }));
  

// Sample Blog Data (Replace this with API data if needed)
const blogData = [
  {
    id: 1,
    title: "The Future of AI",
    description:
      "Explore how AI is transforming industries and shaping the future of technology.",
    image:
      "https://www.mindinventory.com/blog/wp-content/uploads/2024/02/ai-technology-trends.webp",
    author: "Olivia Rhye",
    date: "20 Jan 2022",
    category: "Design",
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
  },
  {
    id: 1,
    title: "The Future of AI",
    description:
      "Explore how AI is transforming industries and shaping the future of technology.",
    image:
      "https://www.mindinventory.com/blog/wp-content/uploads/2024/02/ai-technology-trends.webp",
    author: "Olivia Rhye",
    date: "20 Jan 2022",
    category: "Design",
  },
];

// Motion Animation Variants
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const BlogSec2 = () => {
  return (
    <Container sx={{ py: 5 }}>
      <Grid container spacing={4} justifyContent="center">
        {blogData.map((blog, index) => (
          <Grid item key={blog.id} xs={12} sm={6} md={4}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              transition={{ delay: index * 0.2 }} // Staggered animations
            >
              <Card
                sx={{
                  width: 345,
                  height: 450,
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  maxHeight:"450",
                  maxWidth:"345",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'scale(1.03)',
                        boxShadow: '0 8px 20px rgba(21, 101, 192, 0.2)',
                      },
                }}
              >
                {/* Article Image with Overlay */}
                <Box sx={{ position: "relative" }}>
                  <CardMedia sx={{ height: 260 }} image={blog.image} />
                  {/* Author & Date Overlay */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      background:
                        "linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))",
                      padding: "10px",
                      color: "white",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: "bold", fontSize: "14px" }}
                      >
                        {blog.author}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ fontSize: "12px", opacity: 0.8 }}
                      >
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
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottomvariant="h6" component="div"
                    sx={{ fontWeight: "bold" }}
                  >
                    {blog.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {blog.description}
                  </Typography>
                </CardContent>

                {/* Card Actions */}
                <CardActions
                  sx={{ justifyContent: "space-between", padding: "14px" }}
                >
                  <Button
                    size="small"
                    sx={{
                      color: "#3669A6",
                      fontWeight: "bold",
                      px: 3,
                      py: 1.5,
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      mx: { xs: "auto", md: "0" },
                      "&:hover": {
                        borderColor: "#070054",
                        color: "#070054",
                      },
                    }}
                  >
                    Read More
                    <svg
                      width="12px"
                      height="12px"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M14 2H5.50003L4.00003 3.5L6.83581 6.33579L0.585815 12.5858L3.41424 15.4142L9.66424 9.16421L12.5 12L14 10.5L14 2Z"
                          fill="#3669A6"
                        ></path>
                      </g>
                    </svg>
                  </Button>
                  {/* <Typography sx={{
                      color: "#3669A6",
                      fontWeight: "bold",
                      
                      mx: { xs: "auto", md: "0" },
                      
                    }}>
                  Share: 
                  </Typography> */}
                  {/* <Button
                    sx={{
                      color: "#3669A6",
                      fontWeight: "bold",
                      alignItems: "center",
                      gap: "2px",
                      mx: { xs: "auto", md: "0" },
                      "&:hover": {
                        borderColor: "#070054",
                        color: "#070054",
                      },
                    }}
                    size="small"
                  >
                    <LinkedIn />
                    <Facebook/>
                    <Twitter/>
                  </Button> */}
                  
                </CardActions>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
