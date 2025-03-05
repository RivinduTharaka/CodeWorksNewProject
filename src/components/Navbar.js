import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  ExpandMore,
  ExpandLess,
} from '@mui/icons-material';
import { styled, keyframes } from '@mui/system';
import { useMediaQuery, createTheme, ThemeProvider } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import image1 from '../assets/image/logoNavbar/Connex-LogoWhite.png';
import image2 from '../assets/image/logoNavbar/ConnexIT.png';

// Country Flags
const flagUSA = "https://flagcdn.com/w20/us.png";
const flagUK = "https://flagcdn.com/w20/gb.png";
const flagCanada = "https://flagcdn.com/w20/ca.png";
const flagAustralia = "https://flagcdn.com/w20/au.png";
const flagIndia = "https://flagcdn.com/w20/in.png";

// Define Futuristic Theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#00D4FF", // Neon Cyan
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
  fontSize: "0.8rem",
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
    ? "linear-gradient(45deg, #00D4FF, #0288D1)"
    : "linear-gradient(45deg, rgba(0, 212, 255, 0.8), rgba(2, 136, 209, 0.8))",
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
    background: "rgba(15, 32, 39, 0.9)",
    backdropFilter: "blur(10px)",
    border: "1px solid #00D4FF",
    borderRadius: "10px",
    boxShadow: "0 0 15px rgba(0, 212, 255, 0.3)",
    padding: "0.5rem 0",
    animation: `${slideIn} 0.3s ease-in-out`,
    width: "180px",
  },
});

