import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Global Components
import Navbar from './components/Global/Navbar';
import Footer from './components/Global/Footer';
import Home from './components/Global/Home';
import AboutUs from './components/Global/About';
import Services from './components/Global/Servicess/Services';
import ContactUs from './components/Global/ContactUs';
import Solutions from './components/Global/Solution/Solutions';
import Vendor from './components/Global/Vendors/vendor';
import HistorySection from './components/Global/AboutUs/History/HistorySection';
import Leadership from './components/Global/AboutUs/LeaderShip/Leadership';
import GlobalCoverage from './components/Global/AboutUs/GlobalCoverage/GlobalCoverage';
import { Blogs } from './components/Global/Explore/Blogs/Blogs';
import EventsNews from './components/Global/Explore/EventsNews/EventsNews';
import Trainings from './components/Global/Explore/Trainings/Trainings';
import BlogDetails from './components/Global/Explore/Blogs/BlogDetails';
import RegisterEvent from './components/Global/Explore/EventsNews/RegisterEvent';
import WhyUs from './components/Global/AboutUs/WhyUs/WhyUs';
import  PressAndMedia  from './components/Global/Explore/PressAndMedia/PressAndMedia1';

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

// Brunei Components
import BrnNavbar from './components/Brunei/Navbar';
import BrnFooter from './components/Brunei/Footer';
import BrnHome from './components/Brunei/Home';
import BrnAboutUs from './components/Brunei/About';
import BrnServices from './components/Brunei/Services';
import BrnService01 from './components/Brunei/Service01';
import BrnService02 from './components/Brunei/Service02';
import BrnContactUs from './components/Brunei/ContactUs';
import BrnSolutions from './components/Brunei/Solution/Solutions';
import BrnVendor from './components/Brunei/Vendors/vendor';
import BrnHistorySection from './components/Brunei/AboutUs/History/HistorySection';
import BrnLeadership from './components/Brunei/AboutUs/LeaderShip/Leadership';
import BrnGlobalCoverage from './components/Brunei/AboutUs/GlobalCoverage/GlobalCoverage';
import BrnEventsNews from './components/Brunei/Evnt/EventsNews/EventsNews';
import BrnTrainings from './components/Brunei/Servicess/Trainings/Trainings';
import BrnBlogDetails from './components/Brunei/News/Blogs/BlogDetails';
import BrnRegisterEvent from './components/Brunei/Evnt/EventsNews/RegisterEvent';
import BrnWhyUs from './components/Brunei/AboutUs/WhyUs/WhyUs';
import { BrnBlogs } from './components/Brunei/News/Blogs/Blogs';
import BrnPortal from './components/Brunei/Portal/Portal';

// India Components
import InNavbar from './components/India/Navbar';
import InFooter from './components/India/Footer';
import InHome from './components/India/Home';
import InAboutUs from './components/India/About';
import InServices from './components/India/Services';
import InService01 from './components/India/Service01';
import InService02 from './components/India/Service02';
import InContactUs from './components/India/ContactUs';
import InSolutions from './components/India/Solution/Solutions';
import InVendor from './components/India/Vendors/vendor';
import InHistorySection from './components/India/AboutUs/History/HistorySection';
import InLeadership from './components/India/AboutUs/LeaderShip/Leadership';
import InGlobalCoverage from './components/India/AboutUs/GlobalCoverage/GlobalCoverage';
import InEventsNews from './components/India/Evnt/EventsNews/EventsNews';
import InTrainings from './components/India/Servicess/Trainings/Trainings';
import InBlogDetails from './components/India/News/Blogs/BlogDetails';
import InRegisterEvent from './components/India/Evnt/EventsNews/RegisterEvent';
import InWhyUs from './components/India/AboutUs/WhyUs/WhyUs';
import { InBlogs } from './components/India/News/Blogs/Blogs';
import InPortal from './components/India/Portal/Portal';

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

// Malaysia Components
import MyNavbar from './components/Malaysia/Navbar';
import MyFooter from './components/Malaysia/Footer';
import MyHome from './components/Malaysia/Home';
import MyAboutUs from './components/Malaysia/About';
import MyServices from './components/Malaysia/Services';
import MyService01 from './components/Malaysia/Service01';
import MyService02 from './components/Malaysia/Service02';
import MyContactUs from './components/Malaysia/ContactUs';
import MySolutions from './components/Malaysia/Solution/Solutions';
import MyVendor from './components/Malaysia/Vendors/vendor';
import MyHistorySection from './components/Malaysia/AboutUs/History/HistorySection';
import MyLeadership from './components/Malaysia/AboutUs/LeaderShip/Leadership';
import MyGlobalCoverage from './components/Malaysia/AboutUs/GlobalCoverage/GlobalCoverage';
import MyEventsNews from './components/Malaysia/Evnt/EventsNews/EventsNews';
import MyTrainings from './components/Malaysia/Servicess/Trainings/Trainings';
import MyBlogDetails from './components/Malaysia/News/Blogs/BlogDetails';
import MyRegisterEvent from './components/Malaysia/Evnt/EventsNews/RegisterEvent';
import MyWhyUs from './components/Malaysia/AboutUs/WhyUs/WhyUs';
import { MyBlogs } from './components/Malaysia/News/Blogs/Blogs';
import MyPortal from './components/Malaysia/Portal/Portal';

