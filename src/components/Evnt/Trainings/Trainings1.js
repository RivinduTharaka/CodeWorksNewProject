import React from 'react';
import { Box, Typography, Container, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import bgvideo from '../../../assets/video/vedorbg.mp4'; // You can keep this or use a different video

const SectionContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '80vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4, 0),
  fontFamily: 'Poppins, sans-serif',
  overflow: 'hidden',
}));

const VideoBackground = styled('video')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  zIndex: -1,
});

const ContentWrapper = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  width: '100%',
  maxWidth: '1200px',
  position: 'relative',
  zIndex: 1,
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '4rem',
  fontWeight: '700',
  color: '#ffffff',
  marginBottom: theme.spacing(2),
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.5rem',
  },
}));

const Description = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: '400',
  color: '#ffffff',
  maxWidth: '800px',
  margin: '0 auto',
  lineHeight: '1.6',
  textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
    maxWidth: '90%',
  },
}));

function Trainings1() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <SectionContainer>
      <VideoBackground autoPlay loop muted playsInline>
        <source src={bgvideo} type="video/mp4" />
        Your browser does not support the video tag.
      </VideoBackground>
      <Container maxWidth="lg">
        <ContentWrapper>
          <Title>Connex Training Center</Title>
          <Description>
            Elevate your skills and expertise with our cutting-edge training sessions 
            designed for professionals at all levels.
          </Description>
        </ContentWrapper>
      </Container>
    </SectionContainer>
  );
}

export default Trainings1;