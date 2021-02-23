import React from "react";
import { Card } from "react-bootstrap";

import landingImage from "../../assets/salon.jpg";
var sectionLanding= {
  backgroundImage: `url(${landingImage})`
}

function Landing() {
  return (
    <div
      className='landingImage' style={sectionLanding}
    >
      <Card className='landingCard'>
        <Card.Body>
          <h1 className='landingTitle text-warning'>Welcome to the Cutting Edge!</h1>
        </Card.Body>
      </Card>
      
     
  

    </div>
  );
}

export default Landing;