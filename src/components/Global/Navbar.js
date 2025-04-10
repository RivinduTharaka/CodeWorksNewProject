import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Box,
  Divider,
  Grid,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  ExpandMore,
  ExpandLess,
  ChevronRight, // Added ChevronRight icon for the arrow
} from '@mui/icons-material';
import { styled, keyframes } from '@mui/system';
import { useMediaQuery, createTheme, ThemeProvider } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import image1 from '../../assets/image/logoNavbar/Connex-LogoWhite.png';
import image2 from '../../assets/image/logoNavbar/ConnexIT.png';

// Import flag images for the countries (matching SLNavbar)
import globalFlag from '../../assets/image/flag/internet.png'; // Connex Global
import australiaFlag from '../../assets/image/flag/australia.png';
import bangladeshFlag from '../../assets/image/flag/bangladesh.png';
import bruneiFlag from '../../assets/image/flag/brunei.png';
import cambodiaFlag from '../../assets/image/flag/cambodia.png';
import indiaFlag from '../../assets/image/flag/india.png';
import maldivesFlag from '../../assets/image/flag/maldives.png';
import mauritiusFlag from '../../assets/image/flag/mauritius.png';
import nepalFlag from '../../assets/image/flag/nepal.png';
import singaporeFlag from '../../assets/image/flag/singapore.png';
import sriLankaFlag from '../../assets/image/flag/sri-lanka.png';
import thailandFlag from '../../assets/image/flag/thailand.png';
import uaeFlag from '../../assets/image/flag/uae.png';
import newZealandFlag from '../../assets/image/flag/new-zealand (1).png'; // Added New Zealand flag
import malaysiaFlag from '../../assets/image/flag/malaysia.png';
import bhutanFlag from '../../assets/image/flag/bhutan.png';

// Updated Country Flags Array with specified routes (matching SLNavbar)
const countries = [
  { name: "Connex Global", flag: globalFlag, route: "/" },
  { name: "Australia", flag: australiaFlag, route: "/au" },
  { name: "Bangladesh", flag: bangladeshFlag, route: "/bgd" },
  { name: "Bhutan", flag: bhutanFlag, route: "/bt" },
  { name: "Brunei", flag: bruneiFlag, route: "/brn" },
  { name: "Cambodia", flag: cambodiaFlag, route: "/kh" },
  { name: "India", flag: indiaFlag, route: "/in" },
  { name: "Malaysia", flag: malaysiaFlag, route: "/my" },
  { name: "Maldives", flag: maldivesFlag, route: "/mv" },
  { name: "Mauritius", flag: mauritiusFlag, route: "/mu" },
  { name: "Nepal", flag: nepalFlag, route: "/npl" },
  { name: "New Zealand", flag: newZealandFlag, route: "/nz" },
  { name: "Singapore", flag: singaporeFlag, route: "/sg" },
  { name: "Sri Lanka", flag: sriLankaFlag, route: "/SL" },
  { name: "Thailand", flag: thailandFlag, route: "/th" },
  { name: "UAE", flag: uaeFlag, route: "/uae" },
];

// Define Futuristic Theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#00D4FF",
      light: "#64FFDA",
      dark: "#0288D1",
    },
    text: {
      primary: "#E0E0E0",
      secondary: "#B0BEC5",
    },
  },
  typography: {
    fontFamily: "'Orbitron', sans-serif",
  },
});

// Keyframes for glowing effect
const glow = keyframes`
  0% { box-shadow: 0 0 5px #00D4FF, 0 0 10px #00D4FF; }
  50% { box-shadow: 0 0 10px #00D4FF, 0 0 20px #00D4FF; }
  100% { box-shadow: 0 0 5px #00D4FF, 0 0 10px #00D4FF; }
`;

