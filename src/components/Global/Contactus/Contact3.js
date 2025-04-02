import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Button } from '@mui/material';
import AutoLogin from '../../../services/AutoLogin'; // Adjust the import path as necessary
import { selectData } from '../../../services/dataService'; // Assuming this is your API service
import API_URL from '../../../flieapi'; // Base API URL for image fetching

// In-memory cache for API responses
const apiCache = new Map();

// Construct full image URL
const constructImageUrl = (filePath) => {
  if (!filePath) return 'https://via.placeholder.com/600x400?text=No+Map+Image';
  const cleanedFilePath = filePath.replace(/^\/+/, '');
  return `${API_URL}/${cleanedFilePath}`;
};

// Fetch image with caching
const fetchImage = async (filePath) => {
  const imageUrl = constructImageUrl(filePath);
  try {
    const response = await fetch(imageUrl);
    if (response.ok) {
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      return objectUrl;
    } else {
      return 'https://via.placeholder.com/600x400?text=Map+Image+Not+Found';
    }
  } catch {
    return 'https://via.placeholder.com/600x400?text=Map+Image+Not+Found';
  }
};

function Contact3() {
  // State to store the fetched office data
  const [officeData, setOfficeData] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading status

  // Fetch office data from the database
  const fetchOfficeData = useCallback(async () => {
    setLoading(true);
    const cacheKey = 'office_country_3';

    // Check if data is already in cache
    if (apiCache.has(cacheKey)) {
      setOfficeData(apiCache.get(cacheKey));
      setLoading(false);
      return;
    }

    try {
      // Fetch office data for country_id 3 (global)
      const officeResponse = await selectData('global_offices', {
        country_id: 3,
        is_active: true,
      });

      if (!officeResponse.data?.length) {
        setOfficeData(null);
        setLoading(false);
        return;
      }

      // Take the first office for country_id 3
      const office = officeResponse.data[0];

      // Fetch the country name from the regions table using region_id
      const regionResponse = await selectData('countries', {
        id: office.country_id,
      });

      const countryName = regionResponse.data?.[0]?.name || 'N/A';

      // Fetch the map image
      const mapImageUrl = await fetchImage(office.image);

      // Format the office data
      const formattedOfficeData = {
        countryName: countryName,
        address: office.address || 'N/A',
        contactNumber: office.contact_number || 'N/A',
        directionLink: office.direction || '#', // Fallback to '#' if no link
        mapImage: mapImageUrl,
      };

      // Cache the result and update state
      apiCache.set(cacheKey, formattedOfficeData);
      setOfficeData(formattedOfficeData);
    } catch (error) {
      console.error('Failed to fetch office data:', error);
      setOfficeData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch office data on component mount
  useEffect(() => {
    fetchOfficeData();
  }, [fetchOfficeData]);

  // Split the address into lines for display (assuming the address is comma-separated)
  const formatAddress = (address) => {
    if (!address || address === 'N/A') return ['N/A'];
    return address.split(',').map((line) => line.trim());
  };

  // Aspect ratio for the map image (10233 / 5615 ≈ 1.82)
  const ASPECT_RATIO = 10233 / 5615;

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: { xs: 'auto', md: '95vh' }, // Auto height on mobile, 95vh on desktop
        background: 'linear-gradient(135deg, rgb(1, 87, 38), #070054)',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        boxSizing: 'border-box',
        flexDirection: { xs: 'column', md: 'row' }, // Stack on mobile, row on desktop
        padding: { xs: 2, sm: 4, md: 6, lg: 8 }, // Responsive padding
      }}
    >
      <AutoLogin />

      {/* Left Column - 40% width */}
      <Box
        sx={{
          width: { xs: '100%', md: '40%' }, // Full width on mobile, 40% on desktop
          padding: { xs: 2, sm: 3, md: 4 }, // Responsive padding
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: { xs: 'center', md: 'flex-start' }, // Center on mobile, left-align on desktop
          textAlign: { xs: 'center', md: 'left' }, // Center text on mobile, left-align on desktop
        }}
      >
        {loading ? (
          <Typography
            variant="body1"
            sx={{
              color: 'white',
              fontSize: { xs: '1rem', md: '1.2rem' }, // Responsive font size
            }}
          >
            Loading office data...
          </Typography>
        ) : officeData ? (
          <>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' }, // Responsive font size
              }}
            >
              {officeData.countryName}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: { xs: 3, md: 5 }, // Responsive margin-bottom
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' }, // Responsive font size
                lineHeight: 1.5,
              }}
            >
              {formatAddress(officeData.address).map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mb: 1,
                fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem' }, // Responsive font size
              }}
            >
              Tel: {officeData.contactNumber}
            </Typography>
            <Button
              variant="outlined"
              href={officeData.directionLink}
              target="_blank"
              sx={{
                marginBottom: 2,
                borderColor: '#00eeff',
                color: '#00eeff',
                '&:hover': {
                  borderColor: 'white',
                  color: 'white',
                  backgroundColor: 'transparent',
                },
                textTransform: 'none',
                padding: { xs: '6px 12px', sm: '7px 14px', md: '8px 16px' }, // Responsive padding
                borderWidth: 2,
                marginTop: 2,
                fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem' }, // Responsive font size
              }}
            >
              Get Directions
            </Button>
          </>
        ) : (
          <Typography
            variant="body1"
            sx={{
              color: 'white',
              fontSize: { xs: '1rem', md: '1.2rem' }, // Responsive font size
            }}
          >
            No office data available for this country.
          </Typography>
        )}
      </Box>

      {/* Right Column - 60% width with Map */}
      <Box
        sx={{
          width: { xs: '100%', md: '60%' },
          mt: { xs: 3, md: 0 }, // Reduced margin-top on mobile
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: { xs: 2, md: 0 }, // Add padding on mobile to avoid edge-to-edge
        }}
      >
        {loading ? (
          <Typography
            variant="body1"
            sx={{
              color: 'white',
              fontSize: { xs: '1rem', md: '1.2rem' }, // Responsive font size
            }}
          >
            Loading map...
          </Typography>
        ) : officeData ? (
          <Box
            component="img"
            src={officeData.mapImage}
            alt="Location Map"
            sx={{
              width: { xs: '100%', sm: '90%', md: '80%', lg: 800 }, // Responsive width
              maxWidth: '100%', // Ensure it doesn't overflow the container
              height: 'auto', // Let height adjust based on aspect ratio
              aspectRatio: ASPECT_RATIO, // Maintain aspect ratio (10233 / 5615 ≈ 1.82)
              objectFit: 'contain', // Ensure the image fits without distortion
              padding: { xs: 1, md: 2 }, // Responsive padding
            }}
          />
        ) : (
          <Typography
            variant="body1"
            sx={{
              color: 'white',
              fontSize: { xs: '1rem', md: '1.2rem' }, // Responsive font size
            }}
          >
            No map available.
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default Contact3;