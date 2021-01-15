import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from "../../utils/GlobalContext.js";
import './Navbar.css';
import LoginModal from "../LoginModal/LoginModal.jsx"
import SignupModal from "../SignupModal/SignupModal.jsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

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

      {/* Responsive navbar menu */}
      <nav className="title-bar" data-responsive-toggle="nav-menu" data-hide-for="medium">
        <button type="button" data-toggle="nav-menu">
          <FontAwesomeIcon className="fas fa-ellipsis-v" icon={faEllipsisV} />
        </button>
      </nav>

      {/* Navbar menu */}
      <nav className="top-bar-right" id="nav-menu">
        <ul className="dropdown vertical medium-horizontal menu" data-responsive-menu="accordion medium-dropdown">
          {userContext.isAuth === true ? (
            <>
              <li><Link class="login-logout" onClick={logout}>Logout</Link></li>
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

