import React from 'react';
import { styled } from '@mui/system';
import clip from '../../../assets/video/vedorbg.mp4';

// Styled Components
const SectionContainer = styled('div')({
  position: 'relative', // For positioning the video behind content
  minHeight: '80vh', // Adjusted to match the banner height in the image
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden', // Prevent video overflow
});

const VideoBackground = styled('video')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover', // Ensures video covers the area without distortion
  zIndex: -1, // Places video behind content
});

const Title = styled('div')(({ theme }) => ({
  position: 'relative', // Keeps content above video
  zIndex: 1, // Ensures content is on top
  color: '#ffffff', // White text for contrast against video
  fontWeight: '700',
  fontFamily: "'Poppins', sans-serif",
  textAlign: 'center',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Improves readability on video
  marginBottom: '1rem', // Space between title and subtitle
  fontSize: '4rem', // Default font size (used for xl and above)
  animation: 'fadeInSlideUp 1s ease-out forwards', // Animation added
  [theme.breakpoints.down('xl')]: {
    fontSize: '4rem', // Large screens (1200px - 1536px)
  },
  [theme.breakpoints.down('lg')]: {
    fontSize: '4rem', // Medium screens (900px - 1200px)
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '3.5rem', // Tablets (600px - 900px)
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '3rem', // Mobile (0px - 600px)
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

const Subtitle = styled('div')({
  position: 'relative', // Keeps content above video
  zIndex: 1, // Ensures content is on top
  color: '#ffffff', // White text for contrast against video
  fontSize: '1.2rem', // Smaller text for the subtitle
  fontWeight: '400',
  fontFamily: "'Poppins', sans-serif",
  textAlign: 'center',
  textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)', // Improves readability on video
  maxWidth: '80%', // Prevent overflow on smaller screens
  animation: 'fadeInSlideUp 1s ease-out forwards', // Animation added
  animationDelay: '0.3s', // Slight delay for staggered effect
  opacity: 0, // Initial state for animation
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
});

function Vendor1() {
  return (
    <SectionContainer>
      <VideoBackground autoPlay loop muted playsInline>
        <source src={clip} type="video/mp4" />
        Your browser does not support the video tag.
      </VideoBackground>
      <Title>World-leading <br/> network of vendors</Title>
      <Subtitle>High-performance, trusted technology. Cybersecurity. Cloud. Unified Comms.</Subtitle>
    </SectionContainer>
  );
}

export default Vendor1;