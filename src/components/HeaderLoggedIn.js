import React, { useContext } from "react";

import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";

function HeaderLoggedIn() {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  function handleLogout() {
    appDispatch({ type: "logout" });
    appDispatch({ type: "flashMessage", value: "You have successfully logged out." });
  }

  return (
    <div className="d-flex align-items-end my-3 my-md-0">
      <small className="text-light mr-2">{appState.user.username}</small>
      <button onClick={handleLogout} className="btn btn-sm btn-success">
        Sign Out
      </button>
    </div>
  );
}

export default HeaderLoggedIn;
