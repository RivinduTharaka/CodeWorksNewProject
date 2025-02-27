import React from 'react'
import CeoWordsSection from './CeoWordsSection'
import LeadershipHeroSection from './LeadershipHeroSection'
import Clevel from './Clevel'
import CountryDirectorsProfileCards from './CountryDirectorsProfileCards'

function Leadership() {
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