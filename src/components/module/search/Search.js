import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

import Page from "../../common/Page";
import Container from "../../common/Container";
import FormInput from "../../FormFields/FormInput";
import { Accordion, Card, Row, Col } from "react-bootstrap";
import Table from "../../Table/Table";
import TableRow from "../../Table/TableRow";

class Search extends Component {
  state = {
    registrationId: "",
    emailId: "",
    searchData: {}
  };

  inputChange = input => e => {
    this.setState({
      [input]: e.target.value
    });
  };

  handleSearch = async e => {
    e.preventDefault();
    try {
      let responseData;
      const data = this.state.registrationId || this.state.emailId;

      const response = await Axios.post("/irf_search", { data });
      response.data.map(item => (responseData = item));

      if (responseData !== undefined) {
        this.setState({ searchData: responseData });
      } else {
        console.log("Incorrect Registration Id or Email Id.");
      }
    } catch (e) {
      if (e.response == null) {
        console.log("Something went wrong.");
      }
    }
  };

  render() {
    const searchResult = this.state.searchData;

    const tableHeader = ["S.No", "Label", "Value"];
    const childProgramHeader = ["S.No", "Child First Name", "Child Last Name", "Child DoB"];
    const programDetailsHeader = ["S.No", "Category", "Program Name"];
    const healthDetailsHeader = ["S.No", "Health Question", "Initial Status", "Current Status", "Current Program"];

    const userDetailsRows = {
      "Reg Id": searchResult.id,
      "First Name": searchResult.firstname,
      "Last Name": searchResult.lastname,
      Address: this.state.searchData.address !== undefined ? searchResult.address + ", " + searchResult.city + ", " + searchResult.province + ", " + searchResult.postal_code + ", " + searchResult.country : "",
      Email: searchResult.email_id,
      "First Language": searchResult.first_language,
      "Contact Number": searchResult.cell_no,
      Children: searchResult.child_program,
      "Agent Notes": searchResult.agent_notesy
    };

    const goalDetailsRows = {
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

    const programDetailsRows = {
      "After School": "No Data Available",
      Health: "No Data Available",
      Employment: "No Data Available",
      Staff: "No Data Available"
    };

    const healthDetailsRows = {
      "Overall Health": "No Data Available",
      "Satisfaction with Life": "No Data Available",
      "Social Network of Family and Friends": "No Data Available",
      "Connection with community": "No Data Available"
    };

    return (
      <section className="forms">
        <div className="container-fluid">
          <Page title="SEARCH">
            <form onSubmit={this.handleSearch}>
              <div className="row">
                <div className="col-md-4">
                  <FormInput icon="fa fa-id-card-o" type="text" placeholder="Search by Registration ID" changeHandler={this.inputChange("registrationId")} />
                </div>
                <div className="col-md-1">
                  <p className="display-6 text-muted mt-2">[ OR ]</p>
                </div>
                <div className="col-md-4">
                  <FormInput icon="fas fa-envelope" type="text" placeholder="Search by Email ID" changeHandler={this.inputChange("emailId")} />
                </div>
                <div className="col-md-2">
                  <button className="btn btn-block btn-primary">Search</button>
                </div>
              </div>
            </form>
          </Page>
          <Container title="Member Details - CMT">
            <Accordion /* defaultActiveKey="0" */>
              <div className="card">
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  <Row className="card-header bg-primary">
                    <Col sm={8}>
                      <h5 className="text-white text-left">User Details - {searchResult.id}</h5>
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
                      <h5 className="text-white text-left">Goal Details - {searchResult.id}</h5>
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
                      <h5 className="text-white text-left">Child Details - {searchResult.id}</h5>
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
                      <h5 className="text-white text-left">Prog Details - {searchResult.id}</h5>
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
                      <h5 className="text-white text-left">Health Details - {searchResult.id}</h5>
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
    );
  }
}

export default Search;

// Search ID: 20201046
