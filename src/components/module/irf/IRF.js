/* eslint-disable default-case */
import React, { Component } from "react";

import BasicDetails from "./BasicDetails";
import ContactDetails from "./ContactDetails";
import CommunityMattersProgram from "./CommunityMattersProgram";
import MemberDetails from "./MemberDetails";
import Overview from "./Overview";

import FormStepper from "./FormStepper";
import Axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";
// import * as ReactBootStrap from "react-bootstrap";

class IRF extends Component {
  state = {
    // Stepper
    step: 0,
    loading: false,

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
    country: "",

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
    childProgramAddRemove: true,
    child_program: [],

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
      citizenshipRefugees: { isChecked: false, value: "Citizenship/Refugees" },
      communityAssistant: { isChecked: false, value: "Community Assistant" },
      computerIntermediate: { isChecked: false, value: "Computer Intermediate" },
      interestedInVolunteering: { isChecked: false, value: "Interested in Volunteering" },
      publicSpeaking: { isChecked: false, value: "Public Speaking Level 1 & 2" },
      foreignTrainedHealthProfessionals: { isChecked: false, value: "Foreign Trained Health Professionals" }
    },

    staff: {
      staffVolunteer: { isChecked: false, value: "Volunteer" },
      staffCommunityAssistant: { isChecked: false, value: "Community Assistant" }
    },

    neighbourhood_net: {
      neighbourhoodCitizenship: { isChecked: false, value: "Citizenship" },
      neighbourhoodIncomeTax: { isChecked: false, value: "IncomeTax" },
      neighbourhoodOther: { isChecked: false, value: "Other" }
    },

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

  handleSubmit = async e => {
    e.preventDefault();

    const { firstName, middleName, lastName, gender, age, streetAddress, city, province, zipCode, country, phoneCell, phoneHome, phoneWork, EmerContactName, EmerContactNo, email, firstLang, aboutUs, ChildValue, child_program, after_school_program, health, employment, staff, neighbourhood_net, Others, notes, myHealth, myLifeSatisfaction, mySocialNetwork, myCommunityNetwork, myStressLevel, myHealthIssues, myFamilyDoctor, myVisitToFamilyDoctor, myVisitToClinic, myVisitToEmergency, myVisitToHospital, myDiseaseAwareness, myCmtProgramAwareness, myPhysicalActiveness } = this.state;

    const userprograms = {
      health,
      employment,
      neighbourhood_net,
      staff
    };

    try {
      this.setState({ loading: true });
      const response = await Axios.post("/irf_register", { firstName, middleName, lastName, gender, age, streetAddress, city, province, zipCode, country, phoneCell, phoneHome, phoneWork, EmerContactName, EmerContactNo, email, firstLang, aboutUs, ChildValue, child_program, after_school_program, userprograms, Others, notes, myHealth, myLifeSatisfaction, mySocialNetwork, myCommunityNetwork, myStressLevel, myHealthIssues, myFamilyDoctor, myVisitToFamilyDoctor, myVisitToClinic, myVisitToEmergency, myVisitToHospital, myDiseaseAwareness, myCmtProgramAwareness, myPhysicalActiveness });

      if (response.data.success === true) {
        const regId = response.data.id;
        console.log("regId: ", regId);
        console.log(response.data);
        this.setState({ loading: false });
        alert("Your Registration ID is: " + regId);
      }
    } catch (e) {
      alert("Error Message. Please fill all fields.");
      console.log(e.response.data);
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
      alert("Atleast 1 Child row has to be selected to remove!");
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
