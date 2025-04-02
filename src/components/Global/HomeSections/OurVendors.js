import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { styled } from '@mui/system';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import { selectData } from '../../../services/dataService'; // Assuming this is your API service
import API_URL from '../../../flieapi'; // Base API URL for image fetching

// In-memory cache for images
const imageCache = new Map();
const apiCache = new Map();

// Construct full image URL
const constructImageUrl = (filePath) => {
  if (!filePath) return 'https://via.placeholder.com/200x100?text=No+Image';
  const cleanedFilePath = filePath.replace(/^\/+/, '');
  return `${API_URL}/${cleanedFilePath}`;
};

// Fetch image with caching
const fetchImage = async (filePath) => {
  const imageUrl = constructImageUrl(filePath);
  if (imageCache.has(imageUrl)) return imageCache.get(imageUrl);

  try {
    const response = await fetch(imageUrl);
    if (response.ok) {
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      imageCache.set(imageUrl, objectUrl);
      return objectUrl;
    } else {
      return 'https://via.placeholder.com/200x100?text=Image+Not+Found';
    }
  } catch {
    return 'https://via.placeholder.com/200x100?text=Image+Not+Found';
  }
};

// Styled Components
const SectionContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  padding: theme.spacing(8, 0),
  position: 'relative',
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '3rem',
  fontWeight: '700',
  color: '#070054',
  textAlign: 'center',
  fontFamily: 'Poppins, sans-serif',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.75rem',
  },
}));

const Description = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: '400',
  color: '#555',
  textAlign: 'center',
  maxWidth: '600px',
  margin: '0 auto',
  fontFamily: 'Poppins, sans-serif',
  marginBottom: theme.spacing(6),
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
  },
}));

const VendorImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  cursor: 'pointer',
  maxWidth: '200px',
  margin: '0 auto',
  padding: theme.spacing(1),
  borderRadius: '8px',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const CarouselContainer = styled(Box)(({ theme }) => ({
  '& .slick-slide': {
    padding: theme.spacing(0, 1),
  },
  '& .slick-list': {
    margin: theme.spacing(0, -1),
  },
}));

const ExploreButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#ffffff',
  border: '2px solid #070054',
  fontFamily: 'Poppins, sans-serif',
  fontWeight: '600',
  color: '#070054',
  position: 'absolute',
  bottom: theme.spacing(3),
  left: '50%',
  transform: 'translateX(-50%)',
  padding: theme.spacing(1.5, 3),
  textTransform: 'none',
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    backgroundColor: '#f0f0f5',
  },
}));

// Carousel Settings
const carouselSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: false,
  pauseOnHover: false, // Disable pausing on hover
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const OurVendors = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [vendors, setVendors] = useState([]); // State to store fetched vendors
  const [loading, setLoading] = useState(true); // State for loading status

  // Fetch vendors from the database
  const fetchVendors = useCallback(async () => {
    setLoading(true);
    const cacheKey = 'vendors_country_3';

    // Check if data is already in cache
    if (apiCache.has(cacheKey)) {
      setVendors(apiCache.get(cacheKey));
      setLoading(false);
      return;
    }

    try {
      // Step 1: Fetch vendor IDs for country_id 3 from vendor_countries table
      const vendorCountriesResponse = await selectData('vendor_countries', {
        country_id: 3,
        is_active: 1,
      });

      if (!vendorCountriesResponse.data?.length) {
        setVendors([]);
        setLoading(false);
        return;
      }

      // Step 2: Extract unique vendor IDs
      const vendorIds = [...new Set(vendorCountriesResponse.data.map((entry) => entry.vendor_id))];

      // Step 3: Fetch vendor details from vendors table
      const vendorsResponse = await selectData('vendors', {
        id: vendorIds,
        is_active: 1,
      });

      if (!vendorsResponse.data?.length) {
        setVendors([]);
        setLoading(false);
        return;
      }

      // Step 4: Format vendors and fetch their logos
      const formattedVendors = await Promise.all(
        vendorsResponse.data.map(async (vendor) => ({
          id: vendor.id,
          name: vendor.name,
          website: vendor.website,
          logo: await fetchImage(vendor.logo_link), // Fetch image with caching
        }))
      );

      // Step 5: Ensure uniqueness of vendors by ID
      const uniqueVendors = Array.from(new Map(formattedVendors.map((v) => [v.id, v])).values());

      // Step 6: Cache the result and update state
      apiCache.set(cacheKey, uniqueVendors);
      setVendors(uniqueVendors);
    } catch (error) {
      console.error('Failed to fetch vendors:', error);
      setVendors([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch vendors on component mount
  useEffect(() => {
    fetchVendors();
  }, [fetchVendors]);

  return (
    <SectionContainer>
      <Container maxWidth="lg">
        {/* Section Title */}
        <Title>Our Vendors</Title>
        <Description>
          Embark on Technological Excellence with Our Trusted Network of Vendors.
        </Description>

        {/* Vendor Carousel */}
        <CarouselContainer>
          {loading ? (
            <Typography variant="body1" align="center" color="textSecondary">
              Loading vendors...
            </Typography>
          ) : vendors.length === 0 ? (
            <Typography variant="body1" align="center" color="textSecondary">
              No vendors available for this country.
            </Typography>
          ) : (
            <Slider {...carouselSettings}>
              {vendors.map((vendor, index) => (
                <Box key={vendor.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <VendorImage src={vendor.logo} alt={vendor.name || `Vendor ${index + 1}`} />
                </Box>
              ))}
            </Slider>
          )}
        </CarouselContainer>
        <div style={{ marginTop: '40px' }}></div>

        {/* Explore Button */}
        <ExploreButton
          endIcon={<ArrowForwardIcon />}
          onClick={() => navigate('/vendors')} // Redirect to Vendors page
        >
          Explore
        </ExploreButton>
      </Container>
    </SectionContainer>
  );
};

export default OurVendors;