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

  const fileHandleChange = value => {
    setFileValue(value);
  };

  const categoryHandleChange = value => {
    // setCategoryValue(value);
    setProgramList(categoryAndProgramList[value]);
  };

  const programHandleChange = value => {
    setProgramValue(value);
  };

  const fileHandler = e => {
    setSelectedFile(e.target.files[0]);
    console.warn("fileeee ", e.target.files[0]);
    const fileName = e.target.files[0].name;
    setSelectedFileName(fileName);
    document.getElementsByClassName("custom-file-label").innerHTML = fileName;
  };



  /* const [submitCount, setSubmitCount] = useState(0);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");

  const initialState = {
    title: {
      value: "",
      hasErrors: false,
      message: "",
    },
    programName: {
      value: "",
      hasErrors: false,
      message: ""
    },
    startDate: {
      value: "",
      hasErrors: false,
      message: ""
    },
    endDate: {
      value: "",
      hasErrors: false,
      message: ""
    },
    startTime: {
      value: "",
      hasErrors: false,
      message: ""
    },
    endTime: {
      value: "",
      hasErrors: false,
      message: ""
    },
    instructorName: {
      value: "",
      hasErrors: false,
      message: ""
    },
    location: {
      value: "",
      hasErrors: false,
      message: ""
    }
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "titleImmediately":
        draft.title.hasErrors = false;
        draft.title.value = action.value;
        if (/\d/.test(draft.title.value)) {
          draft.title.hasErrors = true;
          draft.title.message = "Title cannot contain number.";
          return;
        }
        if (!/^[a-zA-Z]+$/.test(draft.title.value)) {
          draft.title.hasErrors = true;
          draft.title.message = "Title cannot be empty.";
          return;
        }
        return;
      case "programNameImmediately":
        draft.programName.hasErrors = false;
        draft.programName.value = action.value;
        if (/\d/.test(draft.programName.value)) {
          draft.programName.hasErrors = true;
          draft.programName.message = "Program Name cannot contain number.";
          return;
        }
        if (!/^[a-zA-Z]+$/.test(draft.programName.value)) {
          draft.programName.hasErrors = true;
          draft.programName.message = "Program Name cannot be empty.";
          return;
        }
        return;
      case "startDateImmediately":
        draft.startDate.hasErrors = false;
        draft.startDate.value = action.value;
        if (draft.startDate.value.length === 0) {
          draft.startDate.hasErrors = true;
          draft.startDate.message = "Start Date cannot be empty.";
          return;
        }
        setStartDate( draft.startDate.value)
        return;
      case "endDateImmediately":
        draft.endDate.hasErrors = false;
        draft.endDate.value = action.value;
        if (draft.endDate.value.length === 0) {
          draft.endDate.hasErrors = true;
          draft.endDate.message = "End Date cannot be empty.";
          return;
        }
        setEndDate( draft.endDate.value);
        return;

      case "startTimeImmediately":
        draft.startTime.hasErrors = false;
        draft.startTime.value = action.value;
        if (draft.startTime.value === "") {
          draft.startTime.hasErrors = true;
          draft.startTime.message = "Start time cannot be empty.";
        }
        return;
      case "endTimeImmediately":
          draft.endTime.hasErrors = false;
          draft.endTime.value = action.value;
          if (draft.endTime.value === "") {
            draft.endTime.hasErrors = true;
            draft.endTime.message = "End time cannot be empty.";
          }
          return;

      
      case "instructorImmediately":
        draft.instructorName.hasErrors = false;
        draft.instructorName.value = action.value;
        if (/\d/.test(draft.instructorName.value)) {
          draft.instructorName.hasErrors = true;
          draft.instructorName.message = "Instructor cannot contain number.";
          return;
        }
        if (!/^[a-zA-Z]+$/.test(draft.instructorName.value)) {
          draft.instructorName.hasErrors = true;
          draft.instructorName.message = "Instructor cannot be empty.";
          return;
        }
        return;
      case "locationImmediately":
          draft.location.hasErrors = false;
          draft.location.value = action.value;
          if (/\d/.test(draft.location.value)) {
            draft.location.hasErrors = true;
            draft.location.message = "Location cannot contain number.";
            return;
          }
          if (!/^[a-zA-Z]+$/.test(draft.location.value)) {
            draft.location.hasErrors = true;
            draft.location.message = "Location cannot be empty.";
            return;
          }
          return;

      case "submitForm":
        if (!draft.title.hasErrors && !draft.programName.hasErrors && !draft.startDate.hasErrors && !draft.endDate.hasErrors && !draft.startTime.hasErrors && !draft.endTime.hasErrors && !draft.instructorName.hasErrors && !draft.location.hasErrors ) {
          setSubmitCount(1);
        }
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState); */

  const closeModalForm = () => {
    setUploadModal(false);
  };

  /* useEffect(() => {
    if (submitCount) {
      async function fetchResults() {
        setLoading(true);
        try {
          const response = await Axios.post("/add_schedule", { UserID, Title, ProgramName, StartDate, EndDate, StartTime, EndTime, Instructor, Location });
    
          if (response.data.id !== "" || response.data.id !== null) {
            setLoading(false);
            closeModalForm();
            swal(`Schedule Created.`, "Program will be added to the calendar.", "success").then(res => {
              setLoading(true);
              window.location.reload();
            });
          }
        } catch (e) {
          swal("Something went wrong", e.response.error, "error");
          setLoading(false);
        }
      }
      fetchResults();
      setSubmitCount(0);
    }
  }, [EndDate, EndTime, Instructor, Location, ProgramName, StartDate, StartTime, Title, UserID, closeModalForm, dispatch, submitCount]);

 */

  const uploadFile = async e => {
    e.preventDefault();
    setLoading(true);

    // const irfUserID = localStorage.getItem("irfUserID");
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
      } else if (response.data.success === false) {
        setLoading(false);
        closeModalForm();
        swal("Something went wrong", response.data.message, "warning").then(res => {
          setLoading(true);
          window.location.reload();
        });
      } else {
        setLoading(false);
        closeModalForm();
        swal("Something went wrong", e.response, "error").then(res => {
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
                <select name="account" className="form-control" onChange={e => categoryHandleChange(e.target.value)}>
                  <option>Select Category Name</option>;
                  {categoryList.map(category => {
                    return <option value={category}>{category}</option>;
                  })}
                </select>
              </div>

              <div class="form-group col-md-12">
                <select name="account" className="form-control" onChange={e => programHandleChange(e.target.value)}>
                  <option>Select Program Name</option>;
                  {programList.map(program => {
                    return <option value={program}>{program}</option>;
                  })}
                </select>
              </div>

              <div class="form-group col-md-12">
                <FormInput icon="fa fa-list-alt" type="text" placeholder="Assignment Name" changeHandler={e => fileHandleChange(e.target.value)} />
              </div>

              <div class="form-group col-md-12">
                {/* <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroupFileAddon01">
                    Upload
                  </span>
                </div> */}
                <div className="custom-file">
                  <input type="file" name="file" className="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" onChange={e => fileHandler(e)} />
                  <label className="custom-file-label" for="inputGroupFile01">
                    {selectedFileName ? selectedFileName : "Choose file"}
                  </label>
                </div>
              </div>

            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-block btn-primary" onClick={e => uploadFile(e)}>
            Upload File
          </button>
        </Modal.Footer>
      </Modal>
    </LoadingOverlay>
  );
}

export default UploadModal;
