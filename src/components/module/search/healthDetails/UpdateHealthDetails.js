import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";

import Page from "../../../common/Page";
import Container from "../../../common/Container";
import FormInput from "../../../FormFields/FormInput";
import FormRadio from "../../../FormFields/FormRadio";
import FormDropDown from "../../../FormFields/FormDropDown";

class UpdateHealthDetails extends Component {
  state = {
    response: false,
    loading: false,
    userId: this.props.registrationId,
    categoryList: [],
    afterSchoolList: [],
    healthList: [],
    employmentList: [],
    neighbourhoodList: [],
    staffList: [],
    CategoryName: "",
    ProgramName: "",
    Location: "",
    Instructor: "",
    StartDate: "",
    EndDate: "",
    Status: "",
    ParticipantComments: "",
    AdditionalComments: "",
    RatingBefore: "",
    RatingAfter: ""
  };

  async componentDidMount() {
    const response = await Axios.get(`/getprograms/${this.state.userId}`);
    const categoryAndPrograms = response.data.data;

    Object.keys(categoryAndPrograms).map((key, value) => {
      if (key === "AfterschoolResults") {
        this.setState({ categoryList: [...this.state.categoryList, "After School"] });
        this.setState({ afterSchoolList: [...this.state.afterSchoolList, categoryAndPrograms[key]] });

        // setting the default option
        // After School by default returns yes even though no is selected in irf_submit. needs to be fixed.
        // after that logic needs to be modified with alert.
        this.setState({ CategoryName: "After School" });
        if (categoryAndPrograms[key] === "yes" || "Yes") {
          this.setState({ ProgramName: categoryAndPrograms[key] });
        } else {
          alert("You should enroll for the program before you add a goal");
        }
      }
      if (key === "HealthResults") {
        this.setState({ categoryList: [...this.state.categoryList, "Health"] });
        this.setState({ healthList: [...this.state.healthList, ...categoryAndPrograms[key]] });
      }
      if (key === "EmploymentResults") {
        this.setState({ categoryList: [...this.state.categoryList, "Employment"] });
        this.setState({ employmentList: [...this.state.employmentList, ...categoryAndPrograms[key]] });
      }
      if (key === "NeighbourhoodResults") {
        this.setState({ categoryList: [...this.state.categoryList, "Neighbourhood Net"] });
        this.setState({ neighbourhoodList: [...this.state.neighbourhoodList, ...categoryAndPrograms[key]] });
      }
      if (key === "StaffResults") {
        this.setState({ categoryList: [...this.state.categoryList, "Staff"] });
        this.setState({ staffList: [...this.state.staffList, ...categoryAndPrograms[key]] });
      }
    });
  }

  inputChange = input => e => {
    this.setState({
      [input]: e.target.value
    });
  };

  inputChangeProgramDefault = e => {
    this.setState({ CategoryName: e.target.value }, function () {
      // eslint-disable-next-line default-case
      switch (this.state.CategoryName) {
        case "Health":
          this.setState({
            ProgramName: this.state.healthList[0]
          });
          break;
        case "Employment":
          this.setState({
            ProgramName: this.state.employmentList[0]
          });
          break;
        case "Neighbourhood Net":
          this.setState({
            ProgramName: this.state.neighbourhoodList[0]
          });
          break;
        case "Staff":
          this.setState({
            ProgramName: this.state.staffList[0]
          });
          break;
        case "After School":
          this.setState({
            ProgramName: this.state.afterSchoolList[0]
          });
          break;
      }
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });

    const { userId, CategoryName, ProgramName, Location, Instructor, StartDate, EndDate, Status, ParticipantComments, AdditionalComments, RatingBefore, RatingAfter } = this.state;

    try {
      const response = await Axios.post("/irf_addGoal", { userId, CategoryName, ProgramName, Location, Instructor, StartDate, EndDate, Status, ParticipantComments, AdditionalComments, RatingBefore, RatingAfter });

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

  render() {
    const values = this.state;

    return this.state.response ? (
      <Redirect to={{ pathname: "/search" }} />
    ) : (
      <LoadingOverlay active={this.state.loading} spinner={<Loader type="ThreeDots" color="#00BFFF" height={100} width={100} visible={true} />}>
        <section className="forms">
          <div className="container-fluid">
            <Page title="Update Member Health Details">
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

              <Container title="Health Details"></Container>

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

export default UpdateHealthDetails;
