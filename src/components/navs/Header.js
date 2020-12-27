/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";

import { Link } from "react-router-dom";
import DispatchContext from "../../DispatchContext";

function Header({ menuHandle }) {
  const appDispatch = useContext(DispatchContext);

  function handleLogout() {
    appDispatch({ type: "logout" });
    appDispatch({ type: "flashMessage", value: "You have successfully logged out." });
  }

  return (
    <header className="header">
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-holder d-flex align-items-center justify-content-between">
            <div className="navbar-header">
              <button onClick={() => menuHandle()} id="toggle-btn" className="btn btn-primary">
                <i className="fa fa-bars"></i>
              </button>

              <Link to="/initial-registration-form" className="navbar-brand">
                <div className="brand-text d-none d-md-inline-block">
                  <strong className="text-primary">Community Matters</strong>
                </div>
              </Link>
            </div>

            <ul className="nav-menu list-unstyled d-flex flex-md-row align-items-md-center">
              <li className="nav-item">
                <Link to="" onClick={handleLogout} className="nav-link logout">
                  <span className="d-none d-sm-inline-block">Sign Out</span>
                  <i className="fa fa-sign-out"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
