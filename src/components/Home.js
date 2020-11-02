import React, { useContext } from "react";
import StateContext from "../StateContext";
import Sidebar from "./Sidebar";

function Home() {
  const appState = useContext(StateContext);

  return (
    <div className="d-flex" id="wrapper">
      <Sidebar />
      <div id="page-content-wrapper">
        <div className="container-fluid">
          <h1 className="mt-4">
            Hello <strong>{appState.user.username}</strong>.
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Home;
