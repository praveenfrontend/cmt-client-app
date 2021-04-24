import React, { useState, useEffect } from "react";
import Axios from "axios";
import swal from "sweetalert";
import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";

import Page from "../../common/Page";
import Container from "../../common/Container";
import FormInput from "../../FormFields/FormInput";

function AdminAddProgram() {
  const [loading, setLoading] = useState(false);
  const [categoryAndProgramList, setCategoryAndProgramList] = useState({});
  const [categoryList, setCategoryList] = useState([]);
  const [programList, setProgramList] = useState([]);

  const [categoryValue, setCategoryValue] = useState("");
  const [programValueForAdd, setProgramValueForAdd] = useState("");
  const [programValueForDelete, setProgramValueForDelete] = useState("");

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
    setCategoryValue(value);
  };
  const categoryHandleChangeForDelete = value => {
    setCategoryValue(value);
    setProgramList(categoryAndProgramList[value]);
  };
  const programHandleChangeForAdd = value => {
    setProgramValueForAdd(value);
  };
  const programHandleChangeForDelete = value => {
    setProgramValueForDelete(value);
  };

  const addProgram = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await Axios.post("/add_adpgm", { category: categoryValue, programName: programValueForAdd });
      setLoading(false);

      if (response.data.success === true) {
        swal("Program Added", "", "success");
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

  const deleteProgram = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await Axios.post("/delete_adpgm", { programName: programValueForDelete });
      setLoading(false);

      if (response.data.success === true) {
        swal("Program Deleted", "", "success");
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
          <Page title="Add a Program">
            <form onSubmit={e => addProgram(e)}>
              <div className="row">
                <div className="col-md-5">
                  <div className={`form-group row`}>
                    <label className="col-sm-5 form-control-label">Choose Category</label>
                    <div className="col-sm-7 mb-3">
                      <select name="account" className="form-control" onChange={e => categoryHandleChange(e.target.value)}>
                        <option>Select Existing</option>;
                        {categoryList.map(category => {
                          return <option value={category}>{category}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="col-md-1">
                  <p className="display-6 text-muted mt-2">[OR]</p>
                </div>

                <div className="col-md-5">
                  <div className={`form-group row`}>
                    <label className="col-sm-4 form-control-label">Add Category</label>
                    <div className="col-sm-8 mb-3">
                      <FormInput icon="fa fa-list-alt" type="text" placeholder="Add New Category" changeHandler={e => categoryHandleChange(e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-5">
                  <div className={`form-group row`}>
                    <label className="col-sm-5 form-control-label">Program Name</label>
                    <div className="col-sm-7 mb-3">
                      <FormInput icon="fa fa-list-alt" type="text" placeholder="Add New Program" changeHandler={e => programHandleChangeForAdd(e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-2">
                <button className="btn btn-block btn-primary">Add Program</button>
              </div>
            </form>
          </Page>

          <Page title="Delete a Program">
            <form onSubmit={e => deleteProgram(e)}>
              <div className="row">
                <div className="col-md-5">
                  <div className={`form-group row`}>
                    <label className="col-sm-5 form-control-label">Category Name</label>
                    <div className="col-sm-7 mb-3">
                      <select name="account" className="form-control" onChange={e => categoryHandleChangeForDelete(e.target.value)}>
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
                      <select name="account" className="form-control" onChange={e => programHandleChangeForDelete(e.target.value)}>
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
                <button className="btn btn-block btn-primary">Delete Program</button>
              </div>
            </form>
          </Page>
        </div>
      </section>
    </LoadingOverlay>
  );
}

export default AdminAddProgram;
