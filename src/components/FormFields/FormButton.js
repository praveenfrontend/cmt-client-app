import React, { useContext } from "react";
import DispatchContext from "../../DispatchContext";

function FormButton({ buttonValue }) {
  const appDispatch = useContext(DispatchContext);

  function handleSignInSignOut() {
    const signInVal = buttonValue === "Register" ? false : true;
    appDispatch({ type: "signIn", value: signInVal });
  }

  return <input type="submit" value={buttonValue} className="btn btn-primary" onClick={handleSignInSignOut} />;
}

export default FormButton;