// Bhutan Components
import BtNavbar from './components/Bhutan/Navbar';
import BtFooter from './components/Bhutan/Footer';
import BtHome from './components/Bhutan/Home';
import BtAboutUs from './components/Bhutan/About';
import BtServices from './components/Bhutan/Services';
import BtService01 from './components/Bhutan/Service01';
import BtService02 from './components/Bhutan/Service02';
import BtContactUs from './components/Bhutan/ContactUs';
import BtSolutions from './components/Bhutan/Solution/Solutions';
import BtVendor from './components/Bhutan/Vendors/vendor';
import BtHistorySection from './components/Bhutan/AboutUs/History/HistorySection';
import BtLeadership from './components/Bhutan/AboutUs/LeaderShip/Leadership';
import BtGlobalCoverage from './components/Bhutan/AboutUs/GlobalCoverage/GlobalCoverage';
import BtEventsNews from './components/Bhutan/Evnt/EventsNews/EventsNews';
import BtTrainings from './components/Bhutan/Servicess/Trainings/Trainings';
import BtBlogDetails from './components/Bhutan/News/Blogs/BlogDetails';
import BtRegisterEvent from './components/Bhutan/Evnt/EventsNews/RegisterEvent';
import BtWhyUs from './components/Bhutan/AboutUs/WhyUs/WhyUs';
import { BtBlogs } from './components/Bhutan/News/Blogs/Blogs';
import BtPortal from './components/Bhutan/Portal/Portal';

// Maldives Components
import MvNavbar from './components/Maldives/Navbar';
import MvFooter from './components/Maldives/Footer';
import MvHome from './components/Maldives/Home';
import MvAboutUs from './components/Maldives/About';
import MvServices from './components/Maldives/Services';
import MvService01 from './components/Maldives/Service01';
import MvService02 from './components/Maldives/Service02';
import MvContactUs from './components/Maldives/ContactUs';
import MvSolutions from './components/Maldives/Solution/Solutions';
import MvVendor from './components/Maldives/Vendors/vendor';
import MvHistorySection from './components/Maldives/AboutUs/History/HistorySection';
import MvLeadership from './components/Maldives/AboutUs/LeaderShip/Leadership';
import MvGlobalCoverage from './components/Maldives/AboutUs/GlobalCoverage/GlobalCoverage';
import MvEventsNews from './components/Maldives/Evnt/EventsNews/EventsNews';
import MvTrainings from './components/Maldives/Servicess/Trainings/Trainings';
import MvBlogDetails from './components/Maldives/News/Blogs/BlogDetails';
import MvRegisterEvent from './components/Maldives/Evnt/EventsNews/RegisterEvent';
import MvWhyUs from './components/Maldives/AboutUs/WhyUs/WhyUs';
import { MvBlogs } from './components/Maldives/News/Blogs/Blogs';
import MvPortal from './components/Maldives/Portal/Portal';

// Mauritius Components
import MuNavbar from './components/Mauritius/Navbar';
import MuFooter from './components/Mauritius/Footer';
import MuHome from './components/Mauritius/Home';
import MuAboutUs from './components/Mauritius/About';
import MuServices from './components/Mauritius/Services';
import MuService01 from './components/Mauritius/Service01';
import MuService02 from './components/Mauritius/Service02';
import MuContactUs from './components/Mauritius/ContactUs';
import MuSolutions from './components/Mauritius/Solution/Solutions';
import MuVendor from './components/Mauritius/Vendors/vendor';
import MuHistorySection from './components/Mauritius/AboutUs/History/HistorySection';
import MuLeadership from './components/Mauritius/AboutUs/LeaderShip/Leadership';
import MuGlobalCoverage from './components/Mauritius/AboutUs/GlobalCoverage/GlobalCoverage';
import MuEventsNews from './components/Mauritius/Evnt/EventsNews/EventsNews';
import MuTrainings from './components/Mauritius/Servicess/Trainings/Trainings';
import MuBlogDetails from './components/Mauritius/News/Blogs/BlogDetails';
import MuRegisterEvent from './components/Mauritius/Evnt/EventsNews/RegisterEvent';
import MuWhyUs from './components/Mauritius/AboutUs/WhyUs/WhyUs';
import { MuBlogs } from './components/Mauritius/News/Blogs/Blogs';
import MuPortal from './components/Mauritius/Portal/Portal';

// Nepal Components
import NplNavbar from './components/Nepal/Navbar';
import NplFooter from './components/Nepal/Footer';
import NplHome from './components/Nepal/Home';
import NplAboutUs from './components/Nepal/About';
import NplServices from './components/Nepal/Services';
import NplService01 from './components/Nepal/Service01';
import NplService02 from './components/Nepal/Service02';
import NplContactUs from './components/Nepal/ContactUs';
import NplSolutions from './components/Nepal/Solution/Solutions';
import NplVendor from './components/Nepal/Vendors/vendor';
import NplHistorySection from './components/Nepal/AboutUs/History/HistorySection';
import NplLeadership from './components/Nepal/AboutUs/LeaderShip/Leadership';
import NplGlobalCoverage from './components/Nepal/AboutUs/GlobalCoverage/GlobalCoverage';
import NplEventsNews from './components/Nepal/Evnt/EventsNews/EventsNews';
import NplTrainings from './components/Nepal/Servicess/Trainings/Trainings';
import NplBlogDetails from './components/Nepal/News/Blogs/BlogDetails';
import NplRegisterEvent from './components/Nepal/Evnt/EventsNews/RegisterEvent';
import NplWhyUs from './components/Nepal/AboutUs/WhyUs/WhyUs';
import { NplBlogs } from './components/Nepal/News/Blogs/Blogs';
import NplPortal from './components/Nepal/Portal/Portal';

