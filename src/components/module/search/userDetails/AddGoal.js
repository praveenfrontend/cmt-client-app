import React, { Component } from "react";
import { Link } from "react-router-dom";

import Page from "../../../Page";
import Container from "../../../Container";
import FormInput from "../../../FormInput";
import FormRadio from "../../../FormRadio";

class AddGoal extends Component {
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
        <Page title="Add Goal">
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

          <Container title="Goal Details">
            <div className="row">
              <div className="col-md-4">
                <FormInput icon="fa fa-id-card-o" type="text" placeholder="Category Name" />
              </div>
              <div className="col-md-4">
                <FormInput icon="fas fa-envelope" type="text" placeholder="Programs List" />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <FormInput icon="fa fa-id-card-o" type="text" placeholder="Location" />
              </div>
              <div className="col-md-4">
                <FormInput icon="fas fa-envelope" type="text" placeholder="Instructor" />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <FormInput icon="fa fa-id-card-o" type="text" placeholder="Start Date YYYY-MM-DD" />
              </div>
              <div className="col-md-4">
                <FormInput icon="fas fa-envelope" type="text" placeholder="End Date  YYYY-MM-DD" />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="agent_notes" className="text-muted">
                    Participant Comments
                  </label>
                  <textarea className="form-control col col-md-10" id="" rows="4" placeholder="Reminder Notes upto 1000 characters allowed" maxLength="1000"></textarea>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="agent_notes" className="text-muted">
                    Additional Comments
                  </label>
                  <textarea className="form-control col col-md-10" id="" rows="4" placeholder="Reminder Notes upto 1000 characters allowed" maxLength="1000"></textarea>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="form-group">
                <div className="col">
                  <label className="text-muted mr-2">Status:</label>
                </div>
                <div className="col">
                  <FormRadio classNameValue="col-md-3 col-lg-3 col-xl-3" changeHandler={this.inputChange("refer_through")} inputId="checkboxFriend" inputName="refer_through" inputValue="Friend" inputLabel="Yet To Begin" checkedValue={values.refer_through} />
                  <FormRadio classNameValue="col-md-3 col-lg-3 col-xl-3" changeHandler={this.inputChange("refer_through")} inputId="checkboxWebsite" inputName="refer_through" inputValue="In Progress" inputLabel="In Progress" checkedValue={values.refer_through} />
                  <FormRadio classNameValue="col-md-3 col-lg-3 col-xl-3" changeHandler={this.inputChange("refer_through")} inputId="checkboxNegibhour" inputName="refer_through" inputValue="Neighbhour" inputLabel="Complete" checkedValue={values.refer_through} />
                  <FormRadio classNameValue="col-md-3 col-lg-3 col-xl-3" changeHandler={this.inputChange("refer_through")} inputId="checkboxFlyer" inputName="refer_through" inputValue="Flyer" inputLabel="In Complete" checkedValue={values.refer_through} />
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
                  <span className="col-md-1 col-lg-1 col-xl-1 mr-2">Poor</span>
                  <FormRadio classNameValue="col-md-1 col-lg-1 col-xl-1" changeHandler={this.inputChange("ques_1")} inputId="ques_1_poor" inputName="ques_1" inputValue="Poor" inputLabel="1" checkedValue={values.ques_1} />
                  <FormRadio classNameValue="col-md-1 col-lg-1 col-xl-1" changeHandler={this.inputChange("ques_1")} inputId="ques_1_fair" inputName="ques_1" inputValue="Fair" inputLabel="2" checkedValue={values.ques_1} />
                  <FormRadio classNameValue="col-md-1 col-lg-1 col-xl-1" changeHandler={this.inputChange("ques_1")} inputId="ques_1_good" inputName="ques_1" inputValue="Good" inputLabel="3" checkedValue={values.ques_1} />
                  <FormRadio classNameValue="col-md-1 col-lg-1 col-xl-1" changeHandler={this.inputChange("ques_1")} inputId="ques_1_very_good" inputName="ques_1" inputValue="Very Good" inputLabel="4" checkedValue={values.ques_1} />
                  <FormRadio classNameValue="col-md-1 col-lg-1 col-xl-1" changeHandler={this.inputChange("ques_1")} inputId="ques_1_excellent" inputName="ques_1" inputValue="Excellent" inputLabel="5" checkedValue={values.ques_1} />
                  <FormRadio classNameValue="col-md-1 col-lg-1 col-xl-1" changeHandler={this.inputChange("ques_1")} inputId="ques_1_excellent" inputName="ques_1" inputValue="Excellent" inputLabel="6" checkedValue={values.ques_1} />
                  <FormRadio classNameValue="col-md-1 col-lg-1 col-xl-1" changeHandler={this.inputChange("ques_1")} inputId="ques_1_excellent" inputName="ques_1" inputValue="Excellent" inputLabel="7" checkedValue={values.ques_1} />
                  <span className="col-md-1 col-lg-1 col-xl-1">Excellent</span>
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
                  <span className="col-md-1 col-lg-1 col-xl-1 mr-2">Poor</span>
                  <FormRadio classNameValue="col-md-1 col-lg-1 col-xl-1" changeHandler={this.inputChange("ques_1")} inputId="ques_1_poor" inputName="ques_1" inputValue="Poor" inputLabel="1" checkedValue={values.ques_1} />
                  <FormRadio classNameValue="col-md-1 col-lg-1 col-xl-1" changeHandler={this.inputChange("ques_1")} inputId="ques_1_fair" inputName="ques_1" inputValue="Fair" inputLabel="2" checkedValue={values.ques_1} />
                  <FormRadio classNameValue="col-md-1 col-lg-1 col-xl-1" changeHandler={this.inputChange("ques_1")} inputId="ques_1_good" inputName="ques_1" inputValue="Good" inputLabel="3" checkedValue={values.ques_1} />
                  <FormRadio classNameValue="col-md-1 col-lg-1 col-xl-1" changeHandler={this.inputChange("ques_1")} inputId="ques_1_very_good" inputName="ques_1" inputValue="Very Good" inputLabel="4" checkedValue={values.ques_1} />
                  <FormRadio classNameValue="col-md-1 col-lg-1 col-xl-1" changeHandler={this.inputChange("ques_1")} inputId="ques_1_excellent" inputName="ques_1" inputValue="Excellent" inputLabel="5" checkedValue={values.ques_1} />
                  <FormRadio classNameValue="col-md-1 col-lg-1 col-xl-1" changeHandler={this.inputChange("ques_1")} inputId="ques_1_excellent" inputName="ques_1" inputValue="Excellent" inputLabel="6" checkedValue={values.ques_1} />
                  <FormRadio classNameValue="col-md-1 col-lg-1 col-xl-1" changeHandler={this.inputChange("ques_1")} inputId="ques_1_excellent" inputName="ques_1" inputValue="Excellent" inputLabel="7" checkedValue={values.ques_1} />
                  <span className="col-md-1 col-lg-1 col-xl-1">Excellent</span>
                </div>
              </div>
            </div>
          </Container>

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

export default AddGoal;
