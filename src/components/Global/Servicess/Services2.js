import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { styled } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material';
import arrowImage from '../../../assets/image/down-arrow.png'; // Assuming you have this image

// Theme setup
const theme = createTheme({
  palette: {
    primary: { main: '#1565C0', light: '#64B5F6', dark: '#0D47A1' },
    text: { primary: '#333', secondary: '#555' },
  },
  typography: { fontFamily: "'Poppins', sans-serif" },
});

// Styled Components
const PageWrapper = styled(Box)({
  backgroundColor: '#f5f5f5', // White background for the entire page
  minHeight: '30vh', // Ensure the wrapper takes up the full viewport height
});

const HeroSection = styled(Box)({
 
  padding: '70px 0 60px',
  textAlign: 'center',
  color: '#fff', // White text color for contrast against the dark gradient
});

const Title = styled(Typography)({
  fontSize: '2.5rem',
  fontWeight: 600,
  background: 'linear-gradient(45deg, #0D47A1, #006400)', // Specified gradient for the title text
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  marginBottom: '1rem',
  textTransform: 'uppercase', // Match the uppercase style in the image
});

const Subtitle = styled(Typography)({
  fontSize: '1.2rem',
  fontWeight: 400,
  color: 'black', // White text for subtitle
  maxWidth: '800px',
  margin: '0 auto 1rem',
  textTransform: 'uppercase', // Match the uppercase style in the image
});

const Description = styled(Typography)({
  fontSize: '0.9rem',
  fontWeight: 300,
  color: 'black', // White text for description
  maxWidth: '800px',
  margin: '0 auto',
  lineHeight: '1.5',
});

const CustomButton = styled(Button)({
  backgroundColor: "#102166",
  color: '#ffffff',
  fontSize: '1rem',
  fontWeight: 500,
  textTransform: 'none',
  borderRadius: '20px',
  padding: '0.6rem 2rem',
  fontFamily: "'Poppins', sans-serif",
  alignItems: 'center',
  gap: '0.5rem',
  marginTop: '2rem',
  '&:hover': {
    backgroundColor: "#24398f",
  },
});

const ArrowImage = styled('img')({
  width: '20px',
  height: '20px',
  objectFit: 'contain',
});

// Main Component
function Services2() {
  return (
    <ThemeProvider theme={theme}>
      <PageWrapper>
        <HeroSection>
          <Container maxWidth="lg">
            
            <Subtitle variant="h2">
            At Connex, we provide comprehensive consulting and professional services designed to add significant value at every stage of the customer journey—from initial pre-sales consultations to seamless implementation and fully managed services. 
            </Subtitle>
           
            {/* <CustomButton>    
              <ArrowImage src={arrowImage} alt="Scroll down arrow" />
            </CustomButton> */}
          </Container>
        </HeroSection>
      </PageWrapper>
    </ThemeProvider>
  );
}

export default Services2;