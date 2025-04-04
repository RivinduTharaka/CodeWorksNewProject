import React from 'react'
import Services1 from './Services1'
import Services2 from './Services2'
import { useEffect } from "react";
import Services3 from './Services3';

function Services() {
   useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top when the component mounts
      }, []);
  return (
    <>
    <Services1/>
    <Services2/>
    <Services3/>
    
    
    
    </>
  )
}

export default Services