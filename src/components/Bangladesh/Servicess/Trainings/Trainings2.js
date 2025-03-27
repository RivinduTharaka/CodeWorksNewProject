import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Button, Grid, Card, CardContent, CardMedia, Modal, Input } from '@mui/material';
import { styled } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material';
import { motion } from 'framer-motion';
import RoomIcon from '@mui/icons-material/Room';
import Swal from 'sweetalert2';

// Import images
import trainingImage1 from '../../../../assets/image/download (1).jpg';
import trainingImage2 from '../../../../assets/image/download (2).jpg';
import trainingImage3 from '../../../../assets/image/download (3).jpg';
import trainingImage4 from '../../../../assets/image/download (4).jpg';
import arrowImage from '../../../../assets/image/down-arrow.png';
import f5Logo from '../../../../assets/image/download (1).jpg';

// Theme setup
const theme = createTheme({
  palette: {
    primary: { main: '#1565C0', light: '#64B5F6', dark: '#0D47A1' },
    text: { primary: '#333', secondary: '#555' },
  },
  typography: { fontFamily: "'Poppins', sans-serif" },
});

// Styled Components
const HeroSection = styled(Box)({
  backgroundColor: '#f5f7fa',
  padding: '100px 0 60px',
  textAlign: 'center',
});

const Title = styled(Typography)({
  fontSize: '2.5rem',
  fontWeight: 600,
  background: "linear-gradient(135deg, rgb(1, 87, 38), #070054)",
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  marginBottom: '1rem',
});

const Subtitle = styled(Typography)({
  fontSize: '1.2rem',
  background: "linear-gradient(135deg, rgb(1, 87, 38), #070054)",
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  maxWidth: '800px',
  margin: '0 auto 2rem',
});

const CustomButton = styled(Button)({
  backgroundColor: "#102166",
  color: '#ffffff',
  fontSize: '1rem',
  fontWeight: 500,
  textTransform: 'none',
  borderRadius: '20px',
  padding: '0.6rem 2rem',
  fontFamily: "'Poppins', sans-serif",
  alignItems: 'center',
  gap: '0.5rem',
  '&:hover': {
    backgroundColor: "#24398f",
  },
});

const ArrowImage = styled('img')({
  width: '20px',
  height: '20px',
  objectFit: 'contain',
});

const TrainingCard = styled(Card)({
  width: { xs: '100%', sm: 345 },
  height: 380,
  display: "flex",
  flexDirection: "column",
  position: "relative",
  maxHeight: 380,
  maxWidth: { xs: '100%', sm: 345 },
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  transition: 'transform 0.3s, box-shadow 0.3s',
});

const TrainingMedia = styled(CardMedia)({
  width: '100%',
  height: 260,
  padding: '8px',
});

const TrainingTitle = styled(Typography)({
  fontSize: '1.25rem',
  fontWeight: 600,
  color: theme.palette.text.primary,
});

const RegisterButton = styled(Button)({
  color: 'white',
  fontSize: '0.9rem',
  fontWeight: 500,
  textTransform: 'none',
  fontFamily: "'Poppins', sans-serif",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  position: 'absolute',
  bottom: '14px',
  right: '14px',
  backgroundColor: 'rgba(7, 0, 84, 0.8)',
  transition: 'color 0.3s ease, background-color 0.3s ease',
  '&:hover': {
    color: 'rgba(7, 0, 84, 0.8)',
    backgroundColor: 'white',
  },
});

const ModalContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxWidth: 600,
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  padding: '20px',
  outline: 'none',
  maxHeight: '90vh',
  overflowY: 'auto',
  [theme.breakpoints.down('sm')]: {
    width: '85%',
    padding: '10px',
  },
}));

const ModalHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '16px',
});

const ModalLogo = styled('img')({
  width: '40px',
  height: '40px',
});

const ModalTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 600,
  color: theme.palette.text.primary,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.25rem',
  },
}));

const ModalDescription = styled(Typography)(({ theme }) => ({
  fontSize: '0.9rem',
  color: theme.palette.text.secondary,
  marginBottom: '16px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
  },
}));

const ModalDetails = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '8px',
});

const ModalDetailText = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: theme.palette.text.primary,
  marginBottom: '8px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.85rem',
  },
}));

const CustomInput = styled(Input)({
  width: '100%',
  '&:before': {
    borderBottom: '1px solid #000',
  },
  '&:hover:not(.Mui-disabled):before': {
    borderBottom: '1px solid #000',
  },
  '&:after': {
    borderBottom: '2px solid rgb(5, 59, 12)',
  },
});

