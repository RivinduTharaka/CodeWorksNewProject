import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Container, Button, Grid, Card, CardContent, CardMedia, Modal, Input } from '@mui/material';
import { styled } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material';
import { motion } from 'framer-motion';
import RoomIcon from '@mui/icons-material/Room';
import Swal from 'sweetalert2';
import { selectData, insertData } from '../../../../services/dataService'; // Assuming these are your API services
import API_URL from '../../../../flieapi'; // Base API URL for image fetching
import arrowImage from '../../../../assets/image/down-arrow.png';
import AutoLogin from '../../../../services/AutoLogin'; // Assuming this is your AutoLogin service

// In-memory cache for images
const imageCache = new Map();
const apiCache = new Map();

// Construct full image URL
const constructImageUrl = (filePath) => {
  if (!filePath) return 'https://via.placeholder.com/300x200?text=No+Image';
  const cleanedFilePath = filePath.replace(/^\/+/, '');
  return `${API_URL}/${cleanedFilePath}`;
};

// Fetch image with caching
const fetchImage = async (filePath) => {
  const imageUrl = constructImageUrl(filePath);
  if (imageCache.has(imageUrl)) return imageCache.get(imageUrl);

  try {
    const response = await fetch(imageUrl);
    if (response.ok) {
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      imageCache.set(imageUrl, objectUrl);
      return objectUrl;
    } else {
      return 'https://via.placeholder.com/300x200?text=Image+Not+Found';
    }
  } catch {
    return 'https://via.placeholder.com/300x200?text=Image+Not+Found';
  }
};

// Helper to truncate text (used for title)
const truncateText = (text, maxLength = 50) =>
  text.length <= maxLength ? text : text.substring(0, maxLength) + '...';

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

const TrainingCard = styled(Card)(({ theme }) => ({
  width: { xs: '100%', sm: 345 },
  height: 420, // Increased height from 380px to 420px
  display: "flex",
  flexDirection: "column",
  position: "relative",
  maxHeight: 420, // Updated maxHeight to match the new height
  maxWidth: { xs: '100%', sm: 345 },
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  transition: 'transform 0.3s, box-shadow 0.3s',
  [theme.breakpoints.down('sm')]: {
    height: 450, // Slightly smaller height for mobile screens
    maxHeight: 450,
  },
}));

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
  objectFit: 'cover', // Ensures the image fits well within the dimensions
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

// Function to insert registration data into the database
const submitToDatabase = async (data) => {
  try {
    const registrationData = {
      full_name: data.name,
      company_name: data.companyName,
      phone_no: data.contactNumber,
      email: data.email,
      designation: data.designation,
      country_id: 3, // Assuming country_id 3 for "global"
      training_session_id: data.trainingId,
      is_attendance_marked: 0, // Default value as per the table
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' '), // Current timestamp in MySQL format
      updated_at: new Date().toISOString().slice(0, 19).replace('T', ' '), // Current timestamp in MySQL format
    };

    const response = await insertData('training_session_registrations', registrationData);
    if (response.message === 'Data inserted successfully') {
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
  const [loading, setLoading] = useState(true); // State for loading status

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

  // Fetch trainings from the database
  const fetchTrainings = useCallback(async () => {
    setLoading(true);
    const cacheKey = 'trainings_country_3';

    // Check if data is already in cache
    if (apiCache.has(cacheKey)) {
      setTrainings(apiCache.get(cacheKey));
      setLoading(false);
      return;
    }

    try {
      // Step 1: Fetch training sessions for country_id 3
      const trainingSessionsResponse = await selectData('training_sessions', {
        country_id: 3,
        is_active: true,
      });
      if (!trainingSessionsResponse.data?.length) {
        setTrainings([]);
        setLoading(false);
        return;
      }

      // Step 2: Format the training sessions and fetch their images
      const formattedTrainings = await Promise.all(
        trainingSessionsResponse.data.map(async (training) => ({
          id: training.id,
          title: training.title,
          image: await fetchImage(training.image), // Fetch image with caching
          subject: training.subject || 'Subject to interest',
          language: training.language || 'English',
          location: training.location || 'N/A',
          mode: training.mode || 'N/A',
          date: training.start_date || 'N/A',
          duration: training.duration || 'N/A',
          sessionTime: training.daily_session_time || 'Not specified',
          seats: training.remaining_seat_count || 0, // Use remaining_seat_count for available seats
          description: training.description || 'No description available',
        }))
      );

      // Step 3: Cache the result and update state
      apiCache.set(cacheKey, formattedTrainings);
      setTrainings(formattedTrainings);
    } catch (error) {
      setTrainings([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch trainings on component mount
  useEffect(() => {
    fetchTrainings();
  }, [fetchTrainings]);

  const handleOpenModal = (training) => {
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
      <AutoLogin />
      <HeroSection>
        <Container maxWidth="lg">
          <Title variant="h1">Training Programs at Connex Information Technologies</Title>
          <Subtitle variant="h2">
            Elevate your skills with transformative training – join us to connect, learn, and grow with industry experts.
          </Subtitle>
          <CustomButton>
            Register Now
            <ArrowImage src={arrowImage} alt="Scroll down arrow" />
          </CustomButton>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4} justifyContent="center">
          {loading ? (
            <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
              Loading trainings...
            </Typography>
          ) : trainings.length > 0 ? (
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
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        backgroundColor: '#f5f7fa',
                        position: 'relative',
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        overflow: 'hidden', // Handle overflow if content is too long
                      }}
                    >
                      <Box>
                        <TrainingTitle>{truncateText(training.title, 50)}</TrainingTitle> {/* Added character limit */}
                      </Box>
                      <RegisterButton onClick={() => handleOpenModal(training)}>
                        Register Now →
                      </RegisterButton>
                    </CardContent>
                  </TrainingCard>
                </motion.div>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
              No trainings available for this country.
            </Typography>
          )}
        </Grid>
      </Container>

      {/* Modal for Training Details */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <ModalContent>
          <ModalHeader>
            <ModalLogo src={selectedTraining?.image || 'https://via.placeholder.com/40?text=No+Image'} alt={selectedTraining?.title || 'Training Logo'} />
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