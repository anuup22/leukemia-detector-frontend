// src/components/PredictionResults.jsx
import React from 'react';

const PredictionResults = ({ results }) => {
  return (
    <div>
      {results.length > 0 ? (
        results.map((result, index) => (
          <div key={index} className="border p-4 mb-2">
            <p><strong>Filename:</strong> {result.filename}</p>
            {result.error ? (
              <p className="text-red-500"><strong>Error:</strong> {result.error}</p>
            ) : (
              <p><strong>Predicted Class:</strong> {result.predicted_class}</p>
            )}
          </div>
        ))
      ) : (
        <p>No results to display.</p>
      )}
    </div>
  );
};

export default PredictionResults;
