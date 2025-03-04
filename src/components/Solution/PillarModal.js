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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CategoryIcon from "@mui/icons-material/Category";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Swal from 'sweetalert2'; // Import SweetAlert2 for error handling

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

  // Use useEffect to set/reset selectedSubCategory based on modal state
  useEffect(() => {
    if (open && pillar?.subCategories?.length > 0) {
      // When the modal opens, set the first subcategory as the default
      setSelectedSubCategory(pillar.subCategories[0]);
    }

    // Cleanup function: Reset selectedSubCategory when the modal closes
    return () => {
      setSelectedSubCategory(null); // Clear the selected subcategory (and thus vendors)
    };
  }, [open, pillar]); // Runs when `open` or `pillar` changes

  // Handle vendor click to redirect to their website
  const handleVendorClick = (vendor) => {
    if (vendor.website) {
      window.open(vendor.website, "_blank");
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
            {pillar?.subCategories?.map((subCategory, index) => (
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
            ))}
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
              {selectedSubCategory?.name || "Select a Subcategory"}
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
            <Grid container spacing={3}>
              {selectedSubCategory.vendors.map((vendor, idx) => (
                <Grid item xs={6} sm={4} md={3} key={idx}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      padding: 2,
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
                        width: "100%",
                        height: "100%",
                        borderRadius: "12px",
                        mb: 1.5,
                        border: "2px solid #e0e0e0",
                        transition: "border-color 0.3s ease",
                      }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1" color="textSecondary" sx={{ textAlign: "center", mt: 3 }}>
              Please select a subcategory to view vendors.
            </Typography>
          )}
        </Box>
      </StyledModalBox>
    </Modal>
  );
};

export default PillarModal;