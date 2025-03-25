import React from 'react'
import Vendor1 from './vendor1'
import Vendor2 from './vendor2'
import  { useEffect } from 'react';

function Vendor() {

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the component mounts
  }, []);

  return (
    <>
      <Vendor1/>
      <Vendor2/>
    </>
  )
}

export default Vendor