// New Zealand Components
import NzNavbar from './components/NewZealand/Navbar';
import NzFooter from './components/NewZealand/Footer';
import NzHome from './components/NewZealand/Home';
import NzAboutUs from './components/NewZealand/About';
import NzServices from './components/NewZealand/Services';
import NzService01 from './components/NewZealand/Service01';
import NzService02 from './components/NewZealand/Service02';
import NzContactUs from './components/NewZealand/ContactUs';
import NzSolutions from './components/NewZealand/Solution/Solutions';
import NzVendor from './components/NewZealand/Vendors/vendor';
import NzHistorySection from './components/NewZealand/AboutUs/History/HistorySection';
import NzLeadership from './components/NewZealand/AboutUs/LeaderShip/Leadership';
import NzGlobalCoverage from './components/NewZealand/AboutUs/GlobalCoverage/GlobalCoverage';
import NzEventsNews from './components/NewZealand/Evnt/EventsNews/EventsNews';
import NzTrainings from './components/NewZealand/Servicess/Trainings/Trainings';
import NzBlogDetails from './components/NewZealand/News/Blogs/BlogDetails';
import NzRegisterEvent from './components/NewZealand/Evnt/EventsNews/RegisterEvent';
import NzWhyUs from './components/NewZealand/AboutUs/WhyUs/WhyUs';
import { NzBlogs } from './components/NewZealand/News/Blogs/Blogs';
import NzPortal from './components/NewZealand/Portal/Portal';

// Singapore Components
import SgNavbar from './components/Singapore/Navbar';
import SgFooter from './components/Singapore/Footer';
import SgHome from './components/Singapore/Home';
import SgAboutUs from './components/Singapore/About';
import SgServices from './components/Singapore/Services';
import SgService01 from './components/Singapore/Service01';
import SgService02 from './components/Singapore/Service02';
import SgContactUs from './components/Singapore/ContactUs';
import SgSolutions from './components/Singapore/Solution/Solutions';
import SgVendor from './components/Singapore/Vendors/vendor';
import SgHistorySection from './components/Singapore/AboutUs/History/HistorySection';
import SgLeadership from './components/Singapore/AboutUs/LeaderShip/Leadership';
import SgGlobalCoverage from './components/Singapore/AboutUs/GlobalCoverage/GlobalCoverage';
import SgEventsNews from './components/Singapore/Evnt/EventsNews/EventsNews';
import SgTrainings from './components/Singapore/Servicess/Trainings/Trainings';
import SgBlogDetails from './components/Singapore/News/Blogs/BlogDetails';
import SgRegisterEvent from './components/Singapore/Evnt/EventsNews/RegisterEvent';
import SgWhyUs from './components/Singapore/AboutUs/WhyUs/WhyUs';
import { SgBlogs } from './components/Singapore/News/Blogs/Blogs';
import SgPortal from './components/Singapore/Portal/Portal';

// Thailand Components
import ThNavbar from './components/Thailand/Navbar';
import ThFooter from './components/Thailand/Footer';
import ThHome from './components/Thailand/Home';
import ThAboutUs from './components/Thailand/About';
import ThServices from './components/Thailand/Services';
import ThService01 from './components/Thailand/Service01';
import ThService02 from './components/Thailand/Service02';
import ThContactUs from './components/Thailand/ContactUs';
import ThSolutions from './components/Thailand/Solution/Solutions';
import ThVendor from './components/Thailand/Vendors/vendor';
import ThHistorySection from './components/Thailand/AboutUs/History/HistorySection';
import ThLeadership from './components/Thailand/AboutUs/LeaderShip/Leadership';
import ThGlobalCoverage from './components/Thailand/AboutUs/GlobalCoverage/GlobalCoverage';
import ThEventsNews from './components/Thailand/Evnt/EventsNews/EventsNews';
import ThTrainings from './components/Thailand/Servicess/Trainings/Trainings';
import ThBlogDetails from './components/Thailand/News/Blogs/BlogDetails';
import ThRegisterEvent from './components/Thailand/Evnt/EventsNews/RegisterEvent';
import ThWhyUs from './components/Thailand/AboutUs/WhyUs/WhyUs';
import { ThBlogs } from './components/Thailand/News/Blogs/Blogs';
import ThPortal from './components/Thailand/Portal/Portal';

