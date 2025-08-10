import React from 'react';
import './data.css';
import 'animate.css';

// Example images (replace with your own image paths)
import vsbImg from '../assets/img/vsb.png';
import stannsImg from '../assets/img/SC.png';
import chiralaImg from '../assets/img/chi.png';
import thiruvalluvarImg from '../assets/img/tc.jpeg';
import nskImg from '../assets/img/school.png';
import samtechImg from '../assets/img/sam.png';

const ExperienceTimeline = () => {
  const experiences = [
    {
      institution: 'V.S.B. College of Engineering Technical Campus, Coimbatore – 642109 (Tamil Nadu)',
      role: 'Professor & HoD, Department of Artificial Intelligence & Data Science',
      duration: '10-06-2022 to Present',
      img: vsbImg,
    },
    {
      institution: 'St Ann’s College of Engineering and Technology, Chirala (AP-India)',
      role: 'Professor',
      duration: '22-02-2016 to 30-05-2022',
      img: stannsImg,
    },
    {
      institution: 'St Ann’s College of Engineering and Technology, Chirala (AP-India)',
      role: 'Associate Professor',
      duration: '01-06-2010 to 21-02-2016',
      img: stannsImg,
    },
    {
      institution: 'Chirala Engineering College, Chirala (AP-India)',
      role: 'Associate Professor, Department of Computer Science & Engineering',
      duration: '27-10-2007 to 30-04-2010',
      img: chiralaImg,
    },
    {
      institution: 'Thiruvalluvar College of Engineering & Technology, Vandavasi',
      role: 'Senior Lecturer (CSE & ME)',
      duration: 'July 2007 to September 2007',
      img: thiruvalluvarImg,
    },
    {
      institution: 'NSK Ponniah Goundar Higher Secondary School, Gudalur, Theni (TN-India)',
      role: 'Computer Science Teacher',
      duration: 'June 2003 to June 2005',
      img: nskImg,
    },
    {
      institution: 'SAMTECH SYSTEMS, Chennai',
      role: 'Programmer',
      duration: 'June 2001 to April 2003',
      img: samtechImg,
    }
  ];

  return (
    <div className="exp-container animate__animated animate__fadeIn">
      <h2 className="exp-title animate__animated animate__fadeInDown">Total Years of Experience: 20+ Years</h2>
      <ul className="exp-list">
        {experiences.map((exp, index) => (
          <li
            key={index}
            className="exp-item animate__animated animate__fadeInUp"
            style={{ animationDelay: `${0.15 + index * 0.07}s` }}
          >
            <div style={{ display: "flex", alignItems: "center", marginBottom: "0.7rem" }}>
              {exp.img && (
                <img
                  src={exp.img}
                  alt={exp.institution}
                  style={{
                    width: "48px",
                    height: "48px",
                    objectFit: "contain",
                    borderRadius: "8px",
                    marginRight: "1rem",
                    background: "#fff",
                    border: "1px solid #eaf6fb"
                  }}
                />
              )}
              <h3 className="exp-role" style={{ margin: 0 }}>{exp.role}</h3>
            </div>
            <p className="exp-inst"><strong>Institution:</strong> {exp.institution}</p>
            <p className="exp-dur"><strong>Duration:</strong> {exp.duration}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExperienceTimeline;
