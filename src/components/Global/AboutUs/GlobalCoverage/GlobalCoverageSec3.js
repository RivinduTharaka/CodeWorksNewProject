import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Link,
  Divider,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  EmailOutlined,
  LocationOnOutlined,
  PhoneOutlined,
} from "@mui/icons-material";
import { selectData } from '../../../../services/dataService';
import AutoLogin from '../../../../services/AutoLogin';

// Styled Components
const SectionContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#ffffff",
  padding: theme.spacing(4, 0),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  alignItems: "center",
  fontFamily: "Montserrat, Arial, sans-serif",
}));

const RegionContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#002158",
  color: "#ffffff",
  padding: theme.spacing(3),
  width: "90%",
  borderRadius: theme.shape.borderRadius * 2,
  [theme.breakpoints.down("sm")]: {
    width: "95%",
    padding: theme.spacing(2),
  },
}));

const RegionHeader = styled(Typography)(({ theme }) => ({
  fontSize: "clamp(2rem, 5vw, 3rem)",
  fontWeight: 700,
  color: "#00aaff",
  textAlign: "left",
  marginBottom: theme.spacing(1.5),
  paddingLeft: theme.spacing(1),
  fontFamily: "Montserrat, Arial, sans-serif",
  [theme.breakpoints.down("sm")]: {
    fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
  },
  [theme.breakpoints.between("sm", "md")]: {
    fontSize: "clamp(2rem, 4.5vw, 2.8rem)",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "3rem",
  },
}));

const CountryCard = styled(Card)(({ theme }) => ({
  backgroundColor: "#002158",
  color: "#ffffff",
  padding: theme.spacing(2),
  width: "100%",
  boxShadow: "none",
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1.5),
  },
}));

const CardContentStyled = styled(CardContent)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  minHeight: "300px",
  [theme.breakpoints.down("sm")]: {
    minHeight: "280px",
  },
}));

const IconTextRow = ({ icon, text }) => (
  <Box
    display="flex"
    alignItems="center"
    gap={1}
    sx={{ marginBottom: theme => theme.spacing(1.5) }}
  >
    {icon}
    <Typography
      variant="body2"
      sx={{
        fontSize: "0.95rem",
        fontWeight: 400,
        fontFamily: "Montserrat, Arial, sans-serif",
        lineHeight: 1.6,
        overflowWrap: "break-word",
      }}
    >
      {text}
    </Typography>
  </Box>
);

// Simple in-memory cache for API responses
const apiCache = new Map();
const countryCache = new Map(); // Cache for country names

const GlobalCoverageSec3 = () => {
  const [regionData, setRegionData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch country name by country_id with caching
  const fetchCountryName = useCallback(async (countryId) => {
    // Check if the country name is already in the cache
    if (countryCache.has(countryId)) {
      return countryCache.get(countryId);
    }

    try {
      const countryResponse = await selectData('countries', { id: countryId, is_active: true });
      const countryName = countryResponse.data && countryResponse.data.length > 0
        ? countryResponse.data[0].name
        : "Unknown Country";
      countryCache.set(countryId, countryName); // Cache the country name
      return countryName;
    } catch (error) {
      console.error(`Failed to fetch country name for country_id ${countryId}:`, error);
      return "Unknown Country";
    }
  }, []);

  // Memoize fetchData to prevent unnecessary re-renders
  const fetchData = useCallback(async () => {
    setLoading(true);
    const cacheKey = 'global_coverage_data';

    // Check if the data is already in the cache
    if (apiCache.has(cacheKey)) {
      const cachedData = apiCache.get(cacheKey);
      setRegionData(cachedData);
      setLoading(false);
      return;
    }

    try {
      // Step 1: Fetch active regions
      const regionsResponse = await selectData('regions', { is_active: true });

      if (!regionsResponse.data || regionsResponse.data.length === 0) {
        setRegionData([]);
        setLoading(false);
        return;
      }

      // Step 2: Fetch active global offices for each region and map country names
      const formattedRegions = await Promise.all(
        regionsResponse.data.map(async (region) => {
          const officesResponse = await selectData('global_offices', {
            region_id: region.id,
            is_active: true,
          });

          // Map offices to the required format, fetching country names
          const countries = await Promise.all(
            (officesResponse.data || []).map(async (office) => {
              const countryName = await fetchCountryName(office.country_id);
              return {
                name: countryName,
                address: office.address,
                phone: office.contact_number,
                contactUrl: office.contact_form_link,
              };
            })
          );

          return {
            region: region.name,
            countries,
          };
        })
      );

      // Filter out regions with no countries
      const filteredRegions = formattedRegions.filter(region => region.countries.length > 0);

      // Cache the formatted data
      apiCache.set(cacheKey, filteredRegions);
      setRegionData(filteredRegions);
    } catch (error) {
      console.error('Failed to fetch global coverage data:', error);
      setRegionData([]);
    } finally {
      setLoading(false);
    }
  }, [fetchCountryName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Memoize the rendering of region and country cards
  const regionCards = useMemo(() => {
    return regionData.map((region) => (
      <RegionContainer key={region.region}>
        <RegionHeader>{region.region}</RegionHeader>
        <Grid container spacing={2} justifyContent="flex-start" alignItems="stretch">
          {region.countries.map((country) => (
            <Grid item key={country.name} xs={12} sm={6} md={4}>
              <CountryCard>
                <CardContentStyled>
                  <Box>
                    <Typography
                      variant="h5"
                      fontWeight={700}
                      gutterBottom
                      sx={{ color: "#00aaff", fontSize: "1.5rem" }}
                    >
                      {country.name}
                    </Typography>
                    <IconTextRow
                      icon={<LocationOnOutlined sx={{ color: "#b5c4c7", fontSize: "1.2rem" }} />}
                      text={country.address}
                    />
                    <IconTextRow
                      icon={<PhoneOutlined sx={{ color: "#b5c4c7", fontSize: "1.2rem" }} />}
                      text={country.phone}
                    />
                    <IconTextRow
                      icon={<EmailOutlined sx={{ color: "#b5c4c7", fontSize: "1.2rem" }} />}
                      text={
                        <Link
                          href={country.contactUrl}
                          target="_blank"
                          underline="hover"
                          sx={{ color: "#00aaff", fontSize: "0.95rem" }}
                        >
                          Contact Us Form
                        </Link>
                      }
                    />
                  </Box>
                  <Divider sx={{ borderColor: "#b5c4c7", marginTop: theme => theme.spacing(1) }} />
                </CardContentStyled>
              </CountryCard>
            </Grid>
          ))}
        </Grid>
      </RegionContainer>
    ));
  }, [regionData]);

  return (
    <SectionContainer>
      <AutoLogin/>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : regionData.length === 0 ? (
        <Typography variant="h6" align="center" color="textSecondary">
          No global coverage data available.
        </Typography>
      ) : (
        regionCards
      )}
    </SectionContainer>
  );
};

export default GlobalCoverageSec3;