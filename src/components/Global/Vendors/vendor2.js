import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Container, Divider, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { selectData } from '../../../services/dataService';
import API_URL from '../../../flieapi';
import AutoLogin from '../../../services/AutoLogin';

// In-memory cache
const imageCache = new Map();
const apiCache = new Map();

// Construct full image URL
const constructImageUrl = (filePath) => {
  if (!filePath) return 'https://via.placeholder.com/300x150?text=No+Image';
  const cleanedFilePath = filePath.replace(/^\/+/, "");
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
      return 'https://via.placeholder.com/300x150?text=Image+Not+Found';
    }
  } catch {
    return 'https://via.placeholder.com/300x150?text=Image+Not+Found';
  }
};

// Styled Components
const SectionContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  padding: theme.spacing(4, 0),
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
  objectFit: 'contain',
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

// Dynamic slider settings based on direction and vendor count
const getSliderSettings = (index, vendorCountInRow) => ({
  dots: false,
  infinite: vendorCountInRow > 1,
  speed: 10500,
  slidesToShow: vendorCountInRow,
  slidesToScroll: 1,
  autoplay: vendorCountInRow > 1,
  autoplaySpeed: 0,
  cssEase: 'linear',
  rtl: index % 2 === 0,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: Math.min(3, vendorCountInRow),
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: Math.min(2, vendorCountInRow),
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
});

function VendorSlider() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVendors = useCallback(async () => {
    setLoading(true);
    const cacheKey = 'vendors_country_3';

    if (apiCache.has(cacheKey)) {
      setVendors(apiCache.get(cacheKey));
      setLoading(false);
      return;
    }

    try {
      const vendorCountriesResponse = await selectData('vendor_countries', { country_id: 3, is_active: 1 });

      if (!vendorCountriesResponse.data?.length) {
        setVendors([]);
        setLoading(false);
        return;
      }

      const vendorIds = [...new Set(vendorCountriesResponse.data.map(entry => entry.vendor_id))];
      const vendorsResponse = await selectData('vendors', { id: vendorIds, is_active: 1 });

      if (!vendorsResponse.data?.length) {
        setVendors([]);
        setLoading(false);
        return;
      }

      const formattedVendors = await Promise.all(
        vendorsResponse.data.map(async (vendor) => ({
          id: vendor.id,
          name: vendor.name,
          website: vendor.website,
          logo: await fetchImage(vendor.logo_link),
        }))
      );

      const uniqueVendors = Array.from(new Map(formattedVendors.map(v => [v.id, v])).values());
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

  const vendorsPerSlider = 5;
  const totalSliders = Math.ceil(vendors.length / vendorsPerSlider);

  return (
    <SectionContainer>
      <AutoLogin />
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
          },
        }}
      >
      Explore our vendor ecosystem by selecting your country or discover our global vendor partnerships below. 
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
                  <Slider {...getSliderSettings(sliderIndex, currentVendors.length)}>
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
