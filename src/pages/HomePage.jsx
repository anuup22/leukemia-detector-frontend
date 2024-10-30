import { Link } from 'react-router-dom';

const HomePage = () => (
  <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-4xl font-bold mb-4">Welcome to the Leukemia Detector</h1>
    <p className="mb-6 text-gray-700">Detect leukemia from images easily by uploading them.</p>
    <Link to="/upload">
      <button className="px-4 py-2 bg-blue-500 text-white rounded">Get Started</button>
    </Link>
  </div>
);

export default HomePage;
