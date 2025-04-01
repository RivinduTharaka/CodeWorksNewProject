import React from 'react';
import { Box, Typography, Container, Button, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import CNXBackgropund from '../../../assets/video/CNXBackgropund.mp4';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'; // Add this import

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
  overflow: 'hidden', // Prevent overflow or interaction outside the container
}));

const VideoBackground = styled('video')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  zIndex: 1,
  pointerEvents: 'none', // Disable any user interaction with the video
});

const Overlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.3)', // Overlay for better text visibility
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
  color: 'white',
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
  backgroundColor: 'transparent',
  color: 'white',
  border: '2px solid white',
  padding: { xs: '10px 20px', md: '12px 50px' }, // Responsive padding
  fontSize: { xs: '0.875rem', md: '0.8rem' }, // Responsive font size
  fontWeight: 'bold',
  textTransform: 'uppercase',
  width: { xs: 'auto', md: '300px' }, // Responsive width
  textAlign: 'center',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: 'white',
    color: '#053701',
    borderColor: 'white',
  },
}));

const TechnologyEcosystem = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate(); // Add this hook

  const handleUpskillClick = () => {
    navigate('/trainings'); // Navigate to the trainings page
  };

  return (
    <SectionContainer>
      {/* Video Background */}
      <VideoBackground
        autoPlay
        muted
        loop
        playsInline // Ensures it plays inline on mobile devices without popping up
        controls={false} // Explicitly disable controls
      >
        <source src={CNXBackgropund} type="video/mp4" />
        Your browser does not support the video tag.
      </VideoBackground>

      {/* Overlay for text visibility */}
      <Overlay />

      {/* Content */}
      <ContentWrapper>
        <Container maxWidth="md">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Title variants={fadeInVariants}>
              Specialist technical <HighlightedText>excellence, accreditation</HighlightedText> and training
            </Title>
            <Description variants={fadeInVariants}>
              Advance your expertise with our industry-leading training programs, designed to deliver
              cutting-edge knowledge and practical skills. As a trusted value-added distributor, we
              provide tailored solutions to help professionals upskill, reskill, and stay at the forefront
              of the evolving technology landscape.
            </Description>
            <TrainButton
              variants={buttonVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              whileTap="tap"
              viewport={{ once: true }}
              onClick={handleUpskillClick} // Add the onClick handler
            >
              Upskill Today
            </TrainButton>
          </motion.div>
        </Container>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default TechnologyEcosystem;