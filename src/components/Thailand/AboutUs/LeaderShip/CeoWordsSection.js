import React from 'react';
import { Box, Typography, Container, Grid, Avatar } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import image from '../../../../assets/image/OIP.jpg'

// Scroll Animation Variants
const fadeInVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

// Section Styling
const SectionContainer = styled(Box)({
    mt:5,
  backgroundColor: '#f9f9f9',
  padding: '4rem 0',
});

// Section Title
const SectionTitle = styled(Typography)({
  fontSize: '1.4rem',
  
  fontWeight: '800',
  color: '#0D47A1',
  textAlign: 'center',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  marginBottom: '3rem',
});

// Styled CEO Image
const CeoImage = styled(Avatar)({
  width: '280px',
  height: '280px',
  borderRadius: '5px',
 
});

const CeoWordsSection = () => {
  return (
    <SectionContainer>
      <Container maxWidth="lg">
        {/* Section Title */}

        <Grid container spacing={6} alignItems="center">
          {/* Left Side: CEO Image */}
          <Grid item xs={12} md={5} display="flex" justifyContent="center">
            <motion.div variants={fadeInVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <CeoImage src={image}alt="Suresh Wijesinghe" />
            </motion.div>
          </Grid>

          {/* Right Side: CEO Speech */}
          <Grid item xs={12} md={7}>
            <motion.div variants={fadeInVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <Typography variant="h4" fontWeight="700" color="#070054" sx={{ mb: 2 }}>
                Suresh Wijesinghe
              </Typography>
              <Typography variant="h6" fontWeight="500" color="green" sx={{ mb: 3 }}>
                Founder & CEO, Connex Information Technologies
              </Typography>
              <Typography variant="body1" fontWeight="400" color="#555" lineHeight={1.6}>
                "At Connex Information Technologies, our mission is to drive innovation and excellence in technology 
                distribution. We believe in building strong relationships with our partners and delivering 
                state-of-the-art solutions to meet the ever-evolving market needs. Our success is built on 
                passion, expertise, and a commitment to exceeding expectations."
              </Typography>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </SectionContainer>
  );
};

export default CeoWordsSection;
