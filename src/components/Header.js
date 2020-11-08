import React, { useContext } from "react";

import { Link } from "react-router-dom";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";

import { Navbar, Nav } from "react-bootstrap";

function Header({ loggedIn }) {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  function handleLogout() {
    appDispatch({ type: "logout" });
    appDispatch({ type: "flashMessage", value: "You have successfully logged out." });
  }

  function toggleMenu(e) {
    e.preventDefault();
    appDispatch({ type: "toggleMenu", value: !appState.isToggled });
  }

  return (
    <Navbar className="nav-header" expand="lg">
      {loggedIn ? (
        <button className="btn btn-primary mr-2" id="menu-toggle" onClick={toggleMenu}>
          Menu
        </button>
      ) : null}
      {/* appState.isToggled ? null : (
        <Navbar.Brand>
          <Link to="/" className="text-white container-fluid ml-3">
            Community Matters
          </Link>
        </Navbar.Brand>
      ) */}

      <Navbar.Brand>
        <Link to="/" className="text-white container-fluid ml-3">
          Community Matters
        </Link>
      </Navbar.Brand>

      {loggedIn ? (
        <React.Fragment>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <small className="text-primary mr-2">{appState.user.username}</small>
              <button onClick={handleLogout} className="btn btn-sm btn-success">
                Sign Out
              </button>
            </Nav>
          </Navbar.Collapse>
        </React.Fragment>
      ) : null}
    </Navbar>
  );
}

export default Header;
