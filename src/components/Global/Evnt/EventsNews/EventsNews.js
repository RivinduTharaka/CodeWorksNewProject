import React, { useEffect } from 'react'
import Event1 from "./EventsNews1";
import Event2 from "./EventsNews2";

function EventsNews() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the component mounts
  }, []);

  return (
    <>
      <Event1 />
      <Event2 />
    </>
  );
}

export default EventsNews