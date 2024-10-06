// src/components/ModelSelector.jsx
import React, { useEffect, useState } from 'react';
import { getModels } from '../api/apiService';

const ModelSelector = ({ onModelSelect }) => {
  const [models, setModels] = useState([]);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const fetchedModels = await getModels();
        setModels(fetchedModels);
      } catch (error) {
        console.error('Error fetching models:', error);
      }
    };

    fetchModels();
  }, []);

  return (
    <select onChange={(e) => onModelSelect(e.target.value)} className="mb-4 p-2 border rounded">
      <option value="">Select a model</option>
      {models.map((model) => (
        <option key={model} value={model}>
          {model}
        </option>
      ))}
    </select>
  );
};

export default ModelSelector;
