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

        <ul class="Navbar-Links dropdown menu" data-dropdown-menu>
          <li>
            <a href="#">Account</a>
            <ul className="menu">
              <li><a href="#">Add a new trip</a></li>
              <li><a href="#">Profile</a></li>
              <li><a href="#">Logout</a></li>
            </ul>
          </li>
        </ul>
      </ul>
    </nav>
  );
};

export default Navbar;

