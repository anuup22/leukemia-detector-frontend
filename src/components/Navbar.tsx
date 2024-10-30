import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-blue-500 p-4">
    <div className="container mx-auto flex justify-between">
      <Link to="/" className="text-white font-bold">Leukemia Detector</Link>
      <div>
        <Link to="/" className="text-white mx-2">Home</Link>
        <Link to="/how-to-use" className="text-white mx-2">How to Use</Link>
        <Link to="/upload" className="text-white mx-2">Upload</Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
