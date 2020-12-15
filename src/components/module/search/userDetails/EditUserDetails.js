import React, { Component } from "react";
import { Link } from "react-router-dom";

import Page from "../../../Page";
import Container from "../../../Container";
import FormInput from "../../../FormInput";
import { Accordion, Card, Row, Col } from "react-bootstrap";
import BasicDetails from "../../irf/BasicDetails";
import ContactDetails from "../../irf/ContactDetails";

class EditUserDetails extends Component {
  state = {};

  nextStep = e => {};

  inputChange = input => e => {};

  inputChangeChildProgram = input => e => {};

  handleChangeChildProgram = idx => e => {};

  addChild = e => {};

  removeChild = e => {};

  render() {
    const values = this.state;

    return (
      <div>
        <Page title="Edit User Details">
          <div className="row">
            <div className="col-md-4">
              <FormInput icon="fa fa-id-card-o" type="text" placeholder="20201045" disabled />
            </div>
            <div className="col-md-2">
              <Link to="/search">
                <button className="btn btn-block btn-primary">Cancel</button>
              </Link>
            </div>
          </div>

          <Accordion defaultActiveKey="0">
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                <Row>
                  <Col sm={8}>
                    <h5 className="text-white text-left">Basic Details</h5>
                  </Col>
                </Row>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <BasicDetails nextStep={this.nextStep} inputChange={this.inputChange} values={values} />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="1">
                <Row>
                  <Col sm={8}>
                    <h5 className="text-white text-left">Contact Details</h5>
                  </Col>
                </Row>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <ContactDetails /* prevStep={this.prevStep} nextStep={this.nextStep} */ inputChange={this.inputChange} values={values} inputChangeChildProgram={this.inputChangeChildProgram} handleChangeChildProgram={this.handleChangeChildProgram} addChild={this.addChild} removeChild={this.removeChild} />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>

          <div className="row mt-3">
            <div className="col-md-2 m-auto">
              <Link to="/search">
                <button className="btn btn-block btn-success">Submit</button>
              </Link>
            </div>
          </div>
        </Page>
      </div>
    );
  }
}

export default EditUserDetails;
