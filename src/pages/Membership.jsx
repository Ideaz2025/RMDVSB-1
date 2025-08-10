import React from 'react';
import './data.css';
import 'animate.css';

const MembershipsSection = () => {
  const memberships = [
    {
      organization: 'Indian Society for Technical Education (ISTE)',
      membershipType: 'Life Member',
      membershipId: 'LM 63596',
    },
    {
      organization: 'Computer Society of India (CSI)',
      membershipType: 'Life Member',
      membershipId: '01122973',
    },
  ];

  return (
    <div className="membership-container animate__animated animate__fadeIn">
      <h2 className="membership-title animate__animated animate__fadeInDown">Professional Memberships</h2>
      <ul className="membership-list">
        {memberships.map((member, idx) => (
          <li
            key={idx}
            className="membership-item animate__animated animate__fadeInUp"
            style={{ animationDelay: `${0.15 + idx * 0.07}s` }}
          >
            <strong>{member.organization}</strong><br />
            {member.membershipType} – ID: {member.membershipId}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MembershipsSection;
