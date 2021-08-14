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

              
            </Page>
          </div>
        </section>
      </LoadingOverlay>
    );
  }
}

export default EditGoal;
