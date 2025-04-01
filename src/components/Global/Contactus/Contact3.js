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

// Fetch image with caching (similar to Trainings2)
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

  // Fixed dimensions for the map image
  const MAP_IMAGE_WIDTH = 800; // Fixed width in pixels
  const MAP_IMAGE_HEIGHT = MAP_IMAGE_WIDTH / (10233 / 5615); // Maintain aspect ratio (10233 / 5615 ≈ 1.82)

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '95vh',
        background: 'linear-gradient(135deg, rgb(1, 87, 38), #070054)',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        boxSizing: 'border-box',
        flexDirection: { xs: 'column', md: 'row' }, // Stack on mobile, row on desktop
        paddingLeft: { xs: 0, md: 20 }, // No padding on mobile, padding on desktop
        paddingRight: { xs: 0, md: 20 }, // No padding on mobile, padding on desktop
      }}
    >
      <AutoLogin />

      {/* Left Column - 40% width */}
      <Box
        sx={{
          width: { xs: '100%', md: '40%' }, // Full width on mobile, 40% on desktop
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start', // Align text to the left
        }}
      >
        {loading ? (
          <Typography variant="body1" sx={{ color: 'white' }}>
            Loading office data...
          </Typography>
        ) : officeData ? (
          <>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                fontSize: '3.5rem',
              }}
            >
              {officeData.countryName}
            </Typography>
            <Typography variant="body1" sx={{ mb: 5, fontSize: '1.2rem' }}>
              {formatAddress(officeData.address).map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
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
                padding: '8px 16px',
                borderWidth: 2,
                marginTop: 2,
              }}
            >
              Get Directions
            </Button>
          </>
        ) : (
          <Typography variant="body1" sx={{ color: 'white' }}>
            No office data available for this country.
          </Typography>
        )}
      </Box>

      {/* Right Column - 60% width with Map */}
      <Box
        sx={{
          width: { xs: '100%', md: '60%' },
          mt: { xs: 5, md: 0 }, // Margin top on mobile, no margin on desktop
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {loading ? (
          <Typography variant="body1" sx={{ color: 'white' }}>
            Loading map...
          </Typography>
        ) : officeData ? (
          <Box
            component="img"
            src={officeData.mapImage}
            alt="Location Map"
            sx={{
              width: MAP_IMAGE_WIDTH, // Fixed width
              height: MAP_IMAGE_HEIGHT, // Fixed height based on aspect ratio
              objectFit: 'contain', // Ensure the image fits without distortion
              padding: 2,
            }}
          />
        ) : (
          <Typography variant="body1" sx={{ color: 'white' }}>
            No map available.
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default Contact3;