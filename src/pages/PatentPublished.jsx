import React from "react";
import "./data.css";
import "animate.css";
import patent from "./pdfs/Patent1.pdf"; // Adjust the path as necessary

const PatentList = () => {
  const patentPdf = patent;
const patents = [
  {
    title: "LOW COST, PASSIVE DATA COLLECTION AND CARE TAKER CONTACT DEVICE FOR INDIVIDUALS WITH MEMORY ISSUES",
    date: "16-Mar-2020",
    number: "25983 / 202041011188",
    description:
      "This invention relates to using QR codes for obtaining the contact information of a person and automatically sending alert messages to pre-established care takers. QR codes are printed on jewelry items like pendants, bracelets, lockets etc.",
  },
  {
    title: "THE SMART GARBAGE MANAGEMENT SYSTEM",
    date: "12-Feb-2021",
    number: "202121002140",
    description:
      "An IoT-based system comprising authentication, monitoring, control, and notification modules for hygienic garbage management. It uses sensors, RFID, and automated controls to optimize bin usage and alert nodal agencies.",
  },
  {
    title: "ARTIFICIAL INTELLIGENCE BASED APPROACH TO ANALYSE THE PROS AND CONS OF MINI CHANNEL BASED SOLAR COLLECTORS FOR EFFECTIVE UTILIZATION OF SOLAR ENERGY",
    date: "18-Nov-2022",
    number: "202241058952 A",
    description:
      "This invention uses AI techniques to evaluate and improve the performance of mini-channel-based solar collectors for more efficient solar energy utilization.",
  },
  {
    title: "Driver Somnolence & Lethargy Detection Model based on Eyes & Facial Movement using OpenCV Library",
    date: "28/03/2025",
    number: "202541023106 A",
    description:
      "A model for detecting driver drowsiness and lethargy by analyzing eye and facial movements using the OpenCV library. Published in India (Application No. 202541023106 A), filed on 14/03/2025, published on 28/03/2025.",
  },
  {
    title: "Next-Generation Cloud Architectures for Large-Scale Generative AI Systems",
    date: "01/08/2025",
    number: "202541070309 A",
    description:
      "Patent application published in India (Application No. 202541070309 A). Filed on 23/07/2025 and published on 01/08/2025. Focuses on scalable and advanced cloud infrastructure designs for generative AI.",
  },
  {
    title: "Improving Customer Loyalty with Machine Learning: A Review of Churn Prediction Models",
    date: "14/02/2025",
    number: "202541008630 A",
    description:
      "A patent that reviews different churn prediction models using machine learning to improve customer loyalty. Filed on 03/02/2025, published 14/02/2025 in India (Application No. 202541008630 A).",
  },
  {
    title: "FARMER BOT FOR YIELD PREDICTION AND FERTILIZER RECOMMENDATIONS",
    date: "02/08/2024",
    number: "202441057830 A",
    description:
      "An automated system utilizing AI and robotics to predict crop yield and recommend fertilizer regimes for farmers. Filed on 30/07/2024, published 02/08/2024, India.",
  },
  {
    title: "MACHINE LEARNING VOICE ASSISTED MEDICAL DEVICE",
    date: "14/02/2025",
    number: "202511006946 A",
    description:
      "A medical device utilizing machine learning and voice assistance, supporting patient interactions. Application No. 202511006946 A. Filed 28/01/2025, published 14/02/2025, India.",
  },
  {
    title: "AI AND IOT BASED WATERBORNE DISEASE SURVEILLANCE FOR RAPID OUTBREAK DETECTION USING PIR SENSORS",
    date: "05/04/2024",
    number: "202441023823 A",
    description:
      "A system employing AI and IoT technologies with PIR sensors to monitor and detect waterborne disease outbreaks swiftly. Filed on 26/03/2024, published 05/04/2024, India.",
  },
  {
    title: "AI AND CHATBOT BASED DIGITAL PLATFORM FOR LAND AND FOREST RIGHTS AWARENESS AND SUPPORT FOR ST COMMUNITY",
    date: "05/04/2024",
    number: "202441023831 A",
    description:
      "Digital platform using AI and chatbots to support land and forest rights awareness for scheduled tribes. Filed on 26/03/2024, published 05/04/2024, India.",
  },
  {
    title: "ARTIFICIAL INTELLIGENCE BASED WATER PURIFICATION SYSTEM TO SUPPLY DRINKING WATER WITH RIGHT NUTRIENTS",
    date: "02/08/2024",
    number: "202441057879 A",
    description:
      "An AI system for purifying water and supplying it with balanced nutrients. Filed on 30/07/2024, published 02/08/2024, India.",
  },
  {
    title: "HYBRID AI FOR EMOTION- AWARE PERSONALIZED LEARNING",
    date: "21/03/2025",
    number: "202541021597 A",
    description:
      "Utilizes hybrid AI approaches to deliver personalized learning experiences responsive to learner emotion. Application 202541021597 A, filed 10/03/2025, published 21/03/2025, India.",
  }
];


  return (
    <div className="patent-container animate__animated animate__fadeIn">
      <h2 className="patent-title animate__animated animate__fadeInDown">
        Published Patents
      </h2>
      <div className="patent-list">
        {patents.map((patent, idx) => (
          <div
            key={idx}
            className="patent-item animate__animated animate__fadeInUp"
            style={{ animationDelay: `${0.15 + idx * 0.07}s` }}
          >
            <h3 className="patent-item-title">{patent.title}</h3>
            <p className="patent-meta">
              <strong>Published on:</strong> {patent.date} |{" "}
              <strong>Patent No:</strong> {patent.number}
            </p>
            <p className="patent-desc">{patent.description}</p>
          </div>
        ))}
      
      </div>
        <div style={{ marginTop: "0.5rem",display: "flex", justifyContent: "center" }}>
          <button
            className="pdf-btn"
            onClick={() =>
              window.open(
                patentPdf,
                "pdfPopup",
                "width=900,height=600,scrollbars=yes,resizable=yes"
              )
            }
            type="button"
          >
            📄 View PDF
          </button>
        </div>
    </div>
  );
};

export default PatentList;
