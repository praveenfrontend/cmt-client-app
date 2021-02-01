import React, { useContext, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";

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

  const handleSearch = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const searchInput = registrationId || emailId;
      const response = await Axios.get(`/irf_search/${searchInput}`);
      setLoading(false);
      console.log(response.data);

      if (response.data.success === true) {
        setSearchData(response.data.data);
        appDispatch({ type: "userDetails", value: response.data.data.User_Details });
      } else {
        alert("Incorrect Registration Id or Email Id.");
      }
    } catch (e) {
      if (e.response === null) {
        alert("Something went wrong.");
      }
      setLoading(false);
    }
  };

  const { User_Details, Child_Details, GoalDetails, Program_Details, Health_Details } = searchData;

  const tableHeader = ["S.No", "Label", "Value"];
  const childProgramHeader = ["S.No", "Child First Name", "Child Last Name", "Child DoB"];
  const programDetailsHeader = ["S.No", "Category", "Program Name"];
  const healthDetailsHeader = ["S.No", "Health Question", "Initial Status", "Current Status", "Current Program"];

  let userDetailsRows = "",
    goalDetailsRows = "",
    programDetailsRows = "",
    healthDetailsRows = "",
    regId = "";

  if (Object.keys(searchData).length !== 0) {
    regId = registrationId;

    userDetailsRows = {
      "Reg Id": regId,
      "First Name": User_Details.firstName,
      "Last Name": User_Details.lastName,
      Address: User_Details.streetAddress !== undefined ? User_Details.streetAddress + ", " + User_Details.city + ", " + User_Details.province + ", " + User_Details.zipCode + ", " + User_Details.country : "",
      Email: User_Details.email,
      "First Language": User_Details.firstLang,
      "Contact Number": User_Details.phoneCell,
      Children: User_Details.ChildValue,
      "Agent Notes": User_Details.notes
    };

    goalDetailsRows = {
      Category: "No Data Available",
      Program: "No Data Available",
      Location: "No Data Available",
      Instructor: "No Data Available",
      Status: "No Data Available",
      "Rating: Before": "No Data Available",
      "Rating: After": "No Data Available",
      "Start Date": "No Data Available",
      "End Date": "No Data Available"
    };

    programDetailsRows = {
      "After School": "No Data Available",
      Health: "No Data Available",
      Employment: "No Data Available",
      Staff: "No Data Available"
    };

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
                <div className="col-md-4">
                  <FormInput icon="fa fa-id-card-o" type="text" placeholder="Search by Registration ID" changeHandler={e => registrationChange(e)} />
                </div>
                <div className="col-md-1">
                  <p className="display-6 text-muted mt-2">[ OR ]</p>
                </div>
                <div className="col-md-4">
                  <FormInput icon="fas fa-envelope" type="text" placeholder="Search by Email ID" changeHandler={e => emailChange(e)} />
                </div>
                <div className="col-md-2">
                  <button className="btn btn-block btn-primary">Search</button>
                </div>
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
                      <i className="fa fa-edit"></i>
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
                            <Table tableHeader={tableHeader}>
                              <TableRow rows={userDetailsRows} />
                            </Table>
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
                      <i className="fa fa-edit"></i>
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
                            <Table tableHeader={tableHeader}>
                              <TableRow rows={goalDetailsRows} />
                            </Table>
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
                      <i className="fa fa-edit"></i>
                      <Link to="/addGoal">
                        <p className="ml-1 text-white text-left">Edit</p>
                      </Link>
                    </Col>
                  </Row>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="card">
                          <div className="card-body">
                            <Table tableHeader={childProgramHeader}>
                              <TableRow rows={null} colSpan="4" />
                            </Table>
                          </div>
                        </div>
                      </div>
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
                      <i className="fa fa-edit"></i>
                      <Link to="/addGoal">
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
                            <Table tableHeader={programDetailsHeader}>
                              <TableRow rows={programDetailsRows} />
                            </Table>
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
                      <i className="fa fa-edit"></i>
                      <Link to="/addGoal">
                        <p className="ml-1 text-white text-left">Edit</p>
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
                            <Table tableHeader={healthDetailsHeader}>
                              <TableRow rows={healthDetailsRows} />
                            </Table>
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
