import React from 'react'
import PressAndMedia2 from './PressAndMedia2'
import { useEffect } from "react";
import PressAndMedia3 from './PressAndMedia3';

function PressAndMedia1() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the component mounts
  }, []);
  return (
    <>
      <PressAndMedia2 />
      <PressAndMedia3 />

    </>
  )
}

export default PressAndMedia1