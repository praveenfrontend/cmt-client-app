/* eslint-disable default-case */
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useImmerReducer } from "use-immer";
import swal from "sweetalert";
import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";
import { CSSTransition } from "react-transition-group";

import Page from "../../common/Page";

function AdminDeleteUsers() {
  const [loading, setLoading] = useState(false);
  const [usersAndEmailList, setUsersAndEmailList] = useState({});
  const [usersList, setUsersList] = useState([]);
  const [emailList, setEmailList] = useState([]);

  const [userValue, setUserValue] = useState("");
  const [emailValue, setEmailValue] = useState("");

  const [submitCountDelPgm, setSubmitCountDelPgm] = useState(0);

  const initialState = {
    deleteFirstName: {
      value: "",
      hasErrors: false,
      message: ""
    },
    deleteEmail: {
      value: "",
      hasErrors: false,
      message: ""
    },
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "deleteFirstNameImmediately":
        draft.deleteFirstName.hasErrors = false;
        draft.deleteFirstName.value = action.value;
        if (/\d/.test(draft.deleteFirstName.value)) {
          draft.deleteFirstName.hasErrors = true;
          draft.deleteFirstName.message = "Name cannot contain number.";
          return;
        }
        if (!/^[a-zA-Z]+$/.test(draft.deleteFirstName.value)) {
          draft.deleteFirstName.hasErrors = true;
          draft.deleteFirstName.message = "Select Name.";
          return;
        }
        return;
      case "deleteEmailImmediately":
        draft.deleteEmail.hasErrors = false;
        draft.deleteEmail.value = action.value;
        if (draft.deleteEmail.value === "") {
          draft.deleteEmail.hasErrors = true;
          draft.deleteEmail.message = "Select Email.";
          return;
        }
        return;

      case "submitFormDelPgm":
        if (!draft.deleteFirstName.hasErrors && !draft.deleteEmail.hasErrors ) {
          setSubmitCountDelPgm(1);
        }
        return;
      }
    }

    const [state, dispatch] = useImmerReducer(ourReducer, initialState);


  useEffect(() => {
    const categoryDropDown = async () => {
      setLoading(true);
      await Axios.get("/show_aduser")
        .then(response => {
          setUsersAndEmailList(response.data.data);
          const users = Object.keys(response.data.data);
          setUsersList([...usersList, ...users]);

          console.log(usersAndEmailList["Test"]);

          setLoading(false);
        })
        .catch(error => {
          console.log(error.response);
          setLoading(false);
        });
    };
    categoryDropDown();
  }, []);

  const userHandleChange = value => {
    setUserValue(value);
    setEmailList(usersAndEmailList[value]);
  };
  const emailHandleChange = value => {
    setEmailValue(value);
  };

  

  useEffect(() => {
    if (submitCountDelPgm) {
      async function fetchResults() {
        setLoading(true);
        try {
          const response = await Axios.delete("/delete_aduser", { data: { email: emailValue } });
          setLoading(false);
    
          if (response.data.success === true) {
            swal("User Deleted", "", "success").then(res => {
              setLoading(true);
              window.location.reload();
            });
          } else {
            swal("Something went wrong", response, "error");
          }
        } catch (e) {
          // if (e.response === null) {
          swal("Something went wrong.", e.response, "error");
          // }
          setLoading(false);
        }
      }
      fetchResults();
      setSubmitCountDelPgm(0);
    }
  }, [dispatch, emailValue, submitCountDelPgm, userValue]);

  const deleteUser = async e => {
    e.preventDefault();

    dispatch({ type: "deleteFirstNameImmediately", value: state.deleteFirstName.value });
    dispatch({ type: "deleteEmailImmediately", value: state.deleteEmail.value });
    dispatch({ type: "submitFormDelPgm" });
  };

  return (
    <LoadingOverlay active={loading} spinner={<Loader type="ThreeDots" color="#00BFFF" height={100} width={100} visible={true} />}>
      <section className="forms">
        <div className="container-fluid">
          <Page title="Delete User">
            <form onSubmit={e => deleteUser(e)}>
              <div className="row">
                <div className="col-md-5">
                  <div className={`form-group row`}>
                    <label className="col-sm-5 form-control-label">First Name</label>
                    <div className="col-sm-7 mb-3">
                      <select name="account" className="form-control" onChange={e => userHandleChange(e.target.value)}
                      onInput={e => dispatch({ type: "deleteFirstNameImmediately", value: e.target.value })} >
                        <option value="">Select User</option>;
                        {usersList.map(user => {
                          return <option value={user}>{user}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <CSSTransition in={state.deleteFirstName.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                    <div className="alert alert-danger small liveValidateMessage">{state.deleteFirstName.message}</div>
                </CSSTransition>

                <div className="col-md-5">
                  <div className={`form-group row`}>
                    <label className="col-sm-5 form-control-label">Email</label>
                    <div className="col-sm-7 mb-3">
                      <select name="account" className="form-control" onChange={e => emailHandleChange(e.target.value)}
                      onInput={e => dispatch({ type: "deleteEmailImmediately", value: e.target.value })} >
                        <option value="">Select Email</option>;
                        {emailList.map(email => {
                          return <option value={email}>{email}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <CSSTransition in={state.deleteEmail.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                    <div className="alert alert-danger small liveValidateMessage">{state.deleteEmail.message}</div>
                </CSSTransition>

              <div className="col-md-3">
                <button className="btn btn-block btn-primary">Delete User</button>
              </div>
            </form>
          </Page>
        </div>
      </section>
    </LoadingOverlay>
  );
}

export default AdminDeleteUsers;