// Keyframes for dropdown slide-in
const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components for Futuristic Navbar
const FuturisticAppBar = styled(AppBar)(({ isTargetPage, isScrolled }) => ({
  background: isTargetPage && !isScrolled
    ? "linear-gradient(90deg, rgba(15, 32, 39, 0.8) 0%, rgba(32, 58, 67, 0.8) 50%, rgba(44, 83, 100, 0.8) 100%)"
    : "linear-gradient(90deg, #0F2027 0%, #203A43 50%, #2C5364 100%)",
  boxShadow: "0 0 15px rgba(0, 212, 255, 0.5)",
  padding: "0",
  animation: `${glow} 2s infinite`,
  transition: "background 0.5s ease",
}));

const FuturisticToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 10px",
  maxWidth: "1300px",
  margin: "0 auto",
  width: "100%",
});

const ButtonContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "0.8rem",
});

const NeonHoverEffect = styled("span")(({ active }) => ({
  display: "block",
  width: active ? "100%" : "0%",
  height: "2px",
  background: "linear-gradient(90deg, #00D4FF, rgb(20, 153, 58))",
  transition: "width 0.4s ease-in-out",
}));

const FuturisticButton = styled(Button)(({ isTargetPage, isScrolled, active }) => ({
  color: isTargetPage && !isScrolled ? "#E0E0E0" : "#FFFFFF",
  fontSize: "0.9rem",
  fontWeight: "500",
  textTransform: "none",
  fontFamily: "'Orbitron', sans-serif",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1px",
  padding: "0.5rem 0.55rem",
  transition: "transform 0.3s ease, text-shadow 0.3s ease",
  "&:hover": {
    backgroundColor: "transparent",
    transform: "scale(1.1)",
    textShadow: "0 0 4px #00D4FF",
  },
}));

const DropdownButton = styled(FuturisticButton)(({ isOpen }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "0.2rem",
  "& .MuiSvgIcon-root": {
    fontSize: "1rem",
    transition: "transform 0.3s ease, color 0.3s ease",
    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
    color: isOpen ? "#00D4FF" : "inherit",
  },
  "&:hover .MuiSvgIcon-root": {
    color: "#00D4FF",
  },
}));

const ContactButton = styled(Button)(({ isScrolled, isContactPage }) => ({
  background: isContactPage
    ? "linear-gradient(45deg, rgb(0, 97, 27), rgb(3, 87, 0))"
    : isScrolled
      ? "linear-gradient(45deg, #1a9fd9, #24b24c)"
      : "linear-gradient(45deg, #24b24c , #1a9fd9 )",
  color: "#FFFFFF",
  fontSize: "0.9rem",
  fontWeight: "500",
  textTransform: "none",
  borderRadius: "20px",
  padding: "0.5rem 1.25rem",
  fontFamily: "'Orbitron', sans-serif",
  transition: "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
  "&:hover": {
    background: "rgb(1, 34, 20)",
    transform: "scale(1.05)",
  },
}));

const FuturisticMenu = styled(Menu)({
  "& .MuiPaper-root": {
    background: "rgba(15, 32, 39, 0.4)",
    backdropFilter: "blur(10px)",
    borderRadius: "10px",
    boxShadow: "0 0 15px rgba(0, 212, 255, 0.3)",
    padding: "0.5rem 0",
    animation: `${slideIn} 0.3s ease-in-out`,
    "&::-webkit-scrollbar": {
      width: "4px",
    },
    "&::-webkit-scrollbar-track": {
      background: "rgba(15, 32, 39, 0.8)",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#00D4FF",
      borderRadius: "3px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#0288D1",
    },
  },
});

const FuturisticMenuItem = styled(MenuItem)({
  display: "flex",
  alignItems: "center",
  gap: "0.8rem",
  fontSize: "0.9rem",
  fontFamily: "'Orbitron', sans-serif",
  color: "#E0E0E0",
  padding: "0.8rem 1rem",
  position: "relative",
  transition: "background 0.3s ease, transform 0.3s ease",
  "&:hover": {
    background: "rgba(0, 212, 255, 0.2)",
    transform: "translateX(5px)",
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: "5px",
      left: "10%",
      width: "80%",
      height: "2px",
      background: "linear-gradient(90deg, #00D4FF, rgb(20, 153, 58))",
    },
  },
  "& img": {
    width: "30px",
    height: "20px",
    borderRadius: "2px",
  },
});

