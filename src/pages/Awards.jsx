import React, { useState } from 'react';
import './data.css';
import 'animate.css';
import FsLightbox from 'fslightbox-react';
import certificateImages from '../assets/Routes/AllCertificate';

const AwardsSection = () => {
  const awards = [
    {
      title: 'Excellence in Research',
      organization: 'KPS Awards',
      date: 'June 5th, 2022',
      location: 'Tamil Nadu, India',
    },
    {
      title: 'Best Researcher Award',
      organization: 'IJIEMR – Elsevier SSRN Research Awards',
      date: 'September 2022',
      location: 'India',
      issn: 'ISSN.NO-2456-5083',
    },
  ];

  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1,
  });

  function openLightboxOnSlide(number) {
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: number,
    });
  }

  return (
    <div className="awards-container animate__animated animate__fadeIn">
      <h2 className="awards-title animate__animated animate__fadeInDown">Awards & Recognitions</h2>
      <ul className="awards-list">
        {awards.map((award, index) => (
          <li key={index} className="awards-item animate__animated animate__fadeInUp" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
            <strong>{award.title}</strong> – {award.organization}<br />
            <em>{award.date}, {award.location}</em>
            {award.issn && <div>ISSN: {award.issn}</div>}
          </li>
        ))}
      </ul>
      <h4 className="animate__animated animate__fadeInLeft">Certificates</h4>
      <span>─────</span>
      <FsLightbox
        toggler={lightboxController.toggler}
        sources={certificateImages}
        slide={lightboxController.slide}
      />
      <div className="certificates-wrapper">
        <div className="certificates-gallery">
          {certificateImages.map((src, idx) => (
            <div className="certificates-thumb" key={idx}>
              <img src={src} alt={`Certificate ${idx + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AwardsSection;
