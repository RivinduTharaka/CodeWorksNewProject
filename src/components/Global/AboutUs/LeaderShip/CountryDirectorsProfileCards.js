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

// Fallback images
import director1Image from '../../../../assets/image/Dilshan_Silva.jpg';
import director2Image from '../../../../assets/image/Eranga.jpg';
import director3Image from '../../../../assets/image/Rajiv.jpg';
import director4Image from '../../../../assets/image/Shamal.jpg';
import usaFlag from '../../../../assets/image/OIP (1).jpg';
import ukFlag from '../../../../assets/image/OIP (2).jpg';
import indiaFlag from '../../../../assets/image/OIP (3).jpg';
import germanyFlag from '../../../../assets/image/OIP (4).jpg';
import japanFlag from '../../../../assets/image/OIP (5).jpg';

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

// Styled Components (updated to keep fixed height for cards)
const SectionContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  padding: theme.spacing(8, 0),
  minHeight: '100vh',
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
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}));

const Description = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  fontWeight: '400',
  color: '#666',
  textAlign: 'center',
  maxWidth: '1800px',
  margin: '0 auto',
  fontFamily: 'Poppins, sans-serif',
  marginBottom: theme.spacing(6),
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
    marginBottom: theme.spacing(3),
  },
}));

const DirectorCard = styled(Box)(({ theme }) => ({
  position: 'relative',
  cursor: 'pointer',
  borderRadius: '16px',
  overflow: 'hidden',
  height: '400px', // Fixed height for all screen sizes
  width: '250px', // Fixed width, but we'll adjust width for smaller screens
  transition: 'all 0.4s ease-in-out',
  border: '1px solid rgba(13, 71, 161, 0.2)',
  background: 'linear-gradient(145deg, #ffffff 0%, #f5f7fa 100%)',
  '&:hover': {
    transform: 'translateY(-6px) scale(1.02)',
    borderColor: theme.palette.primary.main,
  },
  [theme.breakpoints.down('md')]: {
    width: '220px', // Adjust width for tablets
  },
  [theme.breakpoints.down('sm')]: {
    width: '200px', // Adjust width for mobile
  },
}));

const DirectorImage = styled(Avatar)(({ theme }) => ({
  width: '100%',
  height: '200px', // Fixed height for all screen sizes
  objectFit: 'cover',
  borderTopLeftRadius: '16px',
  borderTopRightRadius: '16px',
  borderBottom: '1px solid rgba(13, 71, 161, 0.1)',
}));

