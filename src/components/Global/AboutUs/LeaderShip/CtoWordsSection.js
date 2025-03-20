import React from 'react';
import { Box, Typography, Container, Grid, Avatar } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import image from '../../../assets/image/Rohan.jpg'; // Update with actual image

// Scroll Animation Variants
const fadeInVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

// Section Styling
const SectionContainer = styled(Box)({
  mt: 5,
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

// Styled Executive Image
const ExecutiveImage = styled(Avatar)({
  width: '280px',
  height: '280px',
  borderRadius: '5px',
});

const CtoWordsSection = () => {
  return (
    <SectionContainer>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          {/* Left Side: CTO Image */}
          <Grid item xs={12} md={5} display="flex" justifyContent="center">
            <motion.div variants={fadeInVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <ExecutiveImage src={image} alt="John Smith" />
            </motion.div>
          </Grid>

          {/* Right Side: CTO Speech */}
          <Grid item xs={12} md={7}>
            <motion.div variants={fadeInVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <Typography variant="h4" fontWeight="700" color="#333" sx={{ mb: 2 }}>
                Rohan Samaraweera
              </Typography>
              <Typography variant="h6" fontWeight="500" color="green" sx={{ mb: 3 }}>
                Chief Technical Officer, Connex Information Technologies
              </Typography>
              <Typography variant="body1" fontWeight="400" color="#555" lineHeight={1.6}>
                "Technology is the backbone of our success at Connex. Our team is committed to innovation, security, 
                and performance, ensuring we stay ahead in this ever-evolving digital landscape. Our mission is to 
                create solutions that empower businesses and drive technological excellence."
              </Typography>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </SectionContainer>
  );
};

export default CtoWordsSection;
