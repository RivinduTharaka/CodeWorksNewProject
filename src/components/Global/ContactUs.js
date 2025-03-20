import React from 'react'
import Contact1 from './Contactus/Contact1'
import Contact2 from './Contactus/Contact2'
import Contact3 from './Contactus/Contact3'
import { useEffect } from 'react';



function About() {


  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the component mounts
  }, []);


  return (
<>
<Contact1/>   
<Contact2/>
<Contact3 />
</>
  )
}

export default About