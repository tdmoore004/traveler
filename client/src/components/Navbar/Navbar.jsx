import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from "../../utils/GlobalContext.js";
import './Navbar.css';

const Navbar = () => {

  const [userContext, setUserContext] = useGlobalContext();

  const logout = () => {
    setUserContext({ user: "", isAuth: false })
  }

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

        <ul className="Navbar-Links dropdown menu" data-dropdown-menu>
          <li>
            <button className="Navbar-links" onClick={logout}>Logout</button>
          </li>
        </ul>
      </ul>
    </nav>
  );
};

export default Navbar;

