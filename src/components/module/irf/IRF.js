/* eslint-disable default-case */
import React, { Component } from "react";

import BasicDetails from "./BasicDetails";
import ContactDetails from "./ContactDetails";
import CommunityMattersProgram from "./CommunityMattersProgram";
import MemberDetails from "./MemberDetails";
import Overview from "./Overview";

import FormStepper from "./FormStepper";
import Axios from "axios";
import Spinner from "react-bootstrap/Spinner";

class IRF extends Component {
  state = {
    // Stepper
    step: 0,

    // Basic Details
    firstname: "",
    middlename: "",
    lastname: "",
    gender: "",
    age: "",
    address: "",
    city: "",
    province: "",
    postal_code: "",
    country: "",

    // Contact Details
    cell_no: "",
    home_no: "",
    work_no: "",
    emergency_cntName: "",
    emergency_contNo: "",
    email_id: "",
    first_language: "",
    refer_through: "",
    child_program: "",
    childProgramAddRemove: true,
    child_program_rows: [],

    // Community Matters Program
    after_school_program: "",
    health: {
      healthZumba: { isChecked: false, value: "Zumba" },
      healthYoga: { isChecked: false, value: "Yoga" },
      healthDental: { isChecked: false, value: "Dental" },
      healthKarate: { isChecked: false, value: "Karate" },
      healthMeditation: { isChecked: false, value: "Meditation" },
      healthFoodMarket: { isChecked: false, value: "Food Market" },
      healthBellyDancing: { isChecked: false, value: "Belly Dancing" },
      healthAdultPlus: { isChecked: false, value: "Adult Plus" },
      healthEnglishCafe: { isChecked: false, value: "English Cafe" },
      healthBasicEnglish: { isChecked: false, value: "Basic English" },
      healthHomeVistits: { isChecked: false, value: "Home Vistits" },
      healthSocialGroup: { isChecked: false, value: "Social Group" },
      healthHealthySmiles: { isChecked: false, value: "Healthy Smiles" },
      healthVolleyBall: { isChecked: false, value: "Volley Ball" },
      healthHeartAndStroke: { isChecked: false, value: "Heart and Stroke" },
      healthBollywoodDance: { isChecked: false, value: "Bollywood Dance" },
      healthFoodShareBus: { isChecked: false, value: "Food Share Bus" },
      healthDieticianSessions: { isChecked: false, value: "Dietician Sessions" },
      healthFoodHandling: { isChecked: false, value: "Food Handling" },
      healthAdultNutrition: { isChecked: false, value: "Adult Nutrition" },
      healthDiabetesSessions: { isChecked: false, value: "Diabetes Sessions" },
      healthHealthyChoices: { isChecked: false, value: "Healthy Choices" },
      healthHomeManagement: { isChecked: false, value: "Home Management" },
      healthStressManagement: { isChecked: false, value: "Stress Management" },
      healthCancerScreeningSpa: { isChecked: false, value: "Cancer Screening/Spa" },
      healthDiabetesManagement: { isChecked: false, value: "Diabetes Management" },
      healthSwimmingChildren: { isChecked: false, value: "Swimming Children" },
      healthSwimmingLadies: { isChecked: false, value: "Swimming Ladies" },
      healthSwimmingAquaFitMale: { isChecked: false, value: "Swimming AquaFit Male" },
      healthSwimmingAquaFitFemale: { isChecked: false, value: "Swimming AquaFit Female" }
    },

    employment: {
      tutoring: { isChecked: false, value: "Tutoring" },
      jobClub: { isChecked: false, value: "Job Club" },
      childMinding: { isChecked: false, value: "Child Minding" },
      computerBasic: { isChecked: false, value: "Computer Basic" },
      citizenshipRefugees: { isChecked: false, value: "" },
      communityAssistant: { isChecked: false, value: "Community Assistant" },
      computerIntermediate: { isChecked: false, value: "Computer Intermediate" },
      interestedInVolunteering: { isChecked: false, value: "Interested in Volunteering" },
      publicSpeaking: { isChecked: false, value: "Public Speaking Level 1 & 2" },
      foreignTrainedHealthProfessionals: { isChecked: false, value: "Foreign Trained Health Professionals" }
    },

    staff: "",

    neighbourhood_net: {
      neighbourhoodCitizenship: { isChecked: false, value: "Citizenship" },
      neighbourhoodIncomeTax: { isChecked: false, value: "IncomeTax" },
      neighbourhoodOther: { isChecked: false, value: "Other" }
    },

    others: "",
    agent_notes: "",

    // Member Details
    ques_1: "",
    ques_2: "",
    ques_3: "",
    ques_4: "",
    ques_5: "",
    ques_6: "",
    ques_7: "",
    family_doctor: "",
    walkin_clinic: "",
    emergency_room: "",
    hospital: "",
    ques_8: "",
    ques_9: "",
    ques_10: ""
  };