const CountryFlag = styled(Avatar)(({ theme }) => ({
  width: '40px',
  height: '30px',
  margin: theme.spacing(1, 'auto'),
  borderRadius: '8px',
  objectFit: 'cover',
  animation: 'wave 2s infinite ease-in-out',
  '@keyframes wave': {
    '0%, 100%': { transform: 'rotate(0deg)' },
    '25%': { transform: 'rotate(2deg)' },
    '75%': { transform: 'rotate(-2deg)' },
  },
  [theme.breakpoints.down('sm')]: {
    width: '32px',
    height: '24px',
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
  padding: theme.spacing(2),
  '& .slick-slide': {
    padding: theme.spacing(0, 1),
    display: 'flex',
    justifyContent: 'center',
  },
  '& .slick-list': {
    margin: theme.spacing(0, -1),
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

// Slider settings (unchanged from previous modification)
const getSliderSettings = (itemCount) => ({
  infinite: itemCount > 1,
  speed: 1700,
  slidesToShow: Math.min(itemCount, 4),
  slidesToScroll: 1,
  autoplay: itemCount > 1,
  autoplaySpeed: 1500,
  arrows: false,
  centerMode: true,
  centerPadding: '10px',
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: Math.min(itemCount, 3),
        centerPadding: '20px',
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: Math.min(itemCount, 2),
        centerPadding: '15px',
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        centerPadding: '10px',
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        centerPadding: '5px',
      },
    },
  ],
});

const CountryDirectorsProfileCards = () => {
  const [directors, setDirectors] = useState([]);
  const [countriesMap, setCountriesMap] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchCountriesData = useCallback(async () => {
    const cacheKey = 'countries_data';

    if (apiCache.has(cacheKey)) {
      const cachedData = apiCache.get(cacheKey);
      return cachedData;
    }

    try {
      const response = await selectData('countries', { is_active: 1 });

      if (response.data && response.data.length > 0) {
        const countryMap = response.data.reduce((map, country) => {
          map[country.id] = country.name;
          return map;
        }, {});
        apiCache.set(cacheKey, countryMap);
        return countryMap;
      } else {
        console.log('No countries found, using empty map');
        return {};
      }
    } catch (error) {
      console.error('Failed to fetch countries data:', error);
      return {};
    }
  }, []);

  const fetchDirectorsData = useCallback(async () => {
    setLoading(true);
    const cacheKey = 'directors_data';

    const countryMap = await fetchCountriesData();
    setCountriesMap(countryMap);

    if (apiCache.has(cacheKey)) {
      const cachedData = apiCache.get(cacheKey);
     
      setDirectors(cachedData);
      setLoading(false);
      return;
    }

    try {
      const response = await selectData('directors', { is_active: 1 });


      if (response.data && response.data.length > 0) {
        const formattedDirectors = await Promise.all(
          response.data.map(async (director) => {
            const directorImageUrl = await fetchImage(director.director_image, director1Image);
            const countryFlagUrl = await fetchImage(director.country_flag_image, usaFlag);

            const countryName = countryMap[director.country_id] || 'Unknown Country';

            return {
              name: director.director_name || 'Unknown Director',
              designation: director.director_designation || 'Country Director',
              country: countryName,
              image: directorImageUrl,
              countryFlag: countryFlagUrl,
              linkedin: director.linkedin_link || 'https://linkedin.com',
            };
          })
        );

       
        apiCache.set(cacheKey, formattedDirectors);
        setDirectors(formattedDirectors);
      } else {
        console.log('No directors found, using fallback');
      }
    } catch (error) {
      console.error('Failed to fetch directors data:', error);
    } finally {
      setLoading(false);
    }
  }, [fetchCountriesData]);

  useEffect(() => {
    fetchDirectorsData();
  }, [fetchDirectorsData]);


  const sliderSettings = useMemo(() => getSliderSettings(directors.length), [directors.length]);

  const directorsContent = useMemo(() => {
    if (directors.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="h6" color="textSecondary">
            No directors found.
          </Typography>
        </Box>
      );
    }

    return (
      <CarouselContainer sx={{ p: { xs: 2, sm: 3, md: 5 } }}>
        <Slider {...sliderSettings}>
          {directors.map((director, index) => (
            <Box key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
              <DirectorCard>
                <DirectorImage src={director.image} alt={director.name} />
                <LinkedInIconButton
                  href={director.linkedin}
                  target="_blank"
                  aria-label={`LinkedIn profile of ${director.name}`}
                >
                  <LinkedInIcon />
                </LinkedInIconButton>
                <Box
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '200px', // Fixed height for the content area
                  }}
                >
                  <Fade in timeout={500}>
                    <Typography
                      variant="h6"
                      fontWeight="700"
                      color="#0D47A1"
                      sx={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '0.5px' }}
                    >
                      {director.name}
                    </Typography>
                  </Fade>
                  <Fade in timeout={700}>
                    <Box>
                      <Typography
                        variant="body2"
                        fontWeight="600"
                        color="green"
                        sx={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {director.designation}
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight="400"
                        color="#666"
                        sx={{ fontFamily: 'Poppins, sans-serif', mt: 0.5 }}
                      >
                        {director.country}
                      </Typography>
                    </Box>
                  </Fade>
                  <Fade in timeout={900}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 1,
                      }}
                    >
                      <CountryFlag src={director.countryFlag} alt={`${director.country} Flag`} />
                    </Box>
                  </Fade>
                </Box>
              </DirectorCard>
            </Box>
          ))}
        </Slider>
      </CarouselContainer>
    );
  }, [directors, sliderSettings]);

  return (
    <SectionContainer>
      <AutoLogin />
      <Container maxWidth="lg">
        <Title>Board of Directors</Title>
        <Description>
          Meet the Exceptional Leaders Guiding Our Global Vision.
        </Description>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <CircularProgress />
          </Box>
        ) : (
          directorsContent
        )}
      </Container>
    </SectionContainer>
  );
};

export default CountryDirectorsProfileCards;