import React, { useContext } from "react";
import StateContext from "../StateContext";

function Home() {
  const appState = useContext(StateContext);

  return <div className="mt-5">Welcome {appState.user.username}</div>;
}

export default Home;
