import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Global/Navbar';
import Footer from './components/Global/Footer';
import Home from './components/Global/Home';
import AboutUs from './components/Global/About';
import Services from './components/Global/Services';
import Service01 from './components/Global/Service01';
import Service02 from './components/Global/Service02';
import ContactUs from './components/Global/ContactUs';
import Solutions from './components/Global/Solution/Solutions';
import Vendor from './components/Global/Vendors/vendor'
import HistorySection from './components/Global/AboutUs/History/HistorySection';
import Leadership from './components/Global/AboutUs/LeaderShip/Leadership';
import GlobalCoverage from './components/Global/AboutUs/GlobalCoverage/GlobalCoverage';
import { Blogs } from './components/Global/News/Blogs/Blogs';
import EventsNews from './components/Global/Evnt/EventsNews/EventsNews';
import Trainings from './components/Global/Evnt/Trainings/Trainings';
// import  {Blogs} from './components/Global/News/Blogs/Blogs';
import BlogDetails from './components/Global/News/Blogs/BlogDetails';
import RegisterEvent from './components/Global/Evnt/EventsNews/RegisterEvent';
import WhyUs from './components/Global/AboutUs/WhyUs/WhyUs';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/service01" element={<Service01 />} />
        <Route path="/service02" element={<Service02 />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/solution" element={<Solutions />} />
        <Route path="/vendors" element={<Vendor />} />
        <Route path="/history" element={<HistorySection />} />
        <Route path="/leadership" element={<Leadership />} />
        <Route path="/global-coverage" element={<GlobalCoverage />} />

        {/* News */}
        <Route path="/blog" element={<Blogs />} />
        <Route path="/events" element={<EventsNews />} />
        <Route path="/trainings" element={<Trainings />} />
        <Route path="/blog/:title" element={<BlogDetails />} />
        <Route path="/events/register/:id" element={<RegisterEvent />} />
        
        <Route path="/why-us" element={<WhyUs />} />


      </Routes>
      <Footer />
    </Router>
  );
};

export default App;