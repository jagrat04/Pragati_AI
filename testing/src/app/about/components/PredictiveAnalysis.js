import React from 'react';
import '../../globals.css';
import Graph from './Graph';
import SuggestionCard from './SuggestionCard';

const PredictiveAnalysis = () => {
  return (
    <div className="predictive-analysis">
      <Graph />
      <SuggestionCard />
    </div>
  );
};

export default PredictiveAnalysis;
