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
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";
import { styled, keyframes } from "@mui/system";
import { useMediaQuery, createTheme, ThemeProvider } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import image1 from "../../assets/image/logoNavbar/Connex-LogoWhite.png";
import image2 from "../../assets/image/logoNavbar/ConnexIT.png";

// Import flag images for the countries
import globalFlag from "../../assets/image/flag/internet.png";
import australiaFlag from "../../assets/image/flag/australia.png";
import bangladeshFlag from "../../assets/image/flag/bangladesh.png";
import bruneiFlag from "../../assets/image/flag/brunei.png";
import cambodiaFlag from "../../assets/image/flag/cambodia.png";
import indiaFlag from "../../assets/image/flag/india.png";
import maldivesFlag from "../../assets/image/flag/maldives.png";
import mauritiusFlag from "../../assets/image/flag/mauritius.png";
import nepalFlag from "../../assets/image/flag/nepal.png";
import singaporeFlag from "../../assets/image/flag/singapore.png";
import sriLankaFlag from "../../assets/image/flag/sri-lanka.png";
import thailandFlag from "../../assets/image/flag/thailand.png";
import uaeFlag from "../../assets/image/flag/uae.png";
import newZealandFlag from "../../assets/image/flag/new-zealand (1).png";
import malaysiaFlag from '../../assets/image/flag/malaysia.png';
import bhutanFlag from '../../assets/image/flag/bhutan.png';
// Updated Country Flags Array with specified routes
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
  background:
    isTargetPage && !isScrolled
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

const FuturisticButton = styled(Button)(
  ({ isTargetPage, isScrolled, active }) => ({
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
  })
);

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

