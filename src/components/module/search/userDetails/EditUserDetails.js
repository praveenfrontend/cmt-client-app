import React, { Component } from "react";
import { Link } from "react-router-dom";

import Page from "../../../common/Page";
import FormInput from "../../../FormFields/FormInput";
import { Accordion, Card } from "react-bootstrap";
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
      <section className="forms">
        <div className="container-fluid">
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
              <div className="card">
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  <div className="card-header bg-primary">
                    <h4 className="text-white">Edit Basic Details</h4>
                  </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="card">
                          <div className="card-body">
                            <BasicDetails nextStep={this.nextStep} inputChange={this.inputChange} values={values} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Accordion.Collapse>
              </div>

              <div className="card">
                <Accordion.Toggle as={Card.Header} eventKey="1">
                  <div className="card-header bg-primary">
                    <h4 className="text-white">Edit Contact Details</h4>
                  </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="card">
                          <div className="card-body">
                            <ContactDetails /* prevStep={this.prevStep} nextStep={this.nextStep} */ inputChange={this.inputChange} values={values} inputChangeChildProgram={this.inputChangeChildProgram} handleChangeChildProgram={this.handleChangeChildProgram} addChild={this.addChild} removeChild={this.removeChild} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Accordion.Collapse>
              </div>
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
      </section>
    );
  }
}

export default EditUserDetails;
