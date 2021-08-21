/* eslint-disable default-case */
import React, { useState , useEffect} from "react";
import { Modal } from "react-bootstrap";
import Axios from "axios";
import { useImmerReducer } from "use-immer";

// import LoadingOverlay from "react-loading-overlay";
// import Loader from "react-loader-spinner";
import swal from "sweetalert";
import FormInput from "../../FormFields/FormInput";

import { CSSTransition } from "react-transition-group";

function GradeModal({ gradeModal, gradeModalForm, participantObj, setGradeSuccess }) {

  const [loading, setLoading] = useState(false);
  const [gradeValue, setGradeValue] = useState("");
  const [commentValue, setCommentValue] = useState("");
  const [submitCount, setSubmitCount] = useState(0);

  const initialState = {
    grade: {
      value: "",
      hasErrors: false,
      message: "",
    },
    comments: {
      value: "",
      hasErrors: false,
      message: ""
    },
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "gradeImmediately":
        draft.grade.hasErrors = false;
        draft.grade.value = action.value;
        if (draft.grade.value === "") {
          draft.grade.hasErrors = true;
          draft.grade.message = "Grade cannot be empty.";
          return;
        }
        return;

      case "commentsImmediately":
        draft.comments.hasErrors = false;
        draft.comments.value = action.value;
        if (draft.comments.value === "") {
          draft.comments.hasErrors = true;
          draft.comments.message = "Comments cannot be empty.";
          return;
        }
        return;

      case "submitForm":
        if (!draft.grade.hasErrors && !draft.comments.hasErrors ) {
          setSubmitCount(1);
        }
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  const closeModalForm = () => {
    gradeModalForm({}, false);
  };

  useEffect(() => {
    if (submitCount) {
      async function fetchResults() {
        setLoading(true);

        const email = localStorage.getItem("email");
        try {
          const response = await Axios.post("/addgrade", { email: email, sentfrom: participantObj.Sentfrom, Program_Name: participantObj.Program_Name, AssignmentName: participantObj.AssignmentName, usergrade: gradeValue, agentcomments: commentValue });
          if (response.data.success === true) {
            closeModalForm();
            swal("Updated", "Program Grade and Agent Comments Updated", "success").then(res => {
              setGradeSuccess(true);
              // window.location.reload();
            });;
          } else if (response.data.success === false) {
            closeModalForm();
            swal("Couldn't Update", response.data.message, "warning").then(res => {
              setGradeSuccess(false);
              // window.location.reload();
            });;
          } 
        } catch (e) {
          closeModalForm();
          swal("Something went wrong.", e.response, "error").then(res => {
            setGradeSuccess(true);
          });;
        }
    
      }
      fetchResults();
      setSubmitCount(0);
    }
  }, [closeModalForm, commentValue, dispatch, gradeValue, submitCount]);


  const addGrade = async e => {
    e.preventDefault();

    dispatch({ type: "gradeImmediately", value: state.grade.value });
    dispatch({ type: "commentsImmediately", value: state.comments.value });
    dispatch({ type: "submitForm" });

    
  };

  

  return (
      <Modal show={gradeModal} onHide={closeModalForm}>
        <Modal.Header closeButton>
          <Modal.Title>Set Grade</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-12">
              <form>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <FormInput icon="fa fa-list-alt" type="text" placeholder="Enter Grade" changeHandler={e => setGradeValue(e.target.value)} inputHandler={e => dispatch({ type: "gradeImmediately", value: e.target.value })} message={state.grade.message} inputField={state.grade.hasErrors}   />
                  </div>
                  <div className="form-group col-md-12">
                    <FormInput icon="fa fa-list-alt" type="text" placeholder="Agent Comments" changeHandler={e => setCommentValue(e.target.value)} inputHandler={e => dispatch({ type: "commentsImmediately", value: e.target.value })} message={state.comments.message} inputField={state.comments.hasErrors}  />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
            <button className="btn btn-block btn-primary" onClick={e => addGrade(e)}>Submit</button>
        </Modal.Footer>
      </Modal>
  );
}

export default GradeModal;
