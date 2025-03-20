import React from 'react'
import Whyus1 from './WhyUs1'
import Whyus2 from './WhyUs2'
import { useEffect } from 'react';

function WhyUs() {
      useEffect(() => {
          window.scrollTo(0, 0); // Scroll to top when the component mounts
        }, []);

  return (
    <div>
        <Whyus1/>
        <Whyus2/>   
    </div>
  )
}

export default WhyUs