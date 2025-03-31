import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Box, Typography, Container, Avatar, IconButton, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Fade } from '@mui/material';
import { selectData } from '../../../../services/dataService';
import API_URL from '../../../../flieapi';
import AutoLogin from '../../../../services/AutoLogin';

// Sample images (for fallback)
import leader1Image from '../../../../assets/image/Shamal.jpg';
import leader2Image from '../../../../assets/image/Eranga.jpg';
import leader3Image from '../../../../assets/image/Rajiv.jpg';
import leader4Image from '../../../../assets/image/Rohan.jpg';
import leader5Image from '../../../../assets/image/OIP.jpg';

// In-memory cache for images and API responses
const imageCache = new Map();
const apiCache = new Map();

// Helper function to construct the full URL for images
const constructImageUrl = (filePath, fallbackImage) => {
  if (!filePath) return fallbackImage;
  const baseUrl = `${API_URL}`;
  const cleanedFilePath = filePath.replace(/^\/+/, "");
  const fullUrl = `${baseUrl}/${cleanedFilePath}`;
  return fullUrl;
};

// Helper function to fetch image with caching
const fetchImage = async (filePath, fallbackImage) => {
  const imageUrl = constructImageUrl(filePath, fallbackImage);
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
      return fallbackImage;
    }
  } catch (error) {
    console.error("Error fetching image:", error);
    return fallbackImage;
  }
};

// Designation mapping
const designationMap = {
  CMOdd: { full: 'Chief Marketing Officer', shortCode: 'CMO' },
  CTO: { full: 'Chief Technology Officer', shortCode: 'CTO' },
  CFO: { full: 'Chief Revenue Officer', shortCode: 'CFO' },
  COO: { full: 'Chief Operating Officer', shortCode: 'COO' },
  CEO: { full: 'Chief Executive Officer', shortCode: 'CEO' },
};


// Styled Components with Responsive Adjustments
const SectionContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  padding: theme.spacing(8, 0),
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4, 0),
    minHeight: 'auto',
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: '700',
  color: '#070054',
  textAlign: 'center',
  fontFamily: 'Poppins, sans-serif',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    fontSize: '2rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
  },
}));

const Description = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  fontWeight: '400',
  color: '#666',
  textAlign: 'center',
  maxWidth: '700px',
  margin: '0 auto',
  fontFamily: 'Poppins, sans-serif',
  marginBottom: theme.spacing(6),
  [theme.breakpoints.down('md')]: {
    fontSize: '1rem',
    marginBottom: theme.spacing(4),
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
    marginBottom: theme.spacing(3),
  },
}));

const LeaderCard = styled(Box)(({ theme }) => ({
  position: 'relative',
  cursor: 'pointer',
  borderRadius: '16px',
  overflow: 'hidden',
  width: '260px', // Fixed width
  height: '360px', // Fixed height
  transition: 'all 0.4s ease-in-out',
  border: '1px solid rgba(13, 71, 161, 0.2)',
  background: 'linear-gradient(145deg, #ffffff 0%, #f5f7fa 100%)',
  '&:hover': {
    borderColor: '#0D47A1',
  },
  [theme.breakpoints.down('md')]: {
    width: '220px', // Fixed width for tablets
    height: '320px', // Fixed height for tablets
  },
  [theme.breakpoints.down('sm')]: {
    width: '200px', // Fixed width for mobile
    height: '280px', // Fixed height for mobile
  },
}));

const LeaderImage = styled(Avatar)(({ theme }) => ({
  width: '100%',
  height: '45%',
  objectFit: 'cover',
  borderTopLeftRadius: '16px',
  borderTopRightRadius: '16px',
  borderBottom: '1px solid rgba(13, 71, 161, 0.1)',
  [theme.breakpoints.down('md')]: {
    height: '40%',
  },
  [theme.breakpoints.down('sm')]: {
    height: '35%',
  },
}));

const LinkedInIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '10px',
  right: '10px',
  backgroundColor: '#0D47A1',
  color: '#ffffff',
  padding: theme.spacing(0.5),
  borderRadius: '50%',
  transition: 'background-color 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: '#0288D1',
  },
  [theme.breakpoints.down('sm')]: {
    top: '8px',
    right: '8px',
    padding: theme.spacing(0.4),
  },
}));

const CarouselContainer = styled(Box)(({ theme }) => ({
  '& .slick-slide': {
    padding: theme.spacing(0, 1), // Increased padding for better spacing
    display: 'flex',
    justifyContent: 'center',
  },
  '& .slick-list': {
    margin: theme.spacing(0, -1), // Adjust margin to match padding
  },
  [theme.breakpoints.down('md')]: {
    '& .slick-slide': {
      padding: theme.spacing(0, 0.5),
    },
    '& .slick-list': {
      margin: theme.spacing(0, -0.5),
    },
  },
  [theme.breakpoints.down('sm')]: {
    '& .slick-slide': {
      padding: theme.spacing(0, 0.3),
    },
    '& .slick-list': {
      margin: theme.spacing(0, -0.3),
    },
  },
}));

