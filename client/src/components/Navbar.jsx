import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  User, 
  ShoppingCart, 
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = ({ onAuthClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { name: 'Dance', path: '/dance' },
    { name: 'Music', path: '/music' },
    { name: 'Theatre', path: '/theatre' }
  ];

  const eventItems = [
    { name: 'Raas 2024', path: '/events/raas-2024' },
    { name: 'Lohri 2024', path: '/events/lohri-2024' },
    { name: 'Ganesh Chaturthi 2024', path: '/events/ganesh-chaturthi-2024' },
    { name: 'Raas 2025', path: '/events/raas-2025' }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Logo */}
        <Link to="/" className="navbar-brand" data-cursor="action">
          Ensemble
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-nav">
          <Link 
            to="/" 
            className={`navbar-link ${isActive('/') ? 'active' : ''}`}
            data-cursor="action"
          >
            Home
          </Link>

          {/* Menu Dropdown */}
          <div className="dropdown">
            <button className="navbar-link flex items-center space-x-1 " data-cursor="action">
              <span>Clubs</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            <div className="dropdown-menu">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="dropdown-item"
                  data-cursor="action"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Events Dropdown */}
          <div className="dropdown">
            <button className="navbar-link flex items-center space-x-1" data-cursor="action">
              <span>Events</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            <div className="dropdown-menu">
              {eventItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="dropdown-item"
                  data-cursor="action"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <Link 
            to="/about" 
            className={`navbar-link ${isActive('/about') ? 'active' : ''}`}
            data-cursor="action"
          >
            About
          </Link>

          <Link 
            to="/contact" 
            className={`navbar-link ${isActive('/contact') ? 'active' : ''}`}
            data-cursor="action"
          >
            Contact
          </Link>

          <Link 
            to="/shop" 
            className="navbar-link flex items-center space-x-1"
            data-cursor="action"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Shop</span>
          </Link>

          {/* Auth Button */}
          {user ? (
            <div className="flex items-center space-x-2">
              <span className="text-secondary">Welcome, {user.name}</span>
              <button
                onClick={logout}
                className="btn-secondary"
                data-cursor="action"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={onAuthClick}
              className="btn-primary flex items-center space-x-1"
              data-cursor="action"
            >
              <User className="w-4 h-4" />
              <span>Login</span>
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-secondary hover:text-primary transition-colors"
            data-cursor="action"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-secondary border-t border-tertiary">
          <div className="px-4 py-2 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-secondary hover:text-primary hover:bg-tertiary rounded-lg transition-all"
              data-cursor="action"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block px-3 py-2 text-secondary hover:text-primary hover:bg-tertiary rounded-lg transition-all"
                data-cursor="action"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            <Link
              to="/about"
              className="block px-3 py-2 text-secondary hover:text-primary hover:bg-tertiary rounded-lg transition-all"
              data-cursor="action"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            
            <Link
              to="/contact"
              className="block px-3 py-2 text-secondary hover:text-primary hover:bg-tertiary rounded-lg transition-all"
              data-cursor="action"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            
            <Link
              to="/shop"
              className="flex items-center space-x-2 px-3 py-2 text-secondary hover:text-primary hover:bg-tertiary rounded-lg transition-all"
              data-cursor="action"
              onClick={() => setIsMenuOpen(false)}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Shop</span>
            </Link>
            
            {user ? (
              <div className="px-3 py-2">
                <span className="text-secondary">Welcome, {user.name}</span>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full mt-2 btn-secondary"
                  data-cursor="action"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onAuthClick();
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-2 w-full px-3 py-2 text-secondary hover:text-primary hover:bg-tertiary rounded-lg transition-all"
                data-cursor="action"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

