import React, { Component } from "react";
import FormInput from "../../FormInput";
import Page from "../../Page";
import FormRadio from "../../FormRadio";
import FormCheckbox from "../../FormCheckbox";

class ContactDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      child_program: "",
      childProgramAddRemove: true,
      child_program_rows: []
    };
  }

  inputChangeChildProgram = input => e => {
    console.log("childprogram.............");
    if (e.target.value === "No") {
      // eslint-disable-next-line no-restricted-globals
      const result = confirm("Are you sure you want to delete all your child information?");
      if (result === true) {
        this.setState({
          [input]: e.target.value,
          childProgramAddRemove: false,
          child_program_rows: []
        });
      }
    } else {
      this.setState({
        [input]: e.target.value,
        childProgramAddRemove: true
      });
    }
  };

  handleChange = idx => e => {
    const { name, value } = e.target;
    const child_program_rows = [...this.state.child_program_rows];

    let isChecked = child_program_rows[idx].isChecked;
    let childFirstName = child_program_rows[idx].childFirstName;
    let childLastName = child_program_rows[idx].childLastName;
    let childBirthDate = child_program_rows[idx].childBirthDate;

    if (parseInt(name) === idx) {
      if (isChecked === false) {
        isChecked = true;
      } else {
        isChecked = false;
      }
    }
    if (name === "childFirstName") {
      childFirstName = value;
    }
    if (name === "childLastName") {
      childLastName = value;
    }
    if (name === "childBirthDate") {
      childBirthDate = value;
    }

    child_program_rows[idx] = {
      isChecked: isChecked,
      childFirstName: childFirstName,
      childLastName: childLastName,
      childBirthDate: childBirthDate
    };

    this.setState({
      child_program_rows: child_program_rows
    });
  };

  continueButton = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  addChild = e => {
    e.preventDefault();
    const item = {
      isChecked: true,
      childFirstName: "",
      childLastName: "",
      childBirthDate: ""
    };
    this.setState({
      child_program_rows: [...this.state.child_program_rows, item]
    });
  };

  removeChild = e => {
    e.preventDefault();

    const child_program_rows = this.state.child_program_rows;
    let filtered_child_program_rows = [];
    let checked = false;

    child_program_rows.map((item, idx) => {
      if (item.isChecked) {
        checked = true;
      }
    });

    if (!checked) {
      alert("Atleast 1 Child row has to be selected to remove!");
      return;
    }

    filtered_child_program_rows = child_program_rows.filter(item => !item.isChecked);

    this.setState({
      child_program_rows: filtered_child_program_rows
    });
  };

  render() {
    const { values, inputChange } = this.props;

    return (
      <Page title="Contact Details">
        <div className="row">
          <div className="col-md-4">
            <FormInput icon="fas fa-mobile" type="number" placeholder="Mobile Phone" changeHandler={inputChange("cell_no")} value={values.cell_no} />
          </div>
          <div className="col-md-4">
            <FormInput icon="fas fa-phone" type="number" placeholder="Home Phone" changeHandler={inputChange("home_no")} value={values.home_no} />
          </div>
          <div className="col-md-4">
            <FormInput icon="fas fa-phone" type="number" placeholder="Work Phone" changeHandler={inputChange("work_no")} value={values.work_no} />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-8">
            <FormInput icon="fas fa-user" type="text" placeholder="Emergency Contact Name" changeHandler={inputChange("emergency_cntName")} value={values.emergency_cntName} />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <FormInput icon="fas fa-phone" type="number" placeholder="Emergency Contact No." changeHandler={inputChange("emergency_contNo")} value={values.emergency_contNo} />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-8">
            <FormInput icon="fas fa-envelope" type="text" placeholder="Email" changeHandler={inputChange("email_id")} value={values.email_id} />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <FormInput icon="fas fa-language" type="text" placeholder="First Language" changeHandler={inputChange("first_language")} value={values.first_language} />
          </div>
        </div>

        <div className="row">
          <div className="form-group">
            <div className="col">
              <label className="text-muted mr-2">How did you learn about us?</label>
            </div>
            <div className="col">
              <FormRadio classNameValue="col-sm-5 col-md-3" changeHandler={inputChange("refer_through")} inputId="checkboxFriend" inputName="refer_through" inputValue="Friend" inputLabel="Friend" checkedValue={values.refer_through} />
              <FormRadio classNameValue="col-sm-5 col-md-3" changeHandler={inputChange("refer_through")} inputId="checkboxWebsite" inputName="refer_through" inputValue="Website" inputLabel="Website" checkedValue={values.refer_through} />
              <FormRadio classNameValue="col-sm-5 col-md-3" changeHandler={inputChange("refer_through")} inputId="checkboxNegibhour" inputName="refer_through" inputValue="Neighbhour" inputLabel="Neighbhour" checkedValue={values.refer_through} />
              <FormRadio classNameValue="col-sm-5 col-md-3" changeHandler={inputChange("refer_through")} inputId="checkboxFlyer" inputName="refer_through" inputValue="Flyer" inputLabel="Flyer" checkedValue={values.refer_through} />
              <FormRadio classNameValue="col-sm-5 col-md-3" changeHandler={inputChange("refer_through")} inputId="checkboxAgency" inputName="refer_through" inputValue="Agency" inputLabel="Agency" checkedValue={values.refer_through} />
              <FormRadio classNameValue="col-sm-5 col-md-3" changeHandler={inputChange("refer_through")} inputId="checkboxOther" inputName="refer_through" inputValue="Other" inputLabel="Other" checkedValue={values.refer_through} />
            </div>
          </div>
        </div>

        <div className="row form-group">
          <div className="col-md-7 col-lg-6">
            <label className="text-muted mr-2">Information if Registration for a Child's program</label>
          </div>
          <div className="col-md-3 col-lg-6">
            <FormRadio classNameValue="" changeHandler={this.inputChangeChildProgram("child_program")} inputId="childYes" inputName="child_program" inputValue="Yes" inputLabel="Yes" checkedValue={this.state.child_program} />
            <FormRadio classNameValue="" changeHandler={this.inputChangeChildProgram("child_program")} inputId="childNo" inputName="child_program" inputValue="No" inputLabel="No" checkedValue={this.state.child_program} />
          </div>
        </div>

        {this.state.childProgramAddRemove ? (
          <div className="row form-group">
            <div className="col col-sm-4 col-md-3 col-lg-2">
              <button className="btn  btn-outline-success" onClick={this.addChild}>
                Add Child
              </button>
            </div>
            <div className="col col-sm-4 col-md-3 col-lg-2">
              <button className="btn  btn-outline-danger" onClick={this.removeChild}>
                Remove Child
              </button>
            </div>
          </div>
        ) : null}

        {this.state.childProgramAddRemove && this.state.child_program_rows.length ? (
          <div className="card">
            <div className="card-body">
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Select</th>
                    <th scope="col">Child First Name</th>
                    <th scope="col">Child Last Name</th>
                    <th scope="col">Date of Birth</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.child_program_rows.map((item, idx) => (
                    <tr id="addr0" key={idx}>
                      <td>{<FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={this.handleChange(idx)} inputId={idx} inputValue={"child_program" + idx} checkedValue={this.state.child_program_rows[idx].isChecked} />}</td>
                      <td>
                        <FormInput icon="fas fa-child" type="text" placeholder="Child First Name" changeHandler={this.handleChange(idx)} value={this.state.child_program_rows[idx].childFirstName} name="childFirstName" />
                      </td>
                      <td>
                        <FormInput icon="fas fa-child" type="text" placeholder="Child Last Name" changeHandler={this.handleChange(idx)} value={this.state.child_program_rows[idx].childLastName} name="childLastName" />
                      </td>
                      <td>
                        <FormInput icon="fas fa-calendar" type="text" placeholder="DD/MM/YYYY" changeHandler={this.handleChange(idx)} value={this.state.child_program_rows[idx].childBirthDate} name="childBirthDate" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}

        <br />
        <div className="row justify-content-center">
          <div className="col col-sm-4 col-md-3 col-lg-2">
            <button className="btn btn-block btn-danger" onClick={this.back}>
              Back
            </button>
          </div>
          <div className="col col-sm-4 col-md-3 col-lg-2">
            <button className="btn btn-block btn-primary" onClick={this.continueButton}>
              Continue
            </button>
          </div>
        </div>
      </Page>
    );
  }
}

export default ContactDetails;