const drawerVariants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: { type: "spring", stiffness: 120 } },
};

const MobileNavLinkContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "100%",
});

const MobileNeonHoverEffect = styled("span")(({ active }) => ({
  display: "block",
  width: active ? "50%" : "0%",
  height: "2px",
  background: "linear-gradient(90deg, #00D4FF, rgb(20, 153, 58))",
  transition: "width 0.4s ease-in-out",
  marginTop: "2px",
}));

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [aboutAnchorEl, setAboutAnchorEl] = useState(null);
  const [eventsAnchorEl, setEventsAnchorEl] = useState(null);
  const [countryAnchorEl, setCountryAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [countriesSubmenuOpen, setCountriesSubmenuOpen] = useState(false);
  const [eventsSubmenuOpen, setEventsSubmenuOpen] = useState(false);
  const [aboutSubmenuOpen, setAboutSubmenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState(() => {
    const currentPath = location.pathname.split('/')[1] || '';
    return countries.find(country => country.route === `/${currentPath}`) || countries[0];
  });

  const isMobile = useMediaQuery("(max-width:950px)");

  const isTargetPage =
    location.pathname === '/' ||
    location.pathname === '/solution' ||
    location.pathname === '/vendors' ||
    location.pathname === '/contact' ||
    location.pathname === '/events' ||
    location.pathname === '/webinars' ||
    location.pathname === '/trainings' ||
    location.pathname === '/services' ||
    location.pathname === '/blog' ||
    location.pathname === '/press-&-media' ||
    location.pathname === '/resources' || // Added Resources
    location.pathname === '/global-coverage' ||
    location.pathname === '/leadership' ||
    location.pathname === '/careers' ||
    location.pathname === '/about';

  const isContactPage = location.pathname === '/contact';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const currentPath = location.pathname.split('/')[1] || '';
    const matchedCountry = countries.find(country => country.route === `/${currentPath}`) || countries[0];
    setSelectedCountry(matchedCountry);
  }, [location.pathname]);

  const handleAboutHover = (event) => setAboutAnchorEl(event.currentTarget);
  const handleAboutClose = () => setAboutAnchorEl(null);
  const handleAboutClick = (event) => setAboutAnchorEl(event.currentTarget);

  const handleEventsHover = (event) => setEventsAnchorEl(event.currentTarget);
  const handleEventsClose = () => setEventsAnchorEl(null);
  const handleEventsClick = (event) => setEventsAnchorEl(event.currentTarget);

  const handleCountryHover = (event) => setCountryAnchorEl(event.currentTarget);
  const handleCountryClose = () => setCountryAnchorEl(null);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setCountryAnchorEl(null);
    setCountriesSubmenuOpen(false);
    setDrawerOpen(false);
    navigate(country.route);
  };

  return (
    <ThemeProvider theme={theme}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <FuturisticAppBar position="fixed" isTargetPage={isTargetPage} isScrolled={isScrolled}>
          <FuturisticToolbar>
            <Link to="/" style={{ padding: "10px 0 10px 10px", display: "flex", alignItems: "center" }}>
              <motion.img
                src={isTargetPage && !isScrolled ? image1 : image2}
                alt="CONNEX Logo"
                style={{
                  height: "40px",
                  width: "auto",
                  cursor: "pointer",
                }}
              />
            </Link>

            {isMobile ? (
              <>
                <div style={{ padding: 5 }}>
                  <IconButton onClick={() => setDrawerOpen(true)} edge="end">
                    <MenuIcon
                      sx={{
                        fontSize: 30,
                        color: isTargetPage && !isScrolled ? "#E0E0E0" : "#FFFFFF",
                        textShadow: "0 0 5px #00D4FF",
                      }}
                    />
                  </IconButton>

                  <AnimatePresence>
                    {drawerOpen && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={drawerVariants}
                        style={{
                          position: "fixed",
                          top: 0,
                          right: 10,
                          width: "75%",
                          height: "100vh",
                          background: "rgba(15, 32, 39, 0.9)",
                          backdropFilter: "blur(10px)",
                          boxShadow: "-4px 0 12px rgba(0, 212, 255, 0.5)",
                          zIndex: 1300,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Box sx={{ display: "flex", justifyContent: "flex-end", padding: 2 }}>
                          <IconButton onClick={() => setDrawerOpen(false)}>
                            <CloseIcon sx={{ color: "#FFFFFF", textShadow: "0 0 5px #00D4FF" }} />
                          </IconButton>
                        </Box>

                        <List sx={{ padding: "0 1.5rem" }}>
                          <ListItem component={Link} to="/solution" onClick={() => setDrawerOpen(false)}>
                            <ListItemText primary="Solutions" primaryTypographyProps={{ style: { color: "#E0E0E0", fontFamily: "'Orbitron', sans-serif" } }} />
                          </ListItem>
                          <ListItem component={Link} to="/vendors" onClick={() => setDrawerOpen(false)}>
                            <ListItemText primary="Vendors" primaryTypographyProps={{ style: { color: "#E0E0E0", fontFamily: "'Orbitron', sans-serif" } }} />
                          </ListItem>

                          <ListItem component={Link} to="/services" onClick={() => setDrawerOpen(false)}>
                            <ListItemText primary="Services" primaryTypographyProps={{ style: { color: "#E0E0E0", fontFamily: "'Orbitron', sans-serif" } }} />
                          </ListItem>

                          <ListItem
                            button
                            onClick={() => setEventsSubmenuOpen(!eventsSubmenuOpen)}
                            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                          >
                            <MobileNavLinkContainer>
                              <ListItemText
                                primary="Explore"
                                primaryTypographyProps={{ style: { color: "#E0E0E0", fontFamily: "'Orbitron', sans-serif",  } }}
                              />
                              <MobileNeonHoverEffect active={location.pathname === '/events' || location.pathname === '/webinars' || location.pathname === '/trainings' || location.pathname === '/press-&-media' || location.pathname === '/blog' || location.pathname === '/resources'} />
                            </MobileNavLinkContainer>
                            {eventsSubmenuOpen ? (
                              <ExpandLess sx={{ color: "#00D4FF" }} />
                            ) : (
                              <ExpandMore sx={{ color: "#00D4FF" }} />
                            )}
                          </ListItem>
                          <Collapse in={eventsSubmenuOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                              <ListItem
                                component={Link}
                                to="/events"
                                sx={{ pl: 4, py: 1 }}
                                onClick={() => setDrawerOpen(false)}
                              >
                                <ListItemText primary="Events" primaryTypographyProps={{ style: { color: "#E0E0E0", fontFamily: "'Orbitron', sans-serif" } }} />
                              </ListItem>
                              <Divider sx={{ my: 1, background: "linear-gradient(90deg,rgb(100, 224, 249), rgb(255, 255, 255))" , height: "2px",  opacity: 0.1 }} />

                              <ListItem
                                component={Link}
                                to="/webinars"
                                sx={{ pl: 4, py: 1 }}
                                onClick={() => setDrawerOpen(false)}
                              >
                                <ListItemText primary="Webinars" primaryTypographyProps={{ style: { color: "#E0E0E0", fontFamily: "'Orbitron', sans-serif" } }} />
                              </ListItem>
                              <Divider sx={{ my: 1, background: "linear-gradient(90deg,rgb(100, 224, 249), rgb(255, 255, 255))" , height: "2px", opacity: 0.1 }} />

                              <ListItem
                                component={Link}
                                to="/trainings"
                                sx={{ pl: 4, py: 1 }}
                                onClick={() => setDrawerOpen(false)}
                              >
                                <ListItemText primary="Workshops & Trainings" primaryTypographyProps={{ style: { color: "#E0E0E0", fontFamily: "'Orbitron', sans-serif" } }} />
                              </ListItem>
                              <Divider sx={{ my: 1, background: "linear-gradient(90deg,rgb(100, 224, 249), rgb(255, 255, 255))" , height: "2px", opacity: 0.1 }} />

                              <ListItem
                                component={Link}
                                to="/press-&-media"
                                sx={{ pl: 4, py: 1 }}
                                onClick={() => setDrawerOpen(false)}
                              >
                                <ListItemText primary="News & Press Media" primaryTypographyProps={{ style: { color: "#E0E0E0", fontFamily: "'Orbitron', sans-serif" } }} />
                              </ListItem>
                              <Divider sx={{ my: 1, background: "linear-gradient(90deg,rgb(100, 224, 249), rgb(255, 255, 255))" , height: "2px", opacity: 0.1 }} />

                              <ListItem
                                component={Link}
                                to="/blog"
                                sx={{ pl: 4, py: 1 }}
                                onClick={() => setDrawerOpen(false)}
                              >
                                <ListItemText primary="Blogs" primaryTypographyProps={{ style: { color: "#E0E0E0", fontFamily: "'Orbitron', sans-serif" } }} />
                              </ListItem>
                              <Divider sx={{ my: 1, background: "linear-gradient(90deg,rgb(100, 224, 249), rgb(255, 255, 255))" , height: "2px", opacity: 0.1 }} />

                              <ListItem
                                component={Link}
                                to="/resources"
                                sx={{ pl: 4, py: 1 }}
                                onClick={() => setDrawerOpen(false)}
                              >
                                <ListItemText primary="Resources" primaryTypographyProps={{ style: { color: "#E0E0E0", fontFamily: "'Orbitron', sans-serif" } }} />
                              </ListItem>
                              <Divider sx={{ my: 1, background: "linear-gradient(90deg,rgb(100, 224, 249), rgb(255, 255, 255))" , height: "2px", opacity: 0.1 }} />

                            </List>
                          </Collapse>

                          <ListItem
                            button
                            onClick={() => setAboutSubmenuOpen(!aboutSubmenuOpen)}
                            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                          >
                            <ListItemText
                              primary="About Us"
                              primaryTypographyProps={{ style: { color: "#E0E0E0", fontFamily: "'Orbitron', sans-serif",  } }}
                            />
                            {aboutSubmenuOpen ? (
                              <ExpandLess sx={{ color: "#00D4FF" }} />
                            ) : (
                              <ExpandMore sx={{ color: "#00D4FF" }} />
                            )}
                          </ListItem>
                          <Collapse in={aboutSubmenuOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                              <ListItem
                                component={Link}
                                to="/about"
                                sx={{ pl: 4, py: 1 }}
                                onClick={() => setDrawerOpen(false)}
                              >
                                <ListItemText primary="About Us" primaryTypographyProps={{ style: { color: "#E0E0E0", fontFamily: "'Orbitron', sans-serif" } }} />
                              </ListItem>
                              <Divider sx={{ my: 1, background: "linear-gradient(90deg,rgb(100, 224, 249), rgb(255, 255, 255))", height: "2px", opacity: 0.1 }} />

                              <ListItem
                                component={Link}
                                to="/global-coverage"
                                sx={{ pl: 4, py: 1 }}
                                onClick={() => setDrawerOpen(false)}
                              >
                                <ListItemText primary="Global Coverage" primaryTypographyProps={{ style: { color: "#E0E0E0", fontFamily: "'Orbitron', sans-serif" } }} />
                              </ListItem>
                              <Divider sx={{ my: 1, background: "linear-gradient(90deg,rgb(100, 224, 249), rgb(255, 255, 255))", height: "2px", opacity: 0.1 }} />

                              <ListItem
                                component={Link}
                                to="/leadership"
                                sx={{ pl: 4, py: 1 }}
                                onClick={() => setDrawerOpen(false)}
                              >
                                <ListItemText primary="Leadership" primaryTypographyProps={{ style: { color: "#E0E0E0", fontFamily: "'Orbitron', sans-serif" } }} />
                              </ListItem>
                              <Divider sx={{ my: 1, background: "linear-gradient(90deg,rgb(100, 224, 249), rgb(255, 255, 255))", height: "2px", opacity: 0.1 }} />
                              <ListItem
                                component={Link}
                                to="/careers"
                                sx={{ pl: 4, py: 1 }}
                                onClick={() => setDrawerOpen(false)}
                              >
                                <ListItemText primary="Careers" primaryTypographyProps={{ style: { color: "#E0E0E0", fontFamily: "'Orbitron', sans-serif" } }} />
                              </ListItem>
                              <Divider sx={{ my: 1, background: "linear-gradient(90deg,rgb(100, 224, 249), rgb(255, 255, 255))", height: "2px", opacity: 0.1 }} />

                            </List>
                          </Collapse>

                          <ListItem component={Link} to="/contact" onClick={() => setDrawerOpen(false)}>
                            <ListItemText primary="Contact Us" primaryTypographyProps={{ style: { color: "#E0E0E0", fontFamily: "'Orbitron', sans-serif" } }} />
                          </ListItem>

                          <ListItem
                            button
                            onClick={() => setCountriesSubmenuOpen(!countriesSubmenuOpen)}
                            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                          >
                            <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                              <img src={selectedCountry.flag} alt={`${selectedCountry.name} Flag`} style={{ width: "30px", height: "30px", borderRadius: "2px" }} />
                              <ListItemText
                                primary="Countries"
                                primaryTypographyProps={{ style: { color: "#E0E0E0", fontFamily: "'Orbitron', sans-serif",  } }}
                              />
                            </Box>
                            {countriesSubmenuOpen ? (
                              <ExpandLess sx={{ color: "#00D4FF" }} />
                            ) : (
                              <ExpandMore sx={{ color: "#00D4FF" }} />
                            )}
                          </ListItem>
                          <Collapse in={countriesSubmenuOpen} timeout="auto" unmountOnExit>
                            <List
                              component="div"
                              disablePadding
                              sx={{
                                maxHeight: "250px",
                                overflowY: countries.length > 5 ? "auto" : "hidden",
                                "&::-webkit-scrollbar": { width: "4px" },
                                "&::-webkit-scrollbar-track": { background: "rgba(15, 32, 39, 0.8)" },
                                "&::-webkit-scrollbar-thumb": { background: "#00D4FF", borderRadius: "3px" },
                                "&::-webkit-scrollbar-thumb:hover": { background: "#0288D1" },
                              }}
                            >
                              {countries.map((country) => (
                                <ListItem
                                  key={country.name}
                                  sx={{ pl: 4, py: 1 }}
                                  onClick={() => handleCountrySelect(country)}
                                >
                                  <img src={country.flag} alt={`${country.name} Flag`} style={{ marginRight: "10px", width: "30px", height: "30px", borderRadius: "2px" }} />
                                  <ListItemText
                                    primary={country.name}
                                    primaryTypographyProps={{ style: { color: "#E0E0E0", fontFamily: "'Orbitron', sans-serif" } }}
                                  />
                                </ListItem>
                              ))}
                            </List>
                          </Collapse>

                          <Divider sx={{ my: 1, background: "linear-gradient(90deg, #00D4FF, rgb(20, 153, 58))" }} />
                        </List>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <ButtonContainer>
                <FuturisticButton
                  component={Link}
                  to="/solution"
                  active={location.pathname === "/solution"}
                  isTargetPage={isTargetPage}
                  isScrolled={isScrolled}
                >
                  Solutions
                  <NeonHoverEffect active={location.pathname === "/solution"} />
                </FuturisticButton>

                <FuturisticButton
                  component={Link}
                  to="/vendors"
                  active={location.pathname === "/vendors"}
                  isTargetPage={isTargetPage}
                  isScrolled={isScrolled}
                >
                  Vendors
                  <NeonHoverEffect active={location.pathname === "/vendors"} />
                </FuturisticButton>

                <FuturisticButton
                  component={Link}
                  to="/services"
                  active={location.pathname === "/services"}
                  isTargetPage={isTargetPage}
                  isScrolled={isScrolled}
                >
                  Services
                  <NeonHoverEffect active={location.pathname === "/services"} />
                </FuturisticButton>

                <div
                  onMouseEnter={handleEventsHover}
                  onMouseLeave={handleEventsClose}
                  style={{ position: "relative" }}
                >
                  <DropdownButton
                    active={location.pathname === "/events" || location.pathname === "/webinars" || location.pathname === "/trainings" || location.pathname === "/press-&-media" || location.pathname === "/blog" || location.pathname === "/resources"}
                    isTargetPage={isTargetPage}
                    isScrolled={isScrolled}
                    isOpen={Boolean(eventsAnchorEl)}
                    onClick={handleEventsClick}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
                        Explore
                        <ExpandMore
                          sx={{
                            color: isTargetPage && !isScrolled ? "#E0E0E0" : "#FFFFFF",
                            textShadow: "0 0 5px #00D4FF",
                          }}
                        />
                      </Box>
                      <NeonHoverEffect active={location.pathname === "/events" || location.pathname === "/webinars" || location.pathname === "/trainings" || location.pathname === "/press-&-media" || location.pathname === "/blog" || location.pathname === "/resources"} />
                    </Box>
                  </DropdownButton>

                  <FuturisticMenu
                    id="events-menu"
                    anchorEl={eventsAnchorEl}
                    keepMounted
                    open={Boolean(eventsAnchorEl)}
                    onClose={handleEventsClose}
                    disableScrollLock
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    transformOrigin={{ vertical: "top", horizontal: "left" }}
                    PaperProps={{
                      style: {
                        width: "420px", // Adjusted width to fit 2 items per row
                      },
                    }}
                  >
                    <Grid container sx={{ padding: "0.5rem" }}>
                      <Grid item xs={6}>
                        <FuturisticMenuItem onClick={handleEventsClose} component={Link} to="/blog">
                          <ChevronRight sx={{ color: "#FFFFFF" }} />
                          Blogs
                        </FuturisticMenuItem>
                      </Grid>
                      <Grid item xs={6}>
                        <FuturisticMenuItem onClick={handleEventsClose} component={Link} to="/events">
                          <ChevronRight sx={{ color: "#FFFFFF" }} />
                          Events
                        </FuturisticMenuItem>
                      </Grid>
                      <Grid item xs={6}>
                        <FuturisticMenuItem onClick={handleEventsClose} component={Link} to="/press-&-media">
                          <ChevronRight sx={{ color: "#FFFFFF" }} />
                          News & Press Media
                        </FuturisticMenuItem>
                      </Grid>
                      <Grid item xs={6}>
                        <FuturisticMenuItem onClick={handleEventsClose} component={Link} to="/resources">
                          <ChevronRight sx={{ color: "#FFFFFF" }} />
                          Resources
                        </FuturisticMenuItem>
                      </Grid>
                      <Grid item xs={6}>
                        <FuturisticMenuItem onClick={handleEventsClose} component={Link} to="/trainings">
                          <ChevronRight sx={{ color: "#FFFFFF" }} />
                          Workshops & Trainings
                        </FuturisticMenuItem>
                      </Grid>
                      <Grid item xs={6}>
                        <FuturisticMenuItem onClick={handleEventsClose} component={Link} to="/webinars">
                          <ChevronRight sx={{ color: "#FFFFFF" }} />
                          Webinars
                        </FuturisticMenuItem>
                      </Grid>
                    </Grid>
                  </FuturisticMenu>
                </div>

                <div
                  onMouseEnter={handleAboutHover}
                  onMouseLeave={handleAboutClose}
                  style={{ position: "relative" }}
                >
                  <DropdownButton
                    active={
                      location.pathname === "/about" ||
                      location.pathname === "/global-coverage" ||
                      location.pathname === "/leadership" ||
                      location.pathname === "/careers"
                    }
                    isTargetPage={isTargetPage}
                    isScrolled={isScrolled}
                    isOpen={Boolean(aboutAnchorEl)}
                    onClick={handleAboutClick}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
                        About Us
                        <ExpandMore
                          sx={{
                            color: isTargetPage && !isScrolled ? "#E0E0E0" : "#FFFFFF",
                            textShadow: "0 0 5px #00D4FF",
                          }}
                        />
                      </Box>
                      <NeonHoverEffect
                        active={
                          location.pathname === "/about" ||
                          location.pathname === "/global-coverage" ||
                          location.pathname === "/leadership" ||
                          location.pathname === "/careers"
                        }
                      />
                    </Box>
                  </DropdownButton>

                  <FuturisticMenu
                    id="about-menu"
                    anchorEl={aboutAnchorEl}
                    keepMounted
                    open={Boolean(aboutAnchorEl)}
                    onClose={handleAboutClose}
                    disableScrollLock
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    transformOrigin={{ vertical: "top", horizontal: "left" }}
                  >
                    <FuturisticMenuItem onClick={handleAboutClose} component={Link} to="/about">
                      <ChevronRight sx={{ color: "#FFFFFF" }} />
                      About Us
                    </FuturisticMenuItem>
                    <FuturisticMenuItem onClick={handleAboutClose} component={Link} to="/global-coverage">
                      <ChevronRight sx={{ color: "#FFFFFF" }} />
                      Global Coverage
                    </FuturisticMenuItem>
                    <FuturisticMenuItem onClick={handleAboutClose} component={Link} to="/leadership">
                      <ChevronRight sx={{ color: "#FFFFFF" }} />
                      Leadership
                    </FuturisticMenuItem>
                    <FuturisticMenuItem onClick={handleAboutClose} component={Link} to="/careers">
                      <ChevronRight sx={{ color: "#FFFFFF" }} />
                      Careers
                    </FuturisticMenuItem>
                  </FuturisticMenu>
                </div>

                <div
                  onMouseEnter={handleCountryHover}
                  onMouseLeave={handleCountryClose}
                  style={{ position: "relative" }}
                >
                  <DropdownButton
                    active={false}
                    isTargetPage={isTargetPage}
                    isScrolled={isScrolled}
                    isOpen={Boolean(countryAnchorEl)}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <img src={selectedCountry.flag} alt={`${selectedCountry.name} Flag`} style={{ width: "25px", height: "25px", borderRadius: "2px" }} />
                        Countries
                        <ExpandMore
                          sx={{
                            color: isTargetPage && !isScrolled ? "#E0E0E0" : "#FFFFFF",
                            textShadow: "0 0 5px #00D4FF",
                          }}
                        />
                      </Box>
                      <NeonHoverEffect active={false} />
                    </Box>
                  </DropdownButton>

                  <FuturisticMenu
                    id="country-menu"
                    anchorEl={countryAnchorEl}
                    keepMounted
                    open={Boolean(countryAnchorEl)}
                    onClose={handleCountryClose}
                    disableScrollLock
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    transformOrigin={{ vertical: "top", horizontal: "left" }}
                    PaperProps={{
                      style: {
                        maxHeight: "250px",
                        overflowY: countries.length > 5 ? "auto" : "hidden",
                        width: "200px",
                      },
                    }}
                  >
                    {countries.map((country) => (
                      <FuturisticMenuItem
                        key={country.name}
                        onClick={() => handleCountrySelect(country)}
                      >
                        <img src={country.flag} alt={`${country.name} Flag`} style={{ marginRight: "10px", width: "30px", height: "30px", borderRadius: "2px" }} />
                        {country.name}
                      </FuturisticMenuItem>
                    ))}
                  </FuturisticMenu>
                </div>

                <ContactButton
                  component={Link}
                  to="/contact"
                  isScrolled={isScrolled}
                  isContactPage={isContactPage}
                >
                  Contact Us
                </ContactButton>
              </ButtonContainer>
            )}
          </FuturisticToolbar>
        </FuturisticAppBar>
      </motion.div>
    </ThemeProvider>
  );
};

export default Navbar;