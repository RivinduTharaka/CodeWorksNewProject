import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Link,
  Container,
} from "@mui/material";
import { styled } from "@mui/system";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

// Styled Components
const SectionContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#ffffff",
  padding: "40px 0",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  alignItems: "center",
  fontFamily: "YourFontFamily, sans-serif",
}));

const RegionContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#002f6c",
  color: "#ffffff",
  padding: "40px",
  width: "90%",
  borderRadius: "20px",
 
  [theme.breakpoints.down("sm")]: {
    width: "95%",
  },
}));

const RegionHeader = styled(Typography)({
  fontSize: "2.5rem",
  fontWeight: "bold",
  color: "#00aaff",
  textAlign: "left",
  marginBottom: "20px",
  paddingLeft: "10px",
});

const CountryCard = styled(Card)(({ theme }) => ({
  backgroundColor: "#003366",
  color: "#ffffff",
  padding: "20px",
  borderRadius: "10px",
  
  width: "100%",
  boxShadow: "none",
}));

const IconTextRow = ({ icon, text }) => (
  <Box display="flex" alignItems="center" gap="10px">
    {icon}
    <Typography variant="body1" sx={{fontSize:"xs",fontFamily: "sans-serif",}}>{text}</Typography>
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
          phone: " +94 114 693 355",
          contactUrl: "https://www.connexit.biz/SL/ContactUs",
        },
        {
          name: "Cambodia",
          address: `11F-12, Morgan Tower,
Sopheakmongkul Street,
Village 14, Sangkat Tonle Bassac,
Khan Chamkarmon, Phnom Penh, Cambodia`,
          phone: "+85586677044",
          contactUrl: "https://www.connexit.biz/kh/ContactUs",
        },
        {
          name: "Singapore",
          address:
            "60, Paya Lebar Road, #06-39, Paya Lebar Square, Singapore 409051",
          phone: "+6567278910",
          contactUrl: "https://www.connexit.biz/SL/ContactUs",
        },
        {
          name: "Brunei",
          address: `Connex Information Technologies Sdn Bhd
Unit B20, Block B, First Floor, Bangunan HABZA,
Simpang 150, Kg Kiulap, Bandar Seri Begawan BE1518
Negara Brunei Darussalam.`,
          phone: "+673 223 3575",
          contactUrl: "https://www.connexit.biz/BRN/ContactUs",
        },
        {
          name: "Thailand",
          address: `184/79, Forum Tower Building, 17th Floor, Ratchadaphisek Road,
Huai Khwang, Bangkok 10310`,
          phone: "+66612700590",
          contactUrl: "https://www.connexit.biz/TH/ContactUs",
        },
        {
          name: "India",
          address: `220 3rd Double Rd Domlur Indiranagar, 2nd Phase,
Domlur Bangalore North Bangalore KA 560071, India`,
          phone: "+91 789 933 9059",
          contactUrl: "https://www.connexit.biz/SL/ContactUs",
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
          address:
            "CONNEX INFORMATION TECHNOLOGIES LIMITED,Plimmer Towers , 2-6 Glimmer Terrace,Wellington, 6011",
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
          address: `P.O. BOX: 410714
Office 10, 806, 8th Floor,
Opal Tower, Business Bay,
Dubai, UAE`,
          phone: "+4 424 9988",
          contactUrl: "https://www.connexit.biz/uae/ContactUs",
        },
      ],
    },
    {
      region: "Africa",
      countries: [
        {
          name: "Mauritius",
          address: `Office C-03,
Ebene Junction,
Ebene, Quatre Bornes,
Mauritius`,
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
          <Grid container spacing={3} justifyContent="flex-start">
            {region.countries.map((country) => (
              <Grid item key={country.name} xs={12} sm={6} md={4}>
                <CountryCard>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {country.name}
                    </Typography>
                    <IconTextRow
                      icon={<LocationOnIcon sx={{ color: "#00aaff" }} />}
                      text={country.address}
                    />
                    <IconTextRow
                      icon={<PhoneIcon sx={{ color: "#00aaff" }} />}
                      text={country.phone}
                    />
                    <IconTextRow
                      icon={<EmailIcon  sx={{ color: "#00aaff" }} />}
                      text={ 
                        <Link
                          href={country.contactUrl}
                          target="_blank"
                          underline="hover"
                          sx={{ color: "#00aaff" }}
                        >
                          Contact Us Form
                        </Link>
                      }
                    />
                  </CardContent>
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
