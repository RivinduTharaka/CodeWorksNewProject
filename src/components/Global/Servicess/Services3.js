import React, { useEffect, useRef, useState } from 'react';
import {
  Grid,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import lifecycleImage from '../../../assets/image/Layer1.png';

function Services3() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.7 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <Box
      ref={sectionRef}
      sx={{
        px: { xs: 2, md: 5 },
        py: { xs: 4, md: 6 },
        backgroundColor: '#ffffff',
        minHeight: '20vh',
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        {/* Title */}
        <Grid item xs={12} md={8}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              marginBottom: '20px',
              textAlign: 'center',
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              lineHeight: 1.3,
              background: 'linear-gradient(90deg, #1a9fd9, #24b24c)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: isVisible ? 'fadeInUp 1s ease-out' : 'none',
              '@keyframes fadeInUp': {
                '0%': {
                  opacity: 0,
                  transform: 'translateY(20px)',
                },
                '100%': {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              },
            }}
          >
            Delivering Exceptional Value Throughout the Partners’ Lifecycle
          </Typography>
        </Grid>

        {/* Content Row */}
        <Grid item xs={12}>
          <Grid container spacing={4} alignItems="center">
            {/* Image Column */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: { xs: 'center', md: 'flex-end' },
                  alignItems: 'center',
                  p: { xs: 2, md: 3 },
                }}
              >
                <Box
                  component="img"
                  src={lifecycleImage}
                  alt="Lifecycle Diagram"
                  sx={{
                    width: { xs: '90%', md: '65%' },
                    height: 'auto',
                    transition: 'transform 0.8s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.2) rotate(360deg)',
                    },
                  }}
                />
              </Box>
            </Grid>

            {/* Accordion Column */}
            <Grid item xs={12} md={6}>
              <Box sx={{ p: { xs: 1, md: 3 } }}>
                {[
                  {
                    title: 'Solution Planning',
                    content:
                      'We partner with you to assess your unique goals, challenges, and IT landscape. Our consultants provide vendor-agnostic guidance and tailored roadmaps to align your tech investments with long-term business outcomes.',
                    points: [
                      'Technology audits & gap analysis',
                      'Digital transformation roadmaps',
                      'Vendor & solution alignment',
                      'Compliance & risk assessments',
                    ],
                  },
                  {
                    title: 'Solution Architecture',
                    content:
                      'We architect future-proof solutions using our deep domain expertise across infrastructure, cloud, cybersecurity, collaboration, and AI. Every design is customized for performance, security, and scalability.',
                    points: [
                      'Infrastructure & hybrid cloud planning',
                      'Secure network architecture',
                      'Cybersecurity framework design',
                      'Integration planning across platforms',
                    ],
                  },
                  {
                    title: 'Deployment & Integration',
                    content:
                      'Our certified engineers handle the heavy lifting — from installation to full-stack integration. We ensure systems are configured optimally and integrated with minimal disruption.',
                    points: [
                      'Solution deployment (on-prem, hybrid, cloud)',
                      'Platform configuration & policy enforcement',
                      'Data & system migration',
                      'API and third-party tool integrations',
                    ],
                  },
                  {
                    title: 'Optimization & Enablement',
                    content:
                      'We don’t walk away after go-live. Our post-deployment services ensure your tech delivers ongoing ROI — with optimization, training, and hands-on enablement.',
                    points: [
                      'Performance tuning & resource optimization',
                      'End-user & admin training',
                      'Health checks & usage analytics',
                      'Technical documentation & SOP development',
                    ],
                  },
                ].map((section, index) => (
                  <Accordion
                    key={index}
                    sx={{
                      mb: 2,
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                      '&:before': { display: 'none' },
                      maxWidth: { xs: '100%', md: '80%' },
                      animation: isVisible
                        ? `slideInLeft 0.5s ease-out ${index * 0.2}s forwards`
                        : 'none',
                      opacity: isVisible ? 1 : 0,
                      '@keyframes slideInLeft': {
                        '0%': {
                          opacity: 0,
                          transform: 'translateX(-30px)',
                        },
                        '100%': {
                          opacity: 1,
                          transform: 'translateX(0)',
                        },
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon sx={{ color: '#ffffff' }} />}
                      sx={{
                        background: 'linear-gradient(90deg, #1a9fd9, #24b24c)',
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          color: '#ffffff',
                          fontWeight: 'bold',
                          fontSize: { xs: '1rem', md: '1.25rem' },
                        }}
                      >
                        {section.title}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ padding: '20px' }}>
                      <Typography
                        variant="body2"
                        sx={{
                          mb: 2,
                          color: '#333',
                          fontSize: { xs: '0.9rem', md: '1rem' },
                          animation: isVisible ? 'fadeIn 0.5s ease-out' : 'none',
                          '@keyframes fadeIn': {
                            '0%': { opacity: 0 },
                            '100%': { opacity: 1 },
                          },
                        }}
                      >
                        {section.content}
                      </Typography>
                      <Grid container spacing={2}>
                        {section.points.map((point, idx) => (
                          <Grid item xs={12} sm={6} key={idx}>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: '#f8fafc',
                                padding: '10px',
                                borderRadius: '6px',
                                transition: 'all 0.3s',
                                '&:hover': {
                                  backgroundColor: '#e6f0ff',
                                  transform: 'translateY(-2px)',
                                },
                                ...(isVisible && {
                                  animation: `slideUp 0.5s ease-out ${idx * 0.1}s forwards`,
                                  opacity: 0,
                                }),
                                '@keyframes slideUp': {
                                  '0%': {
                                    opacity: 0,
                                    transform: 'translateY(20px)',
                                  },
                                  '100%': {
                                    opacity: 1,
                                    transform: 'translateY(0)',
                                  },
                                },
                              }}
                            >
                              <CheckCircleOutlineIcon
                                sx={{
                                  color: '#24b24c',
                                  marginRight: '10px',
                                  fontSize: '1.2rem',
                                }}
                              />
                              <Typography
                                variant="body2"
                                sx={{
                                  color: '#555',
                                  fontSize: { xs: '0.85rem', md: '0.95rem' },
                                }}
                              >
                                {point}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Services3;
