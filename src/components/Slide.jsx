import React from "react";
import Typing from "react-typing-effect";
import "./Slide.css";

const Slide = () => {
  return (
    <div className="slide">
      <h1>Find your happy place, wherever you roam.</h1>
      <br />
      <Typing
        text={["Soak up the now, make memories that rock!"]}
        speed={50}
        eraseSpeed={80}
        eraseDelay={2000}
        typingDelay={500}
        className="typed-text"
      />
    </div>
  );
};

export default Slide;
