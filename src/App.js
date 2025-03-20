import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Global Components
import Navbar from './components/Global/Navbar';
import Footer from './components/Global/Footer';
import Home from './components/Global/Home';
import AboutUs from './components/Global/About';
import Services from './components/Global/Services';
import Service01 from './components/Global/Service01';
import Service02 from './components/Global/Service02';
import ContactUs from './components/Global/ContactUs';
import Solutions from './components/Global/Solution/Solutions';
import Vendor from './components/Global/Vendors/vendor';
import HistorySection from './components/Global/AboutUs/History/HistorySection';
import Leadership from './components/Global/AboutUs/LeaderShip/Leadership';
import GlobalCoverage from './components/Global/AboutUs/GlobalCoverage/GlobalCoverage';
import { Blogs } from './components/Global/News/Blogs/Blogs';
import EventsNews from './components/Global/Evnt/EventsNews/EventsNews';
import Trainings from './components/Global/Servicess/Trainings/Trainings';
import BlogDetails from './components/Global/News/Blogs/BlogDetails';
import RegisterEvent from './components/Global/Evnt/EventsNews/RegisterEvent';
import WhyUs from './components/Global/AboutUs/WhyUs/WhyUs';

// Sri Lanka Components
import SLNavbar from './components/SriLanka/Navbar'; // Assuming SLNavbar is different
import SLFooter from './components/SriLanka/Footer'; // Assuming SLFooter is different
import SLHome from './components/SriLanka/Home';
import SLAboutUs from './components/SriLanka/About';
import SLServices from './components/SriLanka/Services';
import SLService01 from './components/SriLanka/Service01';
import SLService02 from './components/SriLanka/Service02';
import SLContactUs from './components/SriLanka/ContactUs';
import SLSolutions from './components/SriLanka/Solution/Solutions';
import SLVendor from './components/SriLanka/Vendors/vendor';
import SLHistorySection from './components/SriLanka/AboutUs/History/HistorySection';
import SLLeadership from './components/SriLanka/AboutUs/LeaderShip/Leadership';
import SLGlobalCoverage from './components/SriLanka/AboutUs/GlobalCoverage/GlobalCoverage';
import SLEventsNews from './components/SriLanka/Evnt/EventsNews/EventsNews';
import SLTrainings from './components/SriLanka/Evnt/Trainings/Trainings';
import SLBlogDetails from './components/SriLanka/News/Blogs/BlogDetails';
import SLRegisterEvent from './components/SriLanka/Evnt/EventsNews/RegisterEvent';
import SLWhyUs from './components/SriLanka/AboutUs/WhyUs/WhyUs';

// Layouts for Global and Sri Lanka
const GlobalLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

const SriLankaLayout = ({ children }) => (
  <>
    <SLNavbar />
    {children}
    <SLFooter />
  </>
);

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Global Routes */}
        <Route  path="/"  
        element={ <GlobalLayout> <Home /> </GlobalLayout> }
        />
        <Route path="/about"
          element={<GlobalLayout> <AboutUs /> </GlobalLayout>}
        />
        <Route path="/services"
          element={
            <GlobalLayout>
              <Services />
            </GlobalLayout>
          }
        />
        <Route path="/service01"
          element={
            <GlobalLayout>
              <Service01 />
            </GlobalLayout>
          }
        />
        <Route path="/service02"
          element={
            <GlobalLayout>
              <Service02 />
            </GlobalLayout>
          }
        />
        <Route path="/contact"
          element={
            <GlobalLayout>
              <ContactUs />
            </GlobalLayout>
          }
        />
        <Route path="/solution"
          element={
            <GlobalLayout>
              <Solutions />
            </GlobalLayout>
          }
        />
        <Route path="/vendors"
          element={
            <GlobalLayout>
              <Vendor />
            </GlobalLayout>
          }
        />
        <Route path="/history"
          element={
            <GlobalLayout>
              <HistorySection />
            </GlobalLayout>
          }
        />
        <Route path="/leadership"
          element={
            <GlobalLayout>
              <Leadership />
            </GlobalLayout>
          }
        />
        <Route path="/global-coverage"
          element={
            <GlobalLayout>
              <GlobalCoverage />
            </GlobalLayout>
          }
        />
        <Route path="/blog"
          element={
            <GlobalLayout>
              <Blogs />
            </GlobalLayout>
          }
        />
        <Route path="/events"
          element={
            <GlobalLayout>
              <EventsNews />
            </GlobalLayout>
          }
        />
        <Route path="/trainings"
          element={
            <GlobalLayout>
              <Trainings />
            </GlobalLayout>
          }
        />
        <Route path="/blog/:title"
          element={
            <GlobalLayout>
              <BlogDetails />
            </GlobalLayout>
          }
        />
        <Route path="/events/register/:id"
          element={
            <GlobalLayout>
              <RegisterEvent />
            </GlobalLayout>
          }
        />
        <Route path="/why-us"
          element={
            <GlobalLayout>
              <WhyUs />
            </GlobalLayout>
          }
        />

        {/* Sri Lanka Routes */}
        <Route path="/SL"
          element={
            <SriLankaLayout>
              <SLHome />
            </SriLankaLayout>
          }
        />
        <Route path="/SL/about"
          element={
            <SriLankaLayout>
              <SLAboutUs />
            </SriLankaLayout>
          }
        />
        <Route path="/SL/services"
          element={
            <SriLankaLayout>
              <SLServices />
            </SriLankaLayout>
          }
        />
        <Route path="/SL/service01"
          element={
            <SriLankaLayout>
              <SLService01 />
            </SriLankaLayout>
          }
        />
        <Route path="/SL/service02"
          element={
            <SriLankaLayout>
              <SLService02 />
            </SriLankaLayout>
          }
        />
        <Route
          path="/SL/contact"
          element={
            <SriLankaLayout>
              <SLContactUs />
            </SriLankaLayout>
          }
        />
        <Route
          path="/SL/solution"
          element={
            <SriLankaLayout>
              <SLSolutions />
            </SriLankaLayout>
          }
        />
        <Route
          path="/SL/vendors"
          element={
            <SriLankaLayout>
              <SLVendor />
            </SriLankaLayout>
          }
        />
        <Route
          path="/SL/history"
          element={
            <SriLankaLayout>
              <SLHistorySection />
            </SriLankaLayout>
          }
        />
        <Route
          path="/SL/leadership"
          element={
            <SriLankaLayout>
              <SLLeadership />
            </SriLankaLayout>
          }
        />
        <Route
          path="/SL/global-coverage"
          element={
            <SriLankaLayout>
              <SLGlobalCoverage />
            </SriLankaLayout>
          }
        />
        <Route
          path="/SL/events"
          element={
            <SriLankaLayout>
              <SLEventsNews />
            </SriLankaLayout>
          }
        />
        <Route
          path="/SL/trainings"
          element={
            <SriLankaLayout>
              <SLTrainings />
            </SriLankaLayout>
          }
        />
        <Route
          path="/SL/blog/:title"
          element={
            <SriLankaLayout>
              <SLBlogDetails />
            </SriLankaLayout>
          }
        />
        <Route
          path="/SL/events/register/:id"
          element={
            <SriLankaLayout>
              <SLRegisterEvent />
            </SriLankaLayout>
          }
        />
        <Route
          path="/SL/why-us"
          element={
            <SriLankaLayout>
              <SLWhyUs />
            </SriLankaLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;