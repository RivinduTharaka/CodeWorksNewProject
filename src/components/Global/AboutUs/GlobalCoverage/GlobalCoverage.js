import React from 'react'
import GlobalCoverageSec1 from './GlobalCoverageSec1'
import GlobalCoverageSec2 from './GlobalCoverageSec2'
import GlobalCoverageSec3 from './GlobalCoverageSec3'
import { useEffect } from 'react';
import AutoLogin from '../../../../services/AutoLogin';

function GlobalCoverage() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the component mounts
  }, []);

  return (
    <>
    <AutoLogin/>
      <GlobalCoverageSec1/>
      <GlobalCoverageSec2/>
      <GlobalCoverageSec3/>
    </>
  )
}

export default GlobalCoverage