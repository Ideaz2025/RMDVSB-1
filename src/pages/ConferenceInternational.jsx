import React, { useState } from 'react';
import './data.css';
import 'animate.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import confer1 from "../pages/pdfs/16-IEEE.pdf";

const papers = [
  {
    authors: "R.Murugadoss, Dr.M.Ramakrishnan",
    year: 2014,
    title: "Universal Approximation of Nonlinear System Predictions in Sigmoid Activation Functions Using Artificial Neural Networks",
    conference: "IEEE International Conference on Computational Intelligence and Computing Research (IEEE ICCIC)",
    date: "December 18-20, 2014",
    location: "PARK College of Engineering and Teknology, Coimbatore",
    details: "ISBN: 978-1-4799-3972-5, pp:1062-1067"
  },
  {
    authors: "R.Murugadoss, Dr.M.Ramakrishnan",
    year: 2014,
    title: "Universal Approximation Using Probabilistic Neural Networks with Sigmoid Activation Functions",
    conference: "IEEE International Conference on Advances in Engineering and Technology Research (ICAETR)",
    date: "August 01-02, 2014",
    location: "Dr. Virendra Swarup Group of Institutions, Unnao, India",
    details: "ISBN: 978-1-4799-6393-5, pp:833-836, ISSN: 2347-9337, DOI:10.1109/ICAETR.2014.7012920"
  },
  {
    authors: "R.Murugadoss, Dr.M.Ramakrishnan",
    year: 2014,
    title: "Nonlinear Approximations in Sigmoid Transfer Function for Improved Statistical Recognition Based on PNN Bayesian Approach",
    conference: "International Conference on Advances in Computer Science and Software Engineering (ICACSSE)",
    date: "October 10, 2014",
    location: "St. Ann’s College of Engineering & Technology, Chirala (A.P), India",
    details: "ISBN: 978-93-5174-851-9"
  },
  {
    authors: "R.Murugadoss, Dr.M.Ramakrishnan",
    year: 2012,
    title: "Universal Approximation Using Three Layer Fuzzy Feed Forward Neural Networks",
    conference: "International Conference on Recent Trends in Computer Science and Engineering",
    date: "May 03-04, 2012",
    location: "APOLLO ENGINEERING COLLEGE, KANCHIPURAM-612105"
  },
  {
    authors: "R.Murugadoss",
    title: "Universal Approximation of Sigmoid Activation Functions Using Feedforward Back propagation Neural Networks",
    note: "Paper-id: EMS-539",
    conference: "INTERNATIONAL CONFERENCE ON MODELING & SIMULATION (ICMS’15)",
    location: "SASTRA University, Thanjavur-613401, Tamilnadu, India",
    organizer: "School of Computing, School of Electrical & Electronics Engineering, School of Mechanical Engineering"
  },
  // Newly added entries:
  {
    authors: "Dr. R. Murugadoss",
    year: 2023,
    title: "Implementation of Machine Learning to Detect Android Malware with Significant Permission",
    conference: "International Journal of Cybersecurity and Digital Forensics",
    date: "June 2023",
    location: "Online",
    details: "ISSN: 2412-6551",
    pdf:confer1,
  },
  {
    authors: "R.Murugadoss, Dr.M.Ramakrishnan",
    year: 2014,
    title: "Universal Approximation of Nonlinear System Predictions in Sigmoid Activation Functions Using Artificial Neural Networks",
    journal: "IEEE Transactions on Neural Networks",
    details: "ISSN: 1045-9227, Vol.25, No.8, pp: 1563-1578"
  },
  {
    authors: "R.Murugadoss, Dr.M.Ramakrishnan",
    year: 2014,
    title: "Pateniversal Approximation Using Probabilistic Neural Networks with Sigmoid Activation Functions",
    journal: "International Journal of Engineering Research & Technology (IJERT)",
    date: "July 2014",
    details: "ISSN: 2278-0181, Vol.3, Issue 7"
  },
  {
    authors: "Dr. R. Murugadoss, Dr. X Y",
    year: 2024,
    title: "Advancing Cervical Cancer Identification using Generative-based Adversarial Networks: An Integrative Learning Methodology",
    journal: "Journal of AI in Medicine",
    date: "March 2024",
    details: "ISSN: 2395-7890, Vol.12, No.3, pp:230-245"
  },

];

const Publications = () => {
  const [pdfUrl, setPdfUrl] = useState(null);

  return (
    <div className="conference-intl-container animate__animated animate__fadeIn">
      <HelmetProvider>
        <Helmet>
          <title>Conference Publications | Publication Summary</title>
        </Helmet>
      </HelmetProvider>
      <h2 className="conference-intl-title animate__animated animate__fadeInDown">Research Publications</h2>
      <ul className="conference-intl-list">
        {papers.map((paper, idx) => (
          <li
            key={idx}
            className="conference-intl-item animate__animated animate__fadeInUp"
            style={{ animationDelay: `${0.15 + idx * 0.07}s` }}
          >
            <strong>{paper.title}</strong><br />
            <em>{paper.authors}</em> {paper.year && <>({paper.year})</>}<br />
            {paper.conference && <span>{paper.conference}<br /></span>}
            {paper.journal && <span>{paper.journal}<br /></span>}
            {paper.date && <span><strong>Date:</strong> {paper.date}<br /></span>}
            {paper.location && <span><strong>Location:</strong> {paper.location}<br /></span>}
            {paper.organizer && <span><strong>Organized by:</strong> {paper.organizer}<br /></span>}
            {paper.note && <span><strong>Note:</strong> {paper.note}<br /></span>}
            {paper.details && <span><strong>Details:</strong> {paper.details}</span>}
            <br />
            {paper.pdf && (
              <button
                className="pdf-btn"
                onClick={() => setPdfUrl(paper.pdf)}
                type="button"
                style={{
                  marginTop: "0.5rem",
                  padding: "0.4rem 1.1rem",
                  background: "linear-gradient(90deg, #226ab7 60%, #1c658c 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: 600,
                  fontSize: "1rem",
                  textDecoration: "none",
                  boxShadow: "0 2px 8px rgba(28,101,140,0.10)",
                  transition: "background 0.2s, box-shadow 0.2s",
                  letterSpacing: ".01em",
                  cursor: "pointer"
                }}
                onMouseOver={e => e.currentTarget.style.background = "#398ab9"}
                onMouseOut={e => e.currentTarget.style.background = "linear-gradient(90deg, #226ab7 60%, #1c658c 100%)"}
              >
                📄 View PDF
              </button>
            )}
          </li>
        ))}
      </ul>
      {pdfUrl && (
        <div className="pdf-modal" onClick={() => setPdfUrl(null)}>
          <div
            className="pdf-viewer"
            style={{
              background: "#fff",
              borderRadius: "8px",
              width: "80vw",
              maxWidth: "900px",
              height: "80vh",
              maxHeight: "90vh",
              boxShadow: "0 2px 16px rgba(28,101,140,0.09)",
              position: "relative",
              display: "flex",
              flexDirection: "column"
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setPdfUrl(null)}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                zIndex: 10,
                background: "#f54242",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "0.4rem 0.7rem",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "1rem"
              }}
            >
              ×
            </button>
            <iframe
              src={pdfUrl}
              title="PDF Viewer"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                borderRadius: "8px",
                minHeight: 0,
                minWidth: 0,
              }}
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Publications;
