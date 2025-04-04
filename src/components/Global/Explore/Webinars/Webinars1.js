import React from 'react'
import Webinars2 from './Webinars2'
import Webinars3 from './Webinars3'
import { useEffect } from "react";

function Webinars1() {
   useEffect(() => {
      window.scrollTo(0, 0); // Scroll to top when the component mounts
    }, []);
  return (
    <>
    <Webinars2/>
    <Webinars3/>
    
    </>
  )
}

export default Webinars1