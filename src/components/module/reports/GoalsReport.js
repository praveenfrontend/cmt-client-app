import React, { useState, useEffect } from "react";
import Axios from "axios";
import Loader from "react-loader-spinner";

import Page from "../../common/Page";
import Container from "../../common/Container";

function GoalsReport() {
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [programList, setProgramList] = useState([]);
  const [zipCodeList, setZipCodeList] = useState([]);

  const [categoryValue, setCategoryValue] = useState("");
  const [programValue, setProgramValue] = useState("");
  const [zipValue, setZipValue] = useState("");

  const [goalTableData, setGoalTableData] = useState([]);

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
        url = `/goalreport?category=${categoryValue}&programName=${programValue}&zipCode=${zipValue}`;
      } else if (categoryValue !== "" && programValue !== "" && categoryValue !== "Select" && programValue !== "Select") {
        url = `/goalreport?category=${categoryValue}&programName=${programValue}`;
      } else if (categoryValue !== "" && zipValue !== "" && categoryValue !== "Select" && zipValue !== "Select") {
        url = `/goalreport?category=${categoryValue}&zipCode=${zipValue}`;
      } else if (programValue !== "" && zipValue !== "" && programValue !== "Select" && zipValue !== "Select") {
        url = `/goalreport?programName=${programValue}&zipCode=${zipValue}`;
      } else if (categoryValue !== "" && categoryValue !== "Select") {
        url = `/goalreport?category=${categoryValue}`;
      } else if (programValue !== "" && programValue !== "Select") {
        url = `/goalreport?programName=${programValue}`;
      } else if (zipValue !== "" && zipValue !== "Select") {
        url = `/goalreport?zipCode=${zipValue}`;
      } else {
        url = "/goalreport";
      }

      await Axios.get(url)
        .then(response => {
          setGoalTableData([...response.data.data.goalreport]);
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
        <Page title="Goals Reports">
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
        <Container title={goalTableData.length !== 0 ? `Member Details - ${goalTableData.length} records found` : "Member Details"} download={goalTableData.length !== 0 ? true : false} filename="GoalReports">
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
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Zip Code</th>
                                <th>Category</th>
                                <th>Program</th>
                                <th>Rating Before</th>
                                <th>Rating After</th>
                              </tr>
                            </thead>
                            <tbody>
                              {goalTableData.length !== 0
                                ? goalTableData.map((goal, val) => {
                                    return (
                                      <tr key={val}>
                                        <td>{goal.userId}</td>
                                        <td>{goal.firstName}</td>
                                        <td>{goal.lastName}</td>
                                        <td>{goal.zipCode}</td>
                                        <td>{goal.user_goal_category_name}</td>
                                        <td>{goal.user_goal_program_name}</td>
                                        <td>{goal.user_goal_program_RatingBefore}</td>
                                        <td>{goal.user_goal_program_RatingAfter}</td>
                                      </tr>
                                    );
                                  })
                                : ""}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      {goalTableData.length === 0 && <h1 className="m-auto text-muted">No Data Available</h1>}
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

export default GoalsReport;
