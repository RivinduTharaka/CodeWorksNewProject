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
import Leadership from './components/Global/AboutUs/LeaderShip/Leadership';
import GlobalCoverage from './components/Global/AboutUs/GlobalCoverage/GlobalCoverage';
import { Blogs } from './components/Global/Explore/Blogs/Blogs';
import EventsNews from './components/Global/Explore/EventsNews/EventsNews';
import Trainings from './components/Global/Explore/Trainings/Trainings';
import BlogDetails from './components/Global/Explore/Blogs/BlogDetails';
import RegisterEvent from './components/Global/Explore/EventsNews/RegisterEvent';
import WhyUs from './components/Global/AboutUs/WhyUs/WhyUs';
import  PressAndMedia  from './components/Global/Explore/PressAndMedia/PressAndMedia1';
import  PressDetail  from './components/Global/Explore/PressAndMedia/PressDetails';
import  Webinars  from './components/Global/Explore/Webinars/Webinars1';
import Resources from './components/Global/Resources/Resources';



// Layouts for all countries
const GlobalLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
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
        <Route path="/leadership" element={<GlobalLayout><Leadership /></GlobalLayout>} />
        <Route path="/global-coverage" element={<GlobalLayout><GlobalCoverage /></GlobalLayout>} />
        <Route path="/blog" element={<GlobalLayout><Blogs /></GlobalLayout>} />
        <Route path="/events" element={<GlobalLayout><EventsNews /></GlobalLayout>} />
        <Route path="/trainings" element={<GlobalLayout><Trainings /></GlobalLayout>} />
        <Route path="/webinars" element={<GlobalLayout><Webinars /></GlobalLayout>} />
        <Route path="/blog/:title" element={<GlobalLayout><BlogDetails /></GlobalLayout>} />
        <Route path="/events/register/:id" element={<GlobalLayout><RegisterEvent /></GlobalLayout>} />
        <Route path="/why-us" element={<GlobalLayout><WhyUs /></GlobalLayout>} />
        <Route path="/press-&-media" element={<GlobalLayout><PressAndMedia /></GlobalLayout>} />
        <Route path="/press-&-media/:id" element={<GlobalLayout><PressDetail/></GlobalLayout>} />
        <Route path="/resources" element={<GlobalLayout><Resources /></GlobalLayout>} />
       
      </Routes>
    </Router>
  );
};

export default App;