import React from 'react';
import { Box, Typography, Container, Button, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import CNXBackgropund from '../../assets/video/CNXBackgropund.mp4';

// Import useTheme here
import { useTheme } from '@mui/material/styles';

// Scroll Animation Variants
const fadeInVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const buttonVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.3 } },
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95 },
};

// Styled Components
const SectionContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '70vh', 
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontFamily: 'Poppins, sans-serif',
  padding: theme.spacing(4, 0),
}));

const VideoBackground = styled('video')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  zIndex: 1,
});

const Overlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.3)', // Optional overlay for better text visibility
  zIndex: 2,
});

const ContentWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 3,
  textAlign: 'center',
  width: '100%',
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '3rem',
  fontWeight: '700',
  color: 'white', // Purple for "Specialist technical" and "training"
  textAlign: 'center',
  fontFamily: 'Poppins, sans-serif',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}));

const HighlightedText = styled('span')({
  color: '#04D750', 
});

const Description = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: '400',
  color: 'white',
  maxWidth: '800px',
  margin: '0 auto',
  lineHeight: '1.6',
  textAlign: 'center',
  fontFamily: 'Poppins, sans-serif',
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
    maxWidth: '90%',
  },
}));

const TrainButton = styled(motion(Button))(({ theme }) => ({
  backgroundColor: "transparent",
  color: "white",
  border: "2px solid white",
  padding: { xs: "10px 20px", md: "12px 50px" },
  fontSize: { xs: "0.875rem", md: "0.8rem" },
  fontWeight: "bold",
  textTransform: "uppercase",
  width: { xs: "auto", md: "300px" },
  textAlign: "center",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    backgroundColor: "white",
    color: "#053701",
    borderColor: "white", // Ensure border color stays white on hover
  },
}));

const TechnologyEcosystem = () => {
  const theme = useTheme(); // Now this will work since useTheme is imported
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <SectionContainer>
      {/* Video Background - You can import and add your video here */}
      <VideoBackground autoPlay muted loop>
        <source src={CNXBackgropund} type="video/mp4" />
        Your browser does not support the video tag.
      </VideoBackground>

      {/* Overlay for text visibility (optional) */}
      <Overlay />

      <ContentWrapper>
        <Container maxWidth="md">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Title>
              Specialist technical <HighlightedText>excellence, accreditation</HighlightedText> and training
            </Title>
            <Description>
              Our expert technical training achieves continuously high pass rates. We provide partners and customers with the accredited skills and knowledge they require onsite or remotely.
            </Description>
            <TrainButton
              variants={buttonVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              whileTap="tap"
              viewport={{ once: true }}
              
            >
              Train with Us
            </TrainButton>
          </motion.div>
        </Container>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default TechnologyEcosystem;