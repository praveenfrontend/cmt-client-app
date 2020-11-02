import React, { useContext } from "react";
import CommunityImage from "./CommunityImage";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import StateContext from "../StateContext";

function HomeGuest() {
  const appState = useContext(StateContext);

  return (
    <section id="community-section" className="mt-4 mb-4">
      <div className="container">
        <div className="row">
          <CommunityImage />
          {appState.signIn ? <SignIn /> : <SignUp />}
        </div>
      </div>
    </section>
  );
}

export default HomeGuest;
