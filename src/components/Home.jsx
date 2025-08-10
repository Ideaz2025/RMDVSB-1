// import { AiFillFileText } from "react-icons/ai";

import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import realProfile from "../assets/img/muragadoss.gif";
import hoverProfile from "../assets/img/muragadoss.gif";
// import CVDoc from "../assets/download/CV.pdf";
import Hi from "../assets/img/Hi.gif";
import { Helmet, HelmetProvider } from "react-helmet-async";

import "./CSS/Home.css";


function Home() {
  function setAvatarReal() {
    setImage(hoverProfile);
  }

  function setAvatarAnimation() {
    setImage(realProfile);
  }
  const [image, setImage] = useState(realProfile);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Home</title>
        </Helmet>
      </HelmetProvider>
  
      <Container fluid className="home-wrapper">
        <div className=" home_center animate__animated animate__fadeIn animate__slower">
          <img
            className="home-image"
            src={image}
            onMouseOver={setAvatarReal}
            onMouseOut={setAvatarAnimation}
            alt="Avatar"
          />
        </div>
        <div className="home-left animate__animated animate__fadeInLeft">
          <h3>
            Hi there <img width="35" src={Hi} alt="Hi" />, I'm
          </h3>
          <h2 className="home-name">
            Dr.MURUGADOSS R
        
          </h2>
          <NavLink to="/contact" className="btn-download text-center">
            Let's Connect
          </NavLink>
          {/* <AiFillFileText /> */}
          {/* &nbsp;&nbsp;Hire Me */}
        </div>
        <div className="home-right animate__animated animate__fadeIn animate__slower">
          <img
            className="home-image"
            src={image}
            onMouseOver={setAvatarReal}
            onMouseOut={setAvatarAnimation}
            alt="Avatar"
          />
        </div>
      </Container>
    </>
  );
}

export default Home;
