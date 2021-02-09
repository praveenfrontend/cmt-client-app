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

/* 
<div className="row">
                  <div className="col-md-4">
                    <div className={`form-group row`}>
                      <label class="col-sm-4 form-control-label">Category Name</label>
                      <div class="col-sm-8 mb-3">
                        <select name="account" class="form-control" value={this.state.CategoryName} onChange={e => this.inputChangeProgramDefault(e)}>
                          {this.state.categoryList.map(category => {
                            return <option value={category}>{category}</option>;
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className={`form-group row`}>
                      <label class="col-sm-4 form-control-label">Programs List</label>
                      <div class="col-sm-8 mb-3">
                        <select name="account" class="form-control" value={this.state.ProgramName} onChange={this.inputChange("ProgramName")}>
                          {this.state.CategoryName === "Health" && this.state.healthList.map(value => <option>{value}</option>)}
                          {this.state.CategoryName === "Employment" && this.state.employmentList.map(value => <option>{value}</option>)}
                          {this.state.CategoryName === "Neighbourhood Net" && this.state.neighbourhoodList.map(value => <option>{value}</option>)}
                          {this.state.CategoryName === "Staff" && this.state.staffList.map(value => <option>{value}</option>)}
                          {this.state.CategoryName === "After School" && this.state.afterSchoolList.map(value => <option>{value}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <FormInput icon="fa fa-id-card-o" type="text" placeholder="Location" changeHandler={this.inputChange("Location")} value={values.Location} />
                  </div>
                  <div className="col-md-4">
                    <FormInput icon="fas fa-user" type="text" placeholder="Instructor" changeHandler={this.inputChange("Instructor")} value={values.Instructor} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <FormInput icon="fas fa-calendar" type="text" placeholder="Start Date YYYY/MM/DD" changeHandler={this.inputChange("StartDate")} value={values.StartDate} />
                  </div>
                  <div className="col-md-4">
                    <FormInput icon="fas fa-calendar" type="text" placeholder="End Date YYYY/MM/DD" changeHandler={this.inputChange("EndDate")} value={values.EndDate} />
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="agent_notes" className="text-muted">
                        Participant Comments
                      </label>
                      <textarea className="form-control col col-md-10" id="" rows="4" placeholder="Reminder Notes upto 1000 characters allowed" maxLength="1000" onChange={this.inputChange("ParticipantComments")} value={values.ParticipantComments}></textarea>
                    </div>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="agent_notes" className="text-muted">
                        Additional Comments
                      </label>
                      <textarea className="form-control col col-md-10" id="" rows="4" placeholder="Reminder Notes upto 1000 characters allowed" maxLength="1000" onChange={this.inputChange("AdditionalComments")} value={values.AdditionalComments}></textarea>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="form-group">
                    <div className="col">
                      <label className="text-muted mr-2">Status:</label>
                    </div>
                    <div className="col">
                      <FormRadio classNameValue="col-md-3 col-lg-3 col-xl-3" changeHandler={this.inputChange("Status")} inputId="status_yetToBegin" inputName="Status" inputValue="Yet To Begin" inputLabel="Yet To Begin" checkedValue={values.Status} />
                      <FormRadio classNameValue="col-md-3 col-lg-3 col-xl-3" changeHandler={this.inputChange("Status")} inputId="status_inProgress" inputName="Status" inputValue="In Progress" inputLabel="In Progress" checkedValue={values.Status} />
                      <FormRadio classNameValue="col-md-3 col-lg-3 col-xl-3" changeHandler={this.inputChange("Status")} inputId="status_complete" inputName="Status" inputValue="Complete" inputLabel="Complete" checkedValue={values.Status} />
                      <FormRadio classNameValue="col-md-3 col-lg-3 col-xl-3" changeHandler={this.inputChange("Status")} inputId="status_inComplete" inputName="Status" inputValue="In Complete" inputLabel="In Complete" checkedValue={values.Status} />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <div className="row">
                    <div className="col">
                      <label className="text-muted mr-2">Rating Score: "Before" :</label>
                    </div>
                  </div>
                  <div className="row d-flex">
                    <div className="col">
                      <span className="col-md-1 col-lg-1 col-xl-1 mr-2">
                        <label className="text-muted mr-2">Poor</label>
                      </span>
                      <FormRadio classNameValue="col-md-1 col-lg-1 col-xl-1" changeHandler={this.inputChange("RatingBefore")} inputId="before_1" inputName="RatingBefore" inputValue="1" inputLabel="1" checkedValue={values.RatingBefore} />
                      <FormRadio classNameValue="col-md-1 col-lg-1 col-xl-1" changeHandler={this.inputChange("RatingBefore")} inputId="before_2" inputName="RatingBefore" inputValue="2" inputLabel="2" checkedValue={values.RatingBefore} />
                      <FormRadio classNameValue="col-md-1 col-lg-1 col-xl-1" changeHandler={this.inputChange("RatingBefore")} inputId="before_3" inputName="RatingBefore" inputValue="3" inputLabel="3" checkedValue={values.RatingBefore} />
                      <FormRadio classNameValue="col-md-1 col-lg-1 col-xl-1" changeHandler={this.inputChange("RatingBefore")} inputId="before_4" inputName="RatingBefore" inputValue="4" inputLabel="4" checkedValue={values.RatingBefore} />
                      <FormRadio classNameValue="col-md-1 col-lg-1 col-xl-1" changeHandler={this.inputChange("RatingBefore")} inputId="before_5" inputName="RatingBefore" inputValue="5" inputLabel="5" checkedValue={values.RatingBefore} />
                      <FormRadio classNameValue="col-md-1 col-lg-1 col-xl-1" changeHandler={this.inputChange("RatingBefore")} inputId="before_6" inputName="RatingBefore" inputValue="6" inputLabel="6" checkedValue={values.RatingBefore} />
                      <FormRadio classNameValue="col-md-1 col-lg-1 col-xl-1" changeHandler={this.inputChange("RatingBefore")} inputId="before_7" inputName="RatingBefore" inputValue="7" inputLabel="7" checkedValue={values.RatingBefore} />
                      <span className="col-md-1 col-lg-1 col-xl-1 text-muted">
                        <label className="text-muted mr-2">Excellent</label>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <div className="row">
                    <div className="col">
                      <label className="text-muted mr-2">Rating Score: "After" :</label>
                    </div>
                  </div>
                  <div className="row d-flex">
                    <div className="col">
                      <span className="col-md-1 col-lg-1 col-xl-1 mr-2">
                        <label className="text-muted mr-2">Poor</label>
                      </span>
                      <FormRadio classNameValue="col-md-1 col-lg-1 col-xl-1" changeHandler={this.inputChange("RatingAfter")} inputId="after_1" inputName="RatingAfter" inputValue="1" inputLabel="1" checkedValue={values.RatingAfter} />
                      <FormRadio classNameValue="col-md-1 col-lg-1 col-xl-1" changeHandler={this.inputChange("RatingAfter")} inputId="after_2" inputName="RatingAfter" inputValue="2" inputLabel="2" checkedValue={values.RatingAfter} />
                      <FormRadio classNameValue="col-md-1 col-lg-1 col-xl-1" changeHandler={this.inputChange("RatingAfter")} inputId="after_3" inputName="RatingAfter" inputValue="3" inputLabel="3" checkedValue={values.RatingAfter} />
                      <FormRadio classNameValue="col-md-1 col-lg-1 col-xl-1" changeHandler={this.inputChange("RatingAfter")} inputId="after_4" inputName="RatingAfter" inputValue="4" inputLabel="4" checkedValue={values.RatingAfter} />
                      <FormRadio classNameValue="col-md-1 col-lg-1 col-xl-1" changeHandler={this.inputChange("RatingAfter")} inputId="after_5" inputName="RatingAfter" inputValue="5" inputLabel="5" checkedValue={values.RatingAfter} />
                      <FormRadio classNameValue="col-md-1 col-lg-1 col-xl-1" changeHandler={this.inputChange("RatingAfter")} inputId="after_6" inputName="RatingAfter" inputValue="6" inputLabel="6" checkedValue={values.RatingAfter} />
                      <FormRadio classNameValue="col-md-1 col-lg-1 col-xl-1" changeHandler={this.inputChange("RatingAfter")} inputId="after_7" inputName="RatingAfter" inputValue="7" inputLabel="7" checkedValue={values.RatingAfter} />
                      <span className="col-md-1 col-lg-1 col-xl-1 text-muted">
                        <label className="text-muted mr-2">Excellent</label>
                      </span>
                    </div>
                  </div>
                </div>
*/
