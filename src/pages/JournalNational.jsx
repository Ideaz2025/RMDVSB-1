import React from "react";
import "./data.css";
import "animate.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
const JournalList = () => {
  const pageTitle = "National Journals | Publication Summary";
  const nationalJournals = [
   
    
    {
      id: 13,
      authors: "Dr.R.Murugadoss",
      title: "FOR SECURE DYNAMIC DATA DEDUPLICATION WITH CLOUD STORAGE: AUGMENTED COLLINEAR ENCRYPTION KEY GENERATION",
      journal: "JOURNAL OF OPTOELECTRONICS LASER",
      year: 2022,
      volume: "Volume 41, Issue 11",
      doi: "10050086.2022.12.05",
      issn: "ISSN: 1005-0086",
      link: "https://drive.google.com/file/d/1dX8WikSdHzxsFxmE74dMRpHoWR_idI0G/view?usp=sharing"
    },
    {
      id: 6,
      authors: "R. Murugadoss, M. Ramakrishnan",
      title: "Feed Forward Single Hidden Layer Fuzzy Neural Network with Sigmoidal Signals",
      journal: "Unspecified",
      year: 2022,
      link: "https://drive.google.com/file/d/1pv50Yyp9rhqA3hjTsHgVFzf4zeqbYK9E/view?usp=sharing"
    },
    {
      id: 7,
      authors: "R. Murugadoss, M. Ramakrishnan",
      title: "Neural Fuzzy Models of Feed Forward Networks for Function Approximation using Sigmoidal Signals",
      journal: "Unspecified",
      year: 2022,
      link: "https://drive.google.com/file/d/1OQtCmbgFHuA7hQSmj_jcuJYFtllPTIQD/view?usp=sharing"
    },
    {
      id: 8,
      authors: "R. Murugadoss, S. Leena Nesamani, A. Banushri, K. M. Monica, M. Vairavel, S. Nirmal Sugirtha Rajini, Gopi P.",
      title: "A review of using deep learning from an ecology perspective to address climate change and air pollution",
      journal: "Global NEST Journal",
      year: 2024,
      volume: "Vol 26, No 2",
      pages: "05697",
      link: "https://drive.google.com/file/d/1hukgOxMu6Dd7pAgOd7MSrjD-lunyh8C4/view?usp=sharing"
    },
    {
      id: 9,
      authors: "R. Murugadoss.",
      title: "Efficient AI-based water quality prediction and classification for sustainable urban environments in Texas city",
      journal: "Edelweiss Applied Science and Technology",
      year: 2025,
      volume: "Vol. 9, No. 7",
      pages: "536-549",
      doi: "10.55214/25768484.v9i7.8654",
      issn: "ISSN: 2576-8484",
      publisher: "Learning Gate",
      link: "https://drive.google.com/file/d/1P-wCHdskNWfPQ85y6Vr4X5tY-FhEcsim/view?usp=sharing"
    },
    {
      id: 10,
      authors: "R. Murugadoss.",
      title: "Universal Approximation with Non-Sigmoid Hidden Layer Activation Functions by Using Artificial Neural Network Modeling",
      link: "https://drive.google.com/file/d/1bjd2SQqGU9_a4JXofJ4DIq0G_9WM-0S4/view?usp=sharing"
    },
    
       {
         id: 4,
         authors: "R. Murugadoss, Dr. M. Ramakrishnan",
         title: "Implementation of Machine Learning to Detect Android Malware with Significant Permission",
         journal: "Unspecified",
         year: 2025,
         affiliation: "Sathyabama University, Research",
         link: ""
       },
       {
         id: 5,
         authors: "R. Murugadoss, Dr. M. Ramakrishnan",
         title: "Universal Approximation Using Probabilistic Neural Networks with Sigmoid Activation Functions",
         journal: "Unspecified",
         year: 2025,
         affiliation: "Sathyabama University, Research",
         link: ""
       },
       {
      id: 11,
      authors: "Dr.R.Murugadoss",
      title: "EVALUATION OF FETEL HEAD CIRCUMFRENECE (HC) AND ULTRASOUND IMAGES USING CNN",
      journal: "NEUROQUANTOLOGY",
      year: 2022,
      volume: "Volume 20, Issue 10",
      pages: "11680-11690",
      doi: "10.14704/NQ.2022.20.10.NQ551133",
      eissn: "eISSN:1303-5150",
      link: "http://penerbit.uthm.edu.my/ojs/index.php/ijie"
    },
    {
      id: 12,
      authors: "Dr.R.Murugadoss",
      title: "AN ANALYSIS OF MRI BRAIN IMAGE BY DEEP LEARNING AND MULTI-CLASS SVM",
      journal: "IJIEMR",
      year: 2022,
      volume: "Volume 11, Issue 09",
      pages: "127-135",
      doi: "10.48047/IJIEMR/V11/ISSUE 09/14",
      issn: "ISSN: 2456 – 5083",
      link: "http://penerbit.uthm.edu.my/ojs/index.php/ijie"
    },
  ];
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{pageTitle}</title>
        </Helmet>
      </HelmetProvider>
      <div className="journal-container animate__animated animate__fadeIn">
        <h2 className="journal-title animate__animated animate__fadeInDown">National Journal Publications</h2>
        <ul className="journal-list">
          {nationalJournals.map((journal, idx) => (
            <li
              key={journal.id}
              className="journal-item animate__animated animate__fadeInUp"
              style={{ animationDelay: `${0.15 + idx * 0.07}s` }}
            >
              <strong>{journal.authors}</strong><br />
              <em>{journal.title}</em><br />
              {journal.journal}, {journal.volume} ({journal.year})<br />
              {journal.pages && <>pp. {journal.pages}<br /></>}
              {journal.issn && <span>{journal.issn}<br /></span>}
              {journal.eissn && <span>{journal.eissn}<br /></span>}
              {journal.doi && <span>DOI: {journal.doi}<br /></span>}
              {journal.link && journal.link.trim() && (
  <button
    className="pdf-btn"
    onClick={() =>
      window.open(
        journal.link,
        "_blank"
      )
    }
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
      </div>
    </>
  );
};

export default JournalList;
