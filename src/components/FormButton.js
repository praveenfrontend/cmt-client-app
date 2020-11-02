import React, { useContext } from "react";
import DispatchContext from "../DispatchContext";

function FormButton({ buttonValue }) {
  const appDispatch = useContext(DispatchContext);

  function handleSignInSignOut() {
    const signInVal = buttonValue === "SIGN UP" ? false : true;
    appDispatch({ type: "signIn", value: signInVal });
  }

  return <input type="submit" value={buttonValue} className="btn btn-success btn-block" onClick={handleSignInSignOut} />;
}

export default FormButton;

// import AppContext from "../AppContext";
// const { setSignIn } = useContext(AppContext);
// setSignIn(signInVal);
