import React, { useState } from 'react';
import './data.css';
import 'animate.css';
import FsLightbox from 'fslightbox-react';
import PatentImage from '../assets/Routes/patent.js';

const Patentgranted = () => {


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
      <h2 className="awards-title animate__animated animate__fadeInDown">PATENT GRANTED</h2>
     
      <FsLightbox
        toggler={lightboxController.toggler}
        sources={PatentImage}
        slide={lightboxController.slide}
        className="fslightbox-source"
      />
      <div className="certificates-gallery">
        {PatentImage.map((src, index) => (
          <div
            className="certificates-thumb animate__animated animate__zoomIn"
            style={{ animationDelay: `${0.2 + index * 0.07}s` }}
            key={src}
            onClick={() => openLightboxOnSlide(index + 1)}
          >
            <img
              className="shadow"
              src={src}
              alt={`Certificate ${index + 1}`}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Patentgranted;