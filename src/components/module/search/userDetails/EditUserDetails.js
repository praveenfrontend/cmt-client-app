import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";
import swal from "sweetalert";

import Page from "../../../common/Page";
import FormInput from "../../../FormFields/FormInput";
import { Accordion, Card } from "react-bootstrap";
import EditBasicDetails from "./EditBasicDetails";
import EditContactDetails from "./EditContactDetails";

class EditUserDetails extends Component {
  state = {
    response: false,
    loading: false,
    userId: this.props.userDetails.userId,
    firstName: this.props.userDetails.firstName,
    middleName: this.props.userDetails.middleName,
    lastName: this.props.userDetails.lastName,
    gender: this.props.userDetails.gender,
    age: this.props.userDetails.age,
    streetAddress: this.props.userDetails.streetAddress,
    city: this.props.userDetails.city,
    province: this.props.userDetails.province,
    country: this.props.userDetails.country,
    zipCode: this.props.userDetails.zipCode,
    phoneHome: this.props.userDetails.phoneHome,
    phoneCell: this.props.userDetails.phoneCell,
    phoneWork: this.props.userDetails.phoneWork,
    email: this.props.userDetails.email,
    firstLang: this.props.userDetails.firstLang,
    EmerContactName: this.props.userDetails.EmerContactName,
    EmerContactNo: this.props.userDetails.EmerContactNo,
    notes: this.props.userDetails.notes
  };

  inputChange = input => e => {
    this.setState({
      [input]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });

    const { userId, firstName, middleName, lastName, gender, age, streetAddress, city, province, zipCode, country, phoneCell, phoneHome, phoneWork, EmerContactName, EmerContactNo, email, firstLang, notes } = this.state;

    try {
      const response = await Axios.post("/irf_userUpdate", { userId, firstName, middleName, lastName, gender, age, streetAddress, city, province, zipCode, country, phoneCell, phoneHome, phoneWork, EmerContactName, EmerContactNo, email, firstLang, notes });

      if (response.data.success === true) {
        this.setState({ loading: false });
        this.setState({ response: true });
      }
    } catch (e) {
      swal("Please update all fields!", e.response.data, "error");
      this.setState({ loading: false });
    }
  };

  render() {
    const values = this.state;

    return this.state.response ? (
      <Redirect to={{ pathname: "/search" }} />
    ) : (
      <LoadingOverlay active={this.state.loading} spinner={<Loader type="ThreeDots" color="#00BFFF" height={100} width={100} visible={true} />}>
        <section className="forms">
          <div className="container-fluid">
            <Page title="Edit User Details">
              <div className="row">
                <div className="col-md-4">
                  <FormInput icon="fa fa-id-card-o" type="text" placeholder={values.userId} disabled />
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
                              <EditBasicDetails inputChange={this.inputChange} values={values} />
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
                              <EditContactDetails inputChange={this.inputChange} values={values} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Accordion.Collapse>
                </div>
              </Accordion>

              <div className="row justify-content-center">
                <div className="col col-sm-4 col-md-3 col-lg-2">
                  <Link to="/" onClick={this.handleSubmit}>
                    <button className="btn btn-block btn-success">Submit</button>
                  </Link>
                </div>
                <div className="col col-sm-4 col-md-3 col-lg-2">
                  <Link to="/search">
                    <button className="btn btn-block btn-danger">Back</button>
                  </Link>
                </div>
              </div>
            </Page>
          </div>
        </section>
      </LoadingOverlay>
    );
  }
}

export default EditUserDetails;
