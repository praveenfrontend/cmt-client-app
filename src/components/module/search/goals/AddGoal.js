import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";
import swal from "sweetalert";
import Page from "../../../common/Page";
import FormInput from "../../../FormFields/FormInput";
import AddGoalDetails from "./AddGoalDetails";

class AddGoal extends Component {
  state = {
    response: false,
    loading: false,
    userId: this.props.registrationId,
    categoryAndProgramList: {},
    categoryList: [],
    programList: [],
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
    await Axios.get("/showprograms")
      .then(response => {
        this.setState({ categoryAndProgramList: response.data.data })
        const category = Object.keys(response.data.data);
        this.setState({ categoryList: [ ...category ] })
      })
      .catch(error => {
        console.log(error.response);
      });
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

  categoryHandleChange = e => {
    this.setState({ CategoryName: e.target.value});
    this.setState({ programList: this.state.categoryAndProgramList[e.target.value]  })
  }

  programHandleChange = e => {
    this.setState({ ProgramName: e.target.value});
  }

  render() {
    const values = this.state;

    return this.state.response ? (
      <Redirect to={{ pathname: "/search" }} />
    ) : (
      <LoadingOverlay active={this.state.loading} spinner={<Loader type="ThreeDots" color="#00BFFF" height={100} width={100} visible={true} />}>
        <section className="forms">
          <div className="container-fluid">
            <Page title="Add Goal">
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
              <AddGoalDetails values={values} programHandleChange={this.programHandleChange} categoryHandleChange={this.categoryHandleChange} inputChange={this.inputChange} inputChangeDate={this.inputChangeDate} loadingHandler={this.loadingHandler} responseHandler={this.responseHandler}/>
            </Page>
          </div>
        </section>
      </LoadingOverlay>
    );
  }
}

export default AddGoal;