const FuturisticMenuItem = styled(MenuItem)({
  display: "flex",
  alignItems: "center",
  gap: "0.8rem",
  fontSize: "0.75rem",
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
    width: "20px",
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
  const [aboutAnchorEl, setAboutAnchorEl] = useState(null);
  const [eventsAnchorEl, setEventsAnchorEl] = useState(null);
  const [servicesAnchorEl, setServicesAnchorEl] = useState(null);
  const [newsAnchorEl, setNewsAnchorEl] = useState(null);
  const [countryAnchorEl, setCountryAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [eventsSubmenuOpen, setEventsSubmenuOpen] = useState(false);
  const [servicesSubmenuOpen, setServicesSubmenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useMediaQuery("(max-width:950px)");

  const isTargetPage =
    location.pathname === '/' ||
    location.pathname === '/solution' ||
    location.pathname === '/vendors' ||
    location.pathname === '/contact' ||
    location.pathname === '/events' ||
    location.pathname === '/trainings' ||
    location.pathname === '/marketing-consultation' ||
    location.pathname === '/channel-professional-services' ||
    location.pathname === '/blogs' ||
    location.pathname === '/press-&-media' ||
    location.pathname === '/why-us' ||
    location.pathname === '/global-coverage' ||
    location.pathname === '/leadership' ||
    location.pathname === '/careers';

  const isContactPage = location.pathname === '/contact';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAboutHover = (event) => {
    setAboutAnchorEl(event.currentTarget);
  };

  const handleAboutClose = () => {
    setAboutAnchorEl(null);
  };

  const handleEventsHover = (event) => {
    setEventsAnchorEl(event.currentTarget);
  };

  const handleEventsClose = () => {
    setEventsAnchorEl(null);
  };

  const handleServicesHover = (event) => {
    setServicesAnchorEl(event.currentTarget);
  };

  const handleServicesClose = () => {
    setServicesAnchorEl(null);
  };

  const handleNewsHover = (event) => {
    setNewsAnchorEl(event.currentTarget);
  };

  const handleNewsClose = () => {
    setNewsAnchorEl(null);
  };

  const handleCountryHover = (event) => {
    setCountryAnchorEl(event.currentTarget);
  };

  const handleCountryClose = () => {
    setCountryAnchorEl(null);
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
                          <ListItem component={Link} to="/contact" onClick={() => setDrawerOpen(false)}>
                            <ListItemText primary="Contact Us" primaryTypographyProps={{ style: { color: "#E0E0E0", fontFamily: "'Orbitron', sans-serif" } }} />
                          </ListItem>

                          <ListItem
                            button
                            onClick={() => setSubmenuOpen(!submenuOpen)}
                            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                          >
                            <ListItemText
                              primary="Countries"
                              primaryTypographyProps={{ style: { color: "#E0E0E0", fontFamily: "'Orbitron', sans-serif", fontWeight: "600" } }}
                            />
                            {submenuOpen ? (
                              <ExpandLess sx={{ color: "#00D4FF" }} />
                            ) : (
                              <ExpandMore sx={{ color: "#00D4FF" }} />
                            )}
                          </ListItem>
                          <Collapse in={submenuOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                              <ListItem sx={{ pl: 4, py: 1 }} onClick={() => setDrawerOpen(false)}>
                                <img src={flagUSA} alt="USA Flag" style={{ marginRight: "10px" }} />
                                <ListItemText primary="USA" primaryTypographyProps={{ style: { color: "#E0E0E0", fontFamily: "'Orbitron', sans-serif" } }} />
                              </ListItem>
                              <ListItem sx={{ pl: 4, py: 1 }} onClick={() => setDrawerOpen(false)}>
                                <img src={flagUK} alt="UK Flag" style={{ marginRight: "10px" }} />
                                <ListItemText primary="UK" primaryTypographyProps={{ style: { color: "#E0E0E0", fontFamily: "'Orbitron', sans-serif" } }} />
                              </ListItem>
                              <ListItem sx={{ pl: 4, py: 1 }} onClick={() => setDrawerOpen(false)}>
                                <img src={flagCanada} alt="Canada Flag" style={{ marginRight: "10px" }} />
                                <ListItemText primary="Canada" primaryTypographyProps={{ style: { color: "#E0E0E0", fontFamily: "'Orbitron', sans-serif" } }} />
                              </ListItem>
                              <ListItem sx={{ pl: 4, py: 1 }} onClick={() => setDrawerOpen(false)}>
                                <img src={flagAustralia} alt="Australia Flag" style={{ marginRight: "10px" }} />
                                <ListItemText primary="Australia" primaryTypographyProps={{ style: { color: "#E0E0E0", fontFamily: "'Orbitron', sans-serif" } }} />
                              </ListItem>
                              <ListItem sx={{ pl: 4, py: 1 }} onClick={() => setDrawerOpen(false)}>
                                <img src={flagIndia} alt="India Flag" style={{ marginRight: "10px" }} />
                                <ListItemText primary="India" primaryTypographyProps={{ style: { color: "#E0E0E0", fontFamily: "'Orbitron', sans-serif" } }} />
                              </ListItem>
                            </List>
                          </Collapse>

                          <ListItem component={Link} to="/solution" onClick={() => setDrawerOpen(false)}>
                            <ListItemText primary="Solutions" primaryTypographyProps={{ style: { color: "#E0E0E0", fontFamily: "'Orbitron', sans-serif" } }} />
                          </ListItem>
                          <ListItem component={Link} to="/vendors" onClick={() => setDrawerOpen(false)}>
                            <ListItemText primary="Vendors" primaryTypographyProps={{ style: { color: "#E0E0E0", fontFamily: "'Orbitron', sans-serif" } }} />
                          </ListItem>

                          <ListItem
                            button
                            onClick={() => setEventsSubmenuOpen(!eventsSubmenuOpen)}
                            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                          >
                            <MobileNavLinkContainer>
                              <ListItemText
                                primary="Events & Webinars"
                                primaryTypographyProps={{ style: { color: "#E0E0E0", fontFamily: "'Orbitron', sans-serif", fontWeight: "600" } }}
                              />
                              <MobileNeonHoverEffect active={location.pathname === '/events' || location.pathname === '/trainings'} />
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
                              <ListItem
                                component={Link}
                                to="/trainings"
                                sx={{ pl: 4, py: 1 }}
                                onClick={() => setDrawerOpen(false)}
                              >
                                <ListItemText primary="Trainings" primaryTypographyProps={{ style: { color: "#E0E0E0", fontFamily: "'Orbitron', sans-serif" } }} />
                              </ListItem>
                            </List>
                          </Collapse>

                          <ListItem
                            button
                            onClick={() => setServicesSubmenuOpen(!servicesSubmenuOpen)}
                            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                          >
                            <ListItemText
                              primary="Services"
                              primaryTypographyProps={{ style: { color: "#E0E0E0", fontFamily: "'Orbitron', sans-serif", fontWeight: "600" } }}
                            />
                            {servicesSubmenuOpen ? (
                              <ExpandLess sx={{ color: "#00D4FF" }} />
                            ) : (
                              <ExpandMore sx={{ color: "#00D4FF" }} />
                            )}
                          </ListItem>
                          <Collapse in={servicesSubmenuOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                              <ListItem
                                component={Link}
                                to="/marketing-consultation"
                                sx={{ pl: 4, py: 1 }}
                                onClick={() => setDrawerOpen(false)}
                              >
                                <ListItemText primary="Marketing Consultation" primaryTypographyProps={{ style: { color: "#E0E0E0", fontFamily: "'Orbitron', sans-serif" } }} />
                              </ListItem>
                              <ListItem
                                component={Link}
                                to="/channel-professional-services"
                                sx={{ pl: 4, py: 1 }}
                                onClick={() => setDrawerOpen(false)}
                              >
                                <ListItemText primary="Channel Professional Services" primaryTypographyProps={{ style: { color: "#E0E0E0", fontFamily: "'Orbitron', sans-serif" } }} />
                              </ListItem>
                            </List>
                          </Collapse>

                          <ListItem
                            button
                            onClick={() => setSubmenuOpen(!submenuOpen)}
                            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                          >
                            <ListItemText
                              primary="News"
                              primaryTypographyProps={{ style: { color: "#E0E0E0", fontFamily: "'Orbitron', sans-serif", fontWeight: "600" } }}
                            />
                            {submenuOpen ? (
                              <ExpandLess sx={{ color: "#00D4FF" }} />
                            ) : (
                              <ExpandMore sx={{ color: "#00D4FF" }} />
                            )}
                          </ListItem>
                          <Collapse in={submenuOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                              <ListItem
                                component={Link}
                                to="/blogs"
                                sx={{ pl: 4, py: 1 }}
                                onClick={() => setDrawerOpen(false)}
                              >
                                <ListItemText primary="Blogs" primaryTypographyProps={{ style: { color: "#E0E0E0", fontFamily: "'Orbitron', sans-serif" } }} />
                              </ListItem>
                              <ListItem
                                component={Link}
                                to="/press-&-media"
                                sx={{ pl: 4, py: 1 }}
                                onClick={() => setDrawerOpen(false)}
                              >
                                <ListItemText primary="Press & Media" primaryTypographyProps={{ style: { color: "#E0E0E0", fontFamily: "'Orbitron', sans-serif" } }} />
                              </ListItem>
                            </List>
                          </Collapse>

                          <ListItem
                            button
                            onClick={() => setSubmenuOpen(!submenuOpen)}
                            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                          >
                            <ListItemText
                              primary="About Us"
                              primaryTypographyProps={{ style: { color: "#E0E0E0", fontFamily: "'Orbitron', sans-serif", fontWeight: "600" } }}
                            />
                            {submenuOpen ? (
                              <ExpandLess sx={{ color: "#00D4FF" }} />
                            ) : (
                              <ExpandMore sx={{ color: "#00D4FF" }} />
                            )}
                          </ListItem>
                          <Collapse in={submenuOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                              <ListItem
                                component={Link}
                                to="/why-us"
                                sx={{ pl: 4, py: 1 }}
                                onClick={() => setDrawerOpen(false)}
                              >
                                <ListItemText primary="Why Us" primaryTypographyProps={{ style: { color: "#E0E0E0", fontFamily: "'Orbitron', sans-serif" } }} />
                              </ListItem>
                              <ListItem
                                component={Link}
                                to="/global-coverage"
                                sx={{ pl: 4, py: 1 }}
                                onClick={() => setDrawerOpen(false)}
                              >
                                <ListItemText primary="Global Coverage" primaryTypographyProps={{ style: { color: "#E0E0E0", fontFamily: "'Orbitron', sans-serif" } }} />
                              </ListItem>
                              <ListItem
                                component={Link}
                                to="/leadership"
                                sx={{ pl: 4, py: 1 }}
                                onClick={() => setDrawerOpen(false)}
                              >
                                <ListItemText primary="Leadership" primaryTypographyProps={{ style: { color: "#E0E0E0", fontFamily: "'Orbitron', sans-serif" } }} />
                              </ListItem>
                              <ListItem
                                component={Link}
                                to="/careers"
                                sx={{ pl: 4, py: 1 }}
                                onClick={() => setDrawerOpen(false)}
                              >
                                <ListItemText primary="Careers" primaryTypographyProps={{ style: { color: "#E0E0E0", fontFamily: "'Orbitron', sans-serif" } }} />
                              </ListItem>
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
                      <Box sx={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
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
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <FuturisticMenuItem onClick={handleCountryClose}>
                      <img src={flagUSA} alt="USA Flag" />
                      USA
                    </FuturisticMenuItem>
                    <FuturisticMenuItem onClick={handleCountryClose}>
                      <img src={flagUK} alt="UK Flag" />
                      UK
                    </FuturisticMenuItem>
                    <FuturisticMenuItem onClick={handleCountryClose}>
                      <img src={flagCanada} alt="Canada Flag" />
                      Canada
                    </FuturisticMenuItem>
                    <FuturisticMenuItem onClick={handleCountryClose}>
                      <img src={flagAustralia} alt="Australia Flag" />
                      Australia
                    </FuturisticMenuItem>
                    <FuturisticMenuItem onClick={handleCountryClose}>
                      <img src={flagIndia} alt="India Flag" />
                      India
                    </FuturisticMenuItem>
                  </FuturisticMenu>
                </div>

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

                <div
                  onMouseEnter={handleEventsHover}
                  onMouseLeave={handleEventsClose}
                  style={{ position: "relative" }}
                >
                  <DropdownButton
                    component={Link}
                    to="/events"
                    active={location.pathname === "/events" || location.pathname === "/trainings"}
                    isTargetPage={isTargetPage}
                    isScrolled={isScrolled}
                    isOpen={Boolean(eventsAnchorEl)}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
                        Events & Webinars
                        <ExpandMore
                          sx={{
                            color: isTargetPage && !isScrolled ? "#E0E0E0" : "#FFFFFF",
                            textShadow: "0 0 5px #00D4FF",
                          }}
                        />
                      </Box>
                      <NeonHoverEffect active={location.pathname === "/events" || location.pathname === "/trainings"} />
                    </Box>
                  </DropdownButton>

                  <FuturisticMenu
                    id="events-menu"
                    anchorEl={eventsAnchorEl}
                    keepMounted
                    open={Boolean(eventsAnchorEl)}
                    onClose={handleEventsClose}
                    disableScrollLock
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <FuturisticMenuItem onClick={handleEventsClose} component={Link} to="/events">
                      Events
                    </FuturisticMenuItem>
                    <FuturisticMenuItem onClick={handleEventsClose} component={Link} to="/trainings">
                      Trainings
                    </FuturisticMenuItem>
                  </FuturisticMenu>
                </div>

                <div
                  onMouseEnter={handleServicesHover}
                  onMouseLeave={handleServicesClose}
                  style={{ position: "relative" }}
                >
                  <DropdownButton
                    component={Link}
                    to="/services"
                    active={
                      location.pathname === "/marketing-consultation" ||
                      location.pathname === "/channel-professional-services"
                    }
                    isTargetPage={isTargetPage}
                    isScrolled={isScrolled}
                    isOpen={Boolean(servicesAnchorEl)}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
                        Services
                        <ExpandMore
                          sx={{
                            color: isTargetPage && !isScrolled ? "#E0E0E0" : "#FFFFFF",
                            textShadow: "0 0 5px #00D4FF",
                          }}
                        />
                      </Box>
                      <NeonHoverEffect
                        active={
                          location.pathname === "/marketing-consultation" ||
                          location.pathname === "/channel-professional-services"
                        }
                      />
                    </Box>
                  </DropdownButton>

                  <FuturisticMenu
                    id="services-menu"
                    anchorEl={servicesAnchorEl}
                    keepMounted
                    open={Boolean(servicesAnchorEl)}
                    onClose={handleServicesClose}
                    disableScrollLock
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <FuturisticMenuItem onClick={handleServicesClose} component={Link} to="/marketing-consultation">
                      Marketing Consultation
                    </FuturisticMenuItem>
                    <FuturisticMenuItem onClick={handleServicesClose} component={Link} to="/channel-professional-services">
                      Channel Professional Services
                    </FuturisticMenuItem>
                  </FuturisticMenu>
                </div>

                <div
                  onMouseEnter={handleNewsHover}
                  onMouseLeave={handleNewsClose}
                  style={{ position: "relative" }}
                >
                  <DropdownButton
                    component={Link}
                    to="/news"
                    active={location.pathname === "/blogs" || location.pathname === "/press-&-media"}
                    isTargetPage={isTargetPage}
                    isScrolled={isScrolled}
                    isOpen={Boolean(newsAnchorEl)}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
                        News
                        <ExpandMore
                          sx={{
                            color: isTargetPage && !isScrolled ? "#E0E0E0" : "#FFFFFF",
                            textShadow: "0 0 5px #00D4FF",
                          }}
                        />
                      </Box>
                      <NeonHoverEffect active={location.pathname === "/blogs" || location.pathname === "/press-&-media"} />
                    </Box>
                  </DropdownButton>

                  <FuturisticMenu
                    id="news-menu"
                    anchorEl={newsAnchorEl}
                    keepMounted
                    open={Boolean(newsAnchorEl)}
                    onClose={handleNewsClose}
                    disableScrollLock
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <FuturisticMenuItem onClick={handleNewsClose} component={Link} to="/blogs">
                      Blogs
                    </FuturisticMenuItem>
                    <FuturisticMenuItem onClick={handleNewsClose} component={Link} to="/press-&-media">
                      Press & Media
                    </FuturisticMenuItem>
                  </FuturisticMenu>
                </div>

                <div
                  onMouseEnter={handleAboutHover}
                  onMouseLeave={handleAboutClose}
                  style={{ position: "relative" }}
                >
                  <DropdownButton
                    component={Link}
                    to="/about"
                    active={
                      location.pathname === "/why-us" ||
                      location.pathname === "/global-coverage" ||
                      location.pathname === "/leadership" ||
                      location.pathname === "/careers"
                    }
                    isTargetPage={isTargetPage}
                    isScrolled={isScrolled}
                    isOpen={Boolean(aboutAnchorEl)}
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
                          location.pathname === "/why-us" ||
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
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <FuturisticMenuItem onClick={handleAboutClose} component={Link} to="/why-us">
                      Why Us
                    </FuturisticMenuItem>
                    <FuturisticMenuItem onClick={handleAboutClose} component={Link} to="/global-coverage">
                      Global Coverage
                    </FuturisticMenuItem>
                    <FuturisticMenuItem onClick={handleAboutClose} component={Link} to="/leadership">
                      Leadership
                    </FuturisticMenuItem>
                    <FuturisticMenuItem onClick={handleAboutClose} component={Link} to="/careers">
                      Careers
                    </FuturisticMenuItem>
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