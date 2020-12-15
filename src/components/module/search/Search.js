import React from "react";
import { Link } from "react-router-dom";

import Page from "../../Page";
import Container from "../../Container";
import FormInput from "../../FormInput";
import { Accordion, Card, Table, Row, Col } from "react-bootstrap";

function Search() {
  return (
    <div>
      <Page title="SEARCH">
        <div className="row">
          <div className="col-md-4">
            <FormInput icon="fa fa-id-card-o" type="text" placeholder="Search by Registration ID" />
          </div>
          <div className="col-md-1">
            <p className="display-6 text-muted mt-2">[ OR ]</p>
          </div>
          <div className="col-md-4">
            <FormInput icon="fas fa-envelope" type="text" placeholder="Search by Email ID" />
          </div>
          <div className="col-md-2">
            <button className="btn btn-block btn-primary">Search</button>
          </div>
        </div>
      </Page>

      <Container title="Member Details - CMT">
        <Accordion defaultActiveKey="0">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              <Row>
                <Col sm={8}>
                  <h5 className="text-white text-left">User Details - 20201045</h5>
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
              <Card.Body>
                <Table striped bordered hover>
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
                    <tr>
                      <td>20201045</td>
                      <td>Test</td>
                      <td>User</td>
                      <td>Chennai</td>
                      <td>test@gmail.com</td>
                      <td>Test</td>
                      <td>1234567891</td>
                      <td>test</td>
                      <td>test</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              <Row>
                <Col sm={8}>
                  <h5 className="text-white text-left">Goal Details - 20201045</h5>
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
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Sl.No</th>
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
                  <tbody></tbody>
                </Table>
                <p className="col">No Data Available</p>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="2">
              <Row>
                <Col sm={8}>
                  <h5 className="text-white text-left">Child Details - 20201045</h5>
                </Col>
                <Col sm={4} className="d-flex">
                  <i className="fa fa-edit"></i>
                  <Link to="/">
                    <p className="ml-1 text-white text-left">Edit</p>
                  </Link>
                </Col>
              </Row>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Sl.No</th>
                      <th>Child First Name</th>
                      <th>Child Last Name</th>
                      <th>Child DoB</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </Table>
                <p className="col">No Data Available</p>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="3">
              <Row>
                <Col sm={8}>
                  <h5 className="text-white text-left">Prog Details - 20201045</h5>
                </Col>
                <Col sm={4} className="d-flex">
                  <i className="fa fa-edit"></i>
                  <Link to="/">
                    <p className="ml-1 text-white text-left">Edit</p>
                  </Link>
                </Col>
              </Row>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="3">
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Sl.No</th>
                      <th>Program Name</th>
                      <th>Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>AfterSchool:No</td>
                      <td>After School</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Zumba</td>
                      <td>Health</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Tutoring</td>
                      <td>Employment</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Volunteer</td>
                      <td>Staff</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="4">
              <Row>
                <Col sm={8}>
                  <h5 className="text-white text-left">Health Details - 20201045</h5>
                </Col>
                <Col sm={4} className="d-flex">
                  <i className="fa fa-edit"></i>
                  <Link to="/">
                    <p className="ml-1 text-white text-left">Edit</p>
                  </Link>
                </Col>
              </Row>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="4">
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Health Question</th>
                      <th>Initial Status</th>
                      <th>Current Status</th>
                      <th>Current Program</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Overall Health</td>
                      <td>Excellent</td>
                      <td>NA</td>
                      <td>NA</td>
                    </tr>
                    <tr>
                      <td>Satisfaction with Life</td>
                      <td>Excellent</td>
                      <td>NA</td>
                      <td>NA</td>
                    </tr>
                    <tr>
                      <td>Social Network of Family and Friends</td>
                      <td>Excellent</td>
                      <td>NA</td>
                      <td>NA</td>
                    </tr>
                    <tr>
                      <td>Connection with community</td>
                      <td>Excellent</td>
                      <td>NA</td>
                      <td>NA</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>

        <div className="row mt-3">
          <div className="col">
            <div className="form-group">
              <label htmlFor="agent_notes" className="text-muted">
                Authorized CA Signature
              </label>
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
  );
}

export default Search;
