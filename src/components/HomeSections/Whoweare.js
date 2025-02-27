import React, { useState } from "react";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import "./Whoweare.css";

import icon1 from '../../assets/image/i1.png';
import icon2 from "../../assets/image/community.png";
import icon3 from "../../assets/image/globe.png";
import icon4 from "../../assets/image/improvement (1).png";

const WhoweareSection = ({ ref }) => {
  const [counterOn, setCounterOn] = useState(false);

  return (
    <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
      <section id="about" className="section about glb-exclusive-section" ref={ref}>
        <div className="container text-center">
          {/* Existing Content */}
          <h1 className="glb-exclusive-heading">We Are</h1>
          <h1 className="glb-exclusive-highlight">Connex Information Technologies</h1>
          <p className="glb-exclusive-description">
            Connex Information Technologies is a leading technology distributor specializing in
            cutting-edge solutions, including distribution, consultancy, training, and TAC support.
            With a decade of expertise, Connex thrives on adapting to the ever-changing world,
            building strong relationships with clients and partners to meet dynamic market needs.
            Their commitment to innovation, integrity, and partnership drives mutual growth and sets
            new industry benchmarks.
          </p>

          {/* Added Row */}
          <div className="row glb-glbiconRow mt-5">
            <div className="col glb-iconCol">
              <div className="row">
                <div className="glb-icon-container">
                  <img src={icon1} className="glb-iconMob" alt="Sales Icon" />
                </div>
              </div>
              <div className="row glb-textRow">
                <p className="glb-iconText">
                Driving Growth <br />  and Innovation 
                </p>
              </div>
            </div>

            <div className="col glb-iconCol">
              <div className="row">
                <div className="glb-icon-container">
                  <img src={icon2} className="glb-iconMob" alt="Offices Icon" />
                </div>
              </div>
              <div className="row glb-textRow">
                <p className="glb-iconText">
               
                1500+ <br /> Global Partners
                </p>
              </div>
            </div>

            <div className="col glb-iconCol">
              <div className="row">
                <div className="glb-icon-container">
                  <img src={icon3} className="glb-iconMob" alt="Customers Icon" />
                </div>
              </div>
              <div className="row glb-textRow">
                <p className="glb-iconText">
                  Offices in <br /> 14 countries
                </p>
              </div>
            </div>

            <div className="col glb-iconCol">
              <div className="row">
                <div className="glb-icon-container">
                  <img src={icon4} className="glb-iconMob" alt="Engineers Icon" />
                </div>
              </div>
              <div className="row glb-textRow">
                <p className="glb-iconText">
                  1:2 ratio of technical <br /> engineers to sales
                </p>
              </div>
            </div>
          </div>
          <p className="glb-statistics-note">
            *Statistics based on the global Connex Information Technologies group
          </p>
        </div>
      </section>
    </ScrollTrigger>
  );
};

export default WhoweareSection;
