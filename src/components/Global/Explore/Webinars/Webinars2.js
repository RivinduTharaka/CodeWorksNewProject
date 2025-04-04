import React from 'react';
import { Box, Typography, Container, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import bgvideo from '../../../../assets/video/tech.mp4';

const SectionContainer = styled(Box)(({ theme }) => ({
  position: 'relative', // Needed for video positioning
  minHeight: '80vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4, 0),
  fontFamily: 'Poppins, sans-serif',
  overflow: 'hidden', // Prevent video overflow
}));

const VideoBackground = styled('video')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover', // Ensures video covers the entire area
  zIndex: -1, // Places video behind content
});

const ContentWrapper = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  width: '100%',
  maxWidth: '1200px',
  position: 'relative', // Keeps content above video
  zIndex: 1, // Ensures content stays above video
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '4rem',
  fontWeight: '700',
  color: '#ffffff',
  marginBottom: theme.spacing(2),
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Added for better readability on video
  animation: 'fadeInSlideUp 1s ease-out forwards', // Animation added
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.5rem',
  },
  '@keyframes fadeInSlideUp': {
    '0%': {
      opacity: 0,
      transform: 'translateY(50px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));

const Description = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: '400',
  color: '#ffffff',
  maxWidth: '800px',
  margin: '0 auto',
  lineHeight: '1.6',
  textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)', // Added for better readability on video
  animation: 'fadeInSlideUp 1s ease-out forwards', // Animation added
  animationDelay: '0.3s', // Slight delay for staggered effect
  opacity: 0, // Initial state for animation
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
    maxWidth: '90%',
  },
  '@keyframes fadeInSlideUp': {
    '0%': {
      opacity: 0,
      transform: 'translateY(50px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));

const Webinars2 = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <SectionContainer>
      <VideoBackground autoPlay loop muted playsInline>
        <source src={bgvideo} type="video/mp4" />
        {/* You can replace the src with your own video URL */}
        Your browser does not support the video tag.
      </VideoBackground>
      <Container maxWidth="lg">
        <ContentWrapper>
          <Title>Live. Interactive. Insightful. <br/> Your front row to innovation  </Title>
          <Description>
          
          </Description>
        </ContentWrapper>
      </Container>
    </SectionContainer>
  );
};

export default Webinars2;