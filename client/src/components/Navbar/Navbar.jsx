import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from "../../utils/GlobalContext.js";
import './Navbar.css';
import LoginModal from "../LoginModal/LoginModal.jsx"
import SignupModal from "../SignupModal/SignupModal.jsx"

const Navbar = () => {

  const [userContext, setUserContext] = useGlobalContext();

  const logout = () => {
    setUserContext({ user: "", isAuth: false })
  }

  return (
    <header className="top-bar" id="mainNavigation">
      <h1 className="top-bar-left">
          Traveler
      </h1>

      {/* Navbar menu */}
      <nav className="top-bar-right" id="nav-menu">
        <ul className="dropdown vertical medium-horizontal menu" data-responsive-menu="accordion medium-dropdown">
          {userContext.isAuth === true ? (
            <>
              <li><button class="button" onClick={logout}>Logout</button></li>
            </>
          ) : (
              <>
                <li><LoginModal /></li>
                <li><SignupModal /></li>
              </>
            )}
        </ul>
      </nav>

    </header>
  );
};

export default Navbar;

