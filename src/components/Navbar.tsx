import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Home, 
  Database, 
  HelpCircle, 
  Shield, 
  Activity, 
  Heart 
} from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { 
      icon: Home, 
      title: 'Home', 
      path: '/',
      description: 'Return to main dashboard'
    },
    { 
      icon: Activity, 
      title: 'Detection', 
      path: '/upload',
      description: 'Start leukemia image analysis'
    },
    { 
      icon: Database, 
      title: 'Models', 
      path: '/models',
      description: 'Explore AI detection models'
    },
    { 
      icon: Shield, 
      title: 'How It Works', 
      path: '/how-to-use',
      description: 'Learn about our technology'
    },
    { 
      icon: Heart, 
      title: 'About', 
      path: '/details',
      description: 'Our mission and impact'
    },
    { 
      icon: HelpCircle, 
      title: 'Support', 
      path: '/support',
      description: 'Get help and contact us'
    }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-900 to-indigo-900 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo Section */}
        <Link 
          to="/" 
          className="flex items-center space-x-3 text-white hover:text-blue-200 transition-colors"
        >
          <Heart className="text-blue-300" size={32} />
          <span className="text-2xl font-bold tracking-wider">
            LeukAI
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item, index) => (
            <Link 
              key={index} 
              to={item.path} 
              className="group flex items-center space-x-2 text-white hover:text-blue-300 transition-colors"
              title={item.description}
            >
              <item.icon 
                className="text-blue-300 group-hover:scale-110 transition-transform" 
                size={20} 
              />
              <span className="text-sm font-medium">{item.title}</span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-blue-950/90 z-40 md:hidden">
          <div className="container mx-auto px-4 py-10 space-y-6">
            {navItems.map((item, index) => (
              <Link 
                key={index} 
                to={item.path} 
                onClick={toggleMenu}
                className="flex items-center space-x-4 text-white hover:bg-blue-900/50 p-4 rounded-lg transition-colors"
              >
                <item.icon className="text-blue-300" size={24} />
                <div>
                  <span className="text-lg font-semibold">{item.title}</span>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;