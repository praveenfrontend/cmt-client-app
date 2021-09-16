/* eslint-disable default-case */
import React, { useState, useEffect } from "react";
import {Tooltip, OverlayTrigger} from 'react-bootstrap'
import Axios from "axios";
import { useImmerReducer } from "use-immer";
import swal from "sweetalert";
import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";
import { CSSTransition } from "react-transition-group";

import Page from "../../common/Page";
import Container from "../../common/Container";
import FormInput from "../../FormFields/FormInput";

function AdminAddProgram() {
  const [loading, setLoading] = useState(false);
  const [categoryAndProgramList, setCategoryAndProgramList] = useState({});
  const [categoryList, setCategoryList] = useState([]);
  const [programList, setProgramList] = useState([]);

  const [categoryValue, setCategoryValue] = useState("");
  const [programValueForAdd, setProgramValueForAdd] = useState("");
  const [programValueForDelete, setProgramValueForDelete] = useState("");

  const [submitCountAddPgm, setSubmitCountAddPgm] = useState(0);
  const [submitCountDelPgm, setSubmitCountDelPgm] = useState(0);

  const [categoryDropDownInput, setCategoryDropDownInput] = useState(false);
  const [categoryInputField, setCategoryInputField] = useState(false);

  const initialState = {
    addCategoryName: {
      value: "",
      hasErrors: false,
      message: ""
    },
    addNewCategoryName: {
      value: "",
      hasErrors: false,
      message: ""
    },
    addProgramName: {
      value: "",
      hasErrors: false,
      message: ""
    },
    deleteCategoryName: {
      value: "",
      hasErrors: false,
      message: ""
    },
    deleteProgramName: {
      value: "",
      hasErrors: false,
      message: ""
    },
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "addCategoryNameImmediately":
        draft.addCategoryName.hasErrors = false;
        draft.addCategoryName.value = action.value;
        if(draft.addCategoryName.value !== "") {
          setCategoryDropDownInput(true)
        }
        
        if (draft.addCategoryName.value === "" ) {
          draft.addCategoryName.hasErrors = true;
          draft.addCategoryName.message = "Select or Add New Category.";
          setCategoryDropDownInput(false);
          // return;
        }
        if(categoryInputField || draft.addCategoryName.value !== "") {
          draft.addCategoryName.hasErrors = false;
          draft.addCategoryName.message = "";
        }
        if(categoryDropDownInput){
          draft.addNewCategoryName.hasErrors = false;
          draft.addNewCategoryName.message = "";
        }
        
        return;
      case "addNewCategoryNameImmediately":
          draft.addNewCategoryName.hasErrors = false;
          draft.addNewCategoryName.value = action.value;
          if(draft.addNewCategoryName.value.length > 0) {
            setCategoryInputField(true)
          }
          if (draft.addNewCategoryName.value.length === 0) {
            draft.addNewCategoryName.hasErrors = true;
            draft.addNewCategoryName.message = "Category cannot be empty.";
            setCategoryInputField(false);
            // return;
          }
          if(categoryDropDownInput || draft.addNewCategoryName.value.length !== 0) {
            draft.addNewCategoryName.hasErrors = false;
            draft.addNewCategoryName.message = "";
          }
          if(categoryInputField){
            draft.addCategoryName.hasErrors = false;
            draft.addCategoryName.message = "";
          }
          return;
      case "addProgramNameImmediately":
        draft.addProgramName.hasErrors = false;
        draft.addProgramName.value = action.value;
        if (draft.addProgramName.value.length === 0) {
          draft.addProgramName.hasErrors = true;
          draft.addProgramName.message = "Program cannot be empty.";
          return;
        }
        return;

      case "deleteCategoryNameImmediately":
        draft.deleteCategoryName.hasErrors = false;
        draft.deleteCategoryName.value = action.value;
        if (/\d/.test(draft.deleteCategoryName.value)) {
          draft.deleteCategoryName.hasErrors = true;
          draft.deleteCategoryName.message = "Category cannot contain number.";
          return;
        }
        if (!/^[a-zA-Z]+$/.test(draft.deleteCategoryName.value)) {
          draft.deleteCategoryName.hasErrors = true;
          draft.deleteCategoryName.message = "Select Category.";
          return;
        }
        return;
      case "deleteProgramNameImmediately":
        draft.deleteProgramName.hasErrors = false;
        draft.deleteProgramName.value = action.value;
        if (/\d/.test(draft.deleteProgramName.value)) {
          draft.deleteProgramName.hasErrors = true;
          draft.deleteProgramName.message = "Program cannot contain number.";
          return;
        }
        if (!/^[a-zA-Z]+$/.test(draft.deleteProgramName.value)) {
          draft.deleteProgramName.hasErrors = true;
          draft.deleteProgramName.message = "Select Program.";
          return;
        }
        return;

      case "submitFormAddPgm":
        if (!draft.addCategoryName.hasErrors && !draft.addProgramName.hasErrors ) {
          setSubmitCountAddPgm(1);
        }
        return;

      case "submitFormDelPgm":
        if (!draft.deleteCategoryName.hasErrors && !draft.deleteProgramName.hasErrors ) {
          setSubmitCountDelPgm(1);
        }
        return;
      }
    }

    const [state, dispatch] = useImmerReducer(ourReducer, initialState);


  useEffect(() => {
    const categoryDropDown = async () => {
      setLoading(true);
      await Axios.get("/showprograms")
        .then(response => {
          setCategoryAndProgramList(response.data.data);
          const category = Object.keys(response.data.data);
          setCategoryList([...categoryList, ...category]);
          setLoading(false);
        })
        .catch(error => {
          console.log(error.response);
          setLoading(false);
        });
    };
    categoryDropDown();
  }, []);

  const categoryHandleChange = value => {
    setCategoryValue(value);
  };
  const categoryHandleChangeForDelete = value => {
    setCategoryValue(value);
    setProgramList(categoryAndProgramList[value]);
  };
  const programHandleChangeForAdd = value => {
    setProgramValueForAdd(value);
  };
  const programHandleChangeForDelete = value => {
    setProgramValueForDelete(value);
  };

  useEffect(() => {
    if (submitCountAddPgm) {
      async function fetchResults() {
        setLoading(true);
        try {
          const response = await Axios.post("/add_adpgm", { category: categoryValue, programName: programValueForAdd });
          setLoading(false);
    
          if (response.data.success === true) {
            swal("Program Added", "", "success").then(res => {
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
      setSubmitCountAddPgm(0);
      setCategoryDropDownInput(false);
      setCategoryInputField(false);

    }
  }, [categoryValue, dispatch, programValueForAdd, submitCountAddPgm]);


  const addProgram = async e => {
    e.preventDefault();

    dispatch({ type: "addCategoryNameImmediately", value: state.addCategoryName.value });
    dispatch({ type: "addNewCategoryNameImmediately", value: state.addNewCategoryName.value });
    dispatch({ type: "addProgramNameImmediately", value: state.addProgramName.value });
    dispatch({ type: "submitFormAddPgm" });
  };

  useEffect(() => {
    if (submitCountDelPgm) {
      async function fetchResults() {
        setLoading(true);
        try {
          const response = await Axios.delete("/delete_adpgm", { data: { programName: programValueForDelete } } );
          setLoading(false);
    
          if (response.data.success === true) {
            swal("Program Deleted", "", "success").then(res => {
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
  }, [categoryValue, dispatch, programValueForDelete, submitCountDelPgm]);

  const deleteProgram = async e => {
    e.preventDefault();

    dispatch({ type: "deleteCategoryNameImmediately", value: state.deleteCategoryName.value });
    dispatch({ type: "deleteProgramNameImmediately", value: state.deleteProgramName.value });
    dispatch({ type: "submitFormDelPgm" });
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Category that was added lastly will be choosen.
    </Tooltip>
  );

  return (
    <LoadingOverlay active={loading} spinner={<Loader type="ThreeDots" color="#00BFFF" height={100} width={100} visible={true} />}>
      <section className="forms">
        <div className="container-fluid">
          <Page title="Add a Program">
            <form onSubmit={e => addProgram(e)}>
              <div className="row">
                <div className="col-md-5">
                  <div className={`form-group row`}>
                    <label className="col-sm-5 form-control-label">Choose Category</label>
                    <div className="col-sm-7 mb-3">
                      <select name="account" className="form-control" onChange={e => categoryHandleChange(e.target.value)} 
                      onInput={e => dispatch({ type: "addCategoryNameImmediately", value: e.target.value })}>
                        <option value="">Select Existing</option>;
                        {categoryList.map(category => {
                          return <option value={category}>{category}</option>;
                        })}
                      </select>
                      <CSSTransition in={state.addCategoryName.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                        <div className="alert alert-danger small liveValidateMessage">{state.addCategoryName.message}</div>
                    </CSSTransition>
                    </div>
                    
                  </div>
                </div>
                

                <div className="col-md-1">
                  <p className="display-6 text-muted mt-2">[OR]</p>
                </div>

                <div className="col-md-5">
                  <div className={`form-group row`}>
                    <label className="col-sm-4 form-control-label">Add Category</label>
                    <div className="col-sm-8 mb-3">
                      <FormInput icon="fa fa-list-alt" type="text" placeholder="Add New Category" changeHandler={e => categoryHandleChange(e.target.value)} 
                      inputHandler={e => dispatch({ type: "addNewCategoryNameImmediately", value: e.target.value })} message={state.addNewCategoryName.message} inputField={state.addNewCategoryName.hasErrors}  />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-5">
                  <div className={`form-group row`}>
                    <label className="col-sm-5 form-control-label">Program Name</label>
                    <div className="col-sm-7 mb-3">
                      <FormInput icon="fa fa-list-alt" type="text" placeholder="Add New Program" changeHandler={e => programHandleChangeForAdd(e.target.value)} 
                      inputHandler={e => dispatch({ type: "addProgramNameImmediately", value: e.target.value })} message={state.addProgramName.message} inputField={state.addProgramName.hasErrors} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-2">
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip}
                  style={{
                    backgroundColor: 'rgba(255, 100, 100, 0.85)',
                    padding: '2px 10px',
                    color: 'white',
                    borderRadius: 3,
                    // ...props.style,
                  }}
                  >
                    <button className="btn btn-block btn-primary">Add Program</button>
                  </OverlayTrigger>
                </div>
              </div>
            </form>
          </Page>

          <Page title="Delete a Program">
            <form onSubmit={e => deleteProgram(e)}>
              <div className="row">
                <div className="col-md-5">
                  <div className={`form-group row`}>
                    <label className="col-sm-5 form-control-label">Category Name</label>
                    <div className="col-sm-7 mb-3">
                      <select name="account" className="form-control" onChange={e => categoryHandleChangeForDelete(e.target.value)}
                      onInput={e => dispatch({ type: "deleteCategoryNameImmediately", value: e.target.value })} >
                        <option value="">Select Category</option>;
                        {categoryList.map(category => {
                          return <option value={category}>{category}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <CSSTransition in={state.deleteCategoryName.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                    <div className="alert alert-danger small liveValidateMessage">{state.deleteCategoryName.message}</div>
                </CSSTransition>

                <div className="col-md-5">
                  <div className={`form-group row`}>
                    <label className="col-sm-5 form-control-label">Program Name</label>
                    <div className="col-sm-7 mb-3">
                      <select name="account" className="form-control" onChange={e => programHandleChangeForDelete(e.target.value)}
                      onInput={e => dispatch({ type: "deleteProgramNameImmediately", value: e.target.value })} >
                        <option value="">Select Program</option>;
                        {programList.map(program => {
                          return <option value={program}>{program}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <CSSTransition in={state.deleteProgramName.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                    <div className="alert alert-danger small liveValidateMessage">{state.deleteProgramName.message}</div>
                </CSSTransition>
              </div>

              <div className="col-md-3">
                <button className="btn btn-block btn-primary">Delete Program</button>
              </div>
            </form>
          </Page>
        </div>
      </section>
    </LoadingOverlay>
  );
}

export default AdminAddProgram;
