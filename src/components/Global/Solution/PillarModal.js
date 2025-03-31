import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  Avatar,
  IconButton,
  Divider,
  Grid,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CategoryIcon from "@mui/icons-material/Category";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Swal from 'sweetalert2'; // Import SweetAlert2 for error handling
import { selectData } from '../../../services/dataService';
import API_URL from '../../../flieapi'; // Adjust the import path as needed

// Simple in-memory cache for images
const imageCache = new Map();

// Helper function to construct the full URL for images
const constructImageUrl = (filePath) => {
  if (!filePath) return 'https://via.placeholder.com/100x100?text=No+Logo';
  const baseUrl = `${API_URL}`;
  // Remove any leading slashes and handle local paths
  const cleanedFilePath = filePath
    .replace(/^\/+/, '') // Remove leading slashes
    .replace(/^C:\\.*\\Main-Back.*$/i, '') // Remove local paths
    .replace(/^.*\\uploads\\/i, 'uploads/'); // Extract the uploads path if present
  const fullUrl = `${baseUrl}/${cleanedFilePath}`;
  console.log(`Constructed vendor logo URL: ${fullUrl}`); // Debug log
  return fullUrl;
};

// Helper function to fetch image with caching
const fetchImage = async (filePath) => {
  const imageUrl = constructImageUrl(filePath);

  // Check if the image is already in the cache
  if (imageCache.has(imageUrl)) {
    return imageCache.get(imageUrl);
  }

  try {
    const response = await fetch(imageUrl);
    if (response.ok) {
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      imageCache.set(imageUrl, objectUrl); // Cache the object URL
      return objectUrl;
    } else {
      console.error(`Failed to fetch vendor logo at ${imageUrl}: ${response.statusText}`);
      return 'https://via.placeholder.com/100x100?text=Image+Not+Found';
    }
  } catch (error) {
    console.error(`Error fetching vendor logo at ${imageUrl}:`, error);
    return 'https://via.placeholder.com/100x100?text=Image+Not+Found';
  }
};

// Styled component for the modal box
const StyledModalBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  height: "85vh",
  background: "linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)", // Subtle gradient
  borderRadius: "20px",
  display: "flex",
  flexDirection: "row",
  overflow: "hidden",
  outline: "none",
  border: "1px solid #e0e0e0",
  overflowY: "auto", // Enable full scrolling on mobile
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },
}));

