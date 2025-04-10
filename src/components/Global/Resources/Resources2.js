// src/components/Resources2.jsx
import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import ResourceCard from './ResourceCard';

// Import images
import unit42Img from '../../../assets/image/p7.jpg';
import lasVegas5gImg from '../../../assets/image/p2.jpg';
import researchReportImg from '../../../assets/image/p1.jpg';

const filters = ["All", "Unit 42", "Case Studies", "Research Reports"];

const resourceData = {
  All: [
    {
      category: "UNIT 42",
      title: "How Prompt Attacks Exploit GenAI and How to Fight Back",
      image: unit42Img,
      actionText: "Read the story",
    },
    {
      category: "REFERENCES AND CASE STUDIES",
      title: "Las Vegas Drives 5G Connectivity with Palo Alto Networks Security",
      image: lasVegas5gImg,
      actionText: "Read the customer story",
    },
    {
      category: "RESEARCH REPORTS",
      title: "Securing GenAI: A Comprehensive Report on Prompt Attacks",
      image: researchReportImg,
      actionText: "Explore research reports",
    }
  ],
  "Unit 42": [
    {
      category: "UNIT 42",
      title: "How Prompt Attacks Exploit GenAI and How to Fight Back",
      image: unit42Img,
      actionText: "Read the story",
    },{
        category: "UNIT 42",
        title: "How Prompt Attacks Exploit GenAI and How to Fight Back",
        image: unit42Img,
        actionText: "Read the story",
      }
  ],
  "Case Studies": [
    {
      category: "REFERENCES AND CASE STUDIES",
      title: "Las Vegas Drives 5G Connectivity with Palo Alto Networks Security",
      image: lasVegas5gImg,
      actionText: "Read the customer story",
    }
  ],
  "Research Reports": [
    {
      category: "RESEARCH REPORTS",
      title: "Securing GenAI: A Comprehensive Report on Prompt Attacks",
      image: researchReportImg,
      actionText: "Explore research reports",
    }
  ]
};

function Resources2() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <Box 
      sx={{ 
        px: { xs: 2, md: 4 }, 
        py: 6,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
        }}
      >
        {/* Sidebar */}
        <Box 
          sx={{ 
            width: { xs: '100%', md: 250 }, 
            bgcolor: 'white',
            borderRadius: 2,
            p: 2,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          }}
        >
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 2, 
              color: '#1976d2',
              fontWeight: 700 
            }}
          >
            Filter by
          </Typography>
          <List>
            {filters.map((filter) => (
              <ListItem
                key={filter}
                onClick={() => handleFilterClick(filter)}
                sx={{
                  borderRadius: 1,
                  mb: 1,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  bgcolor: selectedFilter === filter ? '#1976d2' : 'transparent',
                  color: selectedFilter === filter ? 'white' : 'text.primary',
                  '&:hover': {
                    bgcolor: selectedFilter === filter ? '#1565c0' : '#f5f5f5',
                  },
                }}
              >
                <ListItemText 
                  primary={filter}
                  primaryTypographyProps={{
                    fontWeight: selectedFilter === filter ? 600 : 400,
                  }}
                />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
        </Box>

        {/* Main Content */}
        <Box flex={1}>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              mb: 3,
              color: '#666',
              fontStyle: 'italic',
            }}
          >
            Displaying 1 to {resourceData[selectedFilter].length} of {resourceData.All.length}
          </Typography>
          <Grid 
            container 
            spacing={3}
            justifyContent={isMobile ? 'center' : 'flex-start'}
          >
            {resourceData[selectedFilter].map((res, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <ResourceCard {...res} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default Resources2;