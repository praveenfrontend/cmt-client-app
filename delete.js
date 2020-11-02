/* eslint-disable default-case */
import React, { Component } from "react";
import BasicDetails from "./BasicDetails";
import ContactDetails from "./ContactDetails";
import CommunityMattersProgram from "./CommunityMattersProgram";
import MemberDetails from "./MemberDetails";
import Overview from "./Overview";

class IRF extends Component {
  state = {
    step: 3,
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    age: "",
    address: "",
    city: "",
    province: "",
    postal: "",
    country: "",
    mobilePhone: "",
    homePhone: "",
    workPhone: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    email: "",
    firstLanguage: "",
    aboutUs: "",
    childProgram: "",
    afterSchoolProgram: "",
    healthZumba: { isChecked: false, value: "Zumba" },
    healthYoga: { isChecked: false, value: "Yoga" },

    /*  healthDental: { isChecked: false, value: "Dental" },
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
    healthSwimmingAquaFitFemale: { isChecked: false, value: "Swimming AquaFit Female" }, */

    healthTutoring: "",
    jobClub: "",
    childMinding: "",
    computerBasic: "",
    citizenshipRefugees: "",
    communityAssistant: "",
    computerIntermediate: "",
    interestedInVolunteering: "",
    publicSpeaking: "",
    foreignTrainedHealthProfessionals: "",
    staff: "",
    neighbourhoodNet: "",
    neighbourhoodIncomeTax: "",
    neighbourhoodOther: "",
    othersTextArea: "",
    agentNotesTextArea: "",
    memberHealth: "",
    memberSatisfaction: "",
    memberSocialNetwork: "",
    memberConnection: "",
    memberStress: "",
    memberPersonalHealth: "",
    memberFamilyDoctor: "",
    memberFamilyVisitFamilyDoctor: "",
    memberFamilyVisitClinic: "",
    memberFamilyVisitEmergencyRoom: "",
    memberFamilyVisitHospital: "",
    memberRiskFactors: "",
    memberFamilyhealthyLiving: "",
    memberFamilyPhysicallyActive: ""
  };

  inputChange = input => e => {
    this.setState({
      [input]: e.target.value
    });
  };

  inputCheckBoxHandler = e => {
    const id = e.target.id;
    let health = this.state[id];
    health.isChecked = !health.isChecked;
    this.setState({ [id]: health });
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  handleSubmit = () => {
    alert("Submit to be implemented");
  };

  render() {
    const { step } = this.state;
    const values = this.state;

    switch (step) {
      case 1:
        return <BasicDetails nextStep={this.nextStep} inputChange={this.inputChange} inputClick={this.inputClick} values={values} />;
      case 2:
        return <ContactDetails prevStep={this.prevStep} nextStep={this.nextStep} inputChange={this.inputChange} values={values} />;
      case 3:
        return <CommunityMattersProgram prevStep={this.prevStep} nextStep={this.nextStep} inputChange={this.inputChange} values={values} inputCheckBoxHandler={this.inputCheckBoxHandler} />;
      case 4:
        return <MemberDetails prevStep={this.prevStep} nextStep={this.nextStep} inputChange={this.inputChange} values={values} />;
      case 5:
        return <Overview prevStep={this.prevStep} handleSubmit={this.handleSubmit} inputChange={this.inputChange} values={values} />;
    }
  }
}

export default IRF;

/* 
const { firstName, middleName, lastName, gender, age, address, city, province, postal, country, mobilePhone, homePhone, workPhone, emergencyContactName, emergencyContactNumber, email, firstLanguage, aboutUs, childProgram, afterSchoolProgram, healthZumba, healthYoga, healthDental, healthKarate, healthMeditation, healthFoodMarket, healthBellyDancing, healthAdultPlus, healthEnglishCafe, healthBasicEnglish, healthHomeVistits, healthSocialGroup, healthHealthySmiles, healthVolleyBall, healthHeartAndStroke, healthFoodShareBus, healthDieticianSessions, healthFoodHandling, healthAdultNutrition, healthDiabetesSessions, healthHealthyChoices, healthHomeManagement, healthStressManagement, healthCancerScreeningSpa, healthDiabetesManagement, healthSwimmingChildren, healthSwimmingLadies, healthSwimmingAquaFitMale, healthSwimmingAquaFitFemale, healthTutoring, jobClub, childMinding, computerBasic, citizenshipRefugees, communityAssistant, computerIntermediate, interestedInVolunteering, publicSpeaking, foreignTrainedHealthProfessionals, staff, neighbourhoodNet, neighbourhoodIncomeTax, neighbourhoodOther, othersTextArea, agentNotesTextArea, memberHealth, memberSatisfaction, memberSocialNetwork, memberConnection, memberStress, memberPersonalHealth, memberFamilyDoctor, memberFamilyVisitFamilyDoctor, memberFamilyVisitClinic, memberFamilyVisitEmergencyRoom, memberFamilyVisitHospital, memberRiskFactors, memberFamilyhealthyLiving, memberFamilyPhysicallyActive } = this.state;

const values = { firstName, middleName, lastName, gender, age, address, city, province, postal, country, mobilePhone, homePhone, workPhone, emergencyContactName, emergencyContactNumber, email, firstLanguage, aboutUs, childProgram, afterSchoolProgram, healthZumba, healthYoga, healthDental, healthKarate, healthMeditation, healthFoodMarket, healthBellyDancing, healthAdultPlus, healthEnglishCafe, healthBasicEnglish, healthHomeVistits, healthSocialGroup, healthHealthySmiles, healthVolleyBall, healthHeartAndStroke, healthFoodShareBus, healthDieticianSessions, healthFoodHandling, healthAdultNutrition, healthDiabetesSessions, healthHealthyChoices, healthHomeManagement, healthStressManagement, healthCancerScreeningSpa, healthDiabetesManagement, healthSwimmingChildren, healthSwimmingLadies, healthSwimmingAquaFitMale, healthSwimmingAquaFitFemale, healthTutoring, jobClub, childMinding, computerBasic, citizenshipRefugees, communityAssistant, computerIntermediate, interestedInVolunteering, publicSpeaking, foreignTrainedHealthProfessionals, staff, neighbourhoodNet, neighbourhoodIncomeTax, neighbourhoodOther, othersTextArea, agentNotesTextArea, memberHealth, memberSatisfaction, memberSocialNetwork, memberConnection, memberStress, memberPersonalHealth, memberFamilyDoctor, memberFamilyVisitFamilyDoctor, memberFamilyVisitClinic, memberFamilyVisitEmergencyRoom, memberFamilyVisitHospital, memberRiskFactors, memberFamilyhealthyLiving, memberFamilyPhysicallyActive };     
*/
