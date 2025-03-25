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

// Australia Components
import AUNavbar from './components/Australia/Navbar';
import AUFooter from './components/Australia/Footer';
import AUHome from './components/Australia/Home';
import AUAboutUs from './components/Australia/About';
import AUServices from './components/Australia/Services';
import AUService01 from './components/Australia/Service01';
import AUService02 from './components/Australia/Service02';
import AUContactUs from './components/Australia/ContactUs';
import AUSolutions from './components/Australia/Solution/Solutions';
import AUVendor from './components/Australia/Vendors/vendor';
import AUHistorySection from './components/Australia/AboutUs/History/HistorySection';
import AULeadership from './components/Australia/AboutUs/LeaderShip/Leadership';
import AUGlobalCoverage from './components/Australia/AboutUs/GlobalCoverage/GlobalCoverage';
import AUEventsNews from './components/Australia/Evnt/EventsNews/EventsNews';
import AUTrainings from './components/Australia/Servicess/Trainings/Trainings';
import AUBlogDetails from './components/Australia/News/Blogs/BlogDetails';
import AURegisterEvent from './components/Australia/Evnt/EventsNews/RegisterEvent';
import AUWhyUs from './components/Australia/AboutUs/WhyUs/WhyUs';
import { AUBlogs } from './components/Australia/News/Blogs/Blogs';
import AUPortal from './components/Australia/Portal/Portal';

// Bangladesh Components
import BgdNavbar from './components/Bangladesh/Navbar';
import BgdFooter from './components/Bangladesh/Footer';
import BgdHome from './components/Bangladesh/Home';
import BgdAboutUs from './components/Bangladesh/About';
import BgdServices from './components/Bangladesh/Services';
import BgdService01 from './components/Bangladesh/Service01';
import BgdService02 from './components/Bangladesh/Service02';
import BgdContactUs from './components/Bangladesh/ContactUs';
import BgdSolutions from './components/Bangladesh/Solution/Solutions';
import BgdVendor from './components/Bangladesh/Vendors/vendor';
import BgdHistorySection from './components/Bangladesh/AboutUs/History/HistorySection';
import BgdLeadership from './components/Bangladesh/AboutUs/LeaderShip/Leadership';
import BgdGlobalCoverage from './components/Bangladesh/AboutUs/GlobalCoverage/GlobalCoverage';
import BgdEventsNews from './components/Bangladesh/Evnt/EventsNews/EventsNews';
import BgdTrainings from './components/Bangladesh/Servicess/Trainings/Trainings';
import BgdBlogDetails from './components/Bangladesh/News/Blogs/BlogDetails';
import BgdRegisterEvent from './components/Bangladesh/Evnt/EventsNews/RegisterEvent';
import BgdWhyUs from './components/Bangladesh/AboutUs/WhyUs/WhyUs';
import { BgdBlogs } from './components/Bangladesh/News/Blogs/Blogs';
import BgdPortal from './components/Bangladesh/Portal/Portal';

// Sri Lanka Components
import SLNavbar from './components/SriLanka/Navbar';
import SLFooter from './components/SriLanka/Footer';
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
import SLTrainings from './components/SriLanka/Servicess/Trainings/Trainings';
import SLBlogDetails from './components/SriLanka/News/Blogs/BlogDetails';
import SLRegisterEvent from './components/SriLanka/Evnt/EventsNews/RegisterEvent';
import SLWhyUs from './components/SriLanka/AboutUs/WhyUs/WhyUs';
import SLPortal from './components/SriLanka/Portal/Portal';
import { SLBlogs } from './components/SriLanka/News/Blogs/Blogs';

