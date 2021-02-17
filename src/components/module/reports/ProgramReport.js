import React, { useState, useEffect } from "react";
import Axios from "axios";
import Loader from "react-loader-spinner";

import Page from "../../common/Page";
import Container from "../../common/Container";

function ProgramReport() {
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [programList, setProgramList] = useState([]);
  const [zipCodeList, setZipCodeList] = useState([]);

  const [categoryValue, setCategoryValue] = useState("");
  const [programValue, setProgramValue] = useState("");
  const [zipValue, setZipValue] = useState("");

  const [programTableData, setProgramTableData] = useState([]);

  useEffect(() => {
    const categoryDropDown = async () => {
      setLoading(true);
      await Axios.get("/returncategory")
        .then(response => {
          setCategoryList([...categoryList, ...response.data.reportcategory]);
          setLoading(false);
        })
        .catch(error => {
          console.log(error.response);
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
          console.log(error.response);
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
          console.log(error.response);
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
        console.log("effect: ", categoryValue + " " + programValue + " " + zipValue);
        url = `/programreport?category=${categoryValue}&programName=${programValue}&zipCode=${zipValue}`;
      } else if (categoryValue !== "" && programValue !== "" && categoryValue !== "Select" && programValue !== "Select") {
        console.log("effect: ", categoryValue + " " + programValue);
        url = `/programreport?category=${categoryValue}&programName=${programValue}`;
      } else if (categoryValue !== "" && zipValue !== "" && categoryValue !== "Select" && zipValue !== "Select") {
        console.log("effect: ", categoryValue + " " + zipValue);
        url = `/programreport?category=${categoryValue}&zipCode=${zipValue}`;
      } else if (programValue !== "" && zipValue !== "" && programValue !== "Select" && zipValue !== "Select") {
        console.log("effect: ", programValue + " " + zipValue);
        url = `/programreport?programName=${programValue}&zipCode=${zipValue}`;
      } else if (categoryValue !== "" && categoryValue !== "Select") {
        console.log("effect: ", categoryValue);
        url = `/programreport?category=${categoryValue}`;
      } else if (programValue !== "" && programValue !== "Select") {
        console.log("effect: ", programValue);
        url = `/programreport?programName=${programValue}`;
      } else if (zipValue !== "" && zipValue !== "Select") {
        console.log("effect: ", zipValue);
        url = `/programreport?zipCode=${zipValue}`;
      } else {
        console.log("effect all");
        url = "/programreport";
      }

      await Axios.get(url)
        .then(response => {
          setProgramTableData([...response.data.data.programreport]);
          setLoading(false);
        })
        .catch(error => {
          console.log(error.response);
          setLoading(false);
        });
    }
    fetchResults();
  }, [categoryValue, programValue, zipValue]);

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
        <Page title="Program Reports">
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
        <Container title={programTableData.length !== 0 ? `Member Details - ${programTableData.length} records found` : "Member Details"} download={programTableData.length !== 0 ? true : false} filename="ProgramReports">
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
                                <th>Email ID</th>
                                <th>Phone Number</th>
                                <th>Zip Code</th>
                                <th>Program</th>
                                <th>Category</th>
                              </tr>
                            </thead>
                            <tbody>
                              {programTableData.length !== 0
                                ? programTableData.map((program, val) => {
                                    return (
                                      <tr key={val}>
                                        <td>{program.userId}</td>
                                        <td>{program.firstName}</td>
                                        <td>{program.lastName}</td>
                                        <td>{program.email}</td>
                                        <td>{program.phoneCell}</td>
                                        <td>{program.zipCode}</td>
                                        <td>{program.programName}</td>
                                        <td>{program.category}</td>
                                      </tr>
                                    );
                                  })
                                : ""}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      {programTableData.length === 0 && <h1 className="m-auto text-muted">No Data Available</h1>}
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

export default ProgramReport;
