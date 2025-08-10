import React, { useState } from "react";
import conferencePapers from "./data.js";
import "./data.css";
import "animate.css";

const ConferenceList = () => {
  const [pdfUrl, setPdfUrl] = useState(null);

  return (
    <div className="conference-container animate__animated animate__fadeIn">
      <h2 className="conference-title animate__animated animate__fadeInDown">
        National Conference Papers
      </h2>
      <ul className="conference-list">
        {conferencePapers.map((paper, idx) => (
          <li
            key={paper.id}
            className="conference-item animate__animated animate__fadeInUp"
            style={{ animationDelay: `${0.15 + idx * 0.07}s` }}
          >
            <strong>{paper.authors}</strong>
            <br />
            <em>{paper.title}</em>
            <br />
            {paper.event}, {paper.date}
            <br />
            {paper.location}
            <br />
            {paper.isbn && <span>{paper.isbn}</span>}
            <br />
            {paper.copyright && <span>© {paper.copyright}</span>}
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
              height: "80vh",
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
                borderRadius: "8px"
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ConferenceList;
