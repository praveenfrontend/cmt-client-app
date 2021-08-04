import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";
import swal from "sweetalert";

import Page from "../../../common/Page";
import Container from "../../../common/Container";
import FormInput from "../../../FormFields/FormInput";
import FormRadio from "../../../FormFields/FormRadio";
import FormDropDown from "../../../FormFields/FormDropDown";

import EditGoalDetails from "./EditGoalDetails";

class EditGoal extends Component {
  state = {
    response: false,
    loading: false,
    userId: this.props.registrationId,
    tb_user_details_goals_update_id: "",
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

  componentDidMount() {
    const { editGoalDetails } = this.props.location.state;

    this.setState({ tb_user_details_goals_update_id: editGoalDetails.tb_user_details_goals_update_id });
    this.setState({ CategoryName: editGoalDetails.user_goal_category_name });
    this.setState({ ProgramName: editGoalDetails.user_goal_program_name });
    this.setState({ Location: editGoalDetails.user_goal_program_location });
    this.setState({ Instructor: editGoalDetails.user_goal_program_instructor });
    this.setState({ StartDate: editGoalDetails.user_goal_program_startdate.replace(/-/g, "/") });
    this.setState({ EndDate: editGoalDetails.user_goal_program_enddate.replace(/-/g, "/") });
    this.setState({ Status: editGoalDetails.user_goal_program_status });
    this.setState({ ParticipantComments: editGoalDetails.user_goal_program_participantcomments });
    this.setState({ AdditionalComments: editGoalDetails.user_goal_program_additionalcomments });
    this.setState({ RatingBefore: editGoalDetails.user_goal_program_RatingBefore });
    this.setState({ RatingAfter: editGoalDetails.user_goal_program_RatingAfter });
  }

  loadingHandler = (input) => {
    return this.setState({ loading: input });
  }

  responseHandler = (input) => {
    return this.setState({ response: input });
  }

  inputChange = input => e => {
    this.setState({
      [input]: e.target.value
    });
  };

  inputChangeDate = (input, value) => {
    return this.setState({
      [input]: value
    })
  }

  /* handleSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });

    const { tb_user_details_goals_update_id, userId, CategoryName, ProgramName, Location, Instructor, StartDate, EndDate, Status, ParticipantComments, AdditionalComments, RatingBefore, RatingAfter } = this.state;

    try {
      const response = await Axios.post("/irf_updateGoal", { tb_user_details_goals_update_id, userId, CategoryName, ProgramName, Location, Instructor, StartDate, EndDate, Status, ParticipantComments, AdditionalComments, RatingBefore, RatingAfter });

      if (response.data.success === true) {
        this.setState({ loading: false });
        this.setState({ response: true });
      }
    } catch (e) {
      swal("Please update all fields.", e.response.data, "error");
      this.setState({ loading: false });
    }
  }; */
  handleDelete = async e => {
    e.preventDefault();
    this.setState({ loading: true });

    const { userId, ProgramName, tb_user_details_goals_update_id } = this.state;

    try {
      const response = await Axios.post("/irf_deleteGoal", { userId, ProgramName, tb_user_details_goals_update_id });

      if (response.data.success === true) {
        this.setState({ loading: false });
        this.setState({ response: true });
      }
    } catch (e) {
      swal("Something went wrong!", e.response.data, "error");
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
            <Page title="Edit Goal">
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

              <EditGoalDetails value={true} values={values} inputChange={this.inputChange} 
              inputChangeDate={this.inputChangeDate} loadingHandler={this.loadingHandler} responseHandler={this.responseHandler}/>

              {/* <Container title="Goal Details">
                <div className="row">
                  <div className="col-md-4">
                    <div className={`form-group row`}>
                      <label className="col-sm-4 form-control-label">Category Name</label>
                      <div className="col-sm-8 mb-3">
                        <FormInput icon="fa fa-id-card-o" type="text" value={values.CategoryName} disabled />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className={`form-group row`}>
                      <label className="col-sm-4 form-control-label">Programs List</label>
                      <div className="col-sm-8 mb-3">
                        <FormInput icon="fa fa-id-card-o" type="text" value={values.ProgramName} disabled />
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
              </Container> */}

              {/* <div className="row justify-content-center">
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
              </div> */}
            </Page>
          </div>
        </section>
      </LoadingOverlay>
    );
  }
}

export default EditGoal;
