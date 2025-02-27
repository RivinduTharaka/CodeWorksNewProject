import React, { useState } from 'react';
import { Container, Typography, Grid, Box, useMediaQuery } from '@mui/material';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import PillarCard from './PillarCard';
import PillarModal from './PillarModal';
import Solution1 from './Solution1';
import piilor1 from '../../assets/image/p1.jpg';
import piilor2 from '../../assets/image/p2.jpg';
import piilor3 from '../../assets/image/p3.jpg';
import piilor4 from '../../assets/image/p4.jpg';
import piilor5 from '../../assets/image/p5.jpg';
import piilor6 from '../../assets/image/p6.jpg';
import piilor7 from '../../assets/image/p7.jpg';
import piilor8 from '../../assets/image/p8.jpg';
import Vendor1 from '../../assets/image/download (1).jpg';
import Vendor2 from '../../assets/image/download (2).jpg';
import Vendor3 from '../../assets/image/download (3).jpg';
import Vendor4 from '../../assets/image/download (4).jpg';
import Vendor5 from '../../assets/image/download (5).jpg';
import backgroundVideo from '../../assets/video/tech.mp4';

const pillars = [
  {
    title: 'Perimeter and Internal Security',
    image: piilor1,
    description: 'Safeguard your physical and digital boundaries with advanced security solutions.',
    subCategories: [
      { name: 'Physical Security', vendors: [{ name: 'Vendor1', logo: Vendor1 }, { name: 'Vendor2', logo: Vendor2 }] },
      { name: 'Network Security', vendors: [{ name: 'Vendor3', logo: Vendor3 }, { name: 'Vendor4', logo: Vendor4 }] },
      { name: 'Intrusion Detection', vendors: [{ name: 'Vendor5', logo: Vendor5 }, { name: 'Vendor1', logo: Vendor1 }] },
      { name: 'Access Control', vendors: [{ name: 'Vendor2', logo: Vendor2 }, { name: 'Vendor3', logo: Vendor3 }] },
      { name: 'Video Surveillance', vendors: [{ name: 'Vendor4', logo: Vendor4 }, { name: 'Vendor5', logo: Vendor5 }] },
    ],
  },
  {
    title: 'Cyber Security Governance & Compliance',
    image: piilor2,
    description: 'Ensure compliance and governance with robust cybersecurity frameworks.',
    subCategories: [
      { name: 'Risk Management', vendors: [{ name: 'Vendor1', logo: Vendor1 }, { name: 'Vendor5', logo: Vendor5 },{ name: 'Vendor1', logo: Vendor1 }, { name: 'Vendor5', logo: Vendor5 }] },
      { name: 'Compliance Audits', vendors: [{ name: 'Vendor2', logo: Vendor2 }, { name: 'Vendor3', logo: Vendor3 }] },
      { name: 'Policy Enforcement', vendors: [{ name: 'Vendor4', logo: Vendor4 }, { name: 'Vendor5', logo: Vendor5 }] },
      { name: 'Security Training', vendors: [{ name: 'Vendor1', logo: Vendor1 }, { name: 'Vendor2', logo: Vendor2 }] },
      { name: 'Incident Response', vendors: [{ name: 'Vendor3', logo: Vendor3 }, { name: 'Vendor4', logo: Vendor4 }] },
    ],
  },
  {
    title: 'Authentication & Identity Management',
    image: piilor3,
    description: 'Secure access with cutting-edge identity and authentication tools.',
    subCategories: [
      { name: 'Multi-Factor Authentication', vendors: [{ name: 'Vendor1', logo: Vendor1 }, { name: 'Vendor2', logo: Vendor2 }] },
      { name: 'Single Sign-On', vendors: [{ name: 'Vendor3', logo: Vendor3 }, { name: 'Vendor4', logo: Vendor4 }] },
      { name: 'Biometric Security', vendors: [{ name: 'Vendor5', logo: Vendor5 }, { name: 'Vendor1', logo: Vendor1 }] },
      { name: 'Identity Governance', vendors: [{ name: 'Vendor2', logo: Vendor2 }, { name: 'Vendor3', logo: Vendor3 }] },
      { name: 'Privileged Access Management', vendors: [{ name: 'Vendor4', logo: Vendor4 }, { name: 'Vendor5', logo: Vendor5 }] },
    ],
  },
  {
    title: 'Security Management',
    image: piilor4,
    description: 'Proactively manage threats with comprehensive security strategies.',
    subCategories: [
      { name: 'Threat Intelligence', vendors: [{ name: 'Vendor1', logo: Vendor1 }, { name: 'Vendor3', logo: Vendor3 }] },
      { name: 'Vulnerability Management', vendors: [{ name: 'Vendor2', logo: Vendor2 }, { name: 'Vendor4', logo: Vendor4 }] },
      { name: 'Security Analytics', vendors: [{ name: 'Vendor5', logo: Vendor5 }, { name: 'Vendor1', logo: Vendor1 }] },
      { name: 'Incident Management', vendors: [{ name: 'Vendor3', logo: Vendor3 }, { name: 'Vendor2', logo: Vendor2 }] },
      { name: 'Policy & Compliance', vendors: [{ name: 'Vendor4', logo: Vendor4 }, { name: 'Vendor5', logo: Vendor5 }] },
    ],
  },
  {
    title: 'Endpoint Security',
    image: piilor5,
    description: 'Protect every device with top-tier endpoint security solutions.',
    subCategories: [
      { name: 'Antivirus Protection', vendors: [{ name: 'Vendor1', logo: Vendor1 }, { name: 'Vendor2', logo: Vendor2 }] },
      { name: 'Endpoint Detection & Response', vendors: [{ name: 'Vendor3', logo: Vendor3 }, { name: 'Vendor4', logo: Vendor4 }] },
      { name: 'Mobile Security', vendors: [{ name: 'Vendor5', logo: Vendor5 }, { name: 'Vendor1', logo: Vendor1 }] },
      { name: 'Device Encryption', vendors: [{ name: 'Vendor2', logo: Vendor2 }, { name: 'Vendor3', logo: Vendor3 }] },
      { name: 'Patch Management', vendors: [{ name: 'Vendor4', logo: Vendor4 }, { name: 'Vendor5', logo: Vendor5 }] },
    ],
  },
  {
    title: 'Networking',
    image: piilor6,
    description: 'Enhance connectivity with secure and scalable networking solutions.',
    subCategories: [
      { name: 'Network Infrastructure', vendors: [{ name: 'Vendor1', logo: Vendor1 }, { name: 'Vendor3', logo: Vendor3 }] },
      { name: 'Cloud Networking', vendors: [{ name: 'Vendor2', logo: Vendor2 }, { name: 'Vendor4', logo: Vendor4 }] },
      { name: 'SD-WAN', vendors: [{ name: 'Vendor5', logo: Vendor5 }, { name: 'Vendor1', logo: Vendor1 }] },
      { name: 'Network Monitoring', vendors: [{ name: 'Vendor3', logo: Vendor3 }, { name: 'Vendor2', logo: Vendor2 }] },
      { name: 'Wireless Security', vendors: [{ name: 'Vendor4', logo: Vendor4 }, { name: 'Vendor5', logo: Vendor5 }] },
    ],
  },
];

