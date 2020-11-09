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
    firstname: {
      value: "",
      hasErrors: false,
      message: ""
    },
    middlename: {
      value: "",
      hasErrors: false,
      message: ""
    },
    lastname: {
      value: "",
      hasErrors: false,
      message: ""
    },
    phone: {
      value: "",
      hasErrors: false,
      message: ""
    },
    birthdate: {
      value: "",
      hasErrors: false,
      message: ""
    },
    city: {
      value: "",
      hasErrors: false,
      message: ""
    },
    province: {
      value: "",
      hasErrors: false,
      message: ""
    },
    postal: {
      value: "",
      hasErrors: false,
      message: ""
    },
    country: {
      value: "",
      hasErrors: false,
      message: ""
    },
    gender: {
      value: "",
      hasErrors: false,
      message: ""
    },
    roletype: {
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
      case "firstnameImmediately":
        draft.firstname.hasErrors = false;
        draft.firstname.value = action.value;
        if (!/^[a-zA-Z]+$/.test(draft.firstname.value)) {
          draft.firstname.hasErrors = true;
          draft.firstname.message = "Please enter only alphabets without space.";
        }
        return;
      case "middlenameImmediately":
        draft.middlename.hasErrors = false;
        draft.middlename.value = action.value;
        if (!/^[a-zA-Z]+$/.test(draft.middlename.value)) {
          draft.middlename.hasErrors = true;
          draft.middlename.message = "Please enter only alphabets without space.";
        }
        return;
      case "lastnameImmediately":
        draft.lastname.hasErrors = false;
        draft.lastname.value = action.value;
        if (!/^[a-zA-Z]+$/.test(draft.lastname.value)) {
          draft.lastname.hasErrors = true;
          draft.lastname.message = "Please enter only alphabets without space.";
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
      case "birthdateImmediately":
        draft.birthdate.hasErrors = false;
        draft.birthdate.value = action.value;
        return;
      case "birthdateAfterDelay":
        if (!/^(0[1-9]|[12][0-9]|3[01])[\\/](0[1-9]|1[012])[\\/](19|20)\d\d$/.test(draft.birthdate.value)) {
          draft.birthdate.hasErrors = true;
          draft.birthdate.message = "Please enter date of birth in DD/MM/YYYY format.";
        }
        return;
      case "cityImmediately":
        draft.city.hasErrors = false;
        draft.city.value = action.value;
        if (!/^[a-zA-Z]+$/.test(draft.city.value)) {
          draft.city.hasErrors = true;
        }
        return;
      case "provinceImmediately":
        draft.province.hasErrors = false;
        draft.province.value = action.value;
        if (!/^[a-zA-Z]+$/.test(draft.province.value)) {
          draft.province.hasErrors = true;
          draft.province.message = "Please enter only alphabets without space.";
        }
        return;
      case "postalImmediately":
        draft.postal.hasErrors = false;
        draft.postal.value = action.value;
        if (!/^[ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy]{1}\d{1}[A-Za-z]{1}\d{1}[A-Za-z]{1}\d{1}$/.test(draft.postal.value)) {
          draft.postal.hasErrors = true;
          draft.postal.message = "Please enter only 6 characters alpha numeric.";
        }
        return;
      case "countryImmediately":
        draft.country.hasErrors = false;
        draft.country.value = action.value;
        if (!/^[a-zA-Z]+$/.test(draft.country.value)) {
          draft.country.hasErrors = true;
          draft.country.message = "Please enter only alphabets without space.";
        }
        return;
      case "genderImmediately":
        console.log("Inside role type");
        draft.gender.hasErrors = false;
        draft.gender.value = action.value;
        console.log("role type value:" + draft.gender.value);
        if (draft.gender.value === "") {
          console.log("Gender has errorssssssssssssss............");
          draft.gender.hasErrors = true;
          draft.gender.message = "Please select the gender";
        }
        return;
      case "roletypeImmediately":
        console.log("Inside role type");
        draft.roletype.hasErrors = false;
        draft.roletype.value = action.value;
        console.log("role type value:" + draft.roletype.value);
        if (draft.roletype.value === "") {
          console.log("role type has errorssssssssssssss............");
          draft.roletype.hasErrors = true;
          draft.roletype.message = "Please select the Role Type";
        }
        return;
      case "submitForm":
        console.log("inside submitform");
        if (/* !draft.username.hasErrors && draft.username.isUnique && */ /* !draft.email.hasErrors && draft.email.isUnique && */ !draft.password.hasErrors && !draft.firstname.hasErrors && !draft.middlename.hasErrors && !draft.lastname.hasErrors && !draft.city.hasErrors && !draft.province.hasErrors && !draft.postal.hasErrors && !draft.country.hasErrors && !draft.birthdate.hasErrors && !draft.gender.hasErrors && !draft.roletype.hasErrors) {
          console.log("inside submitform error count");
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
    if (state.birthdate.value) {
      const delay = setTimeout(() => dispatch({ type: "birthdateAfterDelay" }), 800);
      return () => clearTimeout(delay);
    }
  }, [dispatch, state.birthdate.value]);

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
          console.log("before email response...");
          // const response = await Axios.post("/doesEmailExist", { email: state.email.value }, { cancelToken: ourRequest.token });
          const response = await Axios.post("/checkemail", { email: state.email.value } /* , { cancelToken: ourRequest.token } */);
          console.log("after email response: " + response.data);
          // dispatch({ type: "emailUniqueResults", value: response.data });
        } catch (e) {
          console.log(e.response.data);
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
          console.log("role type: " + state.gender);
          const response = await Axios.post(
            "/register",
            {
              // username: state.username.value,
              email: state.email.value,
              password: state.password.value,
              firstname: state.firstname.value,
              middlename: state.middlename.value,
              lastname: state.lastname.value,
              phone: state.phone.value,
              birthdate: state.birthdate.value,
              country: state.country.value,
              province: state.province.value,
              city: state.city.value,
              postal: state.postal.value,
              gender: state.gender.value,
              roletype: state.roletype.value
            },
            { cancelToken: ourRequest.token }
          );
          console.log("User was successfully created");
          console.log(response.data);
          appDispatch({ type: "flashMessage", value: "Thank you for registering with us. Please click on the confirmation link that has been sent to your registered email." });
        } catch (e) {
          console.log("There was a problem or the request was cancelled.");
          console.log(e.response.data);
        }
      }
      fetchResults();
      return () => ourRequest.cancel();
    }
  }, [dispatch, state.email.value, state.password.value, state.submitCount, state.username.value, state.roletype, appDispatch]);

  function handleSubmit(e) {
    e.preventDefault();
    /* dispatch({ type: "usernameImmediately", value: state.username.value });
    dispatch({ type: "usernameAfterDelay", value: state.username.value, noRequest: true }); */
    dispatch({ type: "firstnameImmediately", value: state.firstname.value });
    dispatch({ type: "middlenameImmediately", value: state.middlename.value });
    dispatch({ type: "lastnameImmediately", value: state.lastname.value });
    dispatch({ type: "emailImmediately", value: state.email.value });
    dispatch({ type: "emailAfterDelay", value: state.email.value, noRequest: true });
    dispatch({ type: "passwordImmediately", value: state.password.value });
    dispatch({ type: "passwordAfterDelay", value: state.password.value });
    dispatch({ type: "confirmPasswordImmediately", value: state.confirmPassword.value });
    dispatch({ type: "confirmPasswordAfterDelay", value: state.confirmPassword.value });
    dispatch({ type: "phoneImmediately", value: state.phone.value });
    dispatch({ type: "birthdateImmediately", value: state.birthdate.value });
    dispatch({ type: "cityImmediately", value: state.city.value });
    dispatch({ type: "provinceImmediately", value: state.province.value });
    dispatch({ type: "postalImmediately", value: state.postal.value });
    dispatch({ type: "countryImmediately", value: state.country.value });
    dispatch({ type: "genderImmediately", value: state.gender.value });
    dispatch({ type: "roletypeImmediately", value: state.roletype.value });
    dispatch({ type: "submitForm" });
  }

  return (
    <div className="col-md-6 col-lg-4">
      <div className="card h-100">
        <CardHeader cardHeaderValue="SignUp" />
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* <FormInput icon="fas fa-user" type="text" placeholder="Username" changeHandler={e => dispatch({ type: "usernameImmediately", value: e.target.value })} message={state.username.message} inputField={state.username.hasErrors} /> */}

            <FormInput icon="fas fa-user" type="text" placeholder="First Name" changeHandler={e => dispatch({ type: "firstnameImmediately", value: e.target.value })} message={state.firstname.message} inputField={state.firstname.hasErrors} />

            <FormInput icon="fas fa-user" type="text" placeholder="Middle Name" changeHandler={e => dispatch({ type: "middlenameImmediately", value: e.target.value })} message={state.middlename.message} inputField={state.middlename.hasErrors} />

            <FormInput icon="fas fa-user" type="text" placeholder="Last Name" changeHandler={e => dispatch({ type: "lastnameImmediately", value: e.target.value })} message={state.lastname.message} inputField={state.lastname.hasErrors} />

            <FormInput icon="fas fa-envelope" type="email" placeholder="Email Address" changeHandler={e => dispatch({ type: "emailImmediately", value: e.target.value })} message={state.email.message} inputField={state.email.hasErrors} />

            <FormInput icon="fas fa-lock" type="password" placeholder="Password" changeHandler={e => dispatch({ type: "passwordImmediately", value: e.target.value })} message={state.password.message} inputField={state.password.hasErrors} />

            <FormInput icon="fas fa-lock" type="password" placeholder="Confirm Password" changeHandler={e => dispatch({ type: "confirmPasswordImmediately", value: e.target.value })} message={state.confirmPassword.message} inputField={state.confirmPassword.hasErrors} />

            <FormInput icon="fas fa-phone" type="text" placeholder="Phone Number" changeHandler={e => dispatch({ type: "phoneImmediately", value: e.target.value })} message={state.phone.message} inputField={state.phone.hasErrors} />

            <FormInput icon="fas fa-calendar" type="text" placeholder="DD/MM/YYYY" changeHandler={e => dispatch({ type: "birthdateImmediately", value: e.target.value })} message={state.birthdate.message} inputField={state.birthdate.hasErrors} />

            <FormInput icon="fas fa-address-card" type="text" placeholder="City" changeHandler={e => dispatch({ type: "cityImmediately", value: e.target.value })} message={state.city.message} inputField={state.city.hasErrors} />

            <FormInput icon="fas fa-address-card" type="text" placeholder="Province" changeHandler={e => dispatch({ type: "provinceImmediately", value: e.target.value })} message={state.province.message} inputField={state.province.hasErrors} />

            <FormInput icon="fas fa-address-card" type="text" placeholder="Postal code" changeHandler={e => dispatch({ type: "postalImmediately", value: e.target.value })} message={state.postal.message} inputField={state.postal.hasErrors} />

            <FormInput icon="fas fa-address-card" type="text" placeholder="Country" changeHandler={e => dispatch({ type: "countryImmediately", value: e.target.value })} message={state.country.message} inputField={state.country.hasErrors} />

            <div className="form-group">
              <label className="text-muted mr-2">
                <small>Gender</small>
              </label>
              <div className="btn-group btn-group-dispose" data-toggle="buttons">
                <label className="btn btn-outline-primary">
                  <input type="radio" name="gender" id="male" onChange={e => dispatch({ type: "genderImmediately", value: e.target.id })} /> Male
                </label>
                <label className="btn btn-outline-primary">
                  <input type="radio" name="gender" id="female" onChange={e => dispatch({ type: "genderImmediately", value: e.target.id })} /> Female
                </label>
              </div>
              <CSSTransition in={state.gender.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                <div className="alert alert-danger small liveValidateMessage">{state.gender.message}</div>
              </CSSTransition>
            </div>

            <div className="form-group">
              <label className="text-muted mr-2">
                <small>Role Type</small>
              </label>
              <div className="btn-group btn-group-dispose" data-toggle="buttons">
                <label className="btn btn-outline-primary">
                  <input type="radio" name="roletype" id="user" onChange={e => dispatch({ type: "roletypeImmediately", value: e.target.id })} /> User
                </label>
                <label className="btn btn-outline-primary">
                  <input type="radio" name="roletype" id="agent" onChange={e => dispatch({ type: "roletypeImmediately", value: e.target.id })} /> Agent
                </label>
                <label className="btn btn-outline-primary">
                  <input type="radio" name="roletype" id="admin" onChange={e => dispatch({ type: "roletypeImmediately", value: e.target.id })} /> Admin
                </label>
              </div>
              <CSSTransition in={state.roletype.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                <div className="alert alert-danger small liveValidateMessage">{state.roletype.message}</div>
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
  const [fname, setfirstname] = useState();
  const [lname, setlastname] = useState();
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