// UAE Components
import AeNavbar from './components/UAE/Navbar';
import AeFooter from './components/UAE/Footer';
import AeHome from './components/UAE/Home';
import AeAboutUs from './components/UAE/About';
import AeServices from './components/UAE/Services';
import AeService01 from './components/UAE/Service01';
import AeService02 from './components/UAE/Service02';
import AeContactUs from './components/UAE/ContactUs';
import AeSolutions from './components/UAE/Solution/Solutions';
import AeVendor from './components/UAE/Vendors/vendor';
import AeHistorySection from './components/UAE/AboutUs/History/HistorySection';
import AeLeadership from './components/UAE/AboutUs/LeaderShip/Leadership';
import AeGlobalCoverage from './components/UAE/AboutUs/GlobalCoverage/GlobalCoverage';
import AeEventsNews from './components/UAE/Evnt/EventsNews/EventsNews';
import AeTrainings from './components/UAE/Servicess/Trainings/Trainings';
import AeBlogDetails from './components/UAE/News/Blogs/BlogDetails';
import AeRegisterEvent from './components/UAE/Evnt/EventsNews/RegisterEvent';
import AeWhyUs from './components/UAE/AboutUs/WhyUs/WhyUs';
import { AeBlogs } from './components/UAE/News/Blogs/Blogs';
import AePortal from './components/UAE/Portal/Portal';

// Layouts for all countries
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

const BruneiLayout = ({ children }) => (
  <>
    <BrnNavbar />
    {children}
    <BrnFooter />
  </>
);

