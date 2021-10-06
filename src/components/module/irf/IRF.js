/* eslint-disable default-case */
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import BasicDetails from "./BasicDetails";
import ContactDetails from "./ContactDetails";
import CommunityMattersProgram from "./CommunityMattersProgram";
import MemberDetails from "./MemberDetails";
import Overview from "./Overview";

import FormStepper from "./FormStepper";
import Axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";
import swal from "sweetalert";
// import * as ReactBootStrap from "react-bootstrap";

class IRF extends Component {
  state = {
    // Stepper
    step: 0,
    loading: false,
    response: false,

    // Basic Details
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    age: "",
    streetAddress: "",
    city: "",
    province: "",
    zipCode: "",
    country: "Canada",

    // Contact Details
    phoneCell: "",
    phoneHome: "",
    phoneWork: "",
    EmerContactName: "",
    EmerContactNo: "",
    email: "",
    firstLang: "",
    aboutUs: "",
    ChildValue: "",
    childProgramAddRemove: false,
    child_program: [],

    // Community Matters Program
    after_school_program: "",
    userprograms: {},
    Others: "",
    notes: "",

    // Member Details
    myHealth: "",
    myLifeSatisfaction: "",
    mySocialNetwork: "",
    myCommunityNetwork: "",
    myStressLevel: "",
    myHealthIssues: "",
    myFamilyDoctor: "",
    myVisitToFamilyDoctor: "",
    myVisitToClinic: "",
    myVisitToEmergency: "",
    myVisitToHospital: "",
    myDiseaseAwareness: "",
    myCmtProgramAwareness: "",
    myPhysicalActiveness: ""    
  };

  async componentDidMount() {
      const response = await Axios.get("/irfprogramlist");
      this.setState({
        userprograms: {...this.state.userprograms, ...response.data.Programs}
      })
  }


  handleSubmit = async e => {
    e.preventDefault();

    const { firstName, middleName, lastName, gender, age, streetAddress, city, province, zipCode, country, phoneCell, phoneHome, phoneWork, EmerContactName, EmerContactNo, email, firstLang, aboutUs, ChildValue, child_program, after_school_program, userprograms, /* health, employment, staff, neighbourhood_net, */ Others, notes, myHealth, myLifeSatisfaction, mySocialNetwork, myCommunityNetwork, myStressLevel, myHealthIssues, myFamilyDoctor, myVisitToFamilyDoctor, myVisitToClinic, myVisitToEmergency, myVisitToHospital, myDiseaseAwareness, myCmtProgramAwareness, myPhysicalActiveness } = this.state;

    try {
      this.setState({ loading: true });
      const response = await Axios.post("/irf_register", { firstName, middleName, lastName, gender, age, streetAddress, city, province, zipCode, country, phoneCell, phoneHome, phoneWork, EmerContactName, EmerContactNo, email, firstLang, aboutUs, ChildValue, child_program, after_school_program, userprograms, Others, notes, myHealth, myLifeSatisfaction, mySocialNetwork, myCommunityNetwork, myStressLevel, myHealthIssues, myFamilyDoctor, myVisitToFamilyDoctor, myVisitToClinic, myVisitToEmergency, myVisitToHospital, myDiseaseAwareness, myCmtProgramAwareness, myPhysicalActiveness });

      if (response.data.success === true) {
        const regId = response.data.id;
        const message = response.data.Message;
        this.setState({ loading: false });
        swal(`Please note your Registration ID: ${regId}`, `${message}`, "success").then(res => {
          this.setState({ response: true });
          window.location.reload();
        });
      }
    } catch (e) {
      swal("Something went wrong", e.response.data, "error");
      this.setState({ loading: false });
    }
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

  handleChangeChildProgramData = (idx, name, value) => {

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
  }

  handleChangeChildProgramDate = (idx, name, date) => {
    this.handleChangeChildProgramData(idx, name, date)
  }

  handleChangeChildProgram = idx => e => {
    const { name, value } = e.target;
    this.handleChangeChildProgramData(idx, name, value)
  };

  inputChangeChildProgram = input => e => {
    if (e.target.value === "No") {
      // eslint-disable-next-line no-restricted-globals

      swal({
        // title: "Are you sure not to include Child's program?",
        text: "Are you sure not to include Child's program?",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          this.setState({
            [input]: e.target.value,
            childProgramAddRemove: false,
            child_program: []
          });
          swal("Child information will not be included!", {
            icon: "success"
          });
        }
      });
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

  inputCheckBoxHandler = inputParam => e => {
    const id = e.target.id;
    let input = this.state.userprograms[inputParam];
    input[id].isChecked = !input[id].isChecked;
    this.setState({ [input]: input });
  };

  nextStep = e => {
    // e.preventDefault();
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };

  prevStep = e => {
    e.preventDefault();
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  getSteps() {
    return ["Basic Details", "Contact Details", "Community Matters Program", "Member Details", "Overview"];
    // return ["", "", "", "", ""];
  }

  getStepContent = (step, values) => {
    switch (step) {
      case 0:
        return <BasicDetails nextStep={this.nextStep} inputChange={this.inputChange} inputClick={this.inputClick} values={values} page="IRF" />;
      case 1:
        return <ContactDetails prevStep={this.prevStep} nextStep={this.nextStep} inputChange={this.inputChange} values={values} inputChangeChildProgram={this.inputChangeChildProgram} handleChangeChildProgramDate={this.handleChangeChildProgramDate} handleChangeChildProgram={this.handleChangeChildProgram} addChild={this.addChild} removeChild={this.removeChild} page="IRF" />;
      case 2:
        return <CommunityMattersProgram prevStep={this.prevStep} nextStep={this.nextStep} inputChange={this.inputChange} values={values} inputCheckBoxHandler={this.inputCheckBoxHandler} />;
      case 3:
        return <MemberDetails prevStep={this.prevStep} nextStep={this.nextStep} inputChange={this.inputChange} values={values} />;
      case 4:
        return <Overview prevStep={this.prevStep} handleSubmit={this.handleSubmit} inputChange={this.inputChange} values={values} />;
    }
  };

  render() {
    const { step } = this.state;
    const values = this.state;
    const steps = this.getSteps();

    return this.state.response ? (
      <Redirect to={{ pathname: "/initial-registration-form" }} />
    ) : (
      <LoadingOverlay active={this.state.loading} spinner={<Loader type="ThreeDots" color="#00BFFF" height={100} width={100} visible={true} />}>
        <section className="forms">
          <div className="container-fluid">
            <FormStepper step={step} steps={steps} />
            {this.getStepContent(step, values)}
          </div>
        </section>
      </LoadingOverlay>
    );
  }
}

export default IRF;
