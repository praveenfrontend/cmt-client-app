import React, { Component } from "react";
import FormInput from "../../FormInput";
import Page from "../../Page";
import FormRadio from "../../FormRadio";
import FormCheckbox from "../../FormCheckbox";

class ContactDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      childProgram: "",
      childProgramAddRemove: true,
      rows: []
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
          rows: []
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
    const rows = [...this.state.rows];

    let isChecked = rows[idx].isChecked;
    let childFirstName = rows[idx].childFirstName;
    let childLastName = rows[idx].childLastName;
    let childBirthDate = rows[idx].childBirthDate;

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

    rows[idx] = {
      isChecked: isChecked,
      childFirstName: childFirstName,
      childLastName: childLastName,
      childBirthDate: childBirthDate
    };

    this.setState({
      rows: rows
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
      rows: [...this.state.rows, item]
    });
  };

  removeChild = e => {
    e.preventDefault();

    const rows = this.state.rows;
    let filteredRows = [];
    let checked = false;

    rows.map((item, idx) => {
      if (item.isChecked) {
        checked = true;
      }
    });

    if (!checked) {
      alert("Atleast 1 Child row has to be selected to remove!");
      return;
    }

    filteredRows = rows.filter(item => !item.isChecked);

    this.setState({
      rows: filteredRows
    });
  };

  render() {
    const { values, inputChange } = this.props;

    return (
      <Page title="Contact Details">
        <div className="row">
          <div className="col-md-4">
            <FormInput icon="fas fa-mobile" type="number" placeholder="Mobile Phone" changeHandler={inputChange("mobilePhone")} value={values.mobilePhone} />
          </div>
          <div className="col-md-4">
            <FormInput icon="fas fa-phone" type="number" placeholder="Home Phone" changeHandler={inputChange("homePhone")} value={values.homePhone} />
          </div>
          <div className="col-md-4">
            <FormInput icon="fas fa-phone" type="number" placeholder="Work Phone" changeHandler={inputChange("workPhone")} value={values.workPhone} />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-8">
            <FormInput icon="fas fa-user" type="text" placeholder="Emergency Contact Name" changeHandler={inputChange("emergencyContactName")} value={values.emergencyContactName} />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <FormInput icon="fas fa-phone" type="number" placeholder="Emergency Contact No." changeHandler={inputChange("emergencyContactNumber")} value={values.emergencyContactNumber} />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-8">
            <FormInput icon="fas fa-envelope" type="text" placeholder="Email" changeHandler={inputChange("email")} value={values.email} />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <FormInput icon="fas fa-language" type="text" placeholder="First Language" changeHandler={inputChange("firstLanguage")} value={values.firstLanguage} />
          </div>
        </div>

        <div className="row">
          <div className="form-group">
            <div className="col">
              <label className="text-muted mr-2">How did you learn about us?</label>
            </div>
            <div className="col">
              <FormRadio classNameValue="col-sm-5 col-md-3" changeHandler={inputChange("aboutUs")} inputId="checkboxFriend" inputName="aboutUs" inputValue="Friend" inputLabel="Friend" checkedValue={values.aboutUs} />
              <FormRadio classNameValue="col-sm-5 col-md-3" changeHandler={inputChange("aboutUs")} inputId="checkboxWebsite" inputName="aboutUs" inputValue="Website" inputLabel="Website" checkedValue={values.aboutUs} />
              <FormRadio classNameValue="col-sm-5 col-md-3" changeHandler={inputChange("aboutUs")} inputId="checkboxNegibhour" inputName="aboutUs" inputValue="Neighbhour" inputLabel="Neighbhour" checkedValue={values.aboutUs} />
              <FormRadio classNameValue="col-sm-5 col-md-3" changeHandler={inputChange("aboutUs")} inputId="checkboxFlyer" inputName="aboutUs" inputValue="Flyer" inputLabel="Flyer" checkedValue={values.aboutUs} />
              <FormRadio classNameValue="col-sm-5 col-md-3" changeHandler={inputChange("aboutUs")} inputId="checkboxAgency" inputName="aboutUs" inputValue="Agency" inputLabel="Agency" checkedValue={values.aboutUs} />
              <FormRadio classNameValue="col-sm-5 col-md-3" changeHandler={inputChange("aboutUs")} inputId="checkboxOther" inputName="aboutUs" inputValue="Other" inputLabel="Other" checkedValue={values.aboutUs} />
            </div>
          </div>
        </div>

        <div className="row form-group">
          <div className="col-md-7 col-lg-6">
            <label className="text-muted mr-2">Information if Registration for a Child's program</label>
          </div>
          <div className="col-md-3 col-lg-6">
            <FormRadio classNameValue="" changeHandler={this.inputChangeChildProgram("childProgram")} inputId="childYes" inputName="childProgram" inputValue="Yes" inputLabel="Yes" checkedValue={this.state.childProgram} />
            <FormRadio classNameValue="" changeHandler={this.inputChangeChildProgram("childProgram")} inputId="childNo" inputName="childProgram" inputValue="No" inputLabel="No" checkedValue={this.state.childProgram} />
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

        {this.state.childProgramAddRemove && this.state.rows.length ? (
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
                  {this.state.rows.map((item, idx) => (
                    <tr id="addr0" key={idx}>
                      <td>{<FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={this.handleChange(idx)} inputId={idx} inputValue={"childProgram" + idx} checkedValue={this.state.rows[idx].isChecked} />}</td>
                      <td>
                        <FormInput icon="fas fa-child" type="text" placeholder="Child First Name" changeHandler={this.handleChange(idx)} value={this.state.rows[idx].childFirstName} name="childFirstName" />
                      </td>
                      <td>
                        <FormInput icon="fas fa-child" type="text" placeholder="Child Last Name" changeHandler={this.handleChange(idx)} value={this.state.rows[idx].childLastName} name="childLastName" />
                      </td>
                      <td>
                        <FormInput icon="fas fa-calendar" type="text" placeholder="DD/MM/YYYY" changeHandler={this.handleChange(idx)} value={this.state.rows[idx].childBirthDate} name="childBirthDate" />
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
