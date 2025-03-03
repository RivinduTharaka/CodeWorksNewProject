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
} from "@mui/icons-material";
import { styled, keyframes } from "@mui/system";
import { useMediaQuery, createTheme, ThemeProvider } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import image1 from "../assets/image/logoNavbar/Connex-LogoWhite.png"; // Adjust path to your image1.png
import image2 from "../assets/image/logoNavbar/ConnexIT.png"; // Adjust path to your image2.png

// Define Light Theme with Blue Variants
const theme = createTheme({
  palette: {
    primary: {
      main: "#1565C0",
      light: "#64B5F6",
      dark: "#0D47A1",
    },
    text: {
      primary: "#333",
      secondary: "#555",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

// Styled Components for Desktop
const CustomAppBar = styled(AppBar)(({ isTargetPage, isScrolled }) => ({
  backgroundColor: isTargetPage && !isScrolled ? "transparent" : "#ffffff",
  boxShadow: isTargetPage && !isScrolled ? "none" : "none",
  padding: "0",
  transition: "background-color 0.3s ease, box-shadow 0.3s ease",
}));

const CustomToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0",
  maxWidth: "1300px",
  margin: "0 auto",
  width: "100%",
});

const ButtonContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "1.2rem",
});

const HoverEffect = styled("span")(({ active }) => ({
  display: "block",
  width: active ? "100%" : "0%",
  height: "2px",
  backgroundColor: theme.palette.primary.main,
  transition: "width 0.3s ease-in-out",
}));

const CustomButton = styled(Button)(({ isTargetPage, isScrolled, active }) => ({
  color: isTargetPage && !isScrolled ? "#ffffff" : theme.palette.text.primary,
  fontSize: "0.8rem",
  fontWeight: "500",
  textTransform: "none",
  fontFamily: "'Poppins', sans-serif",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1px",
  padding: "0.5rem 0.55rem",
  "&:hover": {
    backgroundColor: "transparent",
    color: isTargetPage && !isScrolled ? "#e0e0e0" : theme.palette.text.primary,
  },
  "& span": {
    width: active ? "100%" : "0%",
    height: "2px",
    backgroundColor:
      isTargetPage && !isScrolled ? "#ffffff" : theme.palette.primary.main,
    transition: "width 0.3s ease-in-out",
  },
  "&:hover > span": {
    width: "100%",
  },
}));

const ContactButton = styled(Button)(({ isScrolled }) => ({
  backgroundColor: isScrolled
    ? theme.palette.primary.main
    : "rgba(21, 101, 192, 0.8)",
  color: "#ffffff",
  fontSize: "0.9rem",
  fontWeight: "500",
  textTransform: "none",
  borderRadius: "20px",
  padding: "0.5rem 1.25rem",
  fontFamily: "'Poppins', sans-serif",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: isScrolled
      ? theme.palette.primary.dark
      : "rgba(21, 101, 192, 0.4)",
  },
}));

const fadeInSlide = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CustomMenu = styled(Menu)({
  "& .MuiPaper-root": {
    borderRadius: "8px",
    animation: `${fadeInSlide} 0.3s ease-in-out`,
    padding: "0.8rem 0",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    width: "150px",
  },
});

const CustomMenuItem = styled(MenuItem)({
  display: "flex",
  alignItems: "center",
  gap: "0.8rem",
  fontSize: "0.75rem",
  fontFamily: "'Poppins', sans-serif",
  color: theme.palette.text.primary,
  padding: "0.8rem 1rem",
  width: "140px",
  borderRadius: "8px",
  transition: "background 0.2s, transform 0.2s",
  "& svg": {
    fontSize: "1.3rem",
    color: theme.palette.primary.main,
    transition: "color 0.2s",
  },
  "&:hover": {
    backgroundColor: "rgba(21, 101, 192, 0.1)",
    transform: "translateX(5px)",
    "& svg": {
      color: theme.palette.primary.dark,
    },
  },
});

const drawerVariants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: { type: "spring", stiffness: 120 } },
};