const PillarModal = ({ open, onClose, pillar }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [loadingVendors, setLoadingVendors] = useState(false);

  // Fetch vendors when a subpillar is selected
  useEffect(() => {
    const fetchVendors = async () => {
      if (!selectedSubCategory?.id) return;

      setLoadingVendors(true);
      try {
        // Step 1: Fetch vendor_sub_pillars entries for the selected sub_pillar_id
        const vendorSubPillarsResponse = await selectData('vendor_sub_pillars', { sub_pillar_id: selectedSubCategory.id, is_active: true });
        console.log('vendorSubPillarsResponse:', vendorSubPillarsResponse);

        if (!vendorSubPillarsResponse.data || vendorSubPillarsResponse.data.length === 0) {
          setVendors([]);
          setLoadingVendors(false);
          return;
        }

        // Step 2: Extract vendor_ids
        const vendorIds = vendorSubPillarsResponse.data.map(entry => entry.vendor_id);

        // Step 3: Fetch vendors where id is in vendorIds and is_active = true
        const vendorsResponse = await selectData('vendors', { id: vendorIds, is_active: true });
        console.log('vendorsResponse:', vendorsResponse);

        if (!vendorsResponse.data || vendorsResponse.data.length === 0) {
          setVendors([]);
          setLoadingVendors(false);
          return;
        }

        // Step 4: Fetch vendor logos and format vendor data
        const formattedVendors = await Promise.all(
          vendorsResponse.data.map(async (vendor) => {
            const logoUrl = await fetchImage(vendor.logo_link); // Use logo_link as per the database schema
            return {
              name: vendor.name,
              website: vendor.website,
              logo: logoUrl,
            };
          })
        );

        setVendors(formattedVendors);
      } catch (error) {
        console.error('Failed to fetch vendors:', error);
        setVendors([]);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load vendors. Please try again later.",
        });
      } finally {
        setLoadingVendors(false);
      }
    };

    fetchVendors();
  }, [selectedSubCategory]);

  // Use useEffect to set/reset selectedSubCategory based on modal state
  useEffect(() => {
    if (open && pillar?.subCategories?.length > 0) {
      // When the modal opens, set the first subcategory as the default
      setSelectedSubCategory(pillar.subCategories[0]);
    }

    // Cleanup function: Reset selectedSubCategory and vendors when the modal closes
    return () => {
      setSelectedSubCategory(null);
      setVendors([]);
    };
  }, [open, pillar]); // Runs when `open` or `pillar` changes

  // Handle vendor click to redirect to their website
  const handleVendorClick = (vendor) => {
    if (vendor.website) {
      // Normalize the website URL by adding a protocol if missing
      let websiteUrl = vendor.website;
      if (!websiteUrl.startsWith('http://') && !websiteUrl.startsWith('https://')) {
        websiteUrl = `https://${websiteUrl}`; // Default to https
      }
      console.log(`Opening vendor website: ${websiteUrl}`);
      window.open(websiteUrl, "_blank");
    } else {
      Swal.fire({
        icon: "info",
        title: "Website Unavailable",
        text: `No website available for ${vendor.name}.`,
      });
    }
  };

  // Display empty state if no pillar data
  if (!pillar) {
    return (
      <Modal open={open} onClose={onClose}>
        <StyledModalBox sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Typography variant="h6" color="textSecondary">
            No pillar data available.
          </Typography>
        </StyledModalBox>
      </Modal>
    );
  }

  return (
    <Modal open={open} onClose={onClose}>
      <StyledModalBox
        sx={{
          display: isMobile ? "flex" : "flex",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        {/* Sidebar - Subcategories */}
        <Box
          sx={{
            width: isMobile ? "100%" : "25%",
            bgcolor: "#fff",
            padding: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            borderRight: isMobile ? "none" : "1px solid #e0e0e0",
            borderBottom: isMobile ? "1px solid #e0e0e0" : "none",
            flexShrink: 0,
          }}
        >
          <Typography
            variant={isMobile ? "h6" : "h5"}
            sx={{
              fontWeight: "bold",
              color: "#2c3e50",
              mb: 2,
            }}
          >
            {pillar?.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "#7f8c8d", mb: 2 }}>
            {pillar?.description}
          </Typography>
          <Divider sx={{ width: "100%", mb: 2 }} />
          <List
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {pillar?.subCategories?.length > 0 ? (
              pillar.subCategories.map((subCategory, index) => (
                <ListItem
                  key={index}
                  sx={{
                    bgcolor:
                      selectedSubCategory?.name === subCategory.name
                        ? "#032e80"
                        : "transparent",
                    color:
                      selectedSubCategory?.name === subCategory.name
                        ? "#fff"
                        : "#34495e",
                    borderRadius: "12px",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    padding: "12px 16px",
                    "&:hover": {
                      bgcolor: "#02102b",
                      color: "#fff",
                    },
                  }}
                  onClick={() => setSelectedSubCategory(subCategory)}
                >
                  {index % 2 === 0 ? (
                    <CategoryIcon sx={{ color: "inherit", fontSize: "1.4rem" }} />
                  ) : (
                    <TrendingUpIcon sx={{ color: "inherit", fontSize: "1.4rem" }} />
                  )}
                  <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                    {subCategory.name}
                  </Typography>
                </ListItem>
              ))
            ) : (
              <Typography variant="body2" sx={{ color: "#7f8c8d", textAlign: "center" }}>
                No subpillars available.
              </Typography>
            )}
          </List>
        </Box>

        {/* Main Content - Vendors Section */}
        <Box
          sx={{
            flex: isMobile ? "none" : 1,
            width: isMobile ? "100%" : "auto",
            padding: isMobile ? 2 : 4,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#fff",
            flexShrink: 0,
          }}
        >
          {/* Modal Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography
              variant={isMobile ? "h6" : "h5"}
              sx={{ fontWeight: "bold", color: "#2c3e50" }}
            >
              {selectedSubCategory?.name || "Select a Subpillar"}
            </Typography>
            <IconButton
              onClick={onClose}
              sx={{
                color: "#7f8c8d",
                "&:hover": { color: theme.palette.error.main },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Vendor Grid */}
          {selectedSubCategory ? (
            loadingVendors ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress />
              </Box>
            ) : vendors.length > 0 ? (
              <Grid container spacing={3}>
                {vendors.map((vendor, idx) => (
                  <Grid item xs={6} sm={4} md={3} key={idx}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        // padding: 2,
                        borderRadius: "16px",
                        background: "rgba(0, 0, 0, 0.02)",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                      onClick={() => handleVendorClick(vendor)}
                    >
                      <Avatar
                        src={vendor.logo}
                        alt={vendor.name}
                        sx={{
                          width: '100%', // Adjust size to match the Lenovo logo style
                          height: 'auto',
                          borderRadius: "8px", // Slightly rounded corners
                          mb: 1.5,
                          border: "none", // Remove border to match the style
                          objectFit: "contain", // Ensure the logo fits properly
                        }}
                      />

                    </Box>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body1" color="textSecondary" sx={{ textAlign: "center", mt: 3 }}>
                No vendors available for this subpillar.
              </Typography>
            )
          ) : (
            <Typography variant="body1" color="textSecondary" sx={{ textAlign: "center", mt: 3 }}>
              Please select a subpillar to view vendors.
            </Typography>
          )}
        </Box>
      </StyledModalBox>
    </Modal>
  );
};

export default PillarModal;