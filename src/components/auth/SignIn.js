/* eslint-disable default-case */
import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";
import { useImmerReducer } from "use-immer";
import { Link } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";
import swal from "sweetalert";

import FormInput from "../FormFields/FormInput";
import FormButton from "../FormFields/FormButton";
import DispatchContext from "../../DispatchContext";

import ResetPassword from "./ResetPassword";
import UpdatePassword from "./UpdatePassword";
import ResendEmailVerification from "./ResendEmailVerification";

function SignIn() {
  const appDispatch = useContext(DispatchContext);

  const [loading, setLoading] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);
  
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const [updatePassword, setUpdatePassword] = useState(false);
  const [resendVerificationEmailModal, setResendVerificationEmailModal] = useState(false);

  const initialState = {
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
    }
  };

  function ourReducer(draft, action) {
    switch (action.type) {
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
        if (draft.password.value.length < 6) {
          draft.password.hasErrors = true;
          draft.password.message = "Password must be atleast 6 characters.";
        }
        return;
      case "submitForm":
        if (/* !draft.email.hasErrors && draft.email.isUnique && */ !draft.password.hasErrors) {
          setSubmitCount(1);
        }
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

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
    if (submitCount) {
      async function fetchResults() {
        appDispatch({ type: "loading", value: true });
        try {
          const response = await Axios.post("/login", {
            email: state.email.value,
            password: state.password.value
          });

          if (response.data.success === true) {
            appDispatch({ type: "login", data: response.data.data });
            // appDispatch({ type: "flashMessage", value: "You have successfully logged in." });
            appDispatch({ type: "loading", value: false });
          } else {
            setSubmitCount(0);
            // appDispatch({ type: "flashMessage", value: "Invalid login credentials." });
            appDispatch({ type: "loading", value: false });
          }
        } catch (e) {
          setSubmitCount(0);
          swal("Something went wrong!", e.response.data.error, "error");
          appDispatch({ type: "loading", value: false });
          // dispatch({ type: "emailUniqueResults", value: e.response.data.email });
        }
      }
      fetchResults();
    }
  }, [dispatch, state.email.value, state.password.value, submitCount, appDispatch]);

  async function handleSubmit(e) {
    e.preventDefault();

    dispatch({ type: "emailImmediately", value: state.email.value });
    dispatch({ type: "emailAfterDelay", value: state.email.value, noRequest: true });
    dispatch({ type: "passwordImmediately", value: state.password.value });
    dispatch({ type: "passwordAfterDelay", value: state.password.value });
    dispatch({ type: "submitForm" });
  }

  function handleUpdatePassword(value) {
    setUpdatePassword(value);
  }

  return (
    <LoadingOverlay active={loading} spinner={<Loader type="ThreeDots" color="#00BFFF" height={100} width={100} visible={true} />}>
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
                <FormInput type="email" icon="fas fa-envelope" placeholder="Email Address" changeHandler={e => dispatch({ type: "emailImmediately", value: e.target.value })} message={state.email.message} inputField={state.email.hasErrors} />
                <FormInput type="password" icon="fas fa-lock" placeholder="Password" changeHandler={e => dispatch({ type: "passwordImmediately", value: e.target.value })} message={state.password.message} inputField={state.password.hasErrors} />

                <input type="submit" value="Login" className="btn btn-primary btn-block" />
              </form>
              <Link to="/" className="forgot-pass" onClick={e => setForgotPasswordModal(true)}>
                Reset Password
              </Link>
              <Link to="/" className="forgot-pass" onClick={e => setResendVerificationEmailModal(true)}>
                Resend email verification
              </Link>
              <small>Do not have an account? </small>
              <FormButton buttonValue="Register" />
            </div>
          </div>
        </div>
        <footer class="main-footer">
          <div class="container-fluid">
            <div class="row">
              <div class="col-sm-6">
                <p>&copy; 2021 SoCoS Inc, Canada. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
      <ResetPassword forgotPasswordModal={forgotPasswordModal} setForgotPasswordModal={setForgotPasswordModal} handleUpdatePassword={handleUpdatePassword}/>
      <UpdatePassword updatePassword={updatePassword} setUpdatePassword={setUpdatePassword} />
      <ResendEmailVerification resendVerificationEmailModal={resendVerificationEmailModal} setResendVerificationEmailModal={setResendVerificationEmailModal} />
    </LoadingOverlay>
  );
}

export default SignIn;
