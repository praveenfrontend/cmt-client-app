import React, { useState, useContext } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";

import FormInput from "../FormFields/FormInput";
import FormButton from "../FormFields/FormButton";
import DispatchContext from "../../DispatchContext";

function SignIn() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const appDispatch = useContext(DispatchContext);

  async function handleSubmit(e) {
    e.preventDefault();
    // setLoading(true);
    appDispatch({ type: "loading", value: true });

    try {
      // const response = await Axios.post("/login", { email, password });
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password })
      };
      // const response = await fetch("/login", requestOptions);
      const response = await fetch("https://development.d3rvgrkkwgv6tq.amplifyapp.com/#/https://test4cmt.000webhostapp.com/api/login", requestOptions);
      const result = await response.json();
      console.log("data: ", result.data);

      setLoading(false);
      if (result.data.token) {
        console.log(email, password);
        // appDispatch({ type: "login", data: response.data });
        appDispatch({ type: "login", data: result.data });
        appDispatch({ type: "loading", value: false });
        appDispatch({ type: "flashMessage", value: "You have successfully logged in." });
      } else {
        alert("Incorrect username or password.");
        appDispatch({ type: "flashMessage", value: "Invalid login credentials." });
      }
    } catch (e) {
      console.log(e.response.data);
      // setLoading(false);
      appDispatch({ type: "loading", value: false });
    }
  }

  return (
    <div className="page login-page">
      <div className="container">
        <div className="form-outer text-center d-flex align-items-center">
          <div className="form-inner">
            <div className="logo text-uppercase">
              <span className="text-bold">Community</span>
              <strong className="text-primary">Matters</strong>
            </div>
            <p>
              A Platform for your local community to share, collaborate, learn, inspire and progress. <br /> Promote your programs and connect with local community Participants in your area. <br /> Share program progress with your community participants, share views to improve programs, activities, and take control of community building.
            </p>

            <form onSubmit={handleSubmit}>
              <FormInput type="text" icon="fas fa-envelope" placeholder="Email" changeHandler={e => setEmail(e.target.value)} />
              <FormInput type="password" icon="fas fa-lock" placeholder="Password" changeHandler={e => setPassword(e.target.value)} />

              <input type="submit" value="Login" className="btn btn-primary btn-block" />
              <br />
            </form>
            <Link to="/" className="forgot-pass">
              Forgot Password?
            </Link>
            <small>Do not have an account? </small>
            <FormButton buttonValue="Register" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
