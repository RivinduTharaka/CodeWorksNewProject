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

// Updated pillars data with website URLs for each vendor
const pillars = [
  {
    id: "1", // Added ID for potential database fetching
    title: 'Perimeter and Internal Security',
    image: piilor1,
    description: 'Safeguard your physical and digital boundaries with advanced security solutions.',
    subCategories: [
      {
        name: 'Physical Security',
        vendors: [
          { name: 'Cisco', logo: Vendor1, website: 'https://www.cisco.com' },
          { name: 'Hikvision', logo: Vendor2, website: 'https://www.hikvision.com' },
        ],
      },
      {
        name: 'Network Security',
        vendors: [
          { name: 'Palo Alto Networks', logo: Vendor3, website: 'https://www.paloaltonetworks.com' },
          { name: 'Fortinet', logo: Vendor4, website: 'https://www.fortinet.com' },
        ],
      },
      {
        name: 'Intrusion Detection',
        vendors: [
          { name: 'Splunk', logo: Vendor5, website: 'https://www.splunk.com' },
          { name: 'Cisco', logo: Vendor1, website: 'https://www.cisco.com' },
        ],
      },
      {
        name: 'Access Control',
        vendors: [
          { name: 'Hikvision', logo: Vendor2, website: 'https://www.hikvision.com' },
          { name: 'Palo Alto Networks', logo: Vendor3, website: 'https://www.paloaltonetworks.com' },
        ],
      },
      {
        name: 'Video Surveillance',
        vendors: [
          { name: 'Fortinet', logo: Vendor4, website: 'https://www.fortinet.com' },
          { name: 'Splunk', logo: Vendor5, website: 'https://www.splunk.com' },
        ],
      },
    ],
  },
  {
    id: "2",
    title: 'Cyber Security Governance & Compliance',
    image: piilor2,
    description: 'Ensure compliance and governance with robust cybersecurity frameworks.',
    subCategories: [
      {
        name: 'Risk Management',
        vendors: [
          { name: 'Cisco', logo: Vendor1, website: 'https://www.cisco.com' },
          { name: 'Splunk', logo: Vendor5, website: 'https://www.splunk.com' },
          { name: 'Cisco', logo: Vendor1, website: 'https://www.cisco.com' },
          { name: 'Splunk', logo: Vendor5, website: 'https://www.splunk.com' },
        ],
      },
      {
        name: 'Compliance Audits',
        vendors: [
          { name: 'Hikvision', logo: Vendor2, website: 'https://www.hikvision.com' },
          { name: 'Palo Alto Networks', logo: Vendor3, website: 'https://www.paloaltonetworks.com' },
        ],
      },
      {
        name: 'Policy Enforcement',
        vendors: [
          { name: 'Fortinet', logo: Vendor4, website: 'https://www.fortinet.com' },
          { name: 'Splunk', logo: Vendor5, website: 'https://www.splunk.com' },
        ],
      },
      {
        name: 'Security Training',
        vendors: [
          { name: 'Cisco', logo: Vendor1, website: 'https://www.cisco.com' },
          { name: 'Hikvision', logo: Vendor2, website: 'https://www.hikvision.com' },
        ],
      },
      {
        name: 'Incident Response',
        vendors: [
          { name: 'Palo Alto Networks', logo: Vendor3, website: 'https://www.paloaltonetworks.com' },
          { name: 'Fortinet', logo: Vendor4, website: 'https://www.fortinet.com' },
        ],
      },
    ],
  },
  {
    id: "3",
    title: 'Authentication & Identity Management',
    image: piilor3,
    description: 'Secure access with cutting-edge identity and authentication tools.',
    subCategories: [
      {
        name: 'Multi-Factor Authentication',
        vendors: [
          { name: 'Okta', logo: Vendor1, website: 'https://www.okta.com' },
          { name: 'Duo Security', logo: Vendor2, website: 'https://duo.com' },
        ],
      },
      {
        name: 'Single Sign-On',
        vendors: [
          { name: 'Ping Identity', logo: Vendor3, website: 'https://www.pingidentity.com' },
          { name: 'OneLogin', logo: Vendor4, website: 'https://www.onelogin.com' },
        ],
      },
      {
        name: 'Biometric Security',
        vendors: [
          { name: 'NEC', logo: Vendor5, website: 'https://www.nec.com' },
          { name: 'Okta', logo: Vendor1, website: 'https://www.okta.com' },
        ],
      },
      {
        name: 'Identity Governance',
        vendors: [
          { name: 'Duo Security', logo: Vendor2, website: 'https://duo.com' },
          { name: 'Ping Identity', logo: Vendor3, website: 'https://www.pingidentity.com' },
        ],
      },
      {
        name: 'Privileged Access Management',
        vendors: [
          { name: 'OneLogin', logo: Vendor4, website: 'https://www.onelogin.com' },
          { name: 'NEC', logo: Vendor5, website: 'https://www.nec.com' },
        ],
      },
    ],
  },
  {
    id: "4",
    title: 'Security Management',
    image: piilor4,
    description: 'Proactively manage threats with comprehensive security strategies.',
    subCategories: [
      {
        name: 'Threat Intelligence',
        vendors: [
          { name: 'FireEye', logo: Vendor1, website: 'https://www.fireeye.com' },
          { name: 'Palo Alto Networks', logo: Vendor3, website: 'https://www.paloaltonetworks.com' },
        ],
      },
      {
        name: 'Vulnerability Management',
        vendors: [
          { name: 'Tenable', logo: Vendor2, website: 'https://www.tenable.com' },
          { name: 'Qualys', logo: Vendor4, website: 'https://www.qualys.com' },
        ],
      },
      {
        name: 'Security Analytics',
        vendors: [
          { name: 'Splunk', logo: Vendor5, website: 'https://www.splunk.com' },
          { name: 'FireEye', logo: Vendor1, website: 'https://www.fireeye.com' },
        ],
      },
      {
        name: 'Incident Management',
        vendors: [
          { name: 'Palo Alto Networks', logo: Vendor3, website: 'https://www.paloaltonetworks.com' },
          { name: 'Tenable', logo: Vendor2, website: 'https://www.tenable.com' },
        ],
      },
      {
        name: 'Policy & Compliance',
        vendors: [
          { name: 'Qualys', logo: Vendor4, website: 'https://www.qualys.com' },
          { name: 'Splunk', logo: Vendor5, website: 'https://www.splunk.com' },
        ],
      },
    ],
  },
  {
    id: "5",
    title: 'Endpoint Security',
    image: piilor5,
    description: 'Protect every device with top-tier endpoint security solutions.',
    subCategories: [
      {
        name: 'Antivirus Protection',
        vendors: [
          { name: 'Symantec', logo: Vendor1, website: 'https://www.symantec.com' },
          { name: 'McAfee', logo: Vendor2, website: 'https://www.mcafee.com' },
        ],
      },
      {
        name: 'Endpoint Detection & Response',
        vendors: [
          { name: 'CrowdStrike', logo: Vendor3, website: 'https://www.crowdstrike.com' },
          { name: 'Carbon Black', logo: Vendor4, website: 'https://www.carbonblack.com' },
        ],
      },
      {
        name: 'Mobile Security',
        vendors: [
          { name: 'Lookout', logo: Vendor5, website: 'https://www.lookout.com' },
          { name: 'Symantec', logo: Vendor1, website: 'https://www.symantec.com' },
        ],
      },
      {
        name: 'Device Encryption',
        vendors: [
          { name: 'McAfee', logo: Vendor2, website: 'https://www.mcafee.com' },
          { name: 'CrowdStrike', logo: Vendor3, website: 'https://www.crowdstrike.com' },
        ],
      },
      {
        name: 'Patch Management',
        vendors: [
          { name: 'Carbon Black', logo: Vendor4, website: 'https://www.carbonblack.com' },
          { name: 'Lookout', logo: Vendor5, website: 'https://www.lookout.com' },
        ],
      },
    ],
  },
  {
    id: "6",
    title: 'Networking',
    image: piilor6,
    description: 'Enhance connectivity with secure and scalable networking solutions.',
    subCategories: [
      {
        name: 'Network Infrastructure',
        vendors: [
          { name: 'Cisco', logo: Vendor1, website: 'https://www.cisco.com' },
          { name: 'Arista Networks', logo: Vendor3, website: 'https://www.arista.com' },
        ],
      },
      {
        name: 'Cloud Networking',
        vendors: [
          { name: 'Juniper Networks', logo: Vendor2, website: 'https://www.juniper.net' },
          { name: 'VMware', logo: Vendor4, website: 'https://www.vmware.com' },
        ],
      },
      {
        name: 'SD-WAN',
        vendors: [
          { name: 'Silver Peak', logo: Vendor5, website: 'https://www.silver-peak.com' },
          { name: 'Cisco', logo: Vendor1, website: 'https://www.cisco.com' },
        ],
      },
      {
        name: 'Network Monitoring',
        vendors: [
          { name: 'Arista Networks', logo: Vendor3, website: 'https://www.arista.com' },
          { name: 'Juniper Networks', logo: Vendor2, website: 'https://www.juniper.net' },
        ],
      },
      {
        name: 'Wireless Security',
        vendors: [
          { name: 'VMware', logo: Vendor4, website: 'https://www.vmware.com' },
          { name: 'Silver Peak', logo: Vendor5, website: 'https://www.silver-peak.com' },
        ],
      },
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