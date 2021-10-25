/* eslint-disable default-case */
import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Axios from "axios";
import { useImmerReducer } from "use-immer";

import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";
import swal from "sweetalert";
import FormInput from "../../FormFields/FormInput";

import { CSSTransition } from "react-transition-group";

function UploadModal({ uploadModal, setUploadModal }) {
  const [loading, setLoading] = useState(false);
  const [categoryAndProgramList, setCategoryAndProgramList] = useState({});
  const [categoryList, setCategoryList] = useState([]);
  const [programList, setProgramList] = useState([]);
  const [programValue, setProgramValue] = useState("");
  const [fileValue, setFileValue] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [selectedFileName, setSelectedFileName] = useState("");
  const [submitCount, setSubmitCount] = useState(0);

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
          setLoading(false);
        });
    };
    categoryDropDown();
  }, []);

  const fileHandleChange = value => {
    setFileValue(value);
  };

  const categoryHandleChange = value => {
    // setCategoryValue(value);
    if( value === "") {
      setProgramList([]);
      setProgramValue("");
    } else {
      setProgramList(categoryAndProgramList[value]);
      setProgramValue("");
    }
  };

  const programHandleChange = value => {
    setProgramValue(value);
  };

  const fileHandler = e => {
    setSelectedFile(e.target.files[0]);
    const fileName = e.target.files[0].name;
    setSelectedFileName(fileName);
    document.getElementsByClassName("custom-file-label").innerHTML = fileName;
  };

  const initialState = {
    assignmentName: {
      value: "",
      hasErrors: false,
      message: "",
    },
    category: {
      value: "",
      hasErrors: false,
      message: ""
    },
    programName: {
      value: "",
      hasErrors: false,
      message: ""
    },
    chooseFile: {
      value: "",
      hasErrors: false,
      message: ""
    }
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "assignmentNameImmediately":
        draft.assignmentName.hasErrors = false;
        draft.assignmentName.value = action.value;
        if (draft.assignmentName.value === "") {
          draft.assignmentName.hasErrors = true;
          draft.assignmentName.message = "Assignment Name cannot be empty.";
          return;
        }
        return;
      case "categoryImmediately":
        draft.category.hasErrors = false;
        draft.category.value = action.value;
        if (draft.category.value === "") {
          draft.category.hasErrors = true;
          draft.category.message = "Category Name cannot be empty.";
          return;
        }
        return;
      case "programNameImmediately":
        draft.programName.hasErrors = false;
        draft.programName.value = action.value;
        if (draft.programName.value === "") {
          draft.programName.hasErrors = true;
          draft.programName.message = "Program Name cannot be empty.";
          return;
        }
        return;
      case "chooseFileImmediately":
        draft.chooseFile.hasErrors = false;
        draft.chooseFile.value = action.value;
        if (draft.chooseFile.value === "") {
          draft.chooseFile.hasErrors = true;
          draft.chooseFile.message = "Please choose a file.";
          return;
        }
        return;

      case "submitForm":
        if (!draft.assignmentName.hasErrors && !draft.category.hasErrors && !draft.programName.hasErrors && !draft.chooseFile.hasErrors ) {
          setSubmitCount(1);
        }
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  const closeModalForm = () => {
    setUploadModal(false);
  };

  useEffect(() => {
    if (submitCount) {
      async function fetchResults() {
        setLoading(true);

        const email = localStorage.getItem("email");
        const role = localStorage.getItem("roleType");

        const formData = new FormData();
        formData.append("Program_Name", programValue);
        formData.append("document", selectedFile);
        formData.append("AssignmentName", fileValue);
        formData.append("email", email);
        formData.append("role", role);

        try {
          const response = await Axios.post("/upload", formData);

          if (response.data.success === true) {
            setLoading(false);
            closeModalForm();
            swal(`File Uploaded.`, "", "success").then(res => {
              setLoading(true);
              window.location.reload();
            });
          } else {
            setLoading(false);
            closeModalForm();
            swal("Something went wrong", response.data.message, "error").then(res => {
              setLoading(true);
              window.location.reload();
            });
          } 
        } catch (e) {
          setLoading(false);
          closeModalForm();
          swal("Something went wrong", e.response, "error").then(res => {
            setLoading(true);
            window.location.reload();
          });
        }
    
      }
      fetchResults();
      setSubmitCount(0);
    }
  }, [closeModalForm, dispatch, fileValue, programValue, selectedFile, submitCount]);

  const uploadFile = async e => {
    e.preventDefault();

    dispatch({ type: "categoryImmediately", value: state.category.value });
    dispatch({ type: "programNameImmediately", value: state.programName.value });
    dispatch({ type: "assignmentNameImmediately", value: state.assignmentName.value });
    dispatch({ type: "chooseFileImmediately", value: selectedFileName });
    dispatch({ type: "submitForm" });
    
  };

  return (
    <LoadingOverlay active={loading} spinner={<Loader type="ThreeDots" color="#00BFFF" height={100} width={100} visible={true} />}>
      <Modal show={uploadModal} onHide={closeModalForm}>
        <Modal.Header closeButton>
          <Modal.Title>Upload File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div class="form-row">
              <div class="form-group col-md-12">
                <select name="account" className="form-control" onChange={e => categoryHandleChange(e.target.value)} onInput={e => dispatch({ type: "categoryImmediately", value: e.target.value })}>
                  <option value="">Select Category Name</option>;
                  {categoryList.map(category => {
                    return <option value={category}>{category}</option>;
                  })}
                </select>
              </div>
              <CSSTransition in={state.category.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                  <div className="alert alert-danger small liveValidateMessage">{state.category.message}</div>
              </CSSTransition>

              <div class="form-group col-md-12">
                <select name="account" className="form-control" onChange={e => programHandleChange(e.target.value)}  onInput={e => dispatch({ type: "programNameImmediately", value: e.target.value })}>
                  <option value="">Select Program Name</option>;
                  {programList.map(program => {
                    return <option value={program}>{program}</option>;
                  })}
                </select>
              </div>
              <CSSTransition in={state.programName.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                  <div className="alert alert-danger small liveValidateMessage">{state.programName.message}</div>
              </CSSTransition>

              <div class="form-group col-md-12">
                <FormInput icon="fa fa-list-alt" type="text" placeholder="Assignment Name" changeHandler={e => fileHandleChange(e.target.value)} inputHandler={e => dispatch({ type: "assignmentNameImmediately", value: e.target.value })} message={state.assignmentName.message} inputField={state.assignmentName.hasErrors}  />
              </div>

              <div class="form-group col-md-12">
                <div className="custom-file">
                  <input type="file" name="file" className="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" onChange={e => fileHandler(e)} onInput={e => dispatch({ type: "chooseFileImmediately", value: e.target.value })} />
                  <label className="custom-file-label" for="inputGroupFile01">
                    {selectedFileName ? selectedFileName : "Choose file"}
                  </label>
                </div>
                <CSSTransition in={state.chooseFile.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                  <div className="alert alert-danger small liveValidateMessage">{state.chooseFile.message}</div>
              </CSSTransition>
              </div>

            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-block btn-primary" onClick={e => uploadFile(e)} >
            Upload File
          </button>
        </Modal.Footer>
      </Modal>
    </LoadingOverlay>
  );
}

export default UploadModal;