// Slider Settings with Dynamic Adjustment
const getSliderSettings = (itemCount) => ({
  infinite: itemCount > 1,
  speed: 1700,
  slidesToShow: Math.min(itemCount, 3),
  slidesToScroll: 1,
  autoplay: itemCount > 1,
  autoplaySpeed: 1000,
  arrows: false,
  centerMode: true,
  centerPadding: '30px', // Increased padding for better spacing
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: Math.min(itemCount, 2),
        centerPadding: '20px',
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: Math.min(itemCount, 2),
        centerPadding: '15px',
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        centerPadding: '10px',
      },
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 1,
        centerPadding: '5px',
      },
    },
  ],
});

const ConnexITBoardLeaders = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeadersData = useCallback(async () => {
    setLoading(true);
    const cacheKey = 'management_team_data';

    if (apiCache.has(cacheKey)) {
      const cachedData = apiCache.get(cacheKey);
      console.log('Using cached leaders data:', cachedData);
      setLeaders(cachedData);
      setLoading(false);
      return;
    }

    try {
      const response = await selectData('management_team', { is_active: 1 });
      console.log('Leaders API Response:', response);

      if (response.data && response.data.length > 0) {
        const uniqueLeaders = Array.from(
          new Map(response.data.map((leader) => [leader.id, leader])).values()
        );
        console.log('Unique Leaders after deduplication:', uniqueLeaders);

        const formattedLeaders = await Promise.all(
          uniqueLeaders.map(async (leader) => {
            const leaderImageUrl = await fetchImage(leader.image, leader1Image);

            const mappedDesignation = designationMap[leader.designation] || {
              full: leader.designation,
              shortCode: leader.designation,
            };

            return {
              id: leader.id,
              name: leader.name || 'Unknown Leader',
              designation: mappedDesignation.full,
              shortCode: mappedDesignation.shortCode,
              image: leaderImageUrl,
              linkedin: leader.linkedin_link || 'https://linkedin.com',
            };
          })
        );

        console.log('Formatted Leaders:', formattedLeaders);
        apiCache.set(cacheKey, formattedLeaders);
        setLeaders(formattedLeaders);
      } else {
        console.log('No leaders found, using fallback');
    
      }
    } catch (error) {
      console.error('Failed to fetch leaders data:', error);
      console.log('Error occurred, using fallback');
     
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeadersData();
  }, [fetchLeadersData]);

  console.log('Leaders State:', leaders);

  const sliderSettings = useMemo(() => getSliderSettings(leaders.length), [leaders.length]);

  const leadersContent = useMemo(() => {
    if (leaders.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="h6" color="textSecondary">
            No leaders found.
          </Typography>
        </Box>
      );
    }

    return (
      <CarouselContainer sx={{ p: { xs: 2, sm: 3, md: 5 } }}>
        <Slider {...sliderSettings}>
          {leaders.map((leader) => {
            console.log('Rendering leader:', leader);
            return (
              <Box key={leader.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                <LeaderCard>
                  <LeaderImage src={leader.image} alt={leader.name} />
                  <LinkedInIconButton
                    href={leader.linkedin}
                    target="_blank"
                    aria-label={`LinkedIn profile of ${leader.name}`}
                  >
                    <LinkedInIcon />
                  </LinkedInIconButton>
                  <Box
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: { xs: '40%', md: '45%' },
                    }}
                  >
                    <Fade in timeout={500}>
                      <Typography
                        variant="h6"
                        fontWeight="700"
                        color="#070054"
                        sx={{
                          fontFamily: 'Poppins, sans-serif',
                          letterSpacing: '0.5px',
                          fontSize: { xs: '1rem', md: '1.2rem' },
                        }}
                      >
                        {leader.name}
                      </Typography>
                    </Fade>
                    <Fade in timeout={700}>
                      <Typography
                        variant="body2"
                        fontWeight="600"
                        color="green"
                        sx={{
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: { xs: '0.9rem', md: '1rem' },
                        }}
                      >
                        {leader.designation} ({leader.shortCode})
                      </Typography>
                    </Fade>
                  </Box>
                </LeaderCard>
              </Box>
            );
          })}
        </Slider>
      </CarouselContainer>
    );
  }, [leaders, sliderSettings]);

  return (
    <SectionContainer>
      <AutoLogin />
      <Container maxWidth="lg">
        <Title>Management Team</Title>
        <Description>
          Meet the Visionary C-Level Leaders Driving Connex IT Forward.
        </Description>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <CircularProgress />
          </Box>
        ) : (
          leadersContent
        )}
      </Container>
    </SectionContainer>
  );
};

export default ConnexITBoardLeaders;