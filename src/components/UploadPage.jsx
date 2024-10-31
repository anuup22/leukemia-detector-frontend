import { useState, useEffect } from 'react';
import { getModels, makePredictions } from '../apiService';
import {
  Upload,
  Image as ImageIcon,
  X,
  AlertTriangle,
  CheckCircle2,
  Microscope
} from 'lucide-react';

const PredictionPage = () => {
  // State management
  const [selectedModel, setSelectedModel] = useState('');
  const [models, setModels] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [predictions, setPredictions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load models on component mount
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const availableModels = await getModels();
        setModels(availableModels);
      } catch (error) {
        console.error(error);
        setError('Failed to load detection models');
      }
    };
    fetchModels();
  }, []);

  // File selection and preview handling
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // Limit to 6 files
    if (files.length > 6) {
      setError('Maximum 6 images allowed');
      return;
    }

    // Create file previews
    const filePreviews = files.map(file => URL.createObjectURL(file));

    setSelectedFiles(files);
    setPreviews(filePreviews);
    setError(null);
  };

  // Remove a specific image from selection
  const removeImage = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);

    setSelectedFiles(newFiles);
    setPreviews(newPreviews);
  };

  // Submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!selectedModel) {
      setError('Please select a detection model');
      return;
    }

    if (selectedFiles.length === 0) {
      setError('Please upload at least one image');
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append('model', selectedModel);
    selectedFiles.forEach((file) => {
      formData.append('images', file);
    });

    try {
      setIsLoading(true);
      const results = await makePredictions(formData);
      setPredictions(results);
      setError(null);
    } catch (error) {
      console.log(error);
      setError('Prediction failed. Please try again.');
      setPredictions(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Result interpretation
  const interpretResult = (confidence) => {
    if (confidence > 80) return 'High Risk';
    if (confidence > 50) return 'Moderate Risk';
    return 'Low Risk';
  };

  const getResultColor = (confidence) => {
    if (confidence > 0.8) return 'bg-red-100 border-red-500 text-red-800';
    if (confidence > 0.5) return 'bg-yellow-100 border-yellow-500 text-yellow-800';
    return 'bg-green-100 border-green-500 text-green-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-bold text-blue-900 text-center mt-5 mb-12">
          Leukemia Detection
        </h1>

        {/* Error Handling */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
            <AlertTriangle className="mr-4" />
            <span>{error}</span>
          </div>
        )}

        {/* Upload Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-8 mb-12"
        >
          {/* Model Selection */}
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">
              Select Detection Model
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose AI Model</option>
              {models.map((model) => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Upload Medical Images (Max 6)
            </label>
            <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="text-blue-500 mb-4" size={48} />
                <span className="text-gray-600">
                  Drag & drop images or click to select
                </span>
              </label>
            </div>

            {/* Image Previews */}
            {previews.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-6">
                {previews.map((preview, index) => (
                  <div
                    key={index}
                    className="relative rounded-lg overflow-hidden shadow-md"
                  >
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg 
              hover:bg-blue-700 transition-colors 
              disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Microscope className="mr-2 animate-pulse" />
                Analyzing...
              </>
            ) : (
              'Detect Leukemia'
            )}
          </button>
        </form>

        {/* Results Visualization */}
        {predictions && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
              Prediction Results
            </h2>

            {predictions.map((result, index) => (
              <div
                key={index}
                className={`mb-6 p-6 border-2 rounded-lg ${getResultColor(result.confidence)}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <ImageIcon className="mr-4" />
                    <h3 className="text-xl font-semibold">
                      Image {index + 1}
                    </h3>
                  </div>
                  <div className="flex items-center">
                    {result.confidence > 5 ? (
                      <AlertTriangle className="text-red-500 mr-2" />
                    ) : (
                      <CheckCircle2 className="text-green-500 mr-2" />
                    )}
                    <span className="font-bold">
                      {result.confidence > 5 ? 'Leukemia Detected' : 'No Leukemia'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-700">Result:</p>
                    <p className="font-bold">
                      {result.diagnosis}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-700">Risk Assessment:</p>
                    <p className="font-bold">
                      {interpretResult(result.confidence)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-700">Confidence:</p>
                    <p className="font-bold">
                      {(result.confidence).toFixed(2)}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionPage;