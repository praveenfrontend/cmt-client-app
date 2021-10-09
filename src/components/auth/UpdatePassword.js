/* eslint-disable default-case */
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Modal } from "react-bootstrap";
import { useImmerReducer } from "use-immer";
import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";
import swal from "sweetalert";

import FormInput from "../FormFields/FormInput";

function UpdatePassword({ updatePassword, setUpdatePassword }) {

  const [loading, setLoading] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);

  const initialState = {
    otp: {
      value: "",
      hasErrors: false,
      message: ""
    },
    password: {
      value: "",
      hasErrors: false,
      message: ""
    },
    rePassword: {
      value: "",
      hasErrors: false,
      message: ""
    }
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "otpImmediately":
        draft.otp.hasErrors = false;
        draft.otp.value = action.value;
        if (draft.otp.value.length === 0) {
          draft.otp.hasErrors = true;
          draft.otp.message = "Please enter Email OTP";
          return;
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
        const password = draft.password.value;
        if ( !/[a-z]/g.test(password) || !/[A-Z]/g.test(password)  || !/[0-9]/g.test(password) || password.length < 6 ) {
          draft.password.hasErrors = true;
          draft.password.message = "Password must contain minimum 6 characters that includes 1 lowercase, 1 uppercase and 1 number.";
          return;
        }
        return;
      case "rePasswordImmediately":
        draft.rePassword.hasErrors = false;
        draft.rePassword.value = action.value;
        if (draft.rePassword.value !== draft.password.value) {
          draft.rePassword.hasErrors = true;
          draft.rePassword.message = "Passwords do not match";
          return;
        }
        return;
      case "submitForm":
        if ( !draft.otp.hasErrors && !draft.password.hasErrors && !draft.rePassword.hasErrors ) {
          setSubmitCount(1);
        }
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  const closeModalForm = () => {
    setUpdatePassword(false);
  };

  useEffect(() => {
    if (submitCount) {
      async function fetchResults() {
        setLoading(true);
        try {
          const response = await Axios.post("/update-password", {
            token: state.otp.value,
            password: state.password.value
          });

          if (response.data.success === true) {
            setLoading(false);
            closeModalForm();
            setSubmitCount(0);
            swal(response.data.message, "", "success").then(res => {
              setLoading(true);
              window.location.reload();
              // setUpdatePassword(true);
            });
          } else {
            swal("Something went wrong", response.data.message, "error").then(res => {
              setLoading(true);
              window.location.reload();
            });
            setLoading(false);
            closeModalForm();
            setSubmitCount(0);
          }
        } catch (e) {
          setLoading(false);
          closeModalForm();
          setSubmitCount(0);
          swal("Something went wrong!", "", "error").then(res => {
            setLoading(true);
            window.location.reload();
          });
        }
      }
      fetchResults();
    }
  }, [dispatch, state.otp.value, state.password.value, submitCount ]);

  async function handleSubmit(e) {
    e.preventDefault();

    
    dispatch({ type: "otpImmediately", value: state.otp.value });
    dispatch({ type: "passwordImmediately", value: state.password.value });
    dispatch({ type: "rePasswordImmediately", value: state.rePassword.value });
    dispatch({ type: "submitForm" });

    // closeModalForm();
  }

  return (
    <LoadingOverlay active={loading} spinner={<Loader type="ThreeDots" color="#00BFFF" height={100} width={100} visible={true} />}>
      <Modal show={updatePassword} onHide={closeModalForm}>
        <Modal.Header closeButton className="reset-password">
          <Modal.Title>
            <h1 className="text-primary">CREATE NEW PASSWORD</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-inner">
              
              <form onSubmit={handleSubmit}>
                <FormInput type="text" icon="fas fa-lock" placeholder="Enter Email OTP" changeHandler={e => dispatch({ type: "otpImmediately", value: e.target.value })} message={state.otp.message} inputField={state.otp.hasErrors} />
                <FormInput type="password" icon="fas fa-lock" placeholder="Enter Password" changeHandler={e => dispatch({ type: "passwordImmediately", value: e.target.value })} message={state.password.message} inputField={state.password.hasErrors} />
                <FormInput type="password" icon="fas fa-lock" placeholder="Re-Enter Password" changeHandler={e => dispatch({ type: "rePasswordImmediately", value: e.target.value })} message={state.rePassword.message} inputField={state.rePassword.hasErrors} />
                <input type="submit" value="Create New Password" className="btn btn-primary btn-block" />
                <br />
              </form>
          </div>
        </Modal.Body>
      </Modal>
    </LoadingOverlay>
  );
}

export default UpdatePassword;
