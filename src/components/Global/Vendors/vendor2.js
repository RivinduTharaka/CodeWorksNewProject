import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Container, Divider, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { selectData } from '../../../services/dataService';
import API_URL from '../../../flieapi';

// In-memory cache for images and API responses
const imageCache = new Map();
const apiCache = new Map();

// Helper function to construct the full URL for images
const constructImageUrl = (filePath) => {
  if (!filePath) return 'https://via.placeholder.com/300x150?text=No+Image';
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
      return 'https://via.placeholder.com/300x150?text=Image+Not+Found';
    }
  } catch (error) {
    console.error("Error fetching image:", error);
    return 'https://via.placeholder.com/300x150?text=Image+Not+Found';
  }
};

// Styled Components
const SectionContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  padding: theme.spacing(4, 0),
  position: 'relative',
}));

const SliderContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '& .slick-slide': {
    padding: theme.spacing(0, 1),
  },
  '& .slick-list': {
    margin: theme.spacing(0, -1),
  },
}));

const VendorImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '150px', // Fixed height for all images
  objectFit: 'contain', // Maintains aspect ratio while fitting within dimensions
  cursor: 'pointer',
  maxWidth: '300px',
  margin: '0 auto',
  padding: theme.spacing(1),
  borderRadius: '8px',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

// Slider Settings
const sliderSettingsRightToLeft = {
  dots: false,
  infinite: true,
  speed: 10500,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 0,
  cssEase: 'linear',
  rtl: true,
  arrows: false,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 1 } },
  ],
};

const sliderSettingsLeftToRight = {
  dots: false,
  infinite: true,
  speed: 10500,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 0,
  cssEase: 'linear',
  rtl: false,
  arrows: false,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 1 } },
  ],
};

function VendorSlider() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch vendors from the database
  const fetchVendors = useCallback(async () => {
    setLoading(true);
    const cacheKey = 'vendors_country_3';

    if (apiCache.has(cacheKey)) {
      const cachedData = apiCache.get(cacheKey);
      console.log('Using cached vendors data:', cachedData);
      setVendors(cachedData);
      setLoading(false);
      return;
    }

    try {
      // Step 1: Fetch vendor_countries entries for country_id = 3 and is_active = 1
      const vendorCountriesResponse = await selectData('vendor_countries', { country_id: 3, is_active: 1 });
      console.log('Vendor Countries Response:', vendorCountriesResponse.data);

      if (!vendorCountriesResponse.data || !vendorCountriesResponse.data.length) {
        console.log('No vendors found for country_id 3');
        setVendors([]);
        setLoading(false);
        return;
      }

      // Step 2: Extract unique vendor_ids
      const vendorIds = [...new Set(vendorCountriesResponse.data.map(entry => entry.vendor_id))];
      console.log('Unique Vendor IDs:', vendorIds);

      // Step 3: Fetch vendors where id is in vendorIds and is_active = 1
      const vendorsResponse = await selectData('vendors', { id: vendorIds, is_active: 1 });
      console.log('Vendors Response:', vendorsResponse.data);

      if (!vendorsResponse.data || !vendorsResponse.data.length) {
        console.log('No active vendors found');
        setVendors([]);
        setLoading(false);
        return;
      }

      // Step 4: Fetch images in parallel and format vendor data
      const formattedVendors = await Promise.all(
        vendorsResponse.data.map(async (vendor) => {
          const imageUrl = await fetchImage(vendor.logo_link);
          return {
            id: vendor.id,
            name: vendor.name,
            website: vendor.website,
            logo: imageUrl,
          };
        })
      );

      // Step 5: Deduplicate formattedVendors based on id
      const uniqueVendors = Array.from(new Map(formattedVendors.map(vendor => [vendor.id, vendor])).values());
      console.log('Formatted Unique Vendors:', uniqueVendors);

      apiCache.set(cacheKey, uniqueVendors);
      setVendors(uniqueVendors);
    } catch (error) {
      console.error('Failed to fetch vendors:', error);
      setVendors([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVendors();
  }, [fetchVendors]);

  // Calculate the number of sliders needed (5 vendors per slider)
  const vendorsPerSlider = 5;
  const totalSliders = Math.ceil(vendors.length / vendorsPerSlider);

  // Function to get the slider settings based on index (alternate direction)
  const getSliderSettings = (index) => {
    return index % 2 === 0 ? sliderSettingsRightToLeft : sliderSettingsLeftToRight;
  };

  return (
    <SectionContainer>
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
          fontWeight: 700,
          marginBottom: { xs: '20px', md: '30px' },
          background: 'linear-gradient(90deg, #1a1a1a 0%, #4a4a4a 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center',
          letterSpacing: '-0.5px',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            textShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
          },
        }}
      >
        Our Vendors
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: '#333',
          marginBottom: { xs: '30px', md: '50px' },
          fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
          textAlign: 'center',
          px: { xs: 2, sm: 0 },
          fontFamily: 'Lato, sans-serif',
          lineHeight: 1.8,
          maxWidth: '800px',
          margin: '0 auto',
          position: 'relative',
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60px',
            height: '2px',
            background: 'linear-gradient(90deg, #4a4a4a, #1a1a1a)',
            borderRadius: '2px',
          },
        }}
      >
        Select a country to see our network of vendors in your local territory or view our globally managed vendors below
      </Typography>

      <Container maxWidth="lg">
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <CircularProgress />
          </Box>
        ) : vendors.length === 0 ? (
          <Typography variant="h6" align="center" color="textSecondary">
            No vendors available for this country.
          </Typography>
        ) : (
          Array.from({ length: totalSliders }).map((_, sliderIndex) => {
            const startIndex = sliderIndex * vendorsPerSlider;
            const currentVendors = vendors.slice(startIndex, startIndex + vendorsPerSlider);

            return (
              <React.Fragment key={sliderIndex}>
                <SliderContainer>
                  <Slider {...getSliderSettings(sliderIndex)}>
                    {currentVendors.map((vendor, index) => (
                      <Box key={vendor.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <VendorImage
                          src={vendor.logo}
                          alt={vendor.name || `Vendor ${startIndex + index + 1}`}
                        />
                      </Box>
                    ))}
                  </Slider>
                </SliderContainer>
                {sliderIndex < totalSliders - 1 && <Divider sx={{ width: '100%', mb: 2 }} />}
              </React.Fragment>
            );
          })
        )}
      </Container>
    </SectionContainer>
  );
}

export default VendorSlider;