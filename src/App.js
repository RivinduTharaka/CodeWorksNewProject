import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import AboutUs from './components/About';
import Services from './components/Services';
import Service01 from './components/Service01';
import Service02 from './components/Service02';
import ContactUs from './components/ContactUs';
import Solutions from './components/Solution/Solutions';
import Vendor from './components/Vendors/vendor'
import HistorySection from './components/AboutUs/History/HistorySection';
import Leadership from './components/AboutUs/LeaderShip/Leadership';

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
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;