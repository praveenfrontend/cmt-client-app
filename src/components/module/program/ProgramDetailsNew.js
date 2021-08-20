import React, { useState, useEffect } from "react";
import Axios from "axios";
import swal from "sweetalert";
import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";

import Page from "../../common/Page";
import Container from "../../common/Container";
import UploadModal from "./UploadModal";
import GradeModal from "./GradeModal";

function ProgramDetailsNew() {
  const [loading, setLoading] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [gradeModal, setGradeModal] = useState(false);
  const [role, SetRole] = useState("");
  const [gradeSuccess, setGradeSuccess] = useState(false);
  
  const [categoryAndProgramList, setCategoryAndProgramList] = useState({});
  const [categoryList, setCategoryList] = useState([]);
  const [programList, setProgramList] = useState([]);

  const [categoryValue, setCategoryValue] = useState("");
  const [programValue, setProgramValue] = useState("");

  const [assignmentsList, setAssignmentsList] = useState([]);
  const [filesList, setFilesList] = useState([]);
  const [participantList, setParticipantList] = useState([]);

  const [ participantObj, setParticipantObj] = useState({});

  const [subscribe, setSubscribe] = useState(false);
  const [unsubscribe, setUnSubscribe] = useState(false);

  useEffect(() => {

    const roleType = localStorage.getItem("roleType");
    SetRole(roleType);

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

  const categoryHandleChange = value => {
    setCategoryValue(value);
    setProgramList(categoryAndProgramList[value]);
  };

  const programHandleChange = value => {
    setProgramValue(value);
  };

  async function displayAssignments() {
    setLoading(true);

    const email = localStorage.getItem("email");
    const irfUserID = localStorage.getItem("irfUserID");

    try {
      const response = await Axios.get(`/displayfiles?Program_Name=${programValue}&email=${email}`);
      setLoading(false);

      if (response.data.success === true) {
        setAssignmentsList(response.data.data.Assignments);
        // eslint-disable-next-line no-unused-expressions
        response.data.data.MyFiles !== undefined ? setFilesList(response.data.data.MyFiles) : "";
        // eslint-disable-next-line no-unused-expressions
        response.data.data.ParticipantFiles !== undefined ? setParticipantList(response.data.data.ParticipantFiles) : "";

        if (response.data.data.UserProgramStatus === "Subscribed") {
          setSubscribe(false);
          setUnSubscribe(true);
        }
      } else {
        if (response.data.success === false && response.data.data.UserProgramStatus === "Subscribed") {
          setAssignmentsList([]);
          setFilesList([]);
          setParticipantList([]);
          setSubscribe(false);
          setUnSubscribe(true);
        }
        if (response.data.success === false && response.data.data.UserProgramStatus === "UnSubscribed") {
          setAssignmentsList([]);
          setFilesList([]);
          setParticipantList([]);
          irfUserID !== "null" && setSubscribe(true);
          setUnSubscribe(false);
        }

        if(irfUserID === "null"){
          swal("Please inform Agent to complete IRF registration.", "", "warning");
        } else {
          swal(response.data.data.UserProgramStatus, response.data.message, "warning");
        }


      }
    } catch (e) {
        swal("Something went wrong.", e.response, "error");
      setLoading(false);
    }

  } 

  const showAssignments = e => {
    e.preventDefault();
    displayAssignments();
  };

  // useEffect(() => {

  //   function loadAssignments() {
  //     displayAssignments();
  //     setGradeSuccess(false);
  //   };
  //   loadAssignments();

  // }, [gradeSuccess]);

  const subscribeProgram = async e => {
    e.preventDefault();
    setLoading(true);

    const irfUserID = localStorage.getItem("irfUserID");

    try {
      const response = await Axios.post("/subcribeprogram", { Program_Name: programValue, userID: irfUserID, category: categoryValue });
      setLoading(false);

      if (response.data.success === true) {
        swal(response.data.message, "", "success");
        setSubscribe(false);
        setUnSubscribe(true);
      } else {
        swal(response.data.message, "", "warning");
        setSubscribe(false);
        setUnSubscribe(true);
      }
    } catch (e) {
      // if (e.response === null) {
      swal("Something went wrong.", e.response, "error");
      // }
      setLoading(false);
    }
  };

  const unSubscribeProgram = async e => {
    e.preventDefault();
    setLoading(true);

    const irfUserID = localStorage.getItem("irfUserID");

    try {
      const response = await Axios.post("/unsubscribeprogram", { Program_Name: programValue, userID: irfUserID, category: categoryValue });
      setLoading(false);

      if (response.data.success === true) {
        swal(response.data.message, "", "success");
        setSubscribe(true);
        setUnSubscribe(false);
      } else {
        swal(response.data.message, "", "warning");
        setSubscribe(true);
        setUnSubscribe(false);
      }
    } catch (e) {
      // if (e.response === null) {
      swal("Something went wrong.", e.response, "error");
      // }
      setLoading(false);
    }
  };

  const uploadModalForm = () => {
    setUploadModal(true);
  }

  const gradeModalForm = (participant, value) => {
    setParticipantObj(participant);
    setGradeModal(value);
  }

  return (
    <LoadingOverlay active={loading} spinner={<Loader type="ThreeDots" color="#00BFFF" height={100} width={100} visible={true} />}>
      <section className="forms">
        <div className="container-fluid">
          <Page title="Program">
            <form>
              <div className="row">
                <div className="col-md-5">
                  <div className={`form-group row`}>
                    <label className="col-sm-5 form-control-label">Category Name</label>
                    <div className="col-sm-7 mb-3">
                      <select name="account" className="form-control" onChange={e => categoryHandleChange(e.target.value)}>
                        <option>Select Category</option>;
                        {categoryList.map(category => {
                          return <option value={category}>{category}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="col-md-5">
                  <div className={`form-group row`}>
                    <label className="col-sm-5 form-control-label">Program Name</label>
                    <div className="col-sm-7 mb-3">
                      <select name="account" className="form-control" onChange={e => programHandleChange(e.target.value)}>
                        <option>Select Program</option>;
                        {programList.map(program => {
                          return <option value={program}>{program}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-3">
                  <button className="btn btn-block btn-primary" onClick={e => showAssignments(e)}>
                    Show Assignments
                  </button>
                </div>
                {subscribe && (
                  <div className="col-md-3">
                    <button className="btn btn-block btn-primary" onClick={e => subscribeProgram(e)}>
                      Subscribe Program
                    </button>
                  </div>
                )}
                {unsubscribe && (
                  <div className="col-md-3">
                    <button className="btn btn-block btn-primary" onClick={e => unSubscribeProgram(e)}>
                      UnSubscribe Program
                    </button>
                  </div>
                )}
              </div>
            </form>
          </Page>
          <Container title="Assignments" upload={role === "Participant" ? false: true}  clickHandler={uploadModalForm}>
            <div className="row">
              <div className="col-lg-12">
                {loading ? (
                  <Loader type="ThreeDots" color="#00BFFF" height={100} width={100} visible={true} style={{ top: "50%", left: "50%", position: "absolute" }} />
                ) : (
                  <div className="card">
                    <div className="card-body">
                      <div class="table-responsive">
                        <table class="table" id="table-to-xls">
                          <thead>
                            <tr>
                              <th>Program Name</th>
                              <th>Agent Name</th>
                              <th>Assignment Name</th>
                              <th>File</th>
                            </tr>
                          </thead>
                          <tbody>
                            {assignmentsList.length !== 0
                              ? assignmentsList.map((assignments, val) => {
                                  return (
                                    <tr key={val}>
                                      <td>{assignments.Program_Name}</td>
                                      <td>{assignments.Sentfrom}</td>
                                      <td>{assignments.AssignmentName}</td>
                                      <td>
                                        <a target="_blank" rel="noreferrer" href={assignments.File_Loc}>
                                          Download
                                        </a>
                                      </td>
                                      <td>{assignments.usergrade}</td>
                                      <td>{assignments.agentcomments}</td>
                                    </tr>
                                  );
                                })
                              : ""}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {assignmentsList.length === 0 && <h1 className="m-auto text-muted">No Data Available</h1>}
                  </div>
                )}
              </div>
            </div>
          </Container>
          <Container title={role === "Participant" ? 'My Files' : 'Participant Files' } upload={role === "Participant" ? true : false} clickHandler={role === "Participant" ? uploadModalForm : ""}>
            <div className="row">
              <div className="col-lg-12">
                {loading ? (
                  <Loader type="ThreeDots" color="#00BFFF" height={100} width={100} visible={true} style={{ top: "50%", left: "50%", position: "absolute" }} />
                ) : (
                  <div className="card">
                    <div className="card-body">
                      <div class="table-responsive">
                        <table class="table" id="table-to-xls">
                          <thead>
                            <tr>
                              <th>Program Name</th>
                              <th>{role === "Participant" ? 'Agent Name' : 'Participant Name'}</th>
                              <th>Assignment Name</th>
                              <th>Grade</th>
                              <th>Agent Comments</th>
                              <th>File</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              ( filesList !== undefined && filesList.length !== 0 )
                              ? filesList.map((file, val) => {
                                  return (
                                    <tr key={val}>
                                      <td>{file.Program_Name}</td>
                                      <td>{file.UpdatedAgent}</td>
                                      <td>{file.AssignmentName}</td>
                                      <td>{file.usergrade}</td>
                                      <td>{file.agentcomments}</td>
                                      <td>
                                        <a target="_blank" rel="noreferrer" href={file.File_Loc}>
                                          Download
                                        </a>
                                      </td>                                          
                                    </tr>
                                  );
                                }) : ""
                            }
                            {
                              
                              ( participantList !== undefined && participantList.length !== 0 )
                              ? participantList.map((participant, val) => {
                                  return (
                                    <tr key={val}>
                                      <td>{participant.Program_Name}</td>
                                      <td>{participant.Sentfrom}</td>
                                      <td>{participant.AssignmentName}</td>
                                      <td>
                                        {participant.usergrade} &nbsp;
                                        <Link onClick={e => gradeModalForm(participant, true)} ><i className="fa fa-edit"></i></Link>
                                      </td>
                                      <td>{participant.agentcomments}</td>
                                      <td>
                                        <a target="_blank" rel="noreferrer" href={participant.File_Loc}>
                                          Download
                                        </a>
                                      </td>                                          
                                    </tr>
                                  );
                                }) : ""
                            }
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {role === "Participant" ?  filesList.length === 0 && <h1 className="m-auto text-muted">No Data Available</h1> : participantList.length === 0 && <h1 className="m-auto text-muted">No Data Available</h1>}
                  </div>
                )}
              </div>
            </div>
          </Container>
          <UploadModal uploadModal={uploadModal} setUploadModal={setUploadModal}/>
          <GradeModal gradeModal={gradeModal} gradeModalForm={gradeModalForm} participantObj={participantObj} setGradeSuccess={setGradeSuccess}/>
        </div>
      </section>
    </LoadingOverlay>
  );
}

export default ProgramDetailsNew;
