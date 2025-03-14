import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Link,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  EmailOutlined,
  LocationOnOutlined,
  PhoneOutlined,
} from "@mui/icons-material";

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
  fontSize: "clamp(2rem, 5vw, 3rem)", // Responsive font size
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
    transform: "scale(1.02)", // Slight zoom effect on hover
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
  minHeight: "300px", // Increased to accommodate longer content
  [theme.breakpoints.down("sm")]: {
    minHeight: "280px", // Slightly smaller on mobile
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
        // color: "#b5c4c7",
        overflowWrap: "break-word", // Ensure long text wraps
      }}
    >
      {text}
    </Typography>
  </Box>
);

const GlobalCoverageSec3 = () => {
  const regionData = [
    {
      region: "Asia",
      countries: [
        {
          name: "Sri Lanka",
          address: "286, R A De Mal Mawatha, Colombo 3, Sri Lanka 00300",
          phone: "+94 114 693 355",
          contactUrl: "https://www.connexit.biz/SL/ContactUs",
        },
        {
          name: "Cambodia",
          address: `11F-12, Morgan Tower, Sopheakmongkul Street, Village 14, Sangkat Tonle Bassac, Khan Chamkarmon, Phnom Penh, Cambodia`,
          phone: "+85586677044",
          contactUrl: "https://www.connexit.biz/kh/ContactUs",
        },
        {
          name: "Singapore",
          address: "60, Paya Lebar Road, #06-39, Paya Lebar Square, Singapore 409051",
          phone: "+6567278910",
          contactUrl: "https://www.connexit.biz/SG/ContactUs",
        },
        {
          name: "Brunei",
          address: `Unit B20, Block B, First Floor, Bangunan HABZA, Simpang 150, Kg Kiulap, Bandar Seri Begawan BE1518, Negara Brunei Darussalam`,
          phone: "+673 223 3575",
          contactUrl: "https://www.connexit.biz/BRN/ContactUs",
        },
        {
          name: "Thailand",
          address: `184/79, Forum Tower Building, 17th Floor, Ratchadaphisek Road, Huai Khwang, Bangkok 10310`,
          phone: "+66612700590",
          contactUrl: "https://www.connexit.biz/TH/ContactUs",
        },
        {
          name: "India",
          address: `220 3rd Double Rd Domlur Indiranagar, 2nd Phase, Domlur Bangalore North Bangalore KA 560071, India`,
          phone: "+91 789 933 9059",
          contactUrl: "https://www.connexit.biz/IN/ContactUs",
        },
        {
          name: "Nepal",
          address: "Baluwatar-4, Kathmandu, Nepal",
          phone: "+977-9841592542",
          contactUrl: "https://www.connexit.biz/NPL/ContactUs",
        },
      ],
    },
    {
      region: "Oceania",
      countries: [
        {
          name: "Australia",
          address: "14 Alwyn Crescent, Glenwood NSW 2767",
          phone: "+61 406 125 445",
          contactUrl: "https://www.connexit.biz/AU/ContactUs",
        },
        {
          name: "New Zealand",
          address: "Plimmer Towers, 2-6 Glimmer Terrace, Wellington, 6011",
          phone: "0226892981",
          contactUrl: "https://www.connexit.co.nz/ContactUs",
        },
      ],
    },
    {
      region: "Middle East",
      countries: [
        {
          name: "Dubai",
          address: `P.O. BOX: 410714, Office 10, 806, 8th Floor, Opal Tower, Business Bay, Dubai, UAE`,
          phone: "+4 424 9988",
          contactUrl: "https://www.connexit.biz/UAE/ContactUs",
        },
      ],
    },
    {
      region: "Africa",
      countries: [
        {
          name: "Mauritius",
          address: `Office C-03, Ebene Junction, Ebene, Quatre Bornes, Mauritius`,
          phone: "+23 05 942 8354",
          contactUrl: "https://www.connexit.biz/MU/ContactUs",
        },
      ],
    },
  ];

  return (
    <SectionContainer>
      {regionData.map((region) => (
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
      ))}
    </SectionContainer>
  );
};

export default GlobalCoverageSec3;