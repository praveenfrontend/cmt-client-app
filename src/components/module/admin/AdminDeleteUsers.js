import React, { useState, useEffect } from "react";
import Axios from "axios";
import swal from "sweetalert";
import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";

import Page from "../../common/Page";
import Container from "../../common/Container";
import FormInput from "../../FormFields/FormInput";

function AdminDeleteUsers() {
  const [loading, setLoading] = useState(false);
  const [usersAndEmailList, setUsersAndEmailList] = useState({});
  const [usersList, setUsersList] = useState([]);
  const [emailList, setEmailList] = useState([]);

  const [userValue, setUserValue] = useState("");
  const [emailValue, setEmailValue] = useState("");

  useEffect(() => {
    const categoryDropDown = async () => {
      setLoading(true);
      await Axios.get("/show_aduser")
        .then(response => {
          setUsersAndEmailList(response.data.data);
          const users = Object.keys(response.data.data);
          setUsersList([...usersList, ...users]);

          console.log(usersAndEmailList["Test"]);

          setLoading(false);
        })
        .catch(error => {
          console.log(error.response);
          setLoading(false);
        });
    };
    categoryDropDown();
  }, []);

  const userHandleChange = value => {
    setUserValue(value);
    setEmailList(usersAndEmailList[value]);
  };
  const emailHandleChange = value => {
    setEmailValue(value);
  };

  const deleteUser = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await Axios.post("/delete_aduser", { firstName: userValue, email: emailValue });
      setLoading(false);

      if (response.data.success === true) {
        swal("User Deleted", "", "success");
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
          <Page title="Delete User">
            <form onSubmit={e => deleteUser(e)}>
              <div className="row">
                <div className="col-md-5">
                  <div className={`form-group row`}>
                    <label className="col-sm-5 form-control-label">First Name</label>
                    <div className="col-sm-7 mb-3">
                      <select name="account" className="form-control" onChange={e => userHandleChange(e.target.value)}>
                        <option>Select User</option>;
                        {usersList.map(user => {
                          return <option value={user}>{user}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="col-md-5">
                  <div className={`form-group row`}>
                    <label className="col-sm-5 form-control-label">Email</label>
                    <div className="col-sm-7 mb-3">
                      <select name="account" className="form-control" onChange={e => emailHandleChange(e.target.value)}>
                        <option>Select Email</option>;
                        {emailList.map(email => {
                          return <option value={email}>{email}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <button className="btn btn-block btn-primary">Delete User</button>
              </div>
            </form>
          </Page>
        </div>
      </section>
    </LoadingOverlay>
  );
}

export default AdminDeleteUsers;