const Solutions = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedPillar, setSelectedPillar] = useState(null);

  return (
    <>
      <Solution1 />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Solutions Grid Section */}
        <Container sx={{ py: 8 }}>
          <Grid container spacing={4}>
            {pillars.map((pillar, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Box
                    sx={{
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'scale(1.03)',
                        boxShadow: '0 8px 20px rgba(21, 101, 192, 0.2)',
                      },
                    }}
                  >
                    <PillarCard
                      image={pillar.image}
                      title={pillar.title}
                      description={pillar.description}
                      icon={<BusinessCenterIcon sx={{ color: '#1565C0', fontSize: '2.5rem' }} />}
                      onClick={() => setSelectedPillar(pillar)}
                    />
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Why Choose Us Section - Updated UI */}
        <Box
          sx={{
            width: '85%',
            margin: 'auto',
            background: 'linear-gradient(45deg,rgb(5, 30, 68),rgb(3, 59, 24))', // Dark blue to dark green gradient
            py: 6,
            px: 3,
            textAlign: 'center',
            borderRadius: '20px',
            mt: 6,
            mb: 6,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)', // Added shadow for depth
          }}
        >
          <Container>
            <Typography
              variant={isMobile ? 'h5' : 'h4'}
              fontWeight="bold"
              sx={{
                mb: 3,
                color: '#ffffff', // White text for contrast against gradient
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', // Subtle shadow for readability
              }}
            >
              Why Partner with Us?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                opacity: 0.95,
                mx: 'auto',
                textAlign: 'center',
                maxWidth: '900px',
                lineHeight: 1.7,
                color: '#ffffff', // White text for contrast
                fontSize: isMobile ? '0.95rem' : '1.1rem', // Slightly larger text on desktop
                textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)', // Subtle shadow for readability
              }}
            >
              We deliver more than just solutions—we offer a partnership built on trust, expertise, and innovation. 
              Our cutting-edge security technologies and tailored networking services protect your assets, streamline operations, 
              and ensure compliance with global standards. Whether it’s fortifying your endpoints, securing your network, 
              or managing identities, we provide scalable, reliable, and cost-effective options that grow with your business. 
              Choose us to stay ahead of threats and empower your success.
            </Typography>
          </Container>
        </Box>

        {/* Modal for Pillar Details */}
        <PillarModal open={!!selectedPillar} onClose={() => setSelectedPillar(null)} pillar={selectedPillar} />
      </motion.div>
    </>
  );
};

export default Solutions;