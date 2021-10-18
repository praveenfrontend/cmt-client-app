import React, { useState, useEffect } from "react";
import Axios from "axios";
import Loader from "react-loader-spinner";

import Page from "../../common/Page";
import Container from "../../common/Container";

function NotesReport() {
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [programList, setProgramList] = useState([]);
  const [zipCodeList, setZipCodeList] = useState([]);

  const [categoryValue, setCategoryValue] = useState("");
  const [programValue, setProgramValue] = useState("");
  const [zipValue, setZipValue] = useState("");

  const [notesTableData, setNotesTableData] = useState([]);

  useEffect(() => {
    const categoryDropDown = async () => {
      setLoading(true);
      await Axios.get("/returncategory")
        .then(response => {
          setCategoryList([...categoryList, ...response.data.reportcategory]);
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
        });
    };

    const programDropDown = async () => {
      setLoading(true);
      await Axios.get("/reportprograms")
        .then(response => {
          setProgramList([...programList, ...response.data.reportprograms]);
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
        });
    };

    const zipCodeDropDown = async () => {
      setLoading(true);
      await Axios.get("/returnzipcode")
        .then(response => {
          setZipCodeList([...zipCodeList, ...response.data.reportcodes]);
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
        });
    };

    categoryDropDown();
    programDropDown();
    zipCodeDropDown();
  }, []);

  useEffect(() => {
    async function fetchResults() {
      setLoading(true);
      let url = "";
      if (categoryValue !== "" && programValue !== "" && zipValue !== "" && categoryValue !== "Select" && programValue !== "Select" && zipValue !== "Select") {
        url = `/notesreport?category=${categoryValue}&programName=${programValue}&zipCode=${zipValue}`;
      } else if (categoryValue !== "" && programValue !== "" && categoryValue !== "Select" && programValue !== "Select") {
        url = `/notesreport?category=${categoryValue}&programName=${programValue}`;
      } else if (categoryValue !== "" && zipValue !== "" && categoryValue !== "Select" && zipValue !== "Select") {
        url = `/notesreport?category=${categoryValue}&zipCode=${zipValue}`;
      } else if (programValue !== "" && zipValue !== "" && programValue !== "Select" && zipValue !== "Select") {
        url = `/notesreport?programName=${programValue}&zipCode=${zipValue}`;
      } else if (categoryValue !== "" && categoryValue !== "Select") {
        url = `/notesreport?category=${categoryValue}`;
      } else if (programValue !== "" && programValue !== "Select") {
        url = `/notesreport?programName=${programValue}`;
      } else if (zipValue !== "" && zipValue !== "Select") {
        url = `/notesreport?zipCode=${zipValue}`;
      } else {
        url = "/notesreport";
      }

      await Axios.get(url)
        .then(response => {
          setNotesTableData([...response.data.data.notesreport]);
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
        });
    }
    fetchResults();
  }, [categoryValue, programValue, zipValue]);

  useEffect(() => {
    async function fetchResults() {
      setLoading(true);

      let urlForPrograms = "", urlForZipCode = "";

      const category = (categoryValue !== "" && categoryValue !== "Select" ) ? `category=${categoryValue}&` : ``;
      const program = (programValue !== "" && programValue !== "Select" ) ? `programName=${programValue}` : ``;
      const zip = (zipValue !== "" && zipValue !== "Select" ) ? `zipCode=${zipValue}` : ``;

      urlForPrograms = '/reportprograms?' +  category + zip;
      urlForZipCode = '/returnzipcode?' +  category + program;
                        
      await Axios.get(urlForPrograms)
          .then(response => {
            setProgramList([...response.data.reportprograms]);
            setLoading(false);
          })
          .catch(error => {
            setLoading(false);
          });

      await Axios.get(urlForZipCode)
          .then(response => {
            setZipCodeList([...response.data.reportcodes]);
            setLoading(false);
          })
          .catch(error => {
            setLoading(false);
          });

    }
    fetchResults();
  }, [categoryValue]);

  useEffect(() => {
    async function fetchResults() {
      setLoading(true);

      let urlForZipCode = "";

      const category = (categoryValue !== "" && categoryValue !== "Select" ) ? `category=${categoryValue}&` : ``;
      const program = (programValue !== "" && programValue !== "Select" ) ? `programName=${programValue}` : ``;

      urlForZipCode = '/returnzipcode?' +  category + program;
                        
      await Axios.get(urlForZipCode)
          .then(response => {
            setZipCodeList([...response.data.reportcodes]);
            setLoading(false);
          })
          .catch(error => {
            setLoading(false);
          });

    }
    fetchResults();
  }, [programValue]);

  const categoryHandleChange = value => {
    setCategoryValue(value);
  };
  const programHandleChange = value => {
    setProgramValue(value);
  };
  const zipHandleChange = value => {
    setZipValue(value);
  };

  return (
    <section className="forms">
      <div className="container-fluid">
        <Page title="Notes Reports">
          <form>
            <div className="row">
              <div className="col-md-4">
                <div className={`form-group row`}>
                  <label className="col-sm-4 form-control-label">Category Name</label>
                  <div className="col-sm-8 mb-3">
                    <select name="account" className="form-control" onChange={e => categoryHandleChange(e.target.value)}>
                      <option>Select</option>;
                      {categoryList.map(category => {
                        return <option value={category}>{category}</option>;
                      })}
                    </select>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className={`form-group row`}>
                  <label className="col-sm-4 form-control-label">Program Name</label>
                  <div className="col-sm-8 mb-3">
                    <select name="account" className="form-control" onChange={e => programHandleChange(e.target.value)}>
                      <option>Select</option>;
                      {programList.map(program => {
                        return <option value={program}>{program}</option>;
                      })}
                    </select>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className={`form-group row`}>
                  <label className="col-sm-4 form-control-label">Zip Code</label>
                  <div className="col-sm-8 mb-3">
                    <select name="account" className="form-control" onChange={e => zipHandleChange(e.target.value)}>
                      <option>Select</option>;
                      {zipCodeList.map(zipcode => {
                        return <option value={zipcode}>{zipcode}</option>;
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Page>
        <Container title={notesTableData.length !== 0 ? `Member Details - ${notesTableData.length} records found` : "Member Details"} download={notesTableData.length !== 0 ? true : false} filename="NotesReports">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12">
                  {loading ? (
                    <Loader type="ThreeDots" color="#00BFFF" height={100} width={100} visible={true} style={{ top: "50%", left: "50%", position: "absolute" }} />
                  ) : (
                    <div className="card">
                      <div className="card-body">
                        <div class="table-responsive">
                          <table class="table" id="table-to-xls">
                            <thead>
                              <tr>
                                <th>Reg Id</th>
                                <th>Program</th>
                                <th>Status</th>
                                <th>Participant Comments</th>
                                <th>Additional Comments</th>
                                <th>Agent Notes</th>
                              </tr>
                            </thead>
                            <tbody>
                              {notesTableData.length !== 0
                                ? notesTableData.map((goal, val) => {
                                    return (
                                      <tr key={val}>
                                        <td>{goal.userId}</td>
                                        <td>{goal.user_goal_program_name}</td>
                                        <td>{goal.user_goal_program_status}</td>
                                        <td>{goal.user_goal_program_participantcomments}</td>
                                        <td>{goal.user_goal_program_additionalcomments}</td>
                                        <td>{goal.notes}</td>
                                      </tr>
                                    );
                                  })
                                : ""}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      {notesTableData.length === 0 && <h1 className="m-auto text-muted">No Data Available</h1>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

export default NotesReport;
