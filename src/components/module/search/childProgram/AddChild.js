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
import FormCheckbox from "../../../FormFields/FormCheckbox";

class AddChild extends Component {
  state = {
    response: false,
    loading: false,
    userId: this.props.registrationId,
    ChildValue: "",
    childProgramAddRemove: true,
    child_program: []
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
      child_program: [...this.state.child_program, item]
    });
  };

  removeChild = e => {
    e.preventDefault();

    const child_program = this.state.child_program;
    let filtered_child_program = [];
    let checked = false;

    child_program.map((item, idx) => (item.isChecked ? (checked = true) : null));

    if (!checked) {
      swal("Child Program Registration", "Atleast 1 Child row has to be selected to remove!", "info");
      return;
    }

    filtered_child_program = child_program.filter(item => !item.isChecked);

    this.setState({
      child_program: filtered_child_program
    });
  };

  handleChangeChildProgram = idx => e => {
    const { name, value } = e.target;
    const child_program = [...this.state.child_program];

    let isChecked = child_program[idx].isChecked;
    let childFirstName = child_program[idx].childFirstName;
    let childLastName = child_program[idx].childLastName;
    let childBirthDate = child_program[idx].childBirthDate;

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

    child_program[idx] = {
      isChecked: isChecked,
      childFirstName: childFirstName,
      childLastName: childLastName,
      childBirthDate: childBirthDate
    };

    this.setState({
      child_program: child_program
    });
  };

  inputChangeChildProgram = input => e => {
    console.log("childprogram.............", input);
    if (e.target.value === "No") {
      // eslint-disable-next-line no-restricted-globals
      const result = confirm("Are you sure you want to delete all your child information?");
      if (result === true) {
        this.setState({
          [input]: e.target.value,
          childProgramAddRemove: false,
          child_program: []
        });
      }
    } else {
      this.setState({
        [input]: e.target.value,
        childProgramAddRemove: true
      });
    }
  };

  inputChange = input => e => {
    this.setState({
      [input]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });

    const { userId, child_program } = this.state;

    try {
      const response = await Axios.post("/irf_childAdd", { userId, child_program });

      if (response.data.success === true) {
        this.setState({ loading: false });
        this.setState({ response: true });
      }
    } catch (e) {
      swal("Please update all fields.", e.response.data, "error");
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
            <Page title="Add Child">
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

              <Container title="Child Details">
                <div className="row form-group">
                  <div className="col-md-7 col-lg-6">
                    <label className="text-muted mr-2">Information if Registration for a Child's program</label>
                  </div>
                  <div className="col-md-3 col-lg-6">
                    <FormRadio classNameValue="" changeHandler={this.inputChangeChildProgram("ChildValue")} inputId="childYes" inputName="ChildValue" inputValue="Yes" inputLabel="Yes" checkedValue={values.ChildValue} />
                    <FormRadio classNameValue="" changeHandler={this.inputChangeChildProgram("ChildValue")} inputId="childNo" inputName="ChildValue" inputValue="No" inputLabel="No" checkedValue={values.ChildValue} />
                  </div>
                </div>

                {values.childProgramAddRemove ? (
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

                {values.childProgramAddRemove && values.child_program.length ? (
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
                          {values.child_program.map((item, idx) => (
                            <tr id="addr0" key={idx}>
                              <td>{<FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={this.handleChangeChildProgram(idx)} inputId={idx} inputValue={"child_program" + idx} checkedValue={values.child_program[idx].isChecked} />}</td>
                              <td>
                                <FormInput icon="fas fa-child" type="text" placeholder="Child First Name" changeHandler={this.handleChangeChildProgram(idx)} value={values.child_program[idx].childFirstName} name="childFirstName" />
                              </td>
                              <td>
                                <FormInput icon="fas fa-child" type="text" placeholder="Child Last Name" changeHandler={this.handleChangeChildProgram(idx)} value={values.child_program[idx].childLastName} name="childLastName" />
                              </td>
                              <td>
                                <FormInput icon="fas fa-calendar" type="text" placeholder="DD/MM/YYYY" changeHandler={this.handleChangeChildProgram(idx)} value={values.child_program[idx].childBirthDate} name="childBirthDate" />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : null}
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

export default AddChild;