// Cambodia Components
import CamNavbar from './components/Cambodia/Navbar';
import CamFooter from './components/Cambodia/Footer';
import CamHome from './components/Cambodia/Home';
import CamAboutUs from './components/Cambodia/About';
import CamServices from './components/Cambodia/Services';
import CamService01 from './components/Cambodia/Service01';
import CamService02 from './components/Cambodia/Service02';
import CamContactUs from './components/Cambodia/ContactUs';
import CamSolutions from './components/Cambodia/Solution/Solutions';
import CamVendor from './components/Cambodia/Vendors/vendor';
import CamHistorySection from './components/Cambodia/AboutUs/History/HistorySection';
import CamLeadership from './components/Cambodia/AboutUs/LeaderShip/Leadership';
import CamGlobalCoverage from './components/Cambodia/AboutUs/GlobalCoverage/GlobalCoverage';
import CamEventsNews from './components/Cambodia/Evnt/EventsNews/EventsNews';
import CamTrainings from './components/Cambodia/Servicess/Trainings/Trainings';
import CamBlogDetails from './components/Cambodia/News/Blogs/BlogDetails';
import CamRegisterEvent from './components/Cambodia/Evnt/EventsNews/RegisterEvent';
import CamWhyUs from './components/Cambodia/AboutUs/WhyUs/WhyUs';
import { CamBlogs } from './components/Cambodia/News/Blogs/Blogs';
import CamPortal from './components/Cambodia/Portal/Portal';

// Layouts for Global, Australia, Sri Lanka, and Cambodia
const GlobalLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

const AustraliaLayout = ({ children }) => (
  <>
    <AUNavbar />
    {children}
    <AUFooter />
  </>
);

const BangladeshLayout = ({ children }) => (
  <>
    <BgdNavbar />
    {children}
    <BgdFooter />
  </>
);


const SriLankaLayout = ({ children }) => (
  <>
    <SLNavbar />
    {children}
    <SLFooter />
  </>
);

