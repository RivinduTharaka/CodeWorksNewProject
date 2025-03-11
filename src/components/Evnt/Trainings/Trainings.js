import React from 'react'
import Trainings1 from "./Trainings1";
import Trainings2 from "./Trainings2";
import { useEffect } from 'react';


function Trainings() {
    useEffect(() => {
      window.scrollTo(0, 0); // Scroll to top when the component mounts
    }, []);

  return (
    <>
    <Trainings1/>
    <Trainings2/>
    
    
    
    </>
  )
}

export default Trainings