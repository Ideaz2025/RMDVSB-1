import FsLightbox from 'fslightbox-react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Container } from 'react-bootstrap';
import { useState } from 'react';
import './CSS/About.css';
import certificateImages from '../assets/Routes/AllCertificate';
import profileImg from '../assets/img/muragadoss.gif'; // Add this import
import 'animate.css';
import Subject from './subject'; // Import the Subject component
function About() {
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 0
  });
  const openLightbox = (index) => {
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: index
    });
  }



  return (
    <>
    <p>{openLightbox}</p>
      <HelmetProvider >
        <Helmet>
          <title>About</title>
        </Helmet>
      </HelmetProvider>
      <FsLightbox
        toggler={lightboxController.toggler}
        sources={certificateImages}
        slide={lightboxController.slide}
        
      />
      
      <Container fluid className="about-wrapper">
  <div className="about-main-row row align-items-start">
    {/* Left: Profile Image & Personal Profile */}
    <div className="col-lg-4 col-md-5 text-center mb-4 mb-md-0 about-left-col">
      <img
        src={profileImg}
        alt="Dr. R. Murugadoss Profile"
        loading="lazy"
        className="about-profile-img shadow animate__animated animate__fadeInLeft img-fluid"
        style={{
          width: "320px",
          height: "320px",
          objectFit: "cover",
          borderRadius: "50%",
          border: "4px solid #1c658c",
          marginBottom: "1.5rem"
        }}
        
      />
      
 
    </div>
    {/* Right: About Text & Technology */}
    <div className="col-lg-8 col-md-7 about-right-col">
      <div className="about-right animate__animated animate__fadeInRight py-3" style={{
        background: "rgba(245,247,250,0.95)",
        borderRadius: "16px",
        boxShadow: "0 1px 8px rgba(28,101,140,0.10)",
        padding: "2rem 1.5rem",
        width: "100%",
        marginBottom: "2rem"
      }}>
        <h1 style={{
          color: "#1c658c",
          fontSize: "1.7rem",
          fontWeight: 700,
          marginBottom: "1.2rem"
        }}>About Dr. R. Murugadoss</h1>
        <p style={{ color: "#00324e", fontSize: "1.08rem", marginBottom: "1rem" }}>
          <strong>Dr. R. Murugadoss</strong> is an accomplished academician and administrator with over <strong>20 years of experience</strong> in teaching, research, and industry. He currently serves as <strong>Professor & Head of the Department of Artificial Intelligence and Data Science</strong> at <strong>V.S.B. College of Engineering Technical Campus</strong>, Kinathukadavu, Coimbatore.
        </p>
        <p style={{ color: "#00324e", fontSize: "1.08rem", marginBottom: "1rem" }}>
          He holds a <strong>Ph.D. in Computer Science and Engineering</strong> from Sathyabama University, Chennai (2016), and has previously completed his <strong>M.E. (Computer Science & Engineering)</strong> from Anna University, Chennai, <strong>M.C.A</strong> from Madurai Kamaraj University, and <strong>B.Sc. in Computer Science</strong>.
        </p>
        <p style={{ color: "#00324e", fontSize: "1.08rem", marginBottom: "1rem" }}>
          Dr. Murugadoss has held various academic roles at reputed institutions such as St. Ann’s College of Engineering and Technology, Chirala Engineering College, Thiruvalluvar College of Engineering & Technology, and more. He began his career as a software programmer at SAMTECH SYSTEMS, Chennai.
        </p>
        <div style={{ color: "#00324e", fontSize: "1.08rem", marginBottom: "1rem" }}>
          <span>Known for his commitment to educational innovation and quality improvement, he has served as:</span>
          <ul style={{ margin: "0.5rem 0 0 1.2rem", color: "#398ab9", listStyle: "none" }}>
            <li>🚀🧠 AICTE Hackathon Coordinator</li>
            <li>📋🏛️ Member Coordinator for UGC, NAAC, and NBA activities</li>
            <li>📊🎯 IQAC Member at institutional level</li>
          </ul>
        </div>
        <p style={{ color: "#00324e", fontSize: "1.08rem" }}>
          His core strengths lie in <strong>curriculum development</strong>, <strong>research mentorship</strong>, <strong>interpersonal communication</strong>, and <strong>conceptual clarity</strong> in computer science education. Dr. Murugadoss is passionate about guiding young minds, contributing to academic excellence, and building future-ready institutions.
        </p>
      </div>
      <div className="profile-section tech-section" style={{
        background: "rgba(245,247,250,0.95)",
        borderRadius: "16px",
        boxShadow: "0 1px 8px rgba(28,101,140,0.10)",
        padding: "1.5rem 1.2rem",
        marginBottom: "1.5rem", 
        maxWidth: "1000px",
        width: "100%", // Always take full width of parent
      }}>
        <h3>Technology and Subjects Taught</h3>
        <ul>
          <li><b>Front End:</b> Java, Python, .Net</li>
          <li><b>Database:</b> Oracle, MySQL, SQL</li>
          <li><b>Server:</b> JSP</li>
          <li><b>Web Tools:</b> HTML, XML</li>
          <li><b>Interfaces:</b> Eclipse, Python IDLE, Anaconda Navigator, PyCharm</li>
          <li><b>Languages:</b> C, C++</li>
          <li><b>Subjects & Programming Languages:</b>
            <ul>
              <li>C, C++, Java (Core, Applets, Beans, JSP), Python and Advanced Python</li>
              <li>DBMS, Computer Networks, Software Engineering</li>
              <li>Software Project Management, Management Information Systems</li>
              <li>Data Warehousing and Data Mining, Machine Learning with Python</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
         <div className="profile-section mt-4" style={{
      background: "rgba(245,247,250,0.95)",
        borderRadius: "16px",
        boxShadow: "0 1px 8px rgba(28,101,140,0.10)",
        padding: "1.5rem",
        marginBottom: "1.5rem", 
        maxWidth: "800px",
        width: "100%",}}>
        <h3>Personal Profile</h3>
        <table className="profile-table">
          <tbody>
            <tr>
              <td><b>Father’s Name</b></td>
              <td>: V. Rajan</td>
            </tr>
            <tr>
              <td><b>Date of Birth</b></td>
              <td>: 30-05-1978</td>
            </tr>
            <tr>
              <td><b>Sex</b></td>
              <td>: Male</td>
            </tr>
            <tr>
              <td><b>Marital Status</b></td>
              <td>: Married</td>
            </tr>
            <tr>
              <td><b>Linguistic Abilities</b></td>
              <td>: English, Tamil, Kannada, Telugu</td>
            </tr>
            <tr>
              <td><b>Nationality</b></td>
              <td>: Indian</td>
            </tr>
          </tbody>
        </table>
      </div>
         <div className="container">
            <Subject/>
        </div>
  </div>
 
</Container>
      
 

    </>
  );
}

export default About;
