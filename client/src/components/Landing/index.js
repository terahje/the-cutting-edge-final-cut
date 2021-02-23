import React from "react";
import landingImage from "../../assets/salon.jpg";
var sectionLanding= {
  backgroundImage: `url(${landingImage})`
}

function Landing() {
  return (
    <div
      className='landingImage' style={sectionLanding}
    >
      <h1>Welcome to the Cutting Edge!</h1>
     
  

    </div>
  );
}

export default Landing;