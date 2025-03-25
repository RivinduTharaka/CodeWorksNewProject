import React from 'react'
import AboutUs from './AboutUs/AboutUs'
import Aboutsec1 from './AboutUs/Aboutsec1'
import Aboutsec2 from './AboutUs/Aboutsec2'
import Aboutsec3 from './AboutUs/Aboutsec3'
import { useEffect } from 'react';

function About() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the component mounts
  }, []);

  return (
    <>
      <AboutUs/>
      <Aboutsec1/>
      <Aboutsec2/>
      <Aboutsec3/>
    </>
  )
}

export default About