const PortalButton = styled(Button)(({ isScrolled }) => ({
  background: isScrolled
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

const SLNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [aboutAnchorEl, setAboutAnchorEl] = useState(null);
  const [eventsAnchorEl, setEventsAnchorEl] = useState(null);
  const [servicesAnchorEl, setServicesAnchorEl] = useState(null);
  const [newsAnchorEl, setNewsAnchorEl] = useState(null);
  const [countryAnchorEl, setCountryAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [countriesSubmenuOpen, setCountriesSubmenuOpen] = useState(false);
  const [eventsSubmenuOpen, setEventsSubmenuOpen] = useState(false);
  const [servicesSubmenuOpen, setServicesSubmenuOpen] = useState(false);
  const [newsSubmenuOpen, setNewsSubmenuOpen] = useState(false);
  const [aboutSubmenuOpen, setAboutSubmenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState(() => {
    const currentPath = location.pathname.split("/")[1] || "";
    return (
      countries.find((country) => country.route === `/${currentPath}`) ||
      countries.find((country) => country.name === "Sri Lanka")
    );
  });

  const isMobile = useMediaQuery("(max-width:950px)");

  const isTargetPage =
    location.pathname === "/SL" ||
    location.pathname === "/SL/solution" ||
    location.pathname === "/SL/vendors" ||
    location.pathname === "/SL/contact" ||
    location.pathname === "/SL/events" ||
    location.pathname === "/SL/workshops" ||
    location.pathname === "/SL/technical-support" ||
    location.pathname === "/SL/professional-services" ||
    location.pathname === "/SL/trainings" ||
    location.pathname === "/SL/blog" ||
    location.pathname === "/SL/press-&-media" ||
    location.pathname === "/SL/global-coverage" ||
    location.pathname === "/SL/leadership" ||
    location.pathname === "/SL/careers" ||
    location.pathname === "/SL/about";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const currentPath = location.pathname.split("/")[1] || "";
    const matchedCountry =
      countries.find((country) => country.route === `/${currentPath}`) ||
      countries.find((country) => country.name === "Sri Lanka");
    setSelectedCountry(matchedCountry);
  }, [location.pathname]);

  const handleAboutHover = (event) => setAboutAnchorEl(event.currentTarget);
  const handleAboutClose = () => setAboutAnchorEl(null);
  const handleAboutClick = (event) => setAboutAnchorEl(event.currentTarget);

  const handleEventsHover = (event) => setEventsAnchorEl(event.currentTarget);
  const handleEventsClose = () => setEventsAnchorEl(null);
  const handleEventsClick = (event) => setEventsAnchorEl(event.currentTarget);

  const handleServicesHover = (event) =>
    setServicesAnchorEl(event.currentTarget);
  const handleServicesClose = () => setServicesAnchorEl(null);
  const handleServicesClick = (event) =>
    setServicesAnchorEl(event.currentTarget);

  const handleNewsHover = (event) => setNewsAnchorEl(event.currentTarget);
  const handleNewsClose = () => setNewsAnchorEl(null);
  const handleNewsClick = (event) => setNewsAnchorEl(event.currentTarget);

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
        <FuturisticAppBar
          position="fixed"
          isTargetPage={isTargetPage}
          isScrolled={isScrolled}
        >
          <FuturisticToolbar>
            <Link
              to="/SL"
              style={{
                padding: "10px 0 10px 10px",
                display: "flex",
                alignItems: "center",
              }}
            >
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
                        color:
                          isTargetPage && !isScrolled ? "#E0E0E0" : "#FFFFFF",
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
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            padding: 2,
                          }}
                        >
                          <IconButton onClick={() => setDrawerOpen(false)}>
                            <CloseIcon
                              sx={{
                                color: "#FFFFFF",
                                textShadow: "0 0 5px #00D4FF",
                              }}
                            />
                          </IconButton>
                        </Box>

                        <List sx={{ padding: "0 1.5rem" }}>
                          <ListItem
                            component={Link}
                            to="/SL/solution"
                            onClick={() => setDrawerOpen(false)}
                          >
                            <ListItemText
                              primary="Solutions"
                              primaryTypographyProps={{
                                style: {
                                  color: "#E0E0E0",
                                  fontFamily: "'Orbitron', sans-serif",
                                },
                              }}
                            />
                          </ListItem>
                          <ListItem
                            component={Link}
                            to PED="/SL/vendors"
                            onClick={() => setDrawerOpen(false)}
                          >
                            <ListItemText
                              primary="Vendors"
                              primaryTypographyProps={{
                                style: {
                                  color: "#E0E0E0",
                                  fontFamily: "'Orbitron', sans-serif",
                                },
                              }}
                            />
                          </ListItem>

                          <ListItem
                            button
                            onClick={() =>
                              setEventsSubmenuOpen(!eventsSubmenuOpen)
                            }
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <MobileNavLinkContainer>
                              <ListItemText
                                primary="Events & Webinars"
                                primaryTypographyProps={{
                                  style: {
                                    color: "#E0E0E0",
                                    fontFamily: "'Orbitron', sans-serif",
                                    fontWeight: "600",
                                  },
                                }}
                              />
                              <MobileNeonHoverEffect
                                active={
                                  location.pathname === "/SL/events" ||
                                  location.pathname === "/SL/workshops"
                                }
                              />
                            </MobileNavLinkContainer>
                            {eventsSubmenuOpen ? (
                              <ExpandLess sx={{ color: "#00D4FF" }} />
                            ) : (
                              <ExpandMore sx={{ color: "#00D4FF" }} />
                            )}
                          </ListItem>
                          <Collapse
                            in={eventsSubmenuOpen}
                            timeout="auto"
                            unmountOnExit
                          >
                            <List component="div" disablePadding>
                              <ListItem
                                component={Link}
                                to="/SL/events"
                                sx={{ pl: 4, py: 1 }}
                                onClick={() => setDrawerOpen(false)}
                              >
                                <ListItemText
                                  primary="Events"
                                  primaryTypographyProps={{
                                    style: {
                                      color: "#E0E0E0",
                                      fontFamily: "'Orbitron', sans-serif",
                                    },
                                  }}
                                />
                              </ListItem>
                              <ListItem
                                component={Link}
                                to="/SL"
                                sx={{ pl: 4, py: 1 }}
                                onClick={() => setDrawerOpen(false)}
                              >
                                <ListItemText
                                  primary="Workshops"
                                  primaryTypographyProps={{
                                    style: {
                                      color: "#E0E0E0",
                                      fontFamily: "'Orbitron', sans-serif",
                                    },
                                  }}
                                />
                              </ListItem>
                            </List>
                          </Collapse>

                          <ListItem
                            button
                            onClick={() =>
                              setServicesSubmenuOpen(!servicesSubmenuOpen)
                            }
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <MobileNavLinkContainer>
                              <ListItemText
                                primary="Services"
                                primaryTypographyProps={{
                                  style: {
                                    color: "#E0E0E0",
                                    fontFamily: "'Orbitron', sans-serif",
                                    fontWeight: "600",
                                  },
                                }}
                              />
                              <MobileNeonHoverEffect
                                active={
                                  location.pathname ===
                                    "/SL/technical-support" ||
                                  location.pathname ===
                                    "/SL/professional-services" ||
                                  location.pathname === "/SL/trainings"
                                }
                              />
                            </MobileNavLinkContainer>
                            {servicesSubmenuOpen ? (
                              <ExpandLess sx={{ color: "#00D4FF" }} />
                            ) : (
                              <ExpandMore sx={{ color: "#00D4FF" }} />
                            )}
                          </ListItem>
                          <Collapse
                            in={servicesSubmenuOpen}
                            timeout="auto"
                            unmountOnExit
                          >
                            <List component="div" disablePadding>
                              <ListItem
                                component={Link}
                                to="/SL"
                                sx={{ pl: 4, py: 1 }}
                                onClick={() => setDrawerOpen(false)}
                              >
                                <ListItemText
                                  primary="Technical Support"
                                  primaryTypographyProps={{
                                    style: {
                                      color: "#E0E0E0",
                                      fontFamily: "'Orbitron', sans-serif",
                                    },
                                  }}
                                />
                              </ListItem>
                              <ListItem
                                component={Link}
                                to="/SL"
                                sx={{ pl: 4, py: 1 }}
                                onClick={() => setDrawerOpen(false)}
                              >
                                <ListItemText
                                  primary="Professional Services"
                                  primaryTypographyProps={{
                                    style: {
                                      color: "#E0E0E0",
                                      fontFamily: "'Orbitron', sans-serif",
                                    },
                                  }}
                                />
                              </ListItem>
                              <ListItem
                                component={Link}
                                to="/SL/trainings"
                                sx={{ pl: 4, py: 1 }}
                                onClick={() => setDrawerOpen(false)}
                              >
                                <ListItemText
                                  primary="Trainings"
                                  primaryTypographyProps={{
                                    style: {
                                      color: "#E0E0E0",
                                      fontFamily: "'Orbitron', sans-serif",
                                    },
                                  }}
                                />
                              </ListItem>
                            </List>
                          </Collapse>

                          <ListItem
                            button
                            onClick={() => setNewsSubmenuOpen(!newsSubmenuOpen)}
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <ListItemText
                              primary="News"
                              primaryTypographyProps={{
                                style: {
                                  color: "#E0E0E0",
                                  fontFamily: "'Orbitron', sans-serif",
                                  fontWeight: "600",
                                },
                              }}
                            />
                            {newsSubmenuOpen ? (
                              <ExpandLess sx={{ color: "#00D4FF" }} />
                            ) : (
                              <ExpandMore sx={{ color: "#00D4FF" }} />
                            )}
                          </ListItem>
                          <Collapse
                            in={newsSubmenuOpen}
                            timeout="auto"
                            unmountOnExit
                          >
                            <List component="div" disablePadding>
                              <ListItem
                                component={Link}
                                to="/SL/blog"
                                sx={{ pl: 4, py: 1 }}
                                onClick={() => setDrawerOpen(false)}
                              >
                                <ListItemText
                                  primary="Blogs"
                                  primaryTypographyProps={{
                                    style: {
                                      color: "#E0E0E0",
                                      fontFamily: "'Orbitron', sans-serif",
                                    },
                                  }}
                                />
                              </ListItem>
                              <ListItem
                                component={Link}
                                to="/SL"
                                sx={{ pl: 4, py: 1 }}
                                onClick={() => setDrawerOpen(false)}
                              >
                                <ListItemText
                                  primary="Press & Media"
                                  primaryTypographyProps={{
                                    style: {
                                      color: "#E0E0E0",
                                      fontFamily: "'Orbitron', sans-serif",
                                    },
                                  }}
                                />
                              </ListItem>
                            </List>
                          </Collapse>

                          <ListItem
                            button
                            onClick={() =>
                              setAboutSubmenuOpen(!aboutSubmenuOpen)
                            }
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <ListItemText
                              primary="About Us"
                              primaryTypographyProps={{
                                style: {
                                  color: "#E0E0E0",
                                  fontFamily: "'Orbitron', sans-serif",
                                  fontWeight: "600",
                                },
                              }}
                            />
                            {aboutSubmenuOpen ? (
                              <ExpandLess sx={{ color: "#00D4FF" }} />
                            ) : (
                              <ExpandMore sx={{ color: "#00D4FF" }} />
                            )}
                          </ListItem>
                          <Collapse
                            in={aboutSubmenuOpen}
                            timeout="auto"
                            unmountOnExit
                          >
                            <List component="div" disablePadding>
                              <ListItem
                                component={Link}
                                to="/SL/about"
                                sx={{ pl: 4, py: 1 }}
                                onClick={() => setDrawerOpen(false)}
                              >
                                <ListItemText
                                  primary="About Us"
                                  primaryTypographyProps={{
                                    style: {
                                      color: "#E0E0E0",
                                      fontFamily: "'Orbitron', sans-serif",
                                    },
                                  }}
                                />
                              </ListItem>
                              <ListItem
                                component={Link}
                                to="/SL/global-coverage"
                                sx={{ pl: 4, py: 1 }}
                                onClick={() => setDrawerOpen(false)}
                              >
                                <ListItemText
                                  primary="Global Coverage"
                                  primaryTypographyProps={{
                                    style: {
                                      color: "#E0E0E0",
                                      fontFamily: "'Orbitron', sans-serif",
                                    },
                                  }}
                                />
                              </ListItem>
                              <ListItem
                                component={Link}
                                to="/SL/leadership"
                                sx={{ pl: 4, py: 1 }}
                                onClick={() => setDrawerOpen(false)}
                              >
                                <ListItemText
                                  primary="Leadership"
                                  primaryTypographyProps={{
                                    style: {
                                      color: "#E0E0E0",
                                      fontFamily: "'Orbitron', sans-serif",
                                    },
                                  }}
                                />
                              </ListItem>
                              <ListItem
                                component={Link}
                                to="/SL/careers"
                                sx={{ pl: 4, py: 1 }}
                                onClick={() => setDrawerOpen(false)}
                              >
                                <ListItemText
                                  primary="Careers"
                                  primaryTypographyProps={{
                                    style: {
                                      color: "#E0E0E0",
                                      fontFamily: "'Orbitron', sans-serif",
                                    },
                                  }}
                                />
                              </ListItem>
                              <ListItem
                                component={Link}
                                to="/SL/contact"
                                sx={{ pl: 4, py: 1 }}
                                onClick={() => setDrawerOpen(false)}
                              >
                                <ListItemText
                                  primary="Contact Us"
                                  primaryTypographyProps={{
                                    style: {
                                      color: "#E0E0E0",
                                      fontFamily: "'Orbitron', sans-serif",
                                    },
                                  }}
                                />
                              </ListItem>
                            </List>
                          </Collapse>

                          <ListItem
                            component={Link}
                            to="/SL/portal"
                            onClick={() => setDrawerOpen(false)}
                          >
                            <ListItemText
                              primary="Portal Login"
                              primaryTypographyProps={{
                                style: {
                                  color: "#E0E0E0",
                                  fontFamily: "'Orbitron', sans-serif",
                                },
                              }}
                            />
                          </ListItem>

                          <ListItem
                            button
                            onClick={() =>
                              setCountriesSubmenuOpen(!countriesSubmenuOpen)
                            }
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                              }}
                            >
                              <img
                                src={selectedCountry.flag}
                                alt={`${selectedCountry.name} Flag`}
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  borderRadius: "2px",
                                }}
                              />
                              <ListItemText
                                primary={selectedCountry.name}
                                primaryTypographyProps={{
                                  style: {
                                    color: "#E0E0E0",
                                    fontFamily: "'Orbitron', sans-serif",
                                    fontWeight: "600",
                                  },
                                }}
                              />
                            </Box>
                            {countriesSubmenuOpen ? (
                              <ExpandLess sx={{ color: "#00D4FF" }} />
                            ) : (
                              <ExpandMore sx={{ color: "#00D4FF" }} />
                            )}
                          </ListItem>
                          <Collapse
                            in={countriesSubmenuOpen}
                            timeout="auto"
                            unmountOnExit
                          >
                            <List
                              component="div"
                              disablePadding
                              sx={{
                                maxHeight: "250px",
                                overflowY:
                                  countries.length > 5 ? "auto" : "hidden",
                                "&::-webkit-scrollbar": { width: "4px" },
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
                              }}
                            >
                              {countries.map((country) => (
                                <ListItem
                                  key={country.name}
                                  sx={{ pl: 4, py: 1 }}
                                  onClick={() => handleCountrySelect(country)}
                                >
                                  <img
                                    src={country.flag}
                                    alt={`${country.name} Flag`}
                                    style={{
                                      marginRight: "10px",
                                      width: "30px",
                                      height: "30px",
                                      borderRadius: "2px",
                                    }}
                                  />
                                  <ListItemText
                                    primary={country.name}
                                    primaryTypographyProps={{
                                      style: {
                                        color: "#E0E0E0",
                                        fontFamily: "'Orbitron', sans-serif",
                                      },
                                    }}
                                  />
                                </ListItem>
                              ))}
                            </List>
                          </Collapse>

                          <Divider
                            sx={{
                              my: 1,
                              background:
                                "linear-gradient(90deg, #00D4FF, rgb(20, 153, 58))",
                            }}
                          />
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
                  to="/SL/solution"
                  active={location.pathname === "/SL/solution"}
                  isTargetPage={isTargetPage}
                  isScrolled={isScrolled}
                >
                  Solutions
                  <NeonHoverEffect
                    active={location.pathname === "/SL/solution"}
                  />
                </FuturisticButton>

                <FuturisticButton
                  component={Link}
                  to="/SL/vendors"
                  active={location.pathname === "/SL/vendors"}
                  isTargetPage={isTargetPage}
                  isScrolled={isScrolled}
                >
                  Vendors
                  <NeonHoverEffect
                    active={location.pathname === "/SL/vendors"}
                  />
                </FuturisticButton>

                <div
                  onMouseEnter={handleEventsHover}
                  onMouseLeave={handleEventsClose}
                  style={{ position: "relative" }}
                >
                  <DropdownButton
                    active={
                      location.pathname === "/SL/events" ||
                      location.pathname === "/SL/workshops"
                    }
                    isTargetPage={isTargetPage}
                    isScrolled={isScrolled}
                    isOpen={Boolean(eventsAnchorEl)}
                    onClick={handleEventsClick}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.2rem",
                        }}
                      >
                        Events & Webinars
                        <ExpandMore
                          sx={{
                            color:
                              isTargetPage && !isScrolled
                                ? "#E0E0E0"
                                : "#FFFFFF",
                            textShadow: "0 0 5px #00D4FF",
                          }}
                        />
                      </Box>
                      <NeonHoverEffect
                        active={
                          location.pathname === "/SL/events" ||
                          location.pathname === "/SL/workshops"
                        }
                      />
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
                  >
                    <FuturisticMenuItem
                      onClick={handleEventsClose}
                      component={Link}
                      to="/SL/events"
                    >
                      Events | Webinars
                    </FuturisticMenuItem>
                    <FuturisticMenuItem
                      onClick={handleEventsClose}
                      component={Link}
                      to="/SL"
                    >
                      Workshops
                    </FuturisticMenuItem>
                  </FuturisticMenu>
                </div>

                <div
                  onMouseEnter={handleServicesHover}
                  onMouseLeave={handleServicesClose}
                  style={{ position: "relative" }}
                >
                  <DropdownButton
                    active={
                      location.pathname === "/SL/technical-support" ||
                      location.pathname === "/SL/professional-services" ||
                      location.pathname === "/SL/trainings"
                    }
                    isTargetPage={isTargetPage}
                    isScrolled={isScrolled}
                    isOpen={Boolean(servicesAnchorEl)}
                    onClick={handleServicesClick}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.2rem",
                        }}
                      >
                        Services
                        <ExpandMore
                          sx={{
                            color:
                              isTargetPage && !isScrolled
                                ? "#E0E0E0"
                                : "#FFFFFF",
                            textShadow: "0 0 5px #00D4FF",
                          }}
                        />
                      </Box>
                      <NeonHoverEffect
                        active={
                          location.pathname === "/SL/technical-support" ||
                          location.pathname === "/SL/professional-services" ||
                          location.pathname === "/SL/trainings"
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
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    transformOrigin={{ vertical: "top", horizontal: "left" }}
                  >
                    <FuturisticMenuItem
                      onClick={handleServicesClose}
                      component={Link}
                      to="/SL"
                    >
                      Technical Support
                    </FuturisticMenuItem>
                    <FuturisticMenuItem
                      onClick={handleServicesClose}
                      component={Link}
                      to="/SL"
                    >
                      Professional Services
                    </FuturisticMenuItem>
                    <FuturisticMenuItem
                      onClick={handleServicesClose}
                      component={Link}
                      to="/SL/trainings"
                    >
                      Trainings
                    </FuturisticMenuItem>
                  </FuturisticMenu>
                </div>

                <div
                  onMouseEnter={handleNewsHover}
                  onMouseLeave={handleNewsClose}
                  style={{ position: "relative" }}
                >
                  <DropdownButton
                    active={
                      location.pathname === "/SL/blog" ||
                      location.pathname === "/SL/press-&-media"
                    }
                    isTargetPage={isTargetPage}
                    isScrolled={isScrolled}
                    isOpen={Boolean(newsAnchorEl)}
                    onClick={handleNewsClick}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.2rem",
                        }}
                      >
                        News
                        <ExpandMore
                          sx={{
                            color:
                              isTargetPage && !isScrolled
                                ? "#E0E0E0"
                                : "#FFFFFF",
                            textShadow: "0 0 5px #00D4FF",
                          }}
                        />
                      </Box>
                      <NeonHoverEffect
                        active={
                          location.pathname === "/SL/blog" ||
                          location.pathname === "/SL/press-&-media"
                        }
                      />
                    </Box>
                  </DropdownButton>

                  <FuturisticMenu
                    id="news-menu"
                    anchorEl={newsAnchorEl}
                    keepMounted
                    open={Boolean(newsAnchorEl)}
                    onClose={handleNewsClose}
                    disableScrollLock
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    transformOrigin={{ vertical: "top", horizontal: "left" }}
                  >
                    <FuturisticMenuItem
                      onClick={handleNewsClose}
                      component={Link}
                      to="/SL/blog"
                    >
                      Blogs
                    </FuturisticMenuItem>
                    <FuturisticMenuItem
                      onClick={handleNewsClose}
                      component={Link}
                      to="/SL"
                    >
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
                    active={
                      location.pathname === "/SL/about" ||
                      location.pathname === "/SL/global-coverage" ||
                      location.pathname === "/SL/leadership" ||
                      location.pathname === "/SL/careers" ||
                      location.pathname === "/SL/contact"
                    }
                    isTargetPage={isTargetPage}
                    isScrolled={isScrolled}
                    isOpen={Boolean(aboutAnchorEl)}
                    onClick={handleAboutClick}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.2rem",
                        }}
                      >
                        About Us
                        <ExpandMore
                          sx={{
                            color:
                              isTargetPage && !isScrolled
                                ? "#E0E0E0"
                                : "#FFFFFF",
                            textShadow: "0 0 5px #00D4FF",
                          }}
                        />
                      </Box>
                      <NeonHoverEffect
                        active={
                          location.pathname === "/SL/about" ||
                          location.pathname === "/SL/global-coverage" ||
                          location.pathname === "/SL/leadership" ||
                          location.pathname === "/SL/careers" ||
                          location.pathname === "/SL/contact"
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
                    <FuturisticMenuItem
                      onClick={handleAboutClose}
                      component={Link}
                      to="/SL/about"
                    >
                      About Us
                    </FuturisticMenuItem>
                    <FuturisticMenuItem
                      onClick={handleAboutClose}
                      component={Link}
                      to="/SL/global-coverage"
                    >
                      Global Coverage
                    </FuturisticMenuItem>
                    <FuturisticMenuItem
                      onClick={handleAboutClose}
                      component={Link}
                      to="/SL/leadership"
                    >
                      Leadership
                    </FuturisticMenuItem>
                    <FuturisticMenuItem
                      onClick={handleAboutClose}
                      component={Link}
                      to="/SL/careers"
                    >
                      Careers
                    </FuturisticMenuItem>
                    <FuturisticMenuItem
                      onClick={handleAboutClose}
                      component={Link}
                      to="/SL/contact"
                    >
                      Contact Us
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
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <img
                          src={selectedCountry.flag}
                          alt={`${selectedCountry.name} Flag`}
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "2px",
                          }}
                        />
                        {selectedCountry.name}
                        <ExpandMore
                          sx={{
                            color:
                              isTargetPage && !isScrolled
                                ? "#E0E0E0"
                                : "#FFFFFF",
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
                        <img
                          src={country.flag}
                          alt={`${country.name} Flag`}
                          style={{
                            marginRight: "10px",
                            width: "30px",
                            height: "30px",
                            borderRadius: "2px",
                          }}
                        />
                        {country.name}
                      </FuturisticMenuItem>
                    ))}
                  </FuturisticMenu>
                </div>

                <PortalButton
                  component={Link}
                  to="/SL/portal"
                  isScrolled={isScrolled}
                >
                  Portal Login
                </PortalButton>
              </ButtonContainer>
            )}
          </FuturisticToolbar>
        </FuturisticAppBar>
      </motion.div>
    </ThemeProvider>
  );
};

export default SLNavbar;