const CambodiaLayout = ({ children }) => (
  <>
    <CamNavbar />
    {children}
    <CamFooter />
  </>
);

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Global Routes */}
        <Route path="/" element={<GlobalLayout><Home /></GlobalLayout>} />
        <Route path="/about" element={<GlobalLayout><AboutUs /></GlobalLayout>} />
        <Route path="/services" element={<GlobalLayout><Services /></GlobalLayout>} />
        <Route path="/service01" element={<GlobalLayout><Service01 /></GlobalLayout>} />
        <Route path="/service02" element={<GlobalLayout><Service02 /></GlobalLayout>} />
        <Route path="/contact" element={<GlobalLayout><ContactUs /></GlobalLayout>} />
        <Route path="/solution" element={<GlobalLayout><Solutions /></GlobalLayout>} />
        <Route path="/vendors" element={<GlobalLayout><Vendor /></GlobalLayout>} />
        <Route path="/history" element={<GlobalLayout><HistorySection /></GlobalLayout>} />
        <Route path="/leadership" element={<GlobalLayout><Leadership /></GlobalLayout>} />
        <Route path="/global-coverage" element={<GlobalLayout><GlobalCoverage /></GlobalLayout>} />
        <Route path="/blog" element={<GlobalLayout><Blogs /></GlobalLayout>} />
        <Route path="/events" element={<GlobalLayout><EventsNews /></GlobalLayout>} />
        <Route path="/trainings" element={<GlobalLayout><Trainings /></GlobalLayout>} />
        <Route path="/blog/:title" element={<GlobalLayout><BlogDetails /></GlobalLayout>} />
        <Route path="/events/register/:id" element={<GlobalLayout><RegisterEvent /></GlobalLayout>} />
        <Route path="/why-us" element={<GlobalLayout><WhyUs /></GlobalLayout>} />

        {/* Australia Routes */}
        <Route path="/au" element={<AustraliaLayout><AUHome /></AustraliaLayout>} />
        <Route path="/au/about" element={<AustraliaLayout><AUAboutUs /></AustraliaLayout>} />
        <Route path="/au/services" element={<AustraliaLayout><AUServices /></AustraliaLayout>} />
        <Route path="/au/service01" element={<AustraliaLayout><AUService01 /></AustraliaLayout>} />
        <Route path="/au/service02" element={<AustraliaLayout><AUService02 /></AustraliaLayout>} />
        <Route path="/au/contact" element={<AustraliaLayout><AUContactUs /></AustraliaLayout>} />
        <Route path="/au/solution" element={<AustraliaLayout><AUSolutions /></AustraliaLayout>} />
        <Route path="/au/vendors" element={<AustraliaLayout><AUVendor /></AustraliaLayout>} />
        <Route path="/au/history" element={<AustraliaLayout><AUHistorySection /></AustraliaLayout>} />
        <Route path="/au/leadership" element={<AustraliaLayout><AULeadership /></AustraliaLayout>} />
        <Route path="/au/global-coverage" element={<AustraliaLayout><AUGlobalCoverage /></AustraliaLayout>} />
        <Route path="/au/blog" element={<AustraliaLayout><AUBlogs /></AustraliaLayout>} />
        <Route path="/au/events" element={<AustraliaLayout><AUEventsNews /></AustraliaLayout>} />
        <Route path="/au/trainings" element={<AustraliaLayout><AUTrainings /></AustraliaLayout>} />
        <Route path="/au/blog/:title" element={<AustraliaLayout><AUBlogDetails /></AustraliaLayout>} />
        <Route path="/au/events/register/:id" element={<AustraliaLayout><AURegisterEvent /></AustraliaLayout>} />
        <Route path="/au/why-us" element={<AustraliaLayout><AUWhyUs /></AustraliaLayout>} />
        <Route path="/au/portal" element={<AustraliaLayout><AUPortal /></AustraliaLayout>} />

        {/* B Routes */}
        <Route path="/bgd" element={<BangladeshLayout><AUHome /></BangladeshLayout>} />
        <Route path="/bgd/about" element={<BangladeshLayout><AUAboutUs /></BangladeshLayout>} />
        <Route path="/bgd/services" element={<BangladeshLayout><AUServices /></BangladeshLayout>} />
        <Route path="/bgd/service01" element={<BangladeshLayout><AUService01 /></BangladeshLayout>} />
        <Route path="/bgd/service02" element={<BangladeshLayout><AUService02 /></BangladeshLayout>} />
        <Route path="/bgd/contact" element={<BangladeshLayout><AUContactUs /></BangladeshLayout>} />
        <Route path="/bgd/solution" element={<BangladeshLayout><AUSolutions /></BangladeshLayout>} />
        <Route path="/bgd/vendors" element={<BangladeshLayout><AUVendor /></BangladeshLayout>} />
        <Route path="/bgd/history" element={<BangladeshLayout><AUHistorySection /></BangladeshLayout>} />
        <Route path="/bgd/leadership" element={<BangladeshLayout><AULeadership /></BangladeshLayout>} />
        <Route path="/bgd/global-coverage" element={<BangladeshLayout><AUGlobalCoverage /></BangladeshLayout>} />
        <Route path="/bgd/blog" element={<BangladeshLayout><AUBlogs /></BangladeshLayout>} />
        <Route path="/bgd/events" element={<BangladeshLayout><AUEventsNews /></BangladeshLayout>} />
        <Route path="/bgd/trainings" element={<BangladeshLayout><AUTrainings /></BangladeshLayout>} />
        <Route path="/bgd/blog/:title" element={<BangladeshLayout><AUBlogDetails /></BangladeshLayout>} />
        <Route path="/bgd/events/register/:id" element={<BangladeshLayout><AURegisterEvent /></BangladeshLayout>} />
        <Route path="/bgd/why-us" element={<BangladeshLayout><AUWhyUs /></BangladeshLayout>} />
        <Route path="/bgd/portal" element={<BangladeshLayout><AUPortal /></BangladeshLayout>} />

        {/* Sri Lanka Routes */}
        <Route path="/SL" element={<SriLankaLayout><SLHome /></SriLankaLayout>} />
        <Route path="/SL/about" element={<SriLankaLayout><SLAboutUs /></SriLankaLayout>} />
        <Route path="/SL/services" element={<SriLankaLayout><SLServices /></SriLankaLayout>} />
        <Route path="/SL/service01" element={<SriLankaLayout><SLService01 /></SriLankaLayout>} />
        <Route path="/SL/service02" element={<SriLankaLayout><SLService02 /></SriLankaLayout>} />
        <Route path="/SL/contact" element={<SriLankaLayout><SLContactUs /></SriLankaLayout>} />
        <Route path="/SL/solution" element={<SriLankaLayout><SLSolutions /></SriLankaLayout>} />
        <Route path="/SL/vendors" element={<SriLankaLayout><SLVendor /></SriLankaLayout>} />
        <Route path="/SL/history" element={<SriLankaLayout><SLHistorySection /></SriLankaLayout>} />
        <Route path="/SL/leadership" element={<SriLankaLayout><SLLeadership /></SriLankaLayout>} />
        <Route path="/SL/global-coverage" element={<SriLankaLayout><SLGlobalCoverage /></SriLankaLayout>} />
        <Route path="/SL/blog" element={<SriLankaLayout><SLBlogs /></SriLankaLayout>} />
        <Route path="/SL/events" element={<SriLankaLayout><SLEventsNews /></SriLankaLayout>} />
        <Route path="/SL/trainings" element={<SriLankaLayout><SLTrainings /></SriLankaLayout>} />
        <Route path="/SL/blog/:title" element={<SriLankaLayout><SLBlogDetails /></SriLankaLayout>} />
        <Route path="/SL/events/register/:id" element={<SriLankaLayout><SLRegisterEvent /></SriLankaLayout>} />
        <Route path="/SL/why-us" element={<SriLankaLayout><SLWhyUs /></SriLankaLayout>} />
        <Route path="/SL/portal" element={<SriLankaLayout><SLPortal /></SriLankaLayout>} />

        {/* Cambodia Routes */}
        <Route path="/kh" element={<CambodiaLayout><CamHome /></CambodiaLayout>} />
        <Route path="/kh/about" element={<CambodiaLayout><CamAboutUs /></CambodiaLayout>} />
        <Route path="/kh/services" element={<CambodiaLayout><CamServices /></CambodiaLayout>} />
        <Route path="/kh/service01" element={<CambodiaLayout><CamService01 /></CambodiaLayout>} />
        <Route path="/kh/service02" element={<CambodiaLayout><CamService02 /></CambodiaLayout>} />
        <Route path="/kh/contact" element={<CambodiaLayout><CamContactUs /></CambodiaLayout>} />
        <Route path="/kh/solution" element={<CambodiaLayout><CamSolutions /></CambodiaLayout>} />
        <Route path="/kh/vendors" element={<CambodiaLayout><CamVendor /></CambodiaLayout>} />
        <Route path="/kh/history" element={<CambodiaLayout><CamHistorySection /></CambodiaLayout>} />
        <Route path="/kh/leadership" element={<CambodiaLayout><CamLeadership /></CambodiaLayout>} />
        <Route path="/kh/global-coverage" element={<CambodiaLayout><CamGlobalCoverage /></CambodiaLayout>} />
        <Route path="/kh/blog" element={<CambodiaLayout><CamBlogs /></CambodiaLayout>} />
        <Route path="/kh/events" element={<CambodiaLayout><CamEventsNews /></CambodiaLayout>} />
        <Route path="/kh/trainings" element={<CambodiaLayout><CamTrainings /></CambodiaLayout>} />
        <Route path="/kh/blog/:title" element={<CambodiaLayout><CamBlogDetails /></CambodiaLayout>} />
        <Route path="/kh/events/register/:id" element={<CambodiaLayout><CamRegisterEvent /></CambodiaLayout>} />
        <Route path="/kh/why-us" element={<CambodiaLayout><CamWhyUs /></CambodiaLayout>} />
        <Route path="/kh/portal" element={<CambodiaLayout><CamPortal /></CambodiaLayout>} />
       
      </Routes>
    </Router>
  );
};

export default App;