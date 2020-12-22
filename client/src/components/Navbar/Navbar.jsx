import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="Navbar">
      <div className="Navbar-brand">
        <span>Traveler</span>
      </div>

      <ul className="Navbar-links">
        <li className="Navbar-link">
          <Link to="/">
            Homepage
          </Link>
        </li>

        <li className="Navbar-link">
          <Link to="/trips">
            Trips
          </Link>
        </li>

        <li className="Navbar-link">
          <Link to="/todos/new">
            Account
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

