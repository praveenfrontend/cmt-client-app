/* eslint-disable default-case */
import React, { useContext, useState, useEffect, useRef } from "react";
import Axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";
import swal from "sweetalert";
import { useImmerReducer } from "use-immer";
import { useReactToPrint  } from 'react-to-print';

import Page from "../../common/Page";
import FormInput from "../../FormFields/FormInput";
import DispatchContext from "../../../DispatchContext";
import SearchResults from "./SearchResults";
import PrintSearchResults from "./PrintSearchResults";

function Search() {
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState({});
  const [submitCount, setSubmitCount] = useState(0);
  const [hasRegInput, setHasRegInput] = useState(false);
  const [hasEmailInput, setHasEmailInput] = useState(false);
  const [disableStatus, setDisableStatus] = useState(false);
  const appDispatch = useContext(DispatchContext);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  })

  const initialState = {
    registrationId: {
      value: "",
      hasErrors: false,
      message: "",
    },
    email: {
      value: "",
      hasErrors: false,
      message: "",
    },
  }

  function ourReducer(draft, action) {
    switch (action.type) {
      case "emailImmediately":
        draft.email.hasErrors =  false;
        draft.email.value = action.value;
        if(draft.email.value.length >0){
          setHasEmailInput(true);
        }
        if(hasEmailInput) {
          draft.registrationId.hasErrors = false;
          draft.registrationId.message = "";
        }
        return;
      case "emailAfterDelay":
        if (!/^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+\.([a-zA-Z]+)$/.test(draft.email.value)) {
          draft.email.hasErrors = true;
          draft.email.message = "You must provide a valid email address.";
          setHasEmailInput(false);
        }
        if(hasRegInput || draft.email.value.length === 0) {
          draft.email.hasErrors = false;
          draft.email.message = "";
        }
        return;
      case "registrationIdImmediately":
        draft.registrationId.hasErrors = false;
        draft.registrationId.value = action.value;
        if(draft.registrationId.value.length >0){
          setHasRegInput(true);
        }
        if(hasRegInput) {
          draft.email.hasErrors = false;
          draft.email.message = "";
        }
        return;
      case "registrationIdAfterDelay" :
        if (draft.registrationId.value.length !== 8) {
          draft.registrationId.hasErrors = true;
          draft.registrationId.message = "Registration Id must be 8 digits.";
          setHasRegInput(false);
        } 
        if(hasEmailInput || draft.registrationId.value.length === 0) {
          draft.registrationId.hasErrors = false;
          draft.registrationId.message = "";
        }
        return;
      case "submitForm":
        if ( !draft.email.hasErrors && !draft.registrationId.hasErrors) {
          setSubmitCount(1);
        }
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  useEffect(() => {
    if(state.email.hasErrors || state.registrationId.hasErrors || (state.email.value === "" && state.registrationId.value === "") ){
      setDisableStatus(true);
    } else {
      setDisableStatus(false);
    }
  }, [state.email.hasErrors, state.registrationId.hasErrors, state.email.value, state.registrationId.value])

  useEffect(() => {
    if (state.email.value) {
      const delay = setTimeout(() => dispatch({ type: "emailAfterDelay" }), 800);
      return () => clearTimeout(delay);
    }
  }, [dispatch, state.email.value]);

  useEffect(() => {
    if (state.registrationId.value) {
      const delay = setTimeout(() => dispatch({ type: "registrationIdAfterDelay" }), 800);
      return () => clearTimeout(delay);
    }
  }, [dispatch, state.registrationId.value]);

  useEffect(() => {
    let regIdAfterUpdate = "";

    const irfSearch = async () => {
      if (localStorage && localStorage.getItem("regIdAfterUpdate")) {
        regIdAfterUpdate = JSON.parse(localStorage.getItem("regIdAfterUpdate"));
        setLoading(true);
        try {
          const response = await Axios.get(`/irf_search/${regIdAfterUpdate}`);
          if (response.data.success === true) {
            setSearchData(response.data.data);
            appDispatch({ type: "userDetails", value: response.data.data.User_Details });
            appDispatch({ type: "goalDetails", value: response.data.data.GoalDetails });
            appDispatch({ type: "childDetails", value: response.data.data.Child_Details });
            appDispatch({ type: "programDetails", value: response.data.data.Program_Details });
            appDispatch({ type: "healthDetails", value: response.data.data.Health_Details });
            appDispatch({ type: "registrationId", value: response.data.data.User_Details.userId });
            setLoading(false);
          }
        } catch (e) {
          if (e.response === null) {
            swal("Something went wrong.", e.response, "error");
          }
          setLoading(false);
        }
      }
    };

    irfSearch();
  }, [appDispatch]);

  useEffect(() => {
    if(submitCount){
      async function fetchResults() {
        setLoading(true);
        try {
          const searchInput = state.registrationId.value || state.email.value;
          const response = await Axios.get(`/irf_search/${searchInput}`);
          if (response.data.success === true) {
            localStorage.setItem("regIdAfterUpdate", JSON.stringify(searchInput));
            setSearchData(response.data.data);
            appDispatch({ type: "userDetails", value: response.data.data.User_Details });
            appDispatch({ type: "goalDetails", value: response.data.data.GoalDetails });
            appDispatch({ type: "childDetails", value: response.data.data.Child_Details });
            appDispatch({ type: "programDetails", value: response.data.data.Program_Details });
            appDispatch({ type: "healthDetails", value: response.data.data.Health_Details });
            appDispatch({ type: "registrationId", value: response.data.data.User_Details.userId });
            setLoading(false);
          } else {
            swal("Invalid Input", "Incorrect Registration Id or Email Id.", "error");
            setLoading(false);
          }
        } catch (e) {
          if (e.response === null) {
            swal("Something went wrong.", e.response, "error");
          }
          setLoading(false);
        }
      }
      fetchResults();
      document.getElementById("registrationId").value = "";
      document.getElementById("emailId").value = "";
      setSubmitCount(0);
      setHasRegInput(false);
      setHasEmailInput(false);
      dispatch({ type: "emailImmediately", value: "" });
      dispatch({ type: "emailAfterDelay", value: ""});
      dispatch({ type: "registrationIdImmediately", value: ""});
      dispatch({ type: "registrationIdAfterDelay", value: ""});

    }
  }, [submitCount])

  const handleSearch = async e => {
    e.preventDefault();
    localStorage.removeItem("regIdAfterUpdate");
    dispatch({ type: "emailImmediately", value: state.email.value });
    dispatch({ type: "emailAfterDelay", value: state.email.value/* , noRequest: true */ });
    dispatch({ type: "registrationIdImmediately", value: state.registrationId.value });
    dispatch({ type: "registrationIdAfterDelay", value: state.registrationId.value });
    dispatch({ type: "submitForm" });
  };

  // const clearData = () => {
  //   localStorage.removeItem("regIdAfterUpdate");
  //   setSearchData({});
  // };

  const { User_Details, Child_Details, GoalDetails, Program_Details, Health_Details } = searchData;

  const tableHeader = ["S.No", "Label", "Value"];
  const healthDetailsHeader = ["S.No", "Health Question", "Initial Status", "Current Status", "Current Program"];

  let healthDetailsRows = "",
    regId = "";

  if (Object.keys(searchData).length !== 0) {
    regId = User_Details.userId;

    healthDetailsRows = {
      "Overall Health": "No Data Available",
      "Satisfaction with Life": "No Data Available",
      "Social Network of Family and Friends": "No Data Available",
      "Connection with community": "No Data Available"
    };
  }

  return (
    <LoadingOverlay active={loading} spinner={<Loader type="ThreeDots" color="#00BFFF" height={100} width={100} visible={true} />}>
      <section className="forms">
        <div className="container-fluid">
          <Page title="SEARCH">
            <form onSubmit={e => handleSearch(e)}>
              <div className="row">
                <div className="col-md-3">
                  <FormInput icon="fa fa-id-card-o" type="number" placeholder="Search by Registration ID" 
                    changeHandler={e => dispatch({ type: "registrationIdImmediately", value: e.target.value })} 
                    message={state.registrationId.message} 
                    inputField={state.registrationId.hasErrors}    
                    id="registrationId"               
                  />
                </div>
                <div className="col-md-1">
                  <p className="display-6 text-muted mt-2">[OR]</p>
                </div>
                <div className="col-md-4">
                  <FormInput icon="fas fa-envelope" type="text" placeholder="Search by Email ID" 
                    changeHandler={e => dispatch({ type: "emailImmediately", value: e.target.value })} 
                    message={state.email.message} 
                    inputField={state.email.hasErrors}
                    id="emailId"               
                  />
                </div>
                <div className="col-md-2">
                  <button className="btn btn-block btn-primary" disabled={disableStatus} >Search</button>
                </div>
                {/* <div className="col-md-2">
                  <button className="btn btn-block btn-danger" onClick={() => clearData()}>
                    Clear
                  </button>
                </div> */}
              </div>
            </form>
          </Page>

          <SearchResults regId={regId} searchData={searchData} />

          <div style={{ display: "none" }}><PrintSearchResults regId={regId} searchData={searchData} ref={componentRef} /></div>
          
          <div className="row mb-5">
            <div className="col-md-2 m-auto">
              <button className="btn btn-block btn-success" onClick={handlePrint}>Print</button>
            </div>
          </div>
        </div>
      </section>
    </LoadingOverlay>
  );
}

export default Search;
