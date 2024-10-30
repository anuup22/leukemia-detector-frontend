import React, { useEffect, useState } from 'react';
import { getModels, makePredictions } from '../apiService';

const UploadPage = () => {
  const [models, setModels] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [images, setImages] = useState<File[]>([]);
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModels = async () => {
      const data = await getModels();
      setModels(data);
    };
    fetchModels();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files).slice(0, 6));
    }
  };

  const handleSubmit = async () => {
    if (!selectedModel || images.length === 0) {
      setError("Please select a model and upload at least one image.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('model', selectedModel);
    images.forEach((image) => formData.append('files', image));

    try {
      const predictionResults = await makePredictions(formData);
      setResults(predictionResults);
    } catch (err) {
      setError("There was an error processing your images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Upload Images for Leukemia Detection</h1>
      <label className="block mb-2">Select Model</label>
      <select
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)}
        className="mb-4 p-2 border"
      >
        <option value="">Select a model</option>
        {models.map((model) => (
          <option key={model} value={model}>{model}</option>
        ))}
      </select>
      
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4"
      />

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-500 text-white rounded"
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Upload'}
      </button>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      {results && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Prediction Results:</h2>
          <div className="bg-gray-100 p-4 rounded shadow">
            {results.map((result: any, index: number) => (
              <div key={index} className="mb-2">
                <h3 className="font-semibold">Image {index + 1}</h3>
                <p><span className="font-bold">Diagnosis:</span> {result.diagnosis}</p>
                <p><span className="font-bold">Confidence:</span> {result.confidence}%</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
