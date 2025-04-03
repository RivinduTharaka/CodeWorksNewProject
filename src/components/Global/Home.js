import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid, Card } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import hero from '../../assets/video/hero.mp4';
import WhoWeAre from './HomeSections/ContentSection';
import Ecosystem from './HomeSections/TechnologyEcosystem';
import Vendor from './HomeSections/OurVendors';
import News from './HomeSections/News';
import Solutions from './HomeSections/Solutions';
import AutoLogin from '../../services/AutoLogin';
import { Public, BusinessCenter, School, Handshake, CalendarToday, Group, Store, People } from '@mui/icons-material';
import ContactHome from './HomeSections/ContactHome';
import { selectData } from '../../services/dataService';

// Who We Are Section Styling
const WhoWeAreSection = styled(Box)({
  padding: '5rem 0',
  textAlign: 'center',
});

// Styled Title
const SectionTitle = styled(Typography)({
  fontSize: '3rem',
  fontWeight: '700',
  color: '#0D47A1',
  marginBottom: '2rem',
  textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
});

// Styled Icon Card
const IconCard = styled(Card)({
  cursor: 'pointer',
  outline: '1px solid rgb(19, 114, 183)',
  boxShadow: 'none',
  borderRadius: '12px',
  padding: '1.5rem',
  textAlign: 'center',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-10px)',
  },
});

// Styled Typography for Stats
const StatsText = styled(Typography)({
  fontSize: '1.5rem',
  fontWeight: '500',
  color: '#333',
  marginTop: '0.5rem',
});

const StatsLabel = styled(Typography)({
  fontSize: '1rem',
  fontWeight: '400',
  color: '#555',
});

// Premium Content Styling
const PremiumContent = styled(Box)({
  borderRadius: '12px',
  padding: '2rem',
  textAlign: 'left',
});

const PremiumTitle = styled(Typography)({
  fontSize: '1.5rem',
  fontWeight: '700',
  color: '#0D47A1',
  marginBottom: '1rem',
  textAlign: 'center',
});

const PremiumDescription = styled(Typography)({
  fontSize: '1rem',
  fontWeight: '400',
  color: '#555',
  lineHeight: '1.6',
  textAlign: 'justify',
});

// Hero Section Styling
const HeroSection = styled(Box)({
  position: 'relative',
  height: '88vh',
  overflow: 'hidden',
  margin: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  color: '#ffffff',
  mt: 100,
});

// Overlay for Better Text Readability
const Overlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
});

// Video Background
const VideoBackground = styled('video')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  zIndex: '-1',
});

// Animation for Fade-in Effect
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Text Container for Hero Section
const TextContainer = styled(Container)({
  position: 'relative',
  zIndex: 2,
});

// Responsive MainText with reduced font size for mobile
const MainText = styled(Typography)(({ theme }) => ({
  fontSize: '2.6rem',
  fontWeight: '700',
  color: '#ffffff',
  animation: `${fadeIn} 1s ease-in-out`,
  [theme.breakpoints.down('md')]: {
    fontSize: '1.8rem', // Reduced font size for screens below 768px
  },
}));

// Responsive SubText with reduced font size for mobile
const SubText = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  fontWeight: '400',
  color: '#ffffff',
  marginTop: '0.5rem',
  animation: `${fadeIn} 2s ease-in-out`,
  [theme.breakpoints.down('md')]: {
    fontSize: '0.9rem', // Reduced font size for screens below 768px
  },
}));

// Responsive TypewriterText with reduced font size for mobile
const TypewriterText = styled(Typography)(({ theme }) => ({
  fontSize: '2.8rem', // Default font size for larger screens
  fontWeight: '400',
  color: '#ffffff',
  marginBottom: '1rem',
  [theme.breakpoints.down('md')]: {
    fontSize: '2rem', // Reduced font size for screens below 768px
  },[theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem', // Reduced font size for screens below 768px
  }
}));

const CountAnimation = ({ start, end, suffix }) => {
  const [count, setCount] = useState(start);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    const data = selectData('countries', { is_active: true });
    console.log(data);
    if (inView) {
      let startVal = start;
      const duration = 2000;
      const stepTime = Math.abs(Math.floor(duration / (end - startVal)));
      const timer = setInterval(() => {
        startVal += 1;
        setCount(startVal);
        if (startVal >= end) {
          clearInterval(timer);
        }
      }, stepTime);
    }
  }, [inView, start, end]);

  return (
    <div ref={ref}>
      <StatsText>
        {count}
        {suffix}
      </StatsText>
    </div>
  );
};

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the component mounts
  }, []);

  return (
    <>
      {/* Hero Section */}
      <AutoLogin />
      <HeroSection>
        <VideoBackground autoPlay loop muted playsInline>
          <source src={hero} type="video/mp4" />
        </VideoBackground>
        <Overlay />
        <TextContainer maxWidth="md">
          <TypewriterText>
            <Typewriter
              options={{
                strings: ['#EmpoweringTechnology  '],
                autoStart: true,
                loop: true,
                delay: 80,
                deleteSpeed: 40,
              }}
            />
          </TypewriterText>

          <MainText>
            Driving Innovation, Amplifying Value - Globally Trusted Technology Distributor
          </MainText>

          <SubText>
            Connecting the World Through Reliable Distribution
          </SubText>
        </TextContainer>
      </HeroSection>

      {/* Other Sections */}
      <WhoWeAre />
      <News />
      <Solutions />
      <Vendor />
      <Ecosystem />
      <ContactHome />
    </>
  );
};

export default Home;