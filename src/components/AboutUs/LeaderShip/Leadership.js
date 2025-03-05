import React from 'react'
import CeoWordsSection from './CeoWordsSection'
import LeadershipHeroSection from './LeadershipHeroSection'
import Clevel from './Clevel'
import CountryDirectorsProfileCards from './CountryDirectorsProfileCards'
import { useEffect } from 'react';              

function Leadership() {
    useEffect(() => {
      window.scrollTo(0, 0); // Scroll to top when the component mounts
    }, []);
  return (
    <div>
       
        <LeadershipHeroSection/>
        <CeoWordsSection />
        <CountryDirectorsProfileCards/>
        <Clevel />
       
    </div>

  )
}

export default Leadership