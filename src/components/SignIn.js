import React, { useState, useContext } from "react";
import Axios from "axios";

import CardHeader from "./CardHeader";
import CardFooter from "./CardFooter";
import FormInput from "./FormInput";
import DispatchContext from "../DispatchContext";

function SignIn() {
  // const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const appDispatch = useContext(DispatchContext);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // const response = await Axios.post("/login", { username, password });
      const response = await Axios.post("/login", { email, password });
      if (response.data) {
        // console.log(response.data);
        // console.log(username, password);
        console.log(email, password);
        appDispatch({ type: "login", data: response.data });
        appDispatch({ type: "flashMessage", value: "You have successfully logged in." });
      } else {
        console.log("Incorrect username or password.");
        appDispatch({ type: "flashMessage", value: "Invalid login credentials." });
      }
    } catch (e) {
      console.log(e.response.data);
    }
  }

  return (
    <div className="col-md-6 col-lg-4">
      <div className="card border-muted h-100">
        <CardHeader cardHeaderValue="SignIn" />
        <div className="card-body ">
          <form onSubmit={handleSubmit}>
            {/* <FormInput type="text" icon="fas fa-user" placeholder="Username" changeHandler={e => setUsername(e.target.value)} /> */}
            <FormInput type="text" icon="fas fa-envelope" placeholder="Email" changeHandler={e => setEmail(e.target.value)} />
            <FormInput type="password" icon="fas fa-lock" placeholder="Password" changeHandler={e => setPassword(e.target.value)} />

            <input type="submit" value="SIGN IN" className="btn btn-success btn-block" />
            <br />
            <a href="#" className="text-primary">
              Forgot Password?
            </a>
          </form>
        </div>
        <CardFooter buttonValue="SIGN UP" footerText="Don't have an account?" />
      </div>
    </div>
  );
}

export default SignIn;

/* 
const { setLoggedIn, addFlashMessage } = useContext(AppContext);
localStorage.setItem("communityMattersToken", response.data.token);
localStorage.setItem("communityMattersUsername", response.data.username);
setLoggedIn(true);
addFlashMessage("You have successfully logged in.");
console.log(e.data.response); 
*/

// Working code with Username
/* 
<div className="col-md-6 col-lg-4">
      <div className="card border-muted h-100">
        <CardHeader cardHeaderValue="SignIn" />
        <div className="card-body ">
          <form onSubmit={handleSubmit}>
            <FormInput type="text" icon="fas fa-user" placeholder="Username" changeHandler={e => setUsername(e.target.value)} />
            <FormInput type="password" icon="fas fa-lock" placeholder="Password" changeHandler={e => setPassword(e.target.value)} />

            <input type="submit" value="SIGN IN" className="btn btn-success btn-block" />
            <br />
            <a href="#" className="text-primary">
              Forgot Password?
            </a>
          </form>
        </div>
        <CardFooter buttonValue="SIGN UP" footerText="Don't have an account?" />
      </div>
    </div>
*/
