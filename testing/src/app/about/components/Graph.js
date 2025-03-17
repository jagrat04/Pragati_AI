import React from 'react';
import '../../globals.css';

const Graph = () => {
  return (
    <div className="Graph">
      <h3>Predictive Analysis</h3>
      <div className="graph-placeholder">📈 9.3K carrots</div>
      <div className="spraying-advice">
        <h3>It's the perfect day for spraying</h3>
        <p>4.39°C real-time soil temperature</p>
        <p>pH7 real-time soil pH</p>
      </div>
    </div>
  );
};

export default Graph;
