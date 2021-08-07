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

function GradeModal({ gradeModal, setGradeModal }) {
  const [loading, setLoading] = useState(false);
  const [categoryAndProgramList, setCategoryAndProgramList] = useState({});
  const [categoryList, setCategoryList] = useState([]);
  const [programList, setProgramList] = useState([]);

  // const [categoryValue, setCategoryValue] = useState("");
  const [programValue, setProgramValue] = useState("");
  const [assignmentValue, setAssignmentValue] = useState("");
  const [gradeValue, setGradeValue] = useState("");
  const [commentValue, setCommentValue] = useState("");

  const [fileList, setFileList] = useState([]);
  const [assignmentNameList, setAssignmentNameList] = useState([]);


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

  const assignmentHandleChange = value => {
    setAssignmentValue(value);
  };

  const categoryHandleChange = value => {
    // setCategoryValue(value);
    setProgramList(categoryAndProgramList[value]);
  };

  const programHandleChange = value => {
    setProgramValue(value);
  };

  const showFiles = async e => {
    e.preventDefault();
    setLoading(true);

    const email = localStorage.getItem("email");

    try {
      const response = await Axios.get(`/displayfiles?Program_Name=${programValue}&email=${email}`);
      setLoading(false);

      if (response.data.success === true && Array.isArray(response.data.data.Assignments)) {
        // setFileList(response.data.data);
        let assignmentName = [];
        response.data.data.Assignments.map(assignment => assignmentName.push(assignment.AssignmentName));
        setAssignmentNameList([...assignmentNameList, ...assignmentName]);
      } else if (response.data.success === false && !Array.isArray(response.data.data.Assignments) && response.data.data.UserProgramStatus === "UnSubscribed") {
        setAssignmentNameList([]);
        swal("UnSubscribed", response.data.message, "warning").then(res => {
          setLoading(true);
          window.location.reload();
        });;
      } else {
        swal("Something went wrong", e.response, "error").then(res => {
          setLoading(true);
          window.location.reload();
        });;
      }
    } catch (e) {
      // if (e.response === null) {
      swal("Something went wrong.", e.response, "error").then(res => {
        setLoading(true);
        window.location.reload();
      });;
      // }
      setLoading(false);
    }
  };

  const addGrade = async e => {
    e.preventDefault();
    // setLoading(true);

    const email = localStorage.getItem("email");

    try {
      const response = await Axios.post("/addgrade", { email: email, Program_Name: programValue, AssignmentName: assignmentValue, usergrade: gradeValue, agentcomments: commentValue });
      // setLoading(false);

      console.log("response.data.success ", response.data.success);

      if (response.data.success === true) {
        swal("Updated", "Program Grade and Agent Comments Updated", "success").then(res => {
          setLoading(true);
          window.location.reload();
        });;
      } else if (response.data.success === false) {
        swal("Couldn't Update", response.data.message, "warning").then(res => {
          setLoading(true);
          window.location.reload();
        });;
      } else {
        swal("Couldn't add or update Grade", response.data.message, "warning").then(res => {
          setLoading(true);
          window.location.reload();
        });;
      }
    } catch (e) {
      // if (e.response === null) {
      swal("Something went wrong.", e.response, "error").then(res => {
        setLoading(true);
        window.location.reload();
      });;
      // }
      // setLoading(false);
    }
  };

  const closeModalForm = () => {
    setGradeModal(false);
  };

  return (
    <LoadingOverlay active={loading} spinner={<Loader type="ThreeDots" color="#00BFFF" height={100} width={100} visible={true} />}>
      <Modal show={gradeModal} onHide={closeModalForm}>
        <Modal.Header closeButton>
          <Modal.Title>Set Grade</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={e => showFiles(e)}>
            <div className="form-row">
              <div className="form-group col-md-12">
                {<select name="account" className="form-control" onChange={e => categoryHandleChange(e.target.value)}>
                  <option>Select Category Name</option>;
                  {categoryList.map(category => {
                    return <option value={category}>{category}</option>;
                  })}
                </select>}
              </div>

              <div className="form-group col-md-12">
                {<select name="account" className="form-control" onChange={e => programHandleChange(e.target.value)}>
                  <option>Select Program Name</option>;
                  {programList.map(program => {
                    return <option value={program}>{program}</option>;
                  })}
                </select>}
              </div>
              <div className="form-group col-md-12">
                {<button className="btn btn-block btn-primary">Show Files</button>}
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <div className="row">
            <div className="col-lg-12">
              {loading ? (
                <Loader type="ThreeDots" color="#00BFFF" height={100} width={100} visible={true} style={{ top: "50%", left: "50%", position: "absolute" }} />
              ) : (
                <form onSubmit={e => addGrade(e)}>
                  <div className="form-row">
                    <div className="form-group col-md-12">
                        <select name="account" className="form-control" onChange={e => assignmentHandleChange(e.target.value)}>
                          <option>Select Assignment Name</option>;
                          {assignmentNameList.map(assignmentName => {
                            return <option value={assignmentName}>{assignmentName}</option>;
                          })}
                        </select>
                    </div>
                    <div className="form-group col-md-12">
                      <FormInput icon="fa fa-list-alt" type="text" placeholder="Enter Grade" changeHandler={e => setGradeValue(e.target.value)} />
                    </div>
                    <div className="form-group col-md-12">
                      <FormInput icon="fa fa-list-alt" type="text" placeholder="Agent Comments" changeHandler={e => setCommentValue(e.target.value)} />
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-md-12">
                      <button className="btn btn-block btn-primary">Submit</button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
          {/* <button className="btn btn-block btn-primary" onClick={e => addGrade(e)}>
            Upload File
          </button> */}
        </Modal.Footer>
      </Modal>
    </LoadingOverlay>
  );
}

export default GradeModal;