const FormLabel = styled(Typography)({
  fontSize: '1rem',
  color: '#333',
  marginBottom: '0.5rem',
  '& .required': {
    color: '#d32f2f',
  },
});

// Motion Animation Variants
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Mock function to simulate database submission
const submitToDatabase = async (data) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const isSuccess = Math.random() > 0.2;
    if (isSuccess) {
      return { success: true, message: 'Registration successful!' };
    } else {
      throw new Error('Failed to register. Please try again.');
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Main Component
function Trainings2() {
  const [trainings, setTrainings] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState(null);

  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    companyName: '',
    designation: '',
  });

  // State for form errors
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchTrainings = async () => {
      const mockData = [
        {
          id: 1,
          title: "Configuring Advanced WAF",
          image: trainingImage1,
          subject: "Subject to interest",
          language: "English",
          location: "Dubai",
          mode: "In-classroom",
          date: "Mar 17, 2025",
          duration: "4 Days",
          sessionTime: "9:00 AM - 5:00 PM",
          seats: 20,
          description: "This training provides an in-depth understanding of configuring advanced Web Application Firewalls (WAF) to protect against sophisticated cyber threats. Hands-on labs included.",
        },
        {
          id: 2,
          title: "Advanced Fortinet Security Training",
          image: trainingImage2,
          subject: "Subject to interest",
          language: "English",
          location: "Dubai",
          mode: "In-classroom",
          date: "Mar 17, 2025",
          duration: "4 Days",
          sessionTime: "9:00 AM - 5:00 PM",
          seats: 15,
          description: "Explore advanced Fortinet security solutions with expert-led sessions, focusing on firewall configuration and network security optimization.",
        },
        {
          id: 3,
          title: "Network Security Fundamentals",
          image: trainingImage3,
          subject: "Subject to interest",
          language: "English",
          location: "Dubai",
          mode: "In-classroom",
          date: "Mar 17, 2025",
          duration: "4 Days",
          sessionTime: "9:00 AM - 5:00 PM",
          seats: 25,
          description: "A foundational course covering network security basics, including protocols, encryption, and threat detection techniques.",
        },
        {
          id: 4,
          title: "Cybersecurity Threat Analysis",
          image: trainingImage4,
          subject: "Subject to interest",
          language: "English",
          location: "Dubai",
          mode: "In-classroom",
          date: "Mar 17, 2025",
          duration: "4 Days",
          sessionTime: "9:00 AM - 5:00 PM",
          seats: 18,
          description: "Learn to identify, analyze, and mitigate cybersecurity threats using real-world scenarios and advanced analytical tools.",
        },
      ];
      setTrainings(mockData);
    };
    fetchTrainings();
  }, []);

  const handleOpenModal = (training) => {
    console.log("Selected Training:", training);
    setSelectedTraining(training);
    setOpenModal(true);
    setFormData({
      name: '',
      email: '',
      contactNumber: '',
      companyName: '',
      designation: '',
    });
    setFormErrors({});
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedTraining(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.contactNumber) errors.contactNumber = 'Contact number is required';
    if (!formData.companyName) errors.companyName = 'Company name is required';
    if (!formData.designation) errors.designation = 'Designation is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegisterClick = async (training) => {
    if (validateForm()) {
      handleCloseModal();
      try {
        const response = await submitToDatabase({ ...formData, trainingId: training.id });
        if (response.success) {
          await Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: response.message,
            confirmButtonText: 'OK',
            timer: 3000,
            timerProgressBar: true,
            didOpen: () => {
              const popup = Swal.getPopup();
              if (popup) {
                popup.style.zIndex = '1500';
              }
            },
          });
          window.location.reload();
        } else {
          await Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: response.message,
            confirmButtonText: 'Try Again',
            didOpen: () => {
              const popup = Swal.getPopup();
              if (popup) {
                popup.style.zIndex = '1500';
              }
            },
          });
        }
      } catch (error) {
        await Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An unexpected error occurred. Please try again.',
          confirmButtonText: 'Try Again',
          didOpen: () => {
            const popup = Swal.getPopup();
            if (popup) {
              popup.style.zIndex = '1500';
            }
          },
        });
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <HeroSection>
        <Container maxWidth="lg">
          <Title variant="h1">Training Programs at Connex Information Technologies</Title>
          <Subtitle variant="h2">
            Elevate your skills with transformative training – join us to connect, learn, and grow with industry experts.
          </Subtitle>
          <CustomButton>
            Enroll Now
            <ArrowImage src={arrowImage} alt="Scroll down arrow" />
          </CustomButton>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4} justifyContent="center">
          {trainings.length > 0 ? (
            trainings.map((training, index) => (
              <Grid item xs={12} sm={6} md={4} key={training.id}>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                  transition={{ delay: index * 0.2 }}
                >
                  <TrainingCard>
                    <Box sx={{ position: "relative", height: '260px' }}>
                      <TrainingMedia component="img" image={training.image} alt={training.title} />
                    </Box>
                    <CardContent sx={{ flexGrow: 1, backgroundColor: '#f5f7fa', position: 'relative', p: 2 }}>
                      <TrainingTitle>{training.title}</TrainingTitle>
                      <RegisterButton onClick={() => handleOpenModal(training)}>
                        Enroll Now →
                      </RegisterButton>
                    </CardContent>
                  </TrainingCard>
                </motion.div>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
              Loading trainings...
            </Typography>
          )}
        </Grid>
      </Container>

      {/* Modal for Training Details */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <ModalContent>
          <ModalHeader>
            <ModalLogo src={f5Logo} alt="F5 Logo" />
            <ModalTitle>{selectedTraining?.title || 'Training Title'}</ModalTitle>
          </ModalHeader>
          <Box>
            <ModalDescription>{selectedTraining?.description || 'No description available'}</ModalDescription>
            <ModalDetailText sx={{ mb: 1 }}>{selectedTraining?.subject || 'Subject not specified'}</ModalDetailText>
            <ModalDetails>
              <RoomIcon sx={{ fontSize: '20px', color: theme.palette.text.primary }} />
              <ModalDetailText>
                {selectedTraining?.language || 'N/A'} – {selectedTraining?.location || 'N/A'} – {selectedTraining?.mode || 'N/A'}
              </ModalDetailText>
            </ModalDetails>
            <ModalDetailText>
              Start Date: {selectedTraining?.date || 'N/A'}
            </ModalDetailText>
            <ModalDetailText>
              Duration: {selectedTraining?.duration || 'N/A'}
            </ModalDetailText>
            <ModalDetailText>
              Daily Session Time: {selectedTraining?.sessionTime || 'Not specified'}
            </ModalDetailText>
            <ModalDetailText>
              Seats Available: {selectedTraining?.seats || 'N/A'}
            </ModalDetailText>
            <hr />
            {/* Form Fields */}
            <Box sx={{ mt: 2 }}>
              <FormLabel>Name:<span className="required"> *</span></FormLabel>
              <CustomInput
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={!!formErrors.name}
                placeholder="Enter your name"
              />
              {formErrors.name && <Typography color="error">{formErrors.name}</Typography>}

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
                <Box sx={{ flex: 1, minWidth: '200px' }}>
                  <FormLabel>Company:</FormLabel>
                  <CustomInput
                    fullWidth
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    error={!!formErrors.companyName}
                    placeholder="Enter your company name"
                  />
                  {formErrors.companyName && <Typography color="error">{formErrors.companyName}</Typography>}
                </Box>
                <Box sx={{ flex: 1, minWidth: '200px' }}>
                  <FormLabel>Phone:</FormLabel>
                  <CustomInput
                    fullWidth
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    error={!!formErrors.contactNumber}
                    placeholder="Enter your phone number"
                  />
                  {formErrors.contactNumber && <Typography color="error">{formErrors.contactNumber}</Typography>}
                </Box>
              </Box>

              <FormLabel>Email:</FormLabel>
              <CustomInput
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={!!formErrors.email}
                placeholder="Enter your email"
              />
              {formErrors.email && <Typography color="error">{formErrors.email}</Typography>}

              <FormLabel>Designation:</FormLabel>
              <CustomInput
                fullWidth
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                error={!!formErrors.designation}
                placeholder="Enter your designation"
              />
              {formErrors.designation && <Typography color="error">{formErrors.designation}</Typography>}
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              mt: 2,
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 1, sm: 0 },
            }}
          >
            <Button
              onClick={handleCloseModal}
              sx={{ mr: { xs: 0, sm: 1 }, width: { xs: '100%', sm: 'auto' } }}
            >
              Close
            </Button>
            <Button
              onClick={() => handleRegisterClick(selectedTraining)}
              variant="contained"
              sx={{
                backgroundColor: "#102166",
                color: '#fff',
                '&:hover': { backgroundColor: "#24398f" },
                width: { xs: '100%', sm: 'auto' },
              }}
            >
              Register
            </Button>
          </Box>
        </ModalContent>
      </Modal>
    </ThemeProvider>
  );
}

export default Trainings2;