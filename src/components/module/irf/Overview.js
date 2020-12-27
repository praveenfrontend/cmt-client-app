import React from "react";
import Page from "../../common/Page";
import { Accordion, Card } from "react-bootstrap";
import TableRow from "../../Table/TableRow";
import Table from "../../Table/Table";

function Overview({ values, inputChange, prevStep, handleSubmit }) {
  const { firstname, middlename, lastname, gender, age, address, city, province, postal_code, country, cell_no, home_no, work_no, emergency_cntName, emergency_contNo, email_id, first_language, refer_through, child_program, after_school_program, health, employment, staff, neighbourhood_net, others, agent_notes, ques_1, ques_2, ques_3, ques_4, ques_5, ques_6, ques_7, family_doctor, walkin_clinic, emergency_room, hospital, ques_8, ques_9, ques_10 } = values;

  let health_value = Object.keys(health).map((key, value) => {
    return health[key].isChecked ? health[key].value + ", " : null;
  });

  let employment_value = Object.keys(employment).map((key, value) => {
    return employment[key].isChecked ? employment[key].value + ", " : null;
  });

  let neighbourhood_value = Object.keys(neighbourhood_net).map((key, value) => {
    return neighbourhood_net[key].isChecked ? neighbourhood_net[key].value + ", " : null;
  });

  const tableHeader = ["S.No", "Label", "Value"];

  const basicDetailsRows = {
    "First Name": firstname,
    "Middle Name": middlename,
    "Last Name": lastname,
    Gender: gender,
    Age: age,
    "Street Address": address,
    City: city,
    Province: province,
    Zipcode: postal_code,
    Country: country
  };

  const contactDetailsRows = {
    "Mobile Phone": cell_no,
    "Home Phone": home_no,
    "Work Phone": work_no,
    "Emergency Contact Name": emergency_cntName,
    "Emergency Contact Number": emergency_contNo,
    Email: email_id,
    "First Language": first_language,
    "How did you learn about us?": refer_through,
    "Child Program": child_program
  };

  const communityDetailsRows = {
    "After School Program (3:30 - 6)": after_school_program,
    Health: health_value,
    "Work Phone": employment_value,
    "Neighbourhood Net": neighbourhood_value,
    "Others, if any": others
  };

  const memberDetailsRows = {
    "My Overall health": ques_1,
    "My Satisfaction with life": ques_2,
    "My social networks of family and friends are": ques_3,
    "My level of connection with my community is": ques_4,
    "My level of stress is": ques_5,
    "I can talk to others about my personal health issues": ques_6,
    "Do you have a family doctor?": ques_7,
    "Number of times each year I visit Family Doctor": family_doctor,
    "Number of times each year I visit Walk in Clinic": walkin_clinic,
    "Number of times each year I visit Emergency Room": emergency_room,
    "Number of times each year I visit Hospital": hospital,
    "Awareness of risk factor": ques_8,
    "Awareness of healthy living and physical activity": ques_9,
    "I am physically active": ques_10
  };

  return (
    <Page title="Overview">
      <Accordion>
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
