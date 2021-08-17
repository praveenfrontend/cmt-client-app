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
    email: {
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
        if (draft.email.length === 0) {
          draft.email.hasErrors = true;
          draft.email.message = "Email cannot be empty.";
          return;
        }
        if (!/^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+\.([a-zA-Z]+)$/.test(draft.email.value)) {
          draft.email.hasErrors = true;
          draft.email.message = "You must provide a valid email address.";
        }
        return;
      case "submitForm":
        if ( !draft.email.hasErrors ) {
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
          const response = await Axios.post("/req-password-reset", {
            email: state.email.value,
          });

          if (response.data.message === "Password reset mail has been sent.") {
            setLoading(false);
            closeModalForm();
            setSubmitCount(0);
            swal("Password reset mail has been sent.", "", "success").then(res => {
              setLoading(true);
              window.location.reload();
              setUpdatePassword(true);
            });
          } else {
            swal(response.data.message, "Please complete registration.", "error").then(res => {
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
  }, [dispatch, state.email.value, submitCount ]);

  async function handleSubmit(e) {
    e.preventDefault();

    
    // dispatch({ type: "emailImmediately", value: state.email.value });
    // dispatch({ type: "submitForm" });

    closeModalForm();
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
                <FormInput type="password" icon="fas fa-lock" placeholder="Enter Password" /* changeHandler={e => dispatch({ type: "emailImmediately", value: e.target.value })} message={state.email.message} inputField={state.email.hasErrors} */ />
                <FormInput type="password" icon="fas fa-lock" placeholder="Re-Enter Password" /* changeHandler={e => dispatch({ type: "emailImmediately", value: e.target.value })} message={state.email.message} inputField={state.email.hasErrors} */ />
                {/* <input type="submit" value="Create New Password" className="btn btn-primary btn-block" disabled={ (state.email.value === "") ? true : false } /> */}
                <br />
              </form>
          </div>
        </Modal.Body>
      </Modal>
    </LoadingOverlay>
  );
}

export default UpdatePassword;
