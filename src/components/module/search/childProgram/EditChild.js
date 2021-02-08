import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";

import Page from "../../../common/Page";
import Container from "../../../common/Container";
import FormInput from "../../../FormFields/FormInput";
import FormRadio from "../../../FormFields/FormRadio";
import FormCheckbox from "../../../FormFields/FormCheckbox";

class EditChild extends Component {
  state = {
    response: false,
    loading: false,
    userId: this.props.registrationId,
    child_program: [],
    childId: "",
    childFirstName: "",
    childLastName: "",
    childBirthDate: ""
  };

  componentDidMount() {
    const { editChildDetails } = this.props.location.state;

    console.log(editChildDetails);

    this.setState({ childId: editChildDetails.childId });
    this.setState({ childFirstName: editChildDetails.childFirstname });
    this.setState({ childLastName: editChildDetails.childLastname });
    this.setState({ childBirthDate: editChildDetails.childDob });
  }

  inputChange = input => e => {
    this.setState({
      [input]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });

    const { userId } = this.state;

    const child_details = {
      childId: this.state.childId,
      childFirstName: this.state.childFirstName,
      childLastName: this.state.childLastName,
      childBirthDate: this.state.childBirthDate
    };

    const child_program = [child_details];

    try {
      const response = await Axios.post("/irf_childAdd", { userId, child_program });

      if (response.data.success === true) {
        this.setState({ loading: false });
        this.setState({ response: true });
      }
    } catch (e) {
      alert("Error Message. Please update all fields.");
      console.log(e.response.data);
      this.setState({ loading: false });
    }
  };

  handleDelete = async e => {
    e.preventDefault();
    this.setState({ loading: true });

    const { userId } = this.state;

    const child_details = {
      childId: this.state.childId
    };

    const child_program = [child_details];

    try {
      const response = await Axios.post("/irf_childDelete", { userId, child_program });

      if (response.data.success === true) {
        this.setState({ loading: false });
        this.setState({ response: true });
      }
    } catch (e) {
      alert("Something went wrong while Deleting.");
      console.log(e.response.data);
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
            <Page title="Edit Child">
              <div className="row">
                <div className="col-md-4">
                  <FormInput icon="fa fa-id-card-o" type="text" placeholder={values.userId} disabled />
                </div>
                <div className="col-md-2">
                  <Link to="/search">
                    <button className="btn btn-block btn-primary">Cancel</button>
                  </Link>
                </div>
                <div className="col-md-2">
                  <Link to="/search" onClick={this.handleDelete}>
                    <button className="btn btn-block btn-danger">Delete</button>
                  </Link>
                </div>
              </div>

              <Container title="Edit Child">
                <div className="card">
                  <div className="card-body">
                    <table className="table">
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Child First Name</th>
                          <th scope="col">Child Last Name</th>
                          <th scope="col">Date of Birth</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr id="addr0">
                          <td>
                            <FormInput icon="fas fa-child" type="text" placeholder="Child First Name" changeHandler={this.inputChange("childFirstName")} value={values.childFirstName} name="childFirstName" />
                          </td>
                          <td>
                            <FormInput icon="fas fa-child" type="text" placeholder="Child Last Name" changeHandler={this.inputChange("childLastName")} value={values.childLastName} name="childLastName" />
                          </td>
                          <td>
                            <FormInput icon="fas fa-calendar" type="text" placeholder="DD/MM/YYYY" changeHandler={this.inputChange("childBirthDate")} value={values.childBirthDate} name="childBirthDate" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </Container>

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

export default EditChild;
