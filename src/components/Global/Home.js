import React, { useState, useEffect } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import Typewriter from 'typewriter-effect';
import AutoLogin from '../../services/AutoLogin';
import hero from '../../assets/video/hero.mp4';
import WhoWeAre from './HomeSections/ContentSection';
import Ecosystem from './HomeSections/TechnologyEcosystem';
import Vendor from './HomeSections/OurVendors';
import News from './HomeSections/News';
import Solutions from './HomeSections/Solutions';
import ContactHome from './HomeSections/ContactHome';
import { selectData } from '../../services/dataService';

// Styled components (same as before) ...

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

const Overlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
});

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

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const TextContainer = styled(Container)({
  position: 'relative',
  zIndex: 2,
});

const MainText = styled(Typography)(({ theme }) => ({
  fontSize: '2.6rem',
  fontWeight: '700',
  color: '#ffffff',
  animation: `${fadeIn} 1s ease-in-out`,
  [theme.breakpoints.down('md')]: {
    fontSize: '1.8rem',
  },
}));

const SubText = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  fontWeight: '400',
  color: '#ffffff',
  marginTop: '0.5rem',
  animation: `${fadeIn} 2s ease-in-out`,
  [theme.breakpoints.down('md')]: {
    fontSize: '0.9rem',
  },
}));

const TypewriterText = styled(Typography)(({ theme }) => ({
  fontSize: '2.8rem',
  fontWeight: '400',
  color: '#ffffff',
  marginBottom: '1rem',
  [theme.breakpoints.down('md')]: {
    fontSize: '2rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem',
  },
}));

const Home = () => {
  const [heroData, setHeroData] = useState({ main_title: '', sub_title: '' });

  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        // Step 1: Get all hero sections with page_id = 2 (home)
        const sectionsRes = await selectData('hero_sections', {
          page_id: 2,
          is_active: 1,
        });

        const allSections = sectionsRes.data || [];

        // Step 2: Get the hero_section_country match for country_id = 3
        const countryLinksRes = await selectData('hero_section_countries', {
          country_id: 3,
          is_active: 1,
        });

        const matchingSection = countryLinksRes.data?.find((link) =>
          allSections.some((section) => section.id === link.hero_section_id)
        );

        if (matchingSection) {
          const matchedHero = allSections.find(
            (section) => section.id === matchingSection.hero_section_id
          );

          if (matchedHero) {
            setHeroData({
              main_title: matchedHero.main_title || '',
              sub_title: matchedHero.sub_title || '',
            });
          }
        }
      } catch (error) {
        console.error('Error fetching hero section data:', error);
      }
    };

    fetchHeroContent();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
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

          <MainText>{heroData.main_title}</MainText>
          <SubText>{heroData.sub_title}</SubText>
        </TextContainer>
      </HeroSection>

      {/* Sections */}
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