const Navbar = () => {
  const location = useLocation();
  const [aboutAnchorEl, setAboutAnchorEl] = useState(null);
  const [newsAnchorEl, setNewsAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useMediaQuery("(max-width:950px)");

  const isTargetPage =
    location.pathname === "/" ||
    location.pathname === "/solution" ||
    location.pathname === "/about" ||
    location.pathname === "/vendors" ||
    location.pathname === "/contact" ||
    location.pathname === "/leadership" ||
    location.pathname === "/global-coverage";

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

  return (
    <ThemeProvider theme={theme}>
      <CustomAppBar
        position="fixed"
        isTargetPage={isTargetPage}
        isScrolled={isScrolled}
      >
        <CustomToolbar>
          <Link
            to="/"
            style={{ padding: "16px", display: "flex", alignItems: "center" }}
          >
            <img
              src={isTargetPage && !isScrolled ? image1 : image2}
              alt="CONNEX Logo"
              style={{
                height: "40px",
                width: "auto",
                cursor: "pointer",
                transition: "all 0.3s ease",
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
                        isTargetPage && !isScrolled
                          ? "#ffffff"
                          : theme.palette.primary.dark,
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
                        background: "white",
                        boxShadow: "-4px 0 12px rgba(0,0,0,0.15)",
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
                            sx={{ color: theme.palette.primary.dark }}
                          />
                        </IconButton>
                      </Box>

                      <List sx={{ padding: "0 1.5rem" }}>
                        <ListItem
                          component={Link}
                          to="/solution"
                          onClick={() => setDrawerOpen(false)}
                        >
                          <ListItemText primary="Solution" />
                        </ListItem>
                        <ListItem
                          component={Link}
                          to="/vendors"
                          onClick={() => setDrawerOpen(false)}
                        >
                          <ListItemText primary="Vendors" />
                        </ListItem>
                        <ListItem
                          component={Link}
                          to="/services"
                          onClick={() => setDrawerOpen(false)}
                        >
                          <ListItemText primary="Services" />
                        </ListItem>
                        <ListItem
                          component={Link}
                          to="/events"
                          onClick={() => setDrawerOpen(false)}
                        >
                          <ListItemText primary="Events & Webinars" />
                        </ListItem>
                        <ListItem
                          component={Link}
                          to="/resources"
                          onClick={() => setDrawerOpen(false)}
                        >
                          <ListItemText primary="Resources" />
                        </ListItem>
                        <ListItem
                          component={Link}
                          to="/news"
                          onClick={() => setDrawerOpen(false)}
                        >
                          <ListItemText primary="News" />
                        </ListItem>

                        <ListItem
                          button
                          onClick={() => setSubmenuOpen(!submenuOpen)}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <ListItemText
                            primary="About Us"
                            sx={{
                              fontSize: "1.1rem",
                              fontWeight: "600",
                              color: theme.palette.primary.dark,
                            }}
                          />
                          {submenuOpen ? (
                            <ExpandLess
                              sx={{ color: theme.palette.primary.main }}
                            />
                          ) : (
                            <ExpandMore
                              sx={{ color: theme.palette.primary.main }}
                            />
                          )}
                        </ListItem>

                        <Collapse in={submenuOpen} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItem
                              component={Link}
                              to="/about"
                              sx={{ pl: 4, py: 1 }}
                              onClick={() => setDrawerOpen(false)}
                            >
                              <ListItemText primary="About Us" />
                            </ListItem>
                            <ListItem
                              component={Link}
                              to="/history"
                              sx={{ pl: 4, py: 1 }}
                              onClick={() => setDrawerOpen(false)}
                            >
                              <ListItemText primary="Our History" />
                            </ListItem>
                            <ListItem
                              component={Link}
                              to="/why-us"
                              sx={{ pl: 4, py: 1 }}
                              onClick={() => setDrawerOpen(false)}
                            >
                              <ListItemText primary="Why Us" />
                            </ListItem>
                            <ListItem
                              component={Link}
                              to="/global-coverage"
                              sx={{ pl: 4, py: 1 }}
                              onClick={() => setDrawerOpen(false)}
                            >
                              <ListItemText primary="Global Coverage" />
                            </ListItem>
                            <ListItem
                              component={Link}
                              to="/leadership"
                              sx={{ pl: 4, py: 1 }}
                              onClick={() => setDrawerOpen(false)}
                            >
                              <ListItemText primary="Leadership" />
                            </ListItem>
                            <ListItem
                              component={Link}
                              to="/careers"
                              sx={{ pl: 4, py: 1 }}
                              onClick={() => setDrawerOpen(false)}
                            >
                              <ListItemText primary="Careers" />
                            </ListItem>
                          </List>
                        </Collapse>

                        <Divider sx={{ my: 1 }} />

                        <ListItem
                          component={Link}
                          to="/contact"
                          onClick={() => setDrawerOpen(false)}
                        >
                          <ListItemText primary="Contact Us" />
                        </ListItem>
                      </List>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <ButtonContainer>
              <CustomButton
                component={Link}
                to="/solution"
                active={location.pathname === "/solution"}
                isTargetPage={isTargetPage}
                isScrolled={isScrolled}
              >
                Solutions
                <HoverEffect active={location.pathname === "/solution"} />
              </CustomButton>
              <CustomButton
                component={Link}
                to="/vendors"
                active={location.pathname === "/vendors"}
                isTargetPage={isTargetPage}
                isScrolled={isScrolled}
              >
                Vendors
                <HoverEffect active={location.pathname === "/vendors"} />
              </CustomButton>
              <CustomButton
                component={Link}
                to="/services"
                active={location.pathname === "/services"}
                isTargetPage={isTargetPage}
                isScrolled={isScrolled}
              >
                Services
                <HoverEffect active={location.pathname === "/services"} />
              </CustomButton>
              <CustomButton
                component={Link}
                to="/events"
                active={location.pathname === "/events"}
                isTargetPage={isTargetPage}
                isScrolled={isScrolled}
              >
                Events & Webinars
                <HoverEffect active={location.pathname === "/events"} />
              </CustomButton>
              <CustomButton
                component={Link}
                to="/resources"
                active={location.pathname === "/resources"}
                isTargetPage={isTargetPage}
                isScrolled={isScrolled}
              >
                Resources
                <HoverEffect active={location.pathname === "/resources"} />
              </CustomButton>

              {/* News Dropdown */}
              <div
                onMouseEnter={(e) => setNewsAnchorEl(e.currentTarget)}
                onMouseLeave={() => setNewsAnchorEl(null)}
                style={{ position: "relative" }}
              >
                <CustomButton
                  component={Link}
                  to="/news"
                  active={location.pathname.startsWith("/news")}
                  isTargetPage={isTargetPage}
                  isScrolled={isScrolled}
                >
                  News
                  <HoverEffect active={location.pathname.startsWith("/news")} />
                </CustomButton>

                <CustomMenu
                  id="news-menu"
                  anchorEl={newsAnchorEl}
                  keepMounted
                  open={Boolean(newsAnchorEl)}
                  onClose={() => setNewsAnchorEl(null)}
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
                  <CustomMenuItem
                    onClick={() => setNewsAnchorEl(null)}
                    component={Link}
                    to="/blog"
                  >
                    Blog
                  </CustomMenuItem>
                  <CustomMenuItem
                    onClick={() => setNewsAnchorEl(null)}
                    component={Link}
                    to="/press-&-media"
                  >
                    Press & Media
                  </CustomMenuItem>
                </CustomMenu>
              </div>

              <div
                onMouseEnter={handleAboutHover}
                onMouseLeave={handleAboutClose}
                style={{ position: "relative" }}
              >
                <CustomButton
                  component={Link}
                  to="/about"
                  active={location.pathname.startsWith("/about")}
                  isTargetPage={isTargetPage}
                  isScrolled={isScrolled}
                >
                  About Us
                  <HoverEffect
                    active={location.pathname.startsWith("/about")}
                  />
                </CustomButton>

                <CustomMenu
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
                  <CustomMenuItem
                    onClick={handleAboutClose}
                    component={Link}
                    to="/history"
                  >
                    Our History
                  </CustomMenuItem>
                  <CustomMenuItem
                    onClick={handleAboutClose}
                    component={Link}
                    to="/why-us"
                  >
                    Why Us
                  </CustomMenuItem>
                  <CustomMenuItem
                    onClick={handleAboutClose}
                    component={Link}
                    to="/global-coverage"
                  >
                    Global Coverage
                  </CustomMenuItem>
                  <CustomMenuItem
                    onClick={handleAboutClose}
                    component={Link}
                    to="/leadership"
                  >
                    Leadership
                  </CustomMenuItem>
                  <CustomMenuItem
                    onClick={handleAboutClose}
                    component={Link}
                    to="/careers"
                  >
                    Careers
                  </CustomMenuItem>
                </CustomMenu>
              </div>

              <ContactButton
                component={Link}
                to="/contact"
                isScrolled={isScrolled}
              >
                Contact Us
              </ContactButton>
            </ButtonContainer>
          )}
        </CustomToolbar>
      </CustomAppBar>
    </ThemeProvider>
  );
};

export default Navbar;
