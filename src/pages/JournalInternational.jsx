import React from "react";
import "./data.css";
import "animate.css";
import { Helmet, HelmetProvider } from "react-helmet-async";

const JournalInternational = () => {
  const pageTitle = "International Journals |Publication Summary";
  
const internationalJournals = [
 
  {
    id: 8,
    authors: "Dr.R.Murugadoss",
    title: "An Investigation and Evaluation of Cloud Computing Capabilities and Data Duplication Methods",
    journal: "International Journal of Cloud Computing and Services Science (IJ-CLOSER)",
    year: "2020",
    issn: "Print: 2319-1775, Online: 2320-7876",
    volume: " Vol. 9, No. 1",
    pages: "  1-12",
    publisher: "  International Association of Cloud Computing and Services Science",
    link: "https://drive.google.com/file/d/18d1cOCDV3m-N0FDVhiJTPxbqn-03_DEW/view?usp=sharing"
  },
  {
    id: 9,
    authors: "Dr. R. Murugadoss, Dr. Lekshmy P L, Dr. Sivaraj Rengaraj, Dr. Mamta Jagdish Baheti, Dr. G. Kavitha",
      title: "Enhancing Brain Tumor Diagnosis: A Comprehensive AI Approach Using BTuNet for Classification of MRI Images",
      journal: "International Journal of Imaging Systems and Technology",
    year: " 2024",
    issn: "SSN: 2147-6799",
    volume: " Vol. 34, No. 1",
    pages: "  1-12",
    publisher: "  John Wiley & Sons, Inc.",
    link: "https://drive.google.com/file/d/185dqrn5Wp9blLpmvB5YZn7uSt0_ymSzx/view?usp=sharing"
  },
  {
    id: 10,
    authors: "Dr. R. Murugadoss",
    title: "AI-Powered Monitoring for Mitigating Human-Animal Conflicts in Agricultural and Forest Zones",
    journal: "2025 IEEE International Conference on Data Science, Agents, and Artificial Intelligence (ICDSAAI 2025)",
    year: 2025,
    volume: " Vol. 9, No. 7",
    pages: "  536-549",
    publisher: "IEEE",
    isbn: "979-8-3315-3755-5",
    link: "https://drive.google.com/file/d/1CCENSqcJywcekBOEbU8NKBcReN-RQprq/view?usp=sharing",
    date: "28-29 March 2025",
    location: "Chennai, India"
  },
   {
    id: 6,
    authors: "Dr.R.Murugadoss",
    title: "Early Prediction of Diabetes Using Deep Learning Convolution Neural Network and Harris Hawks Optimization",
    journal: "INTERNATIONAL JOURNAL OF INTEGRATED ENGINEERING (IJIE)",
    year: 2021,
    volume: "VOL. 13 NO. 1",
    pages: "88-100",
    publisher: "Universiti Tun Hussein Onn Malaysia",
    link: "http://penerbit.uthm.edu.my/ojs/index.php/ijie"
  },
  {
    id: 7,
    authors: "Dr.R.Murugadoss, Maddali M.V.M.Kumar",
    title: "The Quality of Experience Framework for HTTP Adaptive Streaming Algorithm in Video Streaming over Wireless Networks",
    journal: "International Journal of Future Generation Communication and Networking (IJFGCN)",
    publisher: "SERSC",
    year: 2020,
    issn: "ISSN: 2233-7857",
    volume: "Volume 13, Number 2",
    pages: "1491-1502",
    link: ""
  },
];

  

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{pageTitle}</title>
        </Helmet>
      </HelmetProvider>

      <div className="journal-intl-container animate__animated animate__fadeIn">
        <h1 className="journal-intl-title animate__animated animate__fadeInDown">Publication Summary</h1>
        <section>
          <h2 className="journal-intl-section-title animate__animated animate__fadeInLeft">📙 International Journals</h2>
          <ul className="journal-intl-list">
            {internationalJournals.map((p, idx) => (
              <li
                key={p.id}
                className="journal-intl-item animate__animated animate__fadeInUp"
                style={{ animationDelay: `${0.15 + idx * 0.07}s` }}
              >
                <strong>{p.authors}</strong><br />
                <em>{p.title}</em><br />
                {p.journal && (
                  <>
                    <span><strong>Journal:</strong> {p.journal}</span><br />
                  </>
                )}
                {p.publisher && (
                  <>
                    <span><strong>Publisher:</strong> {p.publisher}</span><br />
                  </>
                )}
                {p.year && (
                  <>
                    <span><strong>Year:</strong> {p.year}</span><br />
                  </>
                )}
                {p.issn && (
                  <>
                    <span><strong>ISSN:</strong> {p.issn}</span><br />
                  </>
                )}
                {p.issnPrint && (
                  <>
                    <span><strong>ISSN (Print):</strong> {p.issnPrint}</span><br />
                  </>
                )}
                {p.issnOnline && (
                  <>
                    <span><strong>ISSN (Online):</strong> {p.issnOnline}</span><br />
                  </>
                )}
                {p.volume && (
                  <>
                    <span><strong>Volume:</strong> {p.volume}</span><br />
                  </>
                )}
                {p.pages && (
                  <>
                    <span><strong>Pages:</strong> {p.pages}</span><br />
                  </>
                )}
                {p.conferenceDates && (
                  <>
                    <span><strong>Conference Dates:</strong> {p.conferenceDates}</span><br />
                  </>
                )}
                {p.conferenceLocation && (
                  <>
                    <span><strong>Conference Location:</strong> {p.conferenceLocation}</span><br />
                  </>
                )}
                {p.isbn && (
                  <>
                    <span><strong>ISBN:</strong> {p.isbn}</span><br />
                  </>
                )}
                {p.price && (
                  <>
                    <span><strong>Price:</strong> {p.price}</span><br />
                  </>
                )}
                {p.affiliation && (
                  <>
                    <span><strong>Affiliation:</strong> {p.affiliation}</span><br />
                  </>
                )}
                {p.link && p.link.trim() && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
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
                      letterSpacing: ".01em"
                    }}
                    onMouseOver={e => e.currentTarget.style.background = "#398ab9"}
                    onMouseOut={e => e.currentTarget.style.background = "linear-gradient(90deg, #226ab7 60%, #1c658c 100%)"}
                  >
                    View Publication
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
};

export default JournalInternational;
