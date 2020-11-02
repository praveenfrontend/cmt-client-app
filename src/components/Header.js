import React from "react";
import { Link } from "react-router-dom";
import HeaderLoggedIn from "./HeaderLoggedIn";

function Header({ loggedIn }) {
  return (
    <header className="bg-primary">
      <div className="container p-3 d-flex flex-column flex-md-row align-items-center p-3">
        <h3 className="my-0 mr-md-auto font-weight-normal">
          <Link to="/" className="text-white">
            {" "}
            Community Matters{" "}
          </Link>
        </h3>
        {loggedIn ? <HeaderLoggedIn /> : null}
      </div>
    </header>
  );
}

export default Header;