const IndiaLayout = ({ children }) => (
  <>
    <InNavbar />
    {children}
    <InFooter />
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

const MaldivesLayout = ({ children }) => (
  <>
    <MvNavbar />
    {children}
    <MvFooter />
  </>
);

const MauritiusLayout = ({ children }) => (
  <>
    <MuNavbar />
    {children}
    <MuFooter />
  </>
);

const NepalLayout = ({ children }) => (
  <>
    <NplNavbar />
    {children}
    <NplFooter />
  </>
);

const MalaysiaLayout = ({ children }) => (
  <>
    <MyNavbar />
    {children}
    <MyFooter />
  </>
);

const BhutanLayout = ({ children }) => (
  <>
    <BtNavbar />
    {children}
    <BtFooter />
  </>
);

const NewZealandLayout = ({ children }) => (
  <>
    <NzNavbar />
    {children}
    <NzFooter />
  </>
);

const SingaporeLayout = ({ children }) => (
  <>
    <SgNavbar />
    {children}
    <SgFooter />
  </>
);

const ThailandLayout = ({ children }) => (
  <>
    <ThNavbar />
    {children}
    <ThFooter />
  </>
);

const UAELayout = ({ children }) => (
  <>
    <AeNavbar />
    {children}
    <AeFooter />
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
        <Route path="/press-&-media" element={<GlobalLayout><PressAndMedia /></GlobalLayout>} />

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

        {/* Bangladesh Routes */}
        <Route path="/bgd" element={<BangladeshLayout><BgdHome /></BangladeshLayout>} />
        <Route path="/bgd/about" element={<BangladeshLayout><BgdAboutUs /></BangladeshLayout>} />
        <Route path="/bgd/services" element={<BangladeshLayout><BgdServices /></BangladeshLayout>} />
        <Route path="/bgd/service01" element={<BangladeshLayout><BgdService01 /></BangladeshLayout>} />
        <Route path="/bgd/service02" element={<BangladeshLayout><BgdService02 /></BangladeshLayout>} />
        <Route path="/bgd/contact" element={<BangladeshLayout><BgdContactUs /></BangladeshLayout>} />
        <Route path="/bgd/solution" element={<BangladeshLayout><BgdSolutions /></BangladeshLayout>} />
        <Route path="/bgd/vendors" element={<BangladeshLayout><BgdVendor /></BangladeshLayout>} />
        <Route path="/bgd/history" element={<BangladeshLayout><BgdHistorySection /></BangladeshLayout>} />
        <Route path="/bgd/leadership" element={<BangladeshLayout><BgdLeadership /></BangladeshLayout>} />
        <Route path="/bgd/global-coverage" element={<BangladeshLayout><BgdGlobalCoverage /></BangladeshLayout>} />
        <Route path="/bgd/blog" element={<BangladeshLayout><BgdBlogs /></BangladeshLayout>} />
        <Route path="/bgd/events" element={<BangladeshLayout><BgdEventsNews /></BangladeshLayout>} />
        <Route path="/bgd/trainings" element={<BangladeshLayout><BgdTrainings /></BangladeshLayout>} />
        <Route path="/bgd/blog/:title" element={<BangladeshLayout><BgdBlogDetails /></BangladeshLayout>} />
        <Route path="/bgd/events/register/:id" element={<BangladeshLayout><BgdRegisterEvent /></BangladeshLayout>} />
        <Route path="/bgd/why-us" element={<BangladeshLayout><BgdWhyUs /></BangladeshLayout>} />
        <Route path="/bgd/portal" element={<BangladeshLayout><BgdPortal /></BangladeshLayout>} />

        {/* Brunei Routes */}
        <Route path="/brn" element={<BruneiLayout><BrnHome /></BruneiLayout>} />
        <Route path="/brn/about" element={<BruneiLayout><BrnAboutUs /></BruneiLayout>} />
        <Route path="/brn/services" element={<BruneiLayout><BrnServices /></BruneiLayout>} />
        <Route path="/brn/service01" element={<BruneiLayout><BrnService01 /></BruneiLayout>} />
        <Route path="/brn/service02" element={<BruneiLayout><BrnService02 /></BruneiLayout>} />
        <Route path="/brn/contact" element={<BruneiLayout><BrnContactUs /></BruneiLayout>} />
        <Route path="/brn/solution" element={<BruneiLayout><BrnSolutions /></BruneiLayout>} />
        <Route path="/brn/vendors" element={<BruneiLayout><BrnVendor /></BruneiLayout>} />
        <Route path="/brn/history" element={<BruneiLayout><BrnHistorySection /></BruneiLayout>} />
        <Route path="/brn/leadership" element={<BruneiLayout><BrnLeadership /></BruneiLayout>} />
        <Route path="/brn/global-coverage" element={<BruneiLayout><BrnGlobalCoverage /></BruneiLayout>} />
        <Route path="/brn/blog" element={<BruneiLayout><BrnBlogs /></BruneiLayout>} />
        <Route path="/brn/events" element={<BruneiLayout><BrnEventsNews /></BruneiLayout>} />
        <Route path="/brn/trainings" element={<BruneiLayout><BrnTrainings /></BruneiLayout>} />
        <Route path="/brn/blog/:title" element={<BruneiLayout><BrnBlogDetails /></BruneiLayout>} />
        <Route path="/brn/events/register/:id" element={<BruneiLayout><BrnRegisterEvent /></BruneiLayout>} />
        <Route path="/brn/why-us" element={<BruneiLayout><BrnWhyUs /></BruneiLayout>} />
        <Route path="/brn/portal" element={<BruneiLayout><BrnPortal /></BruneiLayout>} />

        {/* India Routes */}
        <Route path="/in" element={<IndiaLayout><InHome /></IndiaLayout>} />
        <Route path="/in/about" element={<IndiaLayout><InAboutUs /></IndiaLayout>} />
        <Route path="/in/services" element={<IndiaLayout><InServices /></IndiaLayout>} />
        <Route path="/in/service01" element={<IndiaLayout><InService01 /></IndiaLayout>} />
        <Route path="/in/service02" element={<IndiaLayout><InService02 /></IndiaLayout>} />
        <Route path="/in/contact" element={<IndiaLayout><InContactUs /></IndiaLayout>} />
        <Route path="/in/solution" element={<IndiaLayout><InSolutions /></IndiaLayout>} />
        <Route path="/in/vendors" element={<IndiaLayout><InVendor /></IndiaLayout>} />
        <Route path="/in/history" element={<IndiaLayout><InHistorySection /></IndiaLayout>} />
        <Route path="/in/leadership" element={<IndiaLayout><InLeadership /></IndiaLayout>} />
        <Route path="/in/global-coverage" element={<IndiaLayout><InGlobalCoverage /></IndiaLayout>} />
        <Route path="/in/blog" element={<IndiaLayout><InBlogs /></IndiaLayout>} />
        <Route path="/in/events" element={<IndiaLayout><InEventsNews /></IndiaLayout>} />
        <Route path="/in/trainings" element={<IndiaLayout><InTrainings /></IndiaLayout>} />
        <Route path="/in/blog/:title" element={<IndiaLayout><InBlogDetails /></IndiaLayout>} />
        <Route path="/in/events/register/:id" element={<IndiaLayout><InRegisterEvent /></IndiaLayout>} />
        <Route path="/in/why-us" element={<IndiaLayout><InWhyUs /></IndiaLayout>} />
        <Route path="/in/portal" element={<IndiaLayout><InPortal /></IndiaLayout>} />

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

        {/* Maldives Routes */}
        <Route path="/mv" element={<MaldivesLayout><MvHome /></MaldivesLayout>} />
        <Route path="/mv/about" element={<MaldivesLayout><MvAboutUs /></MaldivesLayout>} />
        <Route path="/mv/services" element={<MaldivesLayout><MvServices /></MaldivesLayout>} />
        <Route path="/mv/service01" element={<MaldivesLayout><MvService01 /></MaldivesLayout>} />
        <Route path="/mv/service02" element={<MaldivesLayout><MvService02 /></MaldivesLayout>} />
        <Route path="/mv/contact" element={<MaldivesLayout><MvContactUs /></MaldivesLayout>} />
        <Route path="/mv/solution" element={<MaldivesLayout><MvSolutions /></MaldivesLayout>} />
        <Route path="/mv/vendors" element={<MaldivesLayout><MvVendor /></MaldivesLayout>} />
        <Route path="/mv/history" element={<MaldivesLayout><MvHistorySection /></MaldivesLayout>} />
        <Route path="/mv/leadership" element={<MaldivesLayout><MvLeadership /></MaldivesLayout>} />
        <Route path="/mv/global-coverage" element={<MaldivesLayout><MvGlobalCoverage /></MaldivesLayout>} />
        <Route path="/mv/blog" element={<MaldivesLayout><MvBlogs /></MaldivesLayout>} />
        <Route path="/mv/events" element={<MaldivesLayout><MvEventsNews /></MaldivesLayout>} />
        <Route path="/mv/trainings" element={<MaldivesLayout><MvTrainings /></MaldivesLayout>} />
        <Route path="/mv/blog/:title" element={<MaldivesLayout><MvBlogDetails /></MaldivesLayout>} />
        <Route path="/mv/events/register/:id" element={<MaldivesLayout><MvRegisterEvent /></MaldivesLayout>} />
        <Route path="/mv/why-us" element={<MaldivesLayout><MvWhyUs /></MaldivesLayout>} />
        <Route path="/mv/portal" element={<MaldivesLayout><MvPortal /></MaldivesLayout>} />

        {/* Mauritius Routes */}
        <Route path="/mu" element={<MauritiusLayout><MuHome /></MauritiusLayout>} />
        <Route path="/mu/about" element={<MauritiusLayout><MuAboutUs /></MauritiusLayout>} />
        <Route path="/mu/services" element={<MauritiusLayout><MuServices /></MauritiusLayout>} />
        <Route path="/mu/service01" element={<MauritiusLayout><MuService01 /></MauritiusLayout>} />
        <Route path="/mu/service02" element={<MauritiusLayout><MuService02 /></MauritiusLayout>} />
        <Route path="/mu/contact" element={<MauritiusLayout><MuContactUs /></MauritiusLayout>} />
        <Route path="/mu/solution" element={<MauritiusLayout><MuSolutions /></MauritiusLayout>} />
        <Route path="/mu/vendors" element={<MauritiusLayout><MuVendor /></MauritiusLayout>} />
        <Route path="/mu/history" element={<MauritiusLayout><MuHistorySection /></MauritiusLayout>} />
        <Route path="/mu/leadership" element={<MauritiusLayout><MuLeadership /></MauritiusLayout>} />
        <Route path="/mu/global-coverage" element={<MauritiusLayout><MuGlobalCoverage /></MauritiusLayout>} />
        <Route path="/mu/blog" element={<MauritiusLayout><MuBlogs /></MauritiusLayout>} />
        <Route path="/mu/events" element={<MauritiusLayout><MuEventsNews /></MauritiusLayout>} />
        <Route path="/mu/trainings" element={<MauritiusLayout><MuTrainings /></MauritiusLayout>} />
        <Route path="/mu/blog/:title" element={<MauritiusLayout><MuBlogDetails /></MauritiusLayout>} />
        <Route path="/mu/events/register/:id" element={<MauritiusLayout><MuRegisterEvent /></MauritiusLayout>} />
        <Route path="/mu/why-us" element={<MauritiusLayout><MuWhyUs /></MauritiusLayout>} />
        <Route path="/mu/portal" element={<MauritiusLayout><MuPortal /></MauritiusLayout>} />

        {/* Nepal Routes */}
        <Route path="/npl" element={<NepalLayout><NplHome /></NepalLayout>} />
        <Route path="/npl/about" element={<NepalLayout><NplAboutUs /></NepalLayout>} />
        <Route path="/npl/services" element={<NepalLayout><NplServices /></NepalLayout>} />
        <Route path="/npl/service01" element={<NepalLayout><NplService01 /></NepalLayout>} />
        <Route path="/npl/service02" element={<NepalLayout><NplService02 /></NepalLayout>} />
        <Route path="/npl/contact" element={<NepalLayout><NplContactUs /></NepalLayout>} />
        <Route path="/npl/solution" element={<NepalLayout><NplSolutions /></NepalLayout>} />
        <Route path="/npl/vendors" element={<NepalLayout><NplVendor /></NepalLayout>} />
        <Route path="/npl/history" element={<NepalLayout><NplHistorySection /></NepalLayout>} />
        <Route path="/npl/leadership" element={<NepalLayout><NplLeadership /></NepalLayout>} />
        <Route path="/npl/global-coverage" element={<NepalLayout><NplGlobalCoverage /></NepalLayout>} />
        <Route path="/npl/blog" element={<NepalLayout><NplBlogs /></NepalLayout>} />
        <Route path="/npl/events" element={<NepalLayout><NplEventsNews /></NepalLayout>} />
        <Route path="/npl/trainings" element={<NepalLayout><NplTrainings /></NepalLayout>} />
        <Route path="/npl/blog/:title" element={<NepalLayout><NplBlogDetails /></NepalLayout>} />
        <Route path="/npl/events/register/:id" element={<NepalLayout><NplRegisterEvent /></NepalLayout>} />
        <Route path="/npl/why-us" element={<NepalLayout><NplWhyUs /></NepalLayout>} />
        <Route path="/npl/portal" element={<NepalLayout><NplPortal /></NepalLayout>} />

        {/* New Zealand Routes */}
        <Route path="/nz" element={<NewZealandLayout><NzHome /></NewZealandLayout>} />
        <Route path="/nz/about" element={<NewZealandLayout><NzAboutUs /></NewZealandLayout>} />
        <Route path="/nz/services" element={<NewZealandLayout><NzServices /></NewZealandLayout>} />
        <Route path="/nz/service01" element={<NewZealandLayout><NzService01 /></NewZealandLayout>} />
        <Route path="/nz/service02" element={<NewZealandLayout><NzService02 /></NewZealandLayout>} />
        <Route path="/nz/contact" element={<NewZealandLayout><NzContactUs /></NewZealandLayout>} />
        <Route path="/nz/solution" element={<NewZealandLayout><NzSolutions /></NewZealandLayout>} />
        <Route path="/nz/vendors" element={<NewZealandLayout><NzVendor /></NewZealandLayout>} />
        <Route path="/nz/history" element={<NewZealandLayout><NzHistorySection /></NewZealandLayout>} />
        <Route path="/nz/leadership" element={<NewZealandLayout><NzLeadership /></NewZealandLayout>} />
        <Route path="/nz/global-coverage" element={<NewZealandLayout><NzGlobalCoverage /></NewZealandLayout>} />
        <Route path="/nz/blog" element={<NewZealandLayout><NzBlogs /></NewZealandLayout>} />
        <Route path="/nz/events" element={<NewZealandLayout><NzEventsNews /></NewZealandLayout>} />
        <Route path="/nz/trainings" element={<NewZealandLayout><NzTrainings /></NewZealandLayout>} />
        <Route path="/nz/blog/:title" element={<NewZealandLayout><NzBlogDetails /></NewZealandLayout>} />
        <Route path="/nz/events/register/:id" element={<NewZealandLayout><NzRegisterEvent /></NewZealandLayout>} />
        <Route path="/nz/why-us" element={<NewZealandLayout><NzWhyUs /></NewZealandLayout>} />
        <Route path="/nz/portal" element={<NewZealandLayout><NzPortal /></NewZealandLayout>} />

        {/* Singapore Routes */}
        <Route path="/sg" element={<SingaporeLayout><SgHome /></SingaporeLayout>} />
        <Route path="/sg/about" element={<SingaporeLayout><SgAboutUs /></SingaporeLayout>} />
        <Route path="/sg/services" element={<SingaporeLayout><SgServices /></SingaporeLayout>} />
        <Route path="/sg/service01" element={<SingaporeLayout><SgService01 /></SingaporeLayout>} />
        <Route path="/sg/service02" element={<SingaporeLayout><SgService02 /></SingaporeLayout>} />
        <Route path="/sg/contact" element={<SingaporeLayout><SgContactUs /></SingaporeLayout>} />
        <Route path="/sg/solution" element={<SingaporeLayout><SgSolutions /></SingaporeLayout>} />
        <Route path="/sg/vendors" element={<SingaporeLayout><SgVendor /></SingaporeLayout>} />
        <Route path="/sg/history" element={<SingaporeLayout><SgHistorySection /></SingaporeLayout>} />
        <Route path="/sg/leadership" element={<SingaporeLayout><SgLeadership /></SingaporeLayout>} />
        <Route path="/sg/global-coverage" element={<SingaporeLayout><SgGlobalCoverage /></SingaporeLayout>} />
        <Route path="/sg/blog" element={<SingaporeLayout><SgBlogs /></SingaporeLayout>} />
        <Route path="/sg/events" element={<SingaporeLayout><SgEventsNews /></SingaporeLayout>} />
        <Route path="/sg/trainings" element={<SingaporeLayout><SgTrainings /></SingaporeLayout>} />
        <Route path="/sg/blog/:title" element={<SingaporeLayout><SgBlogDetails /></SingaporeLayout>} />
        <Route path="/sg/events/register/:id" element={<SingaporeLayout><SgRegisterEvent /></SingaporeLayout>} />
        <Route path="/sg/why-us" element={<SingaporeLayout><SgWhyUs /></SingaporeLayout>} />
        <Route path="/sg/portal" element={<SingaporeLayout><SgPortal /></SingaporeLayout>} />

        {/* Malaysia Routes */}
        <Route path="/my" element={<MalaysiaLayout><MyHome /></MalaysiaLayout>} />
        <Route path="/my/about" element={<MalaysiaLayout><MyAboutUs /></MalaysiaLayout>} />
        <Route path="/my/services" element={<MalaysiaLayout><MyServices /></MalaysiaLayout>} />
        <Route path="/my/service01" element={<MalaysiaLayout><MyService01 /></MalaysiaLayout>} />
        <Route path="/my/service02" element={<MalaysiaLayout><MyService02 /></MalaysiaLayout>} />
        <Route path="/my/contact" element={<MalaysiaLayout><MyContactUs /></MalaysiaLayout>} />
        <Route path="/my/solution" element={<MalaysiaLayout><MySolutions /></MalaysiaLayout>} />
        <Route path="/my/vendors" element={<MalaysiaLayout><MyVendor /></MalaysiaLayout>} />
        <Route path="/my/history" element={<MalaysiaLayout><MyHistorySection /></MalaysiaLayout>} />
        <Route path="/my/leadership" element={<MalaysiaLayout><MyLeadership /></MalaysiaLayout>} />
        <Route path="/my/global-coverage" element={<MalaysiaLayout><MyGlobalCoverage /></MalaysiaLayout>} />
        <Route path="/my/blog" element={<MalaysiaLayout><MyBlogs /></MalaysiaLayout>} />
        <Route path="/my/events" element={<MalaysiaLayout><MyEventsNews /></MalaysiaLayout>} />
        <Route path="/my/trainings" element={<MalaysiaLayout><MyTrainings /></MalaysiaLayout>} />
        <Route path="/my/blog/:title" element={<MalaysiaLayout><MyBlogDetails /></MalaysiaLayout>} />
        <Route path="/my/events/register/:id" element={<MalaysiaLayout><MyRegisterEvent /></MalaysiaLayout>} />
        <Route path="/my/why-us" element={<MalaysiaLayout><MyWhyUs /></MalaysiaLayout>} />
        <Route path="/my/portal" element={<MalaysiaLayout><MyPortal /></MalaysiaLayout>} />


        {/* Bhutan Routes */}
        <Route path="/bt" element={<BhutanLayout><BtHome /></BhutanLayout>} />
        <Route path="/bt/about" element={<BhutanLayout><BtAboutUs /></BhutanLayout>} />
        <Route path="/bt/services" element={<BhutanLayout><BtServices /></BhutanLayout>} />
        <Route path="/bt/service01" element={<BhutanLayout><BtService01 /></BhutanLayout>} />
        <Route path="/bt/service02" element={<BhutanLayout><BtService02 /></BhutanLayout>} />
        <Route path="/bt/contact" element={<BhutanLayout><BtContactUs /></BhutanLayout>} />
        <Route path="/bt/solution" element={<BhutanLayout><BtSolutions /></BhutanLayout>} />
        <Route path="/bt/vendors" element={<BhutanLayout><BtVendor /></BhutanLayout>} />
        <Route path="/bt/history" element={<BhutanLayout><BtHistorySection /></BhutanLayout>} />
        <Route path="/bt/leadership" element={<BhutanLayout><BtLeadership /></BhutanLayout>} />
        <Route path="/bt/global-coverage" element={<BhutanLayout><BtGlobalCoverage /></BhutanLayout>} />
        <Route path="/bt/blog" element={<BhutanLayout><BtBlogs /></BhutanLayout>} />
        <Route path="/bt/events" element={<BhutanLayout><BtEventsNews /></BhutanLayout>} />
        <Route path="/bt/trainings" element={<BhutanLayout><BtTrainings /></BhutanLayout>} />
        <Route path="/bt/blog/:title" element={<BhutanLayout><BtBlogDetails /></BhutanLayout>} />
        <Route path="/bt/events/register/:id" element={<BhutanLayout><BtRegisterEvent /></BhutanLayout>} />
        <Route path="/bt/why-us" element={<BhutanLayout><BtWhyUs /></BhutanLayout>} />
        <Route path="/bt/portal" element={<BhutanLayout><BtPortal /></BhutanLayout>} />

        {/* Thailand Routes */}
        <Route path="/th" element={<ThailandLayout><ThHome /></ThailandLayout>} />
        <Route path="/th/about" element={<ThailandLayout><ThAboutUs /></ThailandLayout>} />
        <Route path="/th/services" element={<ThailandLayout><ThServices /></ThailandLayout>} />
        <Route path="/th/service01" element={<ThailandLayout><ThService01 /></ThailandLayout>} />
        <Route path="/th/service02" element={<ThailandLayout><ThService02 /></ThailandLayout>} />
        <Route path="/th/contact" element={<ThailandLayout><ThContactUs /></ThailandLayout>} />
        <Route path="/th/solution" element={<ThailandLayout><ThSolutions /></ThailandLayout>} />
        <Route path="/th/vendors" element={<ThailandLayout><ThVendor /></ThailandLayout>} />
        <Route path="/th/history" element={<ThailandLayout><ThHistorySection /></ThailandLayout>} />
        <Route path="/th/leadership" element={<ThailandLayout><ThLeadership /></ThailandLayout>} />
        <Route path="/th/global-coverage" element={<ThailandLayout><ThGlobalCoverage /></ThailandLayout>} />
        <Route path="/th/blog" element={<ThailandLayout><ThBlogs /></ThailandLayout>} />
        <Route path="/th/events" element={<ThailandLayout><ThEventsNews /></ThailandLayout>} />
        <Route path="/th/trainings" element={<ThailandLayout><ThTrainings /></ThailandLayout>} />
        <Route path="/th/blog/:title" element={<ThailandLayout><ThBlogDetails /></ThailandLayout>} />
        <Route path="/th/events/register/:id" element={<ThailandLayout><ThRegisterEvent /></ThailandLayout>} />
        <Route path="/th/why-us" element={<ThailandLayout><ThWhyUs /></ThailandLayout>} />
        <Route path="/th/portal" element={<ThailandLayout><ThPortal /></ThailandLayout>} />

        {/* UAE Routes */}
        <Route path="/uae" element={<UAELayout><AeHome /></UAELayout>} />
        <Route path="/uae/about" element={<UAELayout><AeAboutUs /></UAELayout>} />
        <Route path="/uae/services" element={<UAELayout><AeServices /></UAELayout>} />
        <Route path="/uae/service01" element={<UAELayout><AeService01 /></UAELayout>} />
        <Route path="/uae/service02" element={<UAELayout><AeService02 /></UAELayout>} />
        <Route path="/uae/contact" element={<UAELayout><AeContactUs /></UAELayout>} />
        <Route path="/uae/solution" element={<UAELayout><AeSolutions /></UAELayout>} />
        <Route path="/uae/vendors" element={<UAELayout><AeVendor /></UAELayout>} />
        <Route path="/uae/history" element={<UAELayout><AeHistorySection /></UAELayout>} />
        <Route path="/uae/leadership" element={<UAELayout><AeLeadership /></UAELayout>} />
        <Route path="/uae/global-coverage" element={<UAELayout><AeGlobalCoverage /></UAELayout>} />
        <Route path="/uae/blog" element={<UAELayout><AeBlogs /></UAELayout>} />
        <Route path="/uae/events" element={<UAELayout><AeEventsNews /></UAELayout>} />
        <Route path="/uae/trainings" element={<UAELayout><AeTrainings /></UAELayout>} />
        <Route path="/uae/blog/:title" element={<UAELayout><AeBlogDetails /></UAELayout>} />
        <Route path="/uae/events/register/:id" element={<UAELayout><AeRegisterEvent /></UAELayout>} />
        <Route path="/uae/why-us" element={<UAELayout><AeWhyUs /></UAELayout>} />
        <Route path="/uae/portal" element={<UAELayout><AePortal /></UAELayout>} />
      </Routes>
    </Router>
  );
};

export default App;