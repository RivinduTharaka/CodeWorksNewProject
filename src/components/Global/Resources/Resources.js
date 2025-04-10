import React from 'react'
import Resources1 from './Resources1'
import Resources2 from './Resources2'
import { useEffect } from "react";

function Resources() {
    useEffect(() => {
            window.scrollTo(0, 0); // Scroll to top when the component mounts
          }, []);
  return (
    <>
    <Resources1/>
    <Resources2/>
    </>
  )
}

export default Resources