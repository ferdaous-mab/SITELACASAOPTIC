import { Link } from 'react-router-dom';
import { ShoppingBag, Mail, Menu, X } from 'lucide-react';
import { useState } from 'react';
import './navbar-client.css';

const NavbarClient = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar-client">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <ShoppingBag size={24} />
          <span>LA CASA OPTIC</span>
        </Link>

        {/* Hamburger Menu */}
        <button
          className="hamburger"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Menu */}
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={closeMenu}>
              Accueil
            </Link>
          </li>
          
          <li className="nav-item">
            <Link to="/contact" className="nav-link contact-link" onClick={closeMenu}>
              <Mail size={18} />
              Nous Contacter
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarClient;
