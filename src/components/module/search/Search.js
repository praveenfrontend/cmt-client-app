import React, { useContext, useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";
import swal from "sweetalert";

import Page from "../../common/Page";
import Container from "../../common/Container";
import FormInput from "../../FormFields/FormInput";
import { Accordion, Card, Row, Col } from "react-bootstrap";
import Table from "../../Table/Table";
import TableRow from "../../Table/TableRow";
import DispatchContext from "../../../DispatchContext";

function Search() {
  const [loading, setLoading] = useState(false);
  const [registrationId, setRegistrationId] = useState();
  const [emailId, setEmailId] = useState();
  const [searchData, setSearchData] = useState({});

  const appDispatch = useContext(DispatchContext);

  const registrationChange = e => {
    setRegistrationId(e.target.value);
  };
  const emailChange = e => {
    setEmailId(e.target.value);
  };

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

  const handleSearch = async e => {
    e.preventDefault();
    localStorage.removeItem("regIdAfterUpdate");
    setLoading(true);

    try {
      const searchInput = registrationId || emailId;
      const response = await Axios.get(`/irf_search/${searchInput}`);
      setLoading(false);

      if (response.data.success === true) {
        localStorage.setItem("regIdAfterUpdate", JSON.stringify(registrationId));
        setSearchData(response.data.data);
        appDispatch({ type: "userDetails", value: response.data.data.User_Details });
        appDispatch({ type: "goalDetails", value: response.data.data.GoalDetails });
        appDispatch({ type: "childDetails", value: response.data.data.Child_Details });
        appDispatch({ type: "programDetails", value: response.data.data.Program_Details });
        appDispatch({ type: "healthDetails", value: response.data.data.Health_Details });
        appDispatch({ type: "registrationId", value: response.data.data.User_Details.userId });
      } else {
        swal("Invalid Input", "Incorrect Registration Id or Email Id.", "error");
      }
    } catch (e) {
      if (e.response === null) {
        swal("Something went wrong.", e.response, "error");
      }
      setLoading(false);
    }
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
                  <FormInput icon="fa fa-id-card-o" type="text" placeholder="Search by Registration ID" changeHandler={e => registrationChange(e)} />
                </div>
                <div className="col-md-1">
                  <p className="display-6 text-muted mt-2">[OR]</p>
                </div>
                <div className="col-md-4">
                  <FormInput icon="fas fa-envelope" type="text" placeholder="Search by Email ID" changeHandler={e => emailChange(e)} />
                </div>
                <div className="col-md-2">
                  <button className="btn btn-block btn-primary">Search</button>
                </div>
                {/* <div className="col-md-2">
                  <button className="btn btn-block btn-danger" onClick={() => clearData()}>
                    Clear
                  </button>
                </div> */}
              </div>
            </form>
          </Page>
          <Container title="Member Details - CMT">
            <Accordion defaultActiveKey="0">
              <div className="card">
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  <Row className="card-header bg-primary">
                    <Col sm={8}>
                      <h5 className="text-white text-left">User Details - {regId}</h5>
                    </Col>
                    <Col sm={4} className="d-flex">
                      <i className="fa fa-edit text-white"></i>
                      <Link to="/editUserDetails">
                        <p className="ml-1 text-white text-left">Edit</p>
                      </Link>
                    </Col>
                  </Row>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="card">
                          <div className="card-body">
                            <div class="table-responsive">
                              <table class="table">
                                <thead>
                                  <tr>
                                    <th>Reg Id</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Address</th>
                                    <th>Email</th>
                                    <th>First Language</th>
                                    <th>Contact Number</th>
                                    <th>Children</th>
                                    <th>Agent Notes</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {Object.keys(searchData).length !== 0 ? (
                                    <tr>
                                      <th scope="row">{User_Details.userId}</th>
                                      <td>{User_Details.firstName}</td>
                                      <td>{User_Details.lastName}</td>
                                      <td>{User_Details.streetAddress !== undefined ? User_Details.streetAddress + ", " + User_Details.city + ", " + User_Details.province + ", " + User_Details.zipCode + ", " + User_Details.country : ""}</td>
                                      <td>{User_Details.email}</td>
                                      <td>{User_Details.firstLang}</td>
                                      <td>{User_Details.phoneCell}</td>
                                      <td>{User_Details.ChildValue}</td>
                                      <td>{User_Details.notes}</td>
                                    </tr>
                                  ) : (
                                    ""
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Accordion.Collapse>
              </div>

              <div className="card">
                <Accordion.Toggle as={Card.Header} eventKey="1">
                  <Row className="card-header bg-primary">
                    <Col sm={8}>
                      <h5 className="text-white text-left">Goal Details - {regId}</h5>
                    </Col>
                    <Col sm={4} className="d-flex">
                      <i className="fa fa-edit text-white"></i>
                      <Link to="/addGoal">
                        <p className="ml-1 text-white text-left">Add</p>
                      </Link>
                    </Col>
                  </Row>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="card">
                          <div className="card-body">
                            <div class="table-responsive">
                              <table class="table">
                                <thead>
                                  <tr>
                                    <th>Sl.No:</th>
                                    <th>Category</th>
                                    <th>Program</th>
                                    <th>Location</th>
                                    <th>Instructor</th>
                                    <th>Status</th>
                                    <th>Rating: Before</th>
                                    <th>Rating: After</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {Object.keys(searchData).length !== 0 && searchData.GoalDetails.length !== 0
                                    ? GoalDetails.map((goal, val) => {
                                        return (
                                          <tr key={val}>
                                            <td>
                                              <Link
                                                to={{
                                                  pathname: "/editGoal",
                                                  state: {
                                                    editGoalDetails: goal
                                                  }
                                                }}
                                                className="d-flex"
                                              >
                                                <i class="fa fa-edit"></i>
                                                <p className="ml-1 text-left">{val + 1}</p>
                                              </Link>
                                            </td>
                                            <td>{goal.user_goal_category_name}</td>
                                            <td>{goal.user_goal_program_name}</td>
                                            <td>{goal.user_goal_program_location}</td>
                                            <td>{goal.user_goal_program_instructor}</td>
                                            <td>{goal.user_goal_program_status}</td>
                                            <td>{goal.user_goal_program_RatingBefore}</td>
                                            <td>{goal.user_goal_program_RatingAfter}</td>
                                            <td>{goal.user_goal_program_startdate}</td>
                                            <td>{goal.user_goal_program_enddate}</td>
                                          </tr>
                                        );
                                      })
                                    : ""}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Accordion.Collapse>
              </div>

              <div className="card">
                <Accordion.Toggle as={Card.Header} eventKey="2">
                  <Row className="card-header bg-primary">
                    <Col sm={8}>
                      <h5 className="text-white text-left">Child Details - {regId}</h5>
                    </Col>
                    <Col sm={4} className="d-flex">
                      <i className="fa fa-edit text-white"></i>
                      <Link to="/addChild">
                        <p className="ml-1 text-white text-left">Add</p>
                      </Link>
                    </Col>
                  </Row>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                  <div className="card-body">
                    <div class="table-responsive">
                      <table class="table">
                        <thead>
                          <tr>
                            <th>Sl.No:</th>
                            <th>Child First Name</th>
                            <th>Child Last Name</th>
                            <th>Date of Birth</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.keys(searchData).length !== 0 && searchData.Child_Details.length !== 0
                            ? Child_Details.map((child, val) => {
                                return (
                                  <tr key={val}>
                                    <td>
                                      <Link
                                        to={{
                                          pathname: "/editChild",
                                          state: {
                                            editChildDetails: child
                                          }
                                        }}
                                        className="d-flex"
                                      >
                                        <i class="fa fa-edit"></i>
                                        <p className="ml-1 text-left">{val + 1}</p>
                                      </Link>
                                    </td>
                                    <td>{child.childFirstname}</td>
                                    <td>{child.childLastname}</td>
                                    <td>{child.childDob}</td>
                                  </tr>
                                );
                              })
                            : ""}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Accordion.Collapse>
              </div>

              <div className="card">
                <Accordion.Toggle as={Card.Header} eventKey="3">
                  <Row className="card-header bg-primary">
                    <Col sm={8}>
                      <h5 className="text-white text-left">Prog Details - {regId}</h5>
                    </Col>
                    <Col sm={4} className="d-flex">
                      <i className="fa fa-edit text-white"></i>
                      <Link
                        to={{
                          pathname: "/editProgram",
                          state: {
                            programDetails: Program_Details
                          }
                        }}
                      >
                        <p className="ml-1 text-white text-left">Edit</p>
                      </Link>
                    </Col>
                  </Row>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="3">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="card">
                          <div className="card-body">
                            <div class="table-responsive">
                              <table class="table">
                                <thead>
                                  <tr>
                                    <th>S.No:</th>
                                    <th>Program Name</th>
                                    <th>Category</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {Object.keys(searchData).length !== 0 && searchData.Program_Details.length !== 0
                                    ? Program_Details.map((program, val) => {
                                        return (
                                          <tr key={val}>
                                            <td>{val + 1}</td>
                                            <td>{program.programName}</td>
                                            <td>{program.category}</td>
                                          </tr>
                                        );
                                      })
                                    : ""}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Accordion.Collapse>
              </div>

              <div className="card">
                <Accordion.Toggle as={Card.Header} eventKey="4">
                  <Row className="card-header bg-primary">
                    <Col sm={8}>
                      <h5 className="text-white text-left">Health Details - {regId}</h5>
                    </Col>
                    <Col sm={4} className="d-flex">
                      <i className="fa fa-edit text-white"></i>
                      <Link to="/updateHealth">
                        <p className="ml-1 text-white text-left">Update</p>
                      </Link>
                    </Col>
                  </Row>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="4">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="card">
                          <div className="card-body">
                            <div class="table-responsive">
                              <table class="table">
                                <thead>
                                  <tr>
                                    <th>S.No:</th>
                                    <th>Health Question</th>
                                    <th>Initial Status</th>
                                    <th>Current Status</th>
                                    <th>Current Program</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {Object.keys(searchData).length !== 0 && searchData.Health_Details.length !== 0 ? (
                                    Health_Details.map(health => {
                                      return (
                                        <React.Fragment>
                                          <tr>
                                            <td>1</td>
                                            <td>Overall Health</td>
                                            <td>{health.myHealth}</td>
                                            <td>{health.myhealth_curr_state === null ? "NA" : health.myhealth_curr_state}</td>
                                            <td>{health.myhealth_curr_prog === null ? "NA" : health.myhealth_curr_prog}</td>
                                          </tr>
                                          <tr>
                                            <td>2</td>
                                            <td>Satisfaction with Life</td>
                                            <td>{health.myLifeSatisfaction}</td>
                                            <td>{health.mylifesatisfaction_curr_state === null ? "NA" : health.mylifesatisfaction_curr_state}</td>
                                            <td>{health.mylifesatisfaction_curr_prog === null ? "NA" : health.mylifesatisfaction_curr_prog}</td>
                                          </tr>
                                          <tr>
                                            <td>3</td>
                                            <td>Social Network of Family and Friends</td>
                                            <td>{health.mySocialNetwork}</td>
                                            <td>{health.mysocialnetwork_curr_state === null ? "NA" : health.mysocialnetwork_curr_state}</td>
                                            <td>{health.mysocialnetwork_curr_prog === null ? "NA" : health.mysocialnetwork_curr_prog}</td>
                                          </tr>
                                          <tr>
                                            <td>4</td>
                                            <td>Connection with community</td>
                                            <td>{health.myCommunityNetwork}</td>
                                            <td>{health.mycommunitynetwork_curr_state === null ? "NA" : health.mycommunitynetwork_curr_state}</td>
                                            <td>{health.mycommunitynetwork_curr_prog === null ? "NA" : health.mycommunitynetwork_curr_prog}</td>
                                          </tr>
                                          <tr>
                                            <td>5</td>
                                            <td>Level of Stress</td>
                                            <td>{health.myStressLevel}</td>
                                            <td>{health.mystresslevel_curr_state === null ? "NA" : health.mystresslevel_curr_state}</td>
                                            <td>{health.mystresslevel_curr_prog === null ? "NA" : health.mystresslevel_curr_prog}</td>
                                          </tr>
                                          <tr>
                                            <td>6</td>
                                            <td>Talk to others about personal health issues</td>
                                            <td>{health.myHealthIssues}</td>
                                            <td>{health.myhealthissues_curr_state === null ? "NA" : health.myhealthissues_curr_state}</td>
                                            <td>{health.myhealthissues_curr_prog === null ? "NA" : health.myhealthissues_curr_prog}</td>
                                          </tr>
                                          <tr>
                                            <td>7</td>
                                            <td>Has a Family Doctor</td>
                                            <td>{health.myFamilyDoctor}</td>
                                            <td>{health.myfamilydoctor_curr_state === null ? "NA" : health.myfamilydoctor_curr_state}</td>
                                            <td>{health.myfamilydoctor_curr_prog === null ? "NA" : health.myfamilydoctor_curr_prog}</td>
                                          </tr>
                                          <tr>
                                            <td>8</td>
                                            <td>Number of visits each year - Family Doctor</td>
                                            <td>{health.myVisitToFamilyDoctor}</td>
                                            <td>{health.myvisittofamilydoctor_curr_state === null ? "NA" : health.myvisittofamilydoctor_curr_state}</td>
                                            <td>{"NA"}</td>
                                          </tr>
                                          <tr>
                                            <td>9</td>
                                            <td>Number of visits each year - Walk In Clinic</td>
                                            <td>{health.myVisitToClinic}</td>
                                            <td>{health.myvisittoclinic_curr_state === null ? "NA" : health.myvisittoclinic_curr_state}</td>
                                            <td>{"NA"}</td>
                                          </tr>
                                          <tr>
                                            <td>10</td>
                                            <td>Number of visits each year - Emergency Room</td>
                                            <td>{health.myVisitToEmergency}</td>
                                            <td>{health.myvisittoemergency_curr_state === null ? "NA" : health.myvisittoemergency_curr_state}</td>
                                            <td>{"NA"}</td>
                                          </tr>
                                          <tr>
                                            <td>11</td>
                                            <td>Number of visits each year - Hospital</td>
                                            <td>{health.myVisitToHospital}</td>
                                            <td>{health.myvisittohospital_curr_state === null ? "NA" : health.myvisittohospital_curr_state}</td>
                                            <td>{"NA"}</td>
                                          </tr>
                                          <tr>
                                            <td>12</td>
                                            <td>Awareness on risk factors for diabetes, cancer and cardiovascular diseases</td>
                                            <td>{health.myDiseaseAwareness}</td>
                                            <td>{health.mydiseaseawareness_curr_state === null ? "NA" : health.mydiseaseawareness_curr_state}</td>
                                            <td>{health.mydiseaseawareness_curr_prog === null ? "NA" : health.mydiseaseawareness_curr_prog}</td>
                                          </tr>
                                          <tr>
                                            <td>13</td>
                                            <td>Awareness on facilities, programs, parks, playgrounds within community for healthy living and physical activity</td>
                                            <td>{health.myCmtProgramAwareness}</td>
                                            <td>{health.mycmtprogramawareness_curr_state === null ? "NA" : health.mycmtprogramawareness_curr_state}</td>
                                            <td>{health.mycmtprogramawareness_curr_prog === null ? "NA" : health.mycmtprogramawareness_curr_prog}</td>
                                          </tr>
                                          <tr>
                                            <td>14</td>
                                            <td>Physical activity</td>
                                            <td>{health.myPhysicalActiveness}</td>
                                            <td>{health.myphysicalactiveness_curr_state === null ? "NA" : health.myphysicalactiveness_curr_state}</td>
                                            <td>{health.myphysicalactiveness_curr_prog === null ? "NA" : health.myphysicalactiveness_curr_prog}</td>
                                          </tr>
                                        </React.Fragment>
                                      );
                                    })
                                  ) : (
                                    <h1>No Data Available</h1>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Accordion.Collapse>
              </div>
            </Accordion>

            <div className="row mt-3">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="agent_notes" className="text-muted"></label>
                  <h2 className="display h4">Authorized CA Signature</h2>
                  <textarea className="form-control col col-md-10" id="" rows="4" placeholder="Authorized CA Signature" maxLength="1000"></textarea>
                </div>
              </div>
            </div>
          </Container>
          <div className="row mb-5">
            <div className="col-md-2 m-auto">
              <button className="btn btn-block btn-success">Print</button>
            </div>
          </div>
        </div>
      </section>
    </LoadingOverlay>
  );
}

export default Search;

// Search ID: 20201046 || 20160007
