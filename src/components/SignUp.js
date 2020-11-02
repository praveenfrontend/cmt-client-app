/* eslint-disable default-case */
import React, { useContext, useEffect } from "react";
import Axios from "axios";
import { useImmerReducer } from "use-immer";

import CardHeader from "./CardHeader";
import CardFooter from "./CardFooter";
import FormInput from "./FormInput";
import DispatchContext from "../DispatchContext";
import { CSSTransition } from "react-transition-group";

function SignUp() {
  const appDispatch = useContext(DispatchContext);

  const initialState = {
    username: {
      value: "",
      hasErrors: false,
      message: "",
      isUnique: false,
      checkCount: 0
    },
    email: {
      value: "",
      hasErrors: false,
      message: "",
      isUnique: false,
      checkCount: 0
    },
    password: {
      value: "",
      hasErrors: false,
      message: ""
    },
    confirmPassword: {
      value: "",
      hasErrors: false,
      message: ""
    },
    firstName: {
      value: "",
      hasErrors: false,
      message: ""
    },
    lastName: {
      value: "",
      hasErrors: false,
      message: ""
    },
    phone: {
      value: "",
      hasErrors: false,
      message: ""
    },
    roleType: {
      value: "",
      hasErrors: false,
      message: ""
    },
    submitCount: 0
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "usernameImmediately":
        draft.username.hasErrors = false;
        draft.username.value = action.value;
        if (draft.username.value.length > 30) {
          draft.username.hasErrors = true;
          draft.username.message = "Username cannot exceed 30 characters.";
        }
        if (draft.username.value && !/^([a-zA-Z0-9]+)$/.test(draft.username.value)) {
          draft.username.hasErrors = true;
          draft.username.message = "Username can only contain letters and numbers.";
        }
        return;
      case "usernameAfterDelay":
        if (draft.username.value.length < 3) {
          draft.username.hasErrors = true;
          draft.username.message = "Username must be atleast 3 characters.";
        }
        if (!draft.hasErrors && !action.noRequest) {
          draft.username.checkCount++;
        }
        return;
      case "usernameUniqueResults":
        if (action.value) {
          draft.username.hasErrors = true;
          draft.username.isUnique = false;
          draft.username.message = "That username is already taken.";
        } else {
          draft.username.isUnique = true;
        }
        return;
      case "emailImmediately":
        draft.email.hasErrors = false;
        draft.email.value = action.value;
        return;
      case "emailAfterDelay":
        if (!/^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+\.([a-zA-Z]+)$/.test(draft.email.value)) {
          draft.email.hasErrors = true;
          draft.email.message = "You must provide a valid email address.";
        }
        if (!draft.email.hasErrors && !action.noRequest) {
          draft.email.checkCount++;
        }
        return;
      case "emailUniqueResults":
        if (action.value) {
          draft.email.hasErrors = true;
          draft.email.isUnique = false;
          draft.email.message = "That email is already being used.";
        } else {
          draft.email.isUnique = true;
        }
        return;
      case "passwordImmediately":
        draft.password.hasErrors = false;
        draft.password.value = action.value;
        if (draft.password.value.length > 50) {
          draft.password.hasErrors = true;
          draft.password.message = "Password cannot exceed 50 characters.";
        }
        return;
      case "passwordAfterDelay":
        if (draft.password.value.length < 12) {
          draft.password.hasErrors = true;
          draft.password.message = "Password must be atleast 12 characters.";
        }
        return;
      case "confirmPasswordImmediately":
        draft.confirmPassword.hasErrors = false;
        draft.confirmPassword.value = action.value;
        if (draft.confirmPassword.value.length > 50) {
          draft.confirmPassword.hasErrors = true;
          draft.confirmPassword.message = "Password cannot exceed 50 characters.";
        }
        return;
      case "confirmPasswordAfterDelay":
        if (draft.confirmPassword.value.length < 12) {
          draft.confirmPassword.hasErrors = true;
          draft.confirmPassword.message = "Password must be atleast 12 characters.";
        }
        if (draft.confirmPassword.value !== draft.password.value) {
          draft.confirmPassword.hasErrors = true;
          draft.confirmPassword.message = "Passwords do not match.";
        }
        return;
      case "firstNameImmediately":
        draft.firstName.hasErrors = false;
        draft.firstName.value = action.value;
        if (!/^[a-zA-Z]+$/.test(draft.firstName.value)) {
          draft.firstName.hasErrors = true;
          draft.firstName.message = "Please enter only alphabets without space.";
        }
        return;
      case "lastNameImmediately":
        draft.lastName.hasErrors = false;
        draft.lastName.value = action.value;
        if (!/^[a-zA-Z]+$/.test(draft.lastName.value)) {
          draft.lastName.hasErrors = true;
          draft.lastName.message = "Please enter only alphabets without space.";
        }
        return;
      case "phoneImmediately":
        draft.phone.hasErrors = false;
        draft.phone.value = action.value;
        return;
      case "phoneAfterDelay":
        if (!/^[0-9]{10}$/.test(draft.phone.value)) {
          draft.phone.hasErrors = true;
          draft.phone.message = "Please enter 10 digits phone number.";
        }
        return;
      case "roleTypeImmediately":
        console.log("Inside role type");
        draft.roleType.hasErrors = false;
        draft.roleType.value = action.value;
        console.log("role type value:" + draft.roleType.value);
        if (draft.roleType.value === "") {
          console.log("role type has errorssssssssssssss............");
          draft.roleType.hasErrors = true;
          draft.roleType.message = "Please select the Role Type";
        }
        return;
      case "submitForm":
        if (!draft.username.hasErrors && draft.username.isUnique && !draft.email.hasErrors && draft.email.isUnique && !draft.password.hasErrors && !draft.roleType.hasErrors) {
          draft.submitCount++;
        }
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  useEffect(() => {
    if (state.username.value) {
      const delay = setTimeout(() => dispatch({ type: "usernameAfterDelay" }), 800);
      return () => clearTimeout(delay);
    }
  }, [dispatch, state.username.value]);

  useEffect(() => {
    if (state.email.value) {
      const delay = setTimeout(() => dispatch({ type: "emailAfterDelay" }), 800);
      return () => clearTimeout(delay);
    }
  }, [dispatch, state.email.value]);

  useEffect(() => {
    if (state.password.value) {
      const delay = setTimeout(() => dispatch({ type: "passwordAfterDelay" }), 800);
      return () => clearTimeout(delay);
    }
  }, [dispatch, state.password.value]);

  useEffect(() => {
    if (state.confirmPassword.value) {
      const delay = setTimeout(() => dispatch({ type: "confirmPasswordAfterDelay" }), 800);
      return () => clearTimeout(delay);
    }
  }, [dispatch, state.confirmPassword.value]);

  useEffect(() => {
    if (state.phone.value) {
      const delay = setTimeout(() => dispatch({ type: "phoneAfterDelay" }), 800);
      return () => clearTimeout(delay);
    }
  }, [dispatch, state.phone.value]);

  useEffect(() => {
    if (state.username.checkCount) {
      const ourRequest = Axios.CancelToken.source();
      async function fetchResults() {
        try {
          const response = await Axios.post("/doesUsernameExist", { username: state.username.value }, { cancelToken: ourRequest.token });
          dispatch({ type: "usernameUniqueResults", value: response.data });
        } catch (e) {
          console.log("There was a problem or the request was cancelled.");
        }
      }
      fetchResults();
      return () => ourRequest.cancel();
    }
  }, [dispatch, state.username.checkCount, state.username.value]);

  useEffect(() => {
    if (state.email.checkCount) {
      const ourRequest = Axios.CancelToken.source();
      async function fetchResults() {
        try {
          const response = await Axios.post("/doesEmailExist", { email: state.email.value }, { cancelToken: ourRequest.token });
          console.log("email response: " + response.data);
          dispatch({ type: "emailUniqueResults", value: response.data });
        } catch (e) {
          console.log("There was a problem or the request was cancelled.");
        }
      }
      fetchResults();
      return () => ourRequest.cancel();
    }
  }, [dispatch, state.email.checkCount, state.email.value]);

  useEffect(() => {
    if (state.submitCount) {
      const ourRequest = Axios.CancelToken.source();
      async function fetchResults() {
        try {
          console.log("role type: " + state.roletype);
          const response = await Axios.post(
            "/register",
            {
              username: state.username.value,
              email: state.email.value,
              password: state.password.value /* ,
              firstName: state.firstName.value,
              lastName: state.lastName.value,
              phone: state.phone.value */
            },
            { cancelToken: ourRequest.token }
          );
          console.log("User was successfully created");
          console.log(response.data);
          appDispatch({ type: "flashMessage", value: "Thank you for registering with us. Please click on the confirmation link that has been sent to your registered email." });
        } catch (e) {
          console.log("There was a problem or the request was cancelled.");
        }
      }
      fetchResults();
      return () => ourRequest.cancel();
    }
  }, [dispatch, state.email.value, state.password.value, state.submitCount, state.username.value, state.roletype, appDispatch]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "usernameImmediately", value: state.username.value });
    dispatch({ type: "usernameAfterDelay", value: state.username.value, noRequest: true });
    dispatch({ type: "emailImmediately", value: state.email.value });
    dispatch({ type: "emailAfterDelay", value: state.email.value, noRequest: true });
    dispatch({ type: "passwordImmediately", value: state.password.value });
    dispatch({ type: "passwordAfterDelay", value: state.password.value });
    /* dispatch({ type: "confirmPasswordImmediately", value: state.confirmPassword.value });
    dispatch({ type: "confirmPasswordAfterDelay", value: state.confirmPassword.value });
    dispatch({ type: "firstNameImmediately", value: state.firstName.value });
    dispatch({ type: "lastNameImmediately", value: state.lastName.value });
    dispatch({ type: "phoneImmediately", value: state.phone.value });
    dispatch({ type: "phoneAfterDelay", value: state.phone.value }); */
    dispatch({ type: "roleTypeImmediately", value: state.roleType.value });
    dispatch({ type: "submitForm" });
  }

  return (
    <div className="col-md-6 col-lg-4">
      <div className="card h-100">
        <CardHeader cardHeaderValue="SignUp" />
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <FormInput icon="fas fa-user" type="text" placeholder="Username" changeHandler={e => dispatch({ type: "usernameImmediately", value: e.target.value })} message={state.username.message} inputField={state.username.hasErrors} />

            <FormInput icon="fas fa-lock" type="password" placeholder="Password" changeHandler={e => dispatch({ type: "passwordImmediately", value: e.target.value })} message={state.password.message} inputField={state.password.hasErrors} />

            <FormInput icon="fas fa-lock" type="password" placeholder="Confirm Password" changeHandler={e => dispatch({ type: "confirmPasswordImmediately", value: e.target.value })} message={state.confirmPassword.message} inputField={state.confirmPassword.hasErrors} />

            <FormInput icon="fas fa-user" type="text" placeholder="First Name" changeHandler={e => dispatch({ type: "firstNameImmediately", value: e.target.value })} message={state.firstName.message} inputField={state.firstName.hasErrors} />

            <FormInput icon="fas fa-user" type="text" placeholder="Last Name" changeHandler={e => dispatch({ type: "lastNameImmediately", value: e.target.value })} message={state.lastName.message} inputField={state.lastName.hasErrors} />

            <FormInput icon="fas fa-envelope" type="email" placeholder="Email Address" changeHandler={e => dispatch({ type: "emailImmediately", value: e.target.value })} message={state.email.message} inputField={state.email.hasErrors} />

            <FormInput icon="fas fa-phone" type="text" placeholder="Phone Number" changeHandler={e => dispatch({ type: "phoneImmediately", value: e.target.value })} message={state.phone.message} inputField={state.phone.hasErrors} />

            <div className="form-group">
              <label className="text-muted mr-2">
                <small>Role Type</small>
              </label>
              <div className="btn-group btn-group-dispose" data-toggle="buttons">
                <label className="btn btn-outline-primary">
                  <input type="radio" name="roletype" id="user" onChange={e => dispatch({ type: "roleTypeImmediately", value: e.target.id })} /> User
                </label>
                <label className="btn btn-outline-primary">
                  <input type="radio" name="roletype" id="agent" onChange={e => dispatch({ type: "roleTypeImmediately", value: e.target.id })} /> Agent
                </label>
                <label className="btn btn-outline-primary">
                  <input type="radio" name="roletype" id="admin" onChange={e => dispatch({ type: "roleTypeImmediately", value: e.target.id })} /> Admin
                </label>
              </div>
              <CSSTransition in={state.roleType.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                <div className="alert alert-danger small liveValidateMessage">{state.roleType.message}</div>
              </CSSTransition>
            </div>

            <input type="submit" value="SIGN UP" className="btn btn-success btn-block" />
          </form>
        </div>
        <CardFooter buttonValue="SIGN IN" footerText="Already have an account?" />
      </div>
    </div>
  );
}

export default SignUp;

/* 
const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [fname, setFirstname] = useState();
  const [lname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [roletype, setRoleType] = useState();

  const { addFlashMessage } = useContext(AppContext);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await Axios.post("/register", { username: username, password: password, fname: fname, lname: lname, email: email, phone: phone, roletype: roletype });
      addFlashMessage("Thank you for registering with us. Please click on the confirmation link that has been sent to your registered email.");
      console.log("User was successfully created");
      console.log(password);
    } catch (e) {
      console.log(e.response.data);
    }
  }
*/

/* onChange={e => setRoleType(e.target.id)} */
