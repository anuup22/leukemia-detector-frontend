// src/pages/Home.jsx
import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import ModelSelector from '../components/ModelSelector.jsx';
import PredictionResults from '../components/PredictionResults';
import { makePredictions } from '../api/apiService';

const Home = () => {
  const [selectedModel, setSelectedModel] = useState('');
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState([]);

  const handleFileChange = (uploadedFiles) => {
    setFiles(uploadedFiles);
  };

  const handleUpload = async () => {
    if (!selectedModel) {
      alert('Please select a model.');
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('model', selectedModel);

    try {
      const data = await makePredictions(formData);
      setResults(data);
    } catch (error) {
      console.error('Error uploading files:', error);
      setResults([{ error: 'An error occurred during prediction.' }]);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Leukemia Detector</h1>
      <ModelSelector onModelSelect={setSelectedModel} />
      <FileUpload onFilesChange={handleFileChange} />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
      >
        Upload & Predict
      </button>
      <PredictionResults results={results} />
    </div>
  );
};

export default Home;
