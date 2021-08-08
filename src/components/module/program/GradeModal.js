/* eslint-disable default-case */
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Axios from "axios";
import { useImmerReducer } from "use-immer";

// import LoadingOverlay from "react-loading-overlay";
// import Loader from "react-loader-spinner";
import swal from "sweetalert";
import FormInput from "../../FormFields/FormInput";

import { CSSTransition } from "react-transition-group";

function GradeModal({ gradeModal, gradeModalForm, participantObj, setGradeSuccess }) {

  const [gradeValue, setGradeValue] = useState("");
  const [commentValue, setCommentValue] = useState("");

  const addGrade = async e => {
    e.preventDefault();

    const email = localStorage.getItem("email");
    try {
      const response = await Axios.post("/addgrade", { email: email, sentfrom: participantObj.Sentfrom, Program_Name: participantObj.Program_Name, AssignmentName: participantObj.AssignmentName, usergrade: gradeValue, agentcomments: commentValue });
      if (response.data.success === true) {
        closeModalForm();
        swal("Updated", "Program Grade and Agent Comments Updated", "success").then(res => {
          setGradeSuccess(true);
        });;
      } else if (response.data.success === false) {
        closeModalForm();
        swal("Couldn't Update", response.data.message, "warning").then(res => {
          setGradeSuccess(false);
        });;
      } 
    } catch (e) {
      closeModalForm();
      swal("Something went wrong.", e.response, "error").then(res => {
        setGradeSuccess(true);
      });;
    }
  };

  const closeModalForm = () => {
    gradeModalForm({}, false);
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
                    <FormInput icon="fa fa-list-alt" type="text" placeholder="Enter Grade" changeHandler={e => setGradeValue(e.target.value)} />
                  </div>
                  <div className="form-group col-md-12">
                    <FormInput icon="fa fa-list-alt" type="text" placeholder="Agent Comments" changeHandler={e => setCommentValue(e.target.value)} />
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
