import React from 'react';
import { workshopData } from './data';
import './data.css';
import 'animate.css';

const FDPTable = () => {
  return (
    <div className="fdp-container animate__animated animate__fadeIn">
      <h2 className="fdp-title animate__animated animate__fadeInDown">FDPs Attended</h2>
      <div className="fdp-table-wrapper">
        <table className="fdp-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Topic</th>
              <th>Institution</th>
              <th>Duration</th>
              <th>Days</th>
              <th>Sponsored By</th>
            </tr>
          </thead>
          <tbody>
            {workshopData.map((item, idx) => (
              <tr
                key={item.sno}
                className="animate__animated animate__fadeInUp"
                style={{ animationDelay: `${0.15 + idx * 0.07}s` }}
              >
                <td>{item.sno}</td>
                <td>{item.topic}</td>
                <td>{item.institution}</td>
                <td>{item.duration}</td>
                <td>{item.days}</td>
                <td>{item.sponsored}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FDPTable;
