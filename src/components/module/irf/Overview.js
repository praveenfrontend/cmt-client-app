import React from "react";
import Page from "../../common/Page";
import { Accordion, Card } from "react-bootstrap";
import TableRow from "../../Table/TableRow";
import Table from "../../Table/Table";

function Overview({ values, inputChange, prevStep, handleSubmit }) {
  const { firstName, middleName, lastName, gender, age, streetAddress, city, province, zipCode, country, phoneCell, phoneHome, phoneWork, EmerContactName, EmerContactNo, email, firstLang, aboutUs, ChildValue, child_program, after_school_program, userprograms, /* health, employment, staff, neighbourhood_net, */ Others, notes, myHealth, myLifeSatisfaction, mySocialNetwork, myCommunityNetwork, myStressLevel, myHealthIssues, myFamilyDoctor, myVisitToFamilyDoctor, myVisitToClinic, myVisitToEmergency, myVisitToHospital, myDiseaseAwareness, myCmtProgramAwareness, myPhysicalActiveness } = values;

  let child_program_value = child_program.map((child, index) => {
    return child.childFirstName + ", " + child.childLastName + ", " + child.childBirthDate;
  });

  const tableHeader = ["S.No", "Label", "Value"];

  const basicDetailsRows = {
    "First Name": firstName,
    "Middle Name": middleName,
    "Last Name": lastName,
    Gender: gender,
    Age: age,
    "Street Address": streetAddress,
    City: city,
    Province: province,
    Zipcode: zipCode,
    Country: country
  };

  const contactDetailsRows = {
    "Mobile Phone": phoneCell,
    "Home Phone": phoneHome,
    "Work Phone": phoneWork,
    "Emergency Contact Name": EmerContactName,
    "Emergency Contact Number": EmerContactNo,
    Email: email,
    "First Language": firstLang,
    "How did you learn about us?": aboutUs,
    "Child Program": ChildValue,
    "Child Details": child_program_value
  };

  let communityDetailsRows = {
    "After School Program (3:30 - 6)": after_school_program
  }
  Object.entries(values.userprograms).map(([programName,programs]) => {
    communityDetailsRows[programName] = Object.entries(programs).map(([key, value]) => {
      return value.isChecked && value.value + ", ";
    });
  })
  communityDetailsRows['Others, if any'] = Others;
  communityDetailsRows['Agent Notes'] = notes;

  const memberDetailsRows = {
    "My Overall health": myHealth,
    "My Satisfaction with life": myLifeSatisfaction,
    "My social networks of family and friends are": mySocialNetwork,
    "My level of connection with my community is": myCommunityNetwork,
    "My level of stress is": myStressLevel,
    "I can talk to others about my personal health issues": myHealthIssues,
    "Do you have a family doctor?": myFamilyDoctor,
    "Number of times each year I visit Family Doctor": myVisitToFamilyDoctor,
    "Number of times each year I visit Walk in Clinic": myVisitToClinic,
    "Number of times each year I visit Emergency Room": myVisitToEmergency,
    "Number of times each year I visit Hospital": myVisitToHospital,
    "Awareness of risk factor": myDiseaseAwareness,
    "Awareness of healthy living and physical activity": myCmtProgramAwareness,
    "I am physically active": myPhysicalActiveness
  };

  return (
    <Page title="Overview">
      <Accordion defaultActiveKey="0">
        <div className="card">
          <Accordion.Toggle as={Card.Header} eventKey="0">
            <div className="card-header bg-primary">
              <h4 className="text-white">Basic and Contact Details</h4>
            </div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="text-bold">Basic Details</h4>
                    </div>
                    <div className="card-body">
                      <Table tableHeader={tableHeader}>
                        <TableRow rows={basicDetailsRows} />
                      </Table>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="text-bold">Contact Details</h4>
                    </div>
                    <div className="card-body">
                      <Table tableHeader={tableHeader}>
                        <TableRow rows={contactDetailsRows} />
                      </Table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Accordion.Collapse>
        </div>

        <div className="card">
          <Accordion.Toggle as={Card.Header} eventKey="1">
            <div className="card-header bg-primary">
              <h4 className="text-white">Community Matters Program</h4>
            </div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <Table tableHeader={tableHeader}>
                        <TableRow rows={communityDetailsRows} />
                      </Table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Accordion.Collapse>
        </div>

        <div className="card">
          <Accordion.Toggle as={Card.Header} eventKey="2">
            <div className="card-header bg-primary">
              <h4 className="text-white">Member Details</h4>
            </div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="2">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <Table tableHeader={tableHeader}>
                        <TableRow rows={memberDetailsRows} />
                      </Table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Accordion.Collapse>
        </div>
      </Accordion>

      <br />
      <div className="row justify-content-center">
        <div className="col col-sm-4 col-md-3 col-lg-2">
          <button className="btn btn-block btn-danger" onClick={prevStep}>
            Back
          </button>
        </div>
        <div className="col col-sm-4 col-md-3 col-lg-2">
          <button className="btn btn-block btn-success" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </Page>
  );
}

export default Overview;