  handleSubmit = async e => {
    e.preventDefault();

    const { firstname, middlename, lastname, gender, age, address, city, province, postal_code, country, cell_no, home_no, work_no, emergency_cntName, emergency_contNo, email_id, first_language, refer_through, /* child_program, */ after_school_program, /* health, employment, */ staff, /* neighbourhood_net, */ others, agent_notes, ques_1, ques_2, ques_3, ques_4, ques_5, ques_6, ques_7, family_doctor, walkin_clinic, emergency_room, hospital, ques_8, ques_9, ques_10 } = this.state;

    const child_program = "2";
    const health = "NA";
    const employment = "IT";
    const neighbourhood_net = "NA";

    /*  const testhealth = this.state.health;
    const testemployment = this.state.employment;
    const testneighbourhood_net = this.state.neighbourhood_net;

    console.log("HEALTH: " + testhealth.healthZumba.value);
    console.log("EMPLOYMENT: " + testemployment);
    console.log("NEIGHBOUR: " + testneighbourhood_net); */

    try {
      const response = await Axios.post("/irf_register", { firstname, middlename, lastname, gender, age, address, city, province, postal_code, country, cell_no, home_no, work_no, emergency_cntName, emergency_contNo, email_id, first_language, refer_through, child_program, after_school_program, health, employment, staff, neighbourhood_net, others, agent_notes, ques_1, ques_2, ques_3, ques_4, ques_5, ques_6, ques_7, family_doctor, walkin_clinic, emergency_room, hospital, ques_8, ques_9, ques_10 });
      if (response.data) {
        alert("Submit Successfull.");
        console.log(response.data);
      }
    } catch (e) {
      alert("Error Message. Please fill all fields.");
      console.log(e.response.data);
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

  handleChangeChildProgram = idx => e => {
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

  inputChange = input => e => {
    this.setState({
      [input]: e.target.value
    });
  };

  inputCheckBoxHandler = inputParam => e => {
    const id = e.target.id;
    let input = this.state[inputParam];
    input[id].isChecked = !input[id].isChecked;
    this.setState({ [input]: input });
  };

  nextStep = e => {
    e.preventDefault();
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
        return <ContactDetails prevStep={this.prevStep} nextStep={this.nextStep} inputChange={this.inputChange} values={values} inputChangeChildProgram={this.inputChangeChildProgram} handleChangeChildProgram={this.handleChangeChildProgram} addChild={this.addChild} removeChild={this.removeChild} page="IRF" />;
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

    return (
      <React.Fragment>
        <FormStepper step={step} steps={steps} />
        {this.getStepContent(step, values)}
        {/* <Spinner animation="border" /> */}
      </React.Fragment>
    );
  }
}

export default IRF;

/* const firstname = "Arun";
    const lastname = "Arun";
    const middlename = "arun";
    const gender = "male";
    const age = "32";
    const address = "Palay";
    const city = "Tvl";
    const province = "TN";
    const postal_code = "627002";
    const country = "IND";
    const home_no = "04622";
    const cell_no = "1234567890";
    const work_no = "123456789";
    const emergency_cntName = "Arun";
    const emergency_contNo = "0123456789";
    const email_id = "pppp@gmail.com";
    const first_language = "TAMIL";
    const refer_through = "WEB";
    const after_school_program = "YES";
    const staff = "NA";
    const agent_notes = "NIL";
    const others = "NA";
    const ques_1 = "Avg";
    const ques_2 = "Avg";
    const ques_3 = "Avg";
    const ques_4 = "Avg";
    const ques_5 = "Avg";
    const ques_6 = "Avg";
    const ques_7 = "Avg";
    const family_doctor = "NA";
    const walkin_clinic = "NA";
    const emergency_room = "NA";
    const hospital = "NA";
    const ques_8 = "Avg";
    const ques_9 = "Avg";
    const ques_10 = "Avg"; */
