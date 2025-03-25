import React from 'react';
import Portal1 from './Portal1';
import Portal2 from './Portal2';
import Portal3 from './Portal3';
import { useEffect } from 'react'; // Import the useEffect hook

function Portal() {

     useEffect(() => {
            window.scrollTo(0, 0); // Scroll to top when the component mounts
          }, []);
          
  return (
    <>
    
    <Portal1 />
    <Portal2 />
    <Portal3 />
    
    </>
  )
}

export default Portal