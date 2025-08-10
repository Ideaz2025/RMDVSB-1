import {  AiFillLinkedin,  AiFillGooglePlusCircle } from "react-icons/ai";
import "./CSS/Footer.css";

function Footer() {
  return (
    <>
      <footer className="px-4">
        <div className="foot-left d-flex">
          <p>Dr.MURUGADOSS R &copy; 2025</p>
        </div>
        <div className="foot-right d-flex">
          <a
            href="https://scholar.google.co.in/citations?user=j6RuO2gAAAAJ&hl=en"
            target="_blank"
            rel="noreferrer"
          >
            <AiFillGooglePlusCircle className="foot-icon" />
            &nbsp;&nbsp;Google Scholar
          </a>
          <a
            href="https://scholar.google.co.in/citations?user=j6RuO2gAAAAJ&hl=en"
            target="_blank"
            rel="noreferrer"
          >
            <AiFillLinkedin className="foot-icon" />
            &nbsp;&nbsp;Linkedin
          </a>
       
        </div>
      </footer>
    </>
  );
}

export default Footer;
