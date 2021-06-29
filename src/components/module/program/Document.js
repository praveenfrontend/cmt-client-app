import React, { useState, useEffect } from "react";
import Axios from "axios";
import swal from "sweetalert";
import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";

import Page from "../../common/Page";
import Container from "../../common/Container";
import FormInput from "../../FormFields/FormInput";
import { post } from "jquery";

function Document() {
  const [loading, setLoading] = useState(false);
  const [categoryAndProgramList, setCategoryAndProgramList] = useState({});
  const [categoryList, setCategoryList] = useState([]);
  const [programList, setProgramList] = useState([]);

  // const [categoryValue, setCategoryValue] = useState("");
  const [programValue, setProgramValue] = useState("");
  const [fileValue, setFileValue] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [gradeValue, setGradeValue] = useState("");
  const [commentValue, setCommentValue] = useState("");

  const [fileList, setFileList] = useState([]);
  const [fileNameList, setFileNameList] = useState([]);
  const [userType, setUserType] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");

  // const userType = "Admin";

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

  const fileHandler = e => {
    setSelectedFile(e.target.files[0]);
    console.warn("fileeee ", e.target.files[0]);
    const fileName = e.target.files[0].name;
    setSelectedFileName(fileName);
    document.getElementsByClassName("custom-file-label").innerHTML = fileName;
  };

  // const uploadFile = async e => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     const response = await Axios.get(`/displayfiles?Program_Name=${programValue}&UserType=${userType}`);
  //     setLoading(false);

  //     console.log(response.data.data);

  //     if (response.data.success === true) {
  //       // setFileList(response.data.data);
  //       let fileName = [];
  //       response.data.data.map(file => fileName.push(file.FileName));
  //       setFileNameList([...fileNameList, ...fileName]);
  //     } else {
  //       swal("Something went wrong", e.response, "error");
  //     }
  //   } catch (e) {
  //     // if (e.response === null) {
  //     swal("Something went wrong.", e.response, "error");
  //     // }
  //     setLoading(false);
  //   }
  // };

  const uploadFile = async e => {
    e.preventDefault();
    // setLoading(true);

    const irfUserID = localStorage.getItem("irfUserID");

    const formData = new FormData();
    formData.append("FileName", fileValue);
    formData.append("Program_Name", programValue);
    formData.append("userID", irfUserID);
    formData.append("document", selectedFile);

    try {
      //   fetch("/upload", {
      //     method: "post",
      //     body: formData
      //   }).then(res => {
      //     if (res.ok) {
      //       console.log(res.data);
      //       swal("File uploaded", "", "success");
      //     }
      //   });

      const response = await Axios.post("/upload", formData);

      if (response.data.success === true) {
        swal("File uploaded", "", "success");
      } else if (response.data.success === false) {
        swal("Something went wrong", response.data.message, "warning");
      } else {
        swal("Something went wrong", e.response, "error");
      }

      // const response = await Axios.post("/upload");
      // setLoading(false);

      // if (response.data.success === true) {
      //   swal("Updated", "Program Grade and Agent Comments Updated", "success");
      // } else {
      //   swal("Something went wrong", e.response, "error");
      // }
    } catch (e) {
      // if (e.response === null) {
      swal("Something went wrong.", e.response, "error");
      // }
      // setLoading(false);
    }
  };

  return (
    <LoadingOverlay active={loading} spinner={<Loader type="ThreeDots" color="#00BFFF" height={100} width={100} visible={true} />}>
      <section className="forms">
        <div className="container-fluid">
          <Page title="Document">
            <form onSubmit={e => uploadFile(e)}>
              <div className="row">
                <div className="col-md-4">
                  {/* <div className={`form-group row`}> */}
                  <select name="account" className="form-control" onChange={e => categoryHandleChange(e.target.value)}>
                    <option>Select Category Name</option>;
                    {categoryList.map(category => {
                      return <option value={category}>{category}</option>;
                    })}
                  </select>
                  {/* </div> */}
                </div>
                <div className="col-md-4">
                  <select name="account" className="form-control" onChange={e => programHandleChange(e.target.value)}>
                    <option>Select Program Name</option>;
                    {programList.map(program => {
                      return <option value={program}>{program}</option>;
                    })}
                  </select>
                </div>
                <div className="col-md-4">
                  <FormInput icon="fa fa-list-alt" type="text" placeholder="File Name" changeHandler={e => fileHandleChange(e.target.value)} />
                </div>
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroupFileAddon01">
                    Upload
                  </span>
                </div>
                <div className="custom-file">
                  <input type="file" name="file" className="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" onChange={e => fileHandler(e)} />
                  <label className="custom-file-label" for="inputGroupFile01">
                    {selectedFileName ? selectedFileName : "Choose file"}
                  </label>
                </div>
              </div>

              <div className="col-md-3">
                <button className="btn btn-block btn-primary">Submit</button>
              </div>
            </form>
          </Page>
        </div>
      </section>
    </LoadingOverlay>
  );
}

export default Document;
