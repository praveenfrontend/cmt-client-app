import React, { useState, useEffect } from "react";
import Axios from "axios";
import swal from "sweetalert";
import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";

import Page from "../../common/Page";
import Container from "../../common/Container";
import FormInput from "../../FormFields/FormInput";

function ProgramDetails() {
  const [loading, setLoading] = useState(false);
  const [categoryAndProgramList, setCategoryAndProgramList] = useState({});
  const [categoryList, setCategoryList] = useState([]);
  const [programList, setProgramList] = useState([]);

  // const [categoryValue, setCategoryValue] = useState("");
  const [programValue, setProgramValue] = useState("");

  const [fileList, setFileList] = useState([]);

  const userType = "Admin";

  useEffect(() => {
    const categoryDropDown = async () => {
      setLoading(true);
      await Axios.get("/showprograms")
        .then(response => {
          setCategoryAndProgramList(response.data.data);
          const category = Object.keys(response.data.data);
          setCategoryList([...categoryList, ...category]);
          setLoading(false);
        })
        .catch(error => {
          console.log(error.response);
          setLoading(false);
        });
    };
    categoryDropDown();
  }, []);

  const categoryHandleChange = value => {
    // setCategoryValue(value);
    setProgramList(categoryAndProgramList[value]);
  };

  const programHandleChange = value => {
    setProgramValue(value);
  };

  const showFiles = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await Axios.get(`/displayfiles?Program_Name=${programValue}&UserType=${userType}`);
      setLoading(false);

      console.log(response.data.data);

      if (response.data.success === true) {
        setFileList(response.data.data);
      } else {
        swal("Something went wrong", e.response, "error");
      }
    } catch (e) {
      // if (e.response === null) {
      swal("Something went wrong.", e.response, "error");
      // }
      setLoading(false);
    }
  };

  return (
    <LoadingOverlay active={loading} spinner={<Loader type="ThreeDots" color="#00BFFF" height={100} width={100} visible={true} />}>
      <section className="forms">
        <div className="container-fluid">
          <Page title="Program">
            <form onSubmit={e => showFiles(e)}>
              <div className="row">
                <div className="col-md-5">
                  <div className={`form-group row`}>
                    <label className="col-sm-5 form-control-label">Category Name</label>
                    <div className="col-sm-7 mb-3">
                      <select name="account" className="form-control" onChange={e => categoryHandleChange(e.target.value)}>
                        <option>Select Category</option>;
                        {categoryList.map(category => {
                          return <option value={category}>{category}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="col-md-5">
                  <div className={`form-group row`}>
                    <label className="col-sm-5 form-control-label">Program Name</label>
                    <div className="col-sm-7 mb-3">
                      <select name="account" className="form-control" onChange={e => programHandleChange(e.target.value)}>
                        <option>Select Program</option>;
                        {programList.map(program => {
                          return <option value={program}>{program}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <button className="btn btn-block btn-primary">Show Files</button>
              </div>
            </form>
          </Page>
          <Container title="Files">
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
                                  <th>Program Name</th>
                                  <th>Sent From</th>
                                  <th>File Name</th>
                                  <th>File Location</th>
                                  <th>User Grade</th>
                                  <th>Agent Comments</th>
                                </tr>
                              </thead>
                              <tbody>
                                {fileList.length !== 0
                                  ? fileList.map((program, val) => {
                                      return (
                                        <tr key={val}>
                                          <td>{program.Program_Name}</td>
                                          <td>{program.Sentfrom}</td>
                                          <td>{program.FileName}</td>
                                          <td>
                                            <a target="_blank" rel="noreferrer" href={program.File_Loc}>
                                              Download File
                                            </a>
                                          </td>
                                          <td>{program.usergrade}</td>
                                          <td>{program.agentcomments}</td>
                                        </tr>
                                      );
                                    })
                                  : ""}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        {fileList.length === 0 && <h1 className="m-auto text-muted">No Data Available</h1>}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>
    </LoadingOverlay>
  );
}

export default ProgramDetails;
