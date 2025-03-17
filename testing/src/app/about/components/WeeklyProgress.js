import React from 'react';
import '../../globals.css';

const data = [
  { name: 'Mango', growth: '45%' },
  { name: 'Pear', growth: '55%' },
  { name: 'Avocado', growth: '94%' },
  { name: 'Carrot', growth: '82%' }
];

const WeeklyProgress = () => {
  return (
    <div className="progress-section">
      <h2>Your weekly progress</h2>
      <div className="progress-cards">
        {data.map((item, index) => (
          <div key={index} className="card">
            <h4>{item.name}</h4>
            <p>{item.growth} Growth</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyProgress;
