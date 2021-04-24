import React, { useState, useEffect } from "react";
import Axios from "axios";
import swal from "sweetalert";
import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";

import Page from "../../common/Page";
import Container from "../../common/Container";
import FormInput from "../../FormFields/FormInput";

function Grade() {
  const [loading, setLoading] = useState(false);
  const [categoryAndProgramList, setCategoryAndProgramList] = useState({});
  const [categoryList, setCategoryList] = useState([]);
  const [programList, setProgramList] = useState([]);

  // const [categoryValue, setCategoryValue] = useState("");
  const [programValue, setProgramValue] = useState("");
  const [fileValue, setFileValue] = useState("");
  const [gradeValue, setGradeValue] = useState("");
  const [commentValue, setCommentValue] = useState("");

  const [fileList, setFileList] = useState([]);
  const [fileNameList, setFileNameList] = useState([]);

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

  const fileHandleChange = value => {
    setFileValue(value);
  };

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
        // setFileList(response.data.data);
        let fileName = [];
        response.data.data.map(file => fileName.push(file.FileName));
        setFileNameList([...fileNameList, ...fileName]);
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

  const addGrade = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await Axios.post("/addgrade", { FileName: fileValue, usergrade: gradeValue, agentcomments: commentValue });
      setLoading(false);

      if (response.data.success === true) {
        swal("Updated", "Program Grade and Agent Comments Updated", "success");
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
          <Page title="Grade">
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
                <button className="btn btn-block btn-primary">Show Grade</button>
              </div>
            </form>
          </Page>
          <Container title="Add or Edit Grade">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    {loading ? (
                      <Loader type="ThreeDots" color="#00BFFF" height={100} width={100} visible={true} style={{ top: "50%", left: "50%", position: "absolute" }} />
                    ) : (
                      <form onSubmit={e => addGrade(e)}>
                        <div className="row">
                          <div className="col-md-4">
                            <div className={`form-group row`}>
                              <select name="account" className="form-control" onChange={e => fileHandleChange(e.target.value)}>
                                <option>Select File Name</option>;
                                {fileNameList.map(fileName => {
                                  return <option value={fileName}>{fileName}</option>;
                                })}
                              </select>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <FormInput icon="fa fa-list-alt" type="text" placeholder="Enter Grade" changeHandler={e => setGradeValue(e.target.value)} />
                          </div>
                          <div className="col-md-4">
                            <FormInput icon="fa fa-list-alt" type="text" placeholder="Agent Comments" changeHandler={e => setCommentValue(e.target.value)} />
                          </div>
                        </div>
                        <div className="row justify-content-center">
                          <div className="col col-sm-4 col-md-3 col-lg-2">
                            <button className="btn btn-block btn-primary">Submit</button>
                          </div>
                        </div>
                      </form>
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

export default Grade;
