/* eslint-disable default-case */
import React, { useEffect } from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import { useImmerReducer } from "use-immer";
// import { BrowserRouter } from "react-router-dom";
import IRF from "./components/module/irf/IRF";

import "./App.scss";
import Axios from "axios";
import StateContext from "./StateContext";
import DispatchContext from "./DispatchContext";
import SideNavigation from "./components/navs/SideNavigation";
import Header from "./components/navs/Header";
import AdminAddProgram from "./components/module/admin/AdminAddProgram";
import AdminDeleteUsers from "./components/module/admin/AdminDeleteUsers";
import ProgramDetailsNew from "./components/module/program/ProgramDetailsNew";
import Profile from "./components/module/profile/Profile";
import Search from "./components/module/search/Search";
import Reports from "./components/module/reports/Reports";
import Schedule from "./components/module/schedule/Schedule";
import EditUserDetails from "./components/module/search/userDetails/EditUserDetails";
import AddGoal from "./components/module/search/goals/AddGoal";
import EditGoal from "./components/module/search/goals/EditGoal";
import AddChild from "./components/module/search/childProgram/AddChild";
import EditChild from "./components/module/search/childProgram/EditChild";
import EditProgramDetails from "./components/module/search/programDetails/EditProgramDetails";
import UpdateHealthDetails from "./components/module/search/healthDetails/UpdateHealthDetails";

import ProgramReport from "./components/module/reports/ProgramReport";
import GoalsReport from "./components/module/reports/GoalsReport";
import NotesReport from "./components/module/reports/NotesReport";

import GuardedRoute from "./components/auth/GuardedRoute";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import { useState } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";

// Axios.defaults.baseURL = "http://localhost:8080";
// Axios.defaults.baseURL = "https://cors-anywhere.herokuapp.com/http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api";
Axios.defaults.baseURL = "https://peaceful-plains-21019.herokuapp.com/http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api";

function App(props) {

  const [menuHandleValue, setMenuHandleValue] = useState("");
  const [pageValue, setPageValue] = useState("");
  const [roleType, setRoleType] = useState("");

  const initialState = {
    signIn: true,
    flashMessages: [],
    loggedIn: Boolean(localStorage.getItem("communityMattersToken")),
    user: {
      token: localStorage.getItem("communityMattersToken"),
      username: localStorage.getItem("communityMattersUsername")
    },
    isToggled: true,
    registrationId: "",
    userDetails: {},
    goalDetails: [],
    childDetails: [],
    programDetails: [],
    healthDetails: [],
    loading: false
  };

  // Immer Code
  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true;
        draft.user = action.data;
        console.log("LOGGED IN DRAFT: " + draft.loggedIn);
        return;
      case "logout":
        draft.loggedIn = false;
        setRoleType("");
        console.log("LOGGED OUT DRAFT: " + draft.loggedIn);
        return;
      case "flashMessage":
        draft.flashMessages.push(action.value);
        return;
      case "signIn":
        draft.signIn = action.value;
        return;
      case "toggleMenu":
        draft.isToggled = action.value;
        return;
      case "registrationId":
        draft.registrationId = action.value;
        return;
      case "userDetails":
        draft.userDetails = action.value;
        return;
      case "goalDetails":
        draft.goalDetails = action.value;
        return;
      case "childDetails":
        draft.childDetails = action.value;
        return;
      case "programDetails":
        draft.programDetails = action.value;
        return;
      case "healthDetails":
        draft.healthDetails = action.value;
        return;
      case "loading":
        draft.loading = action.value;
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("communityMattersToken", state.user.token);
      // localStorage.setItem("communityMattersUsername", state.user.username);

      async function getProfile() {
        // setLoading(true);
        // const token = localStorage.getItem("communityMattersToken");
        try {
          // const response = await Axios.post("/profile", { token: token });
          const response = await Axios.post("/profile", { token: state.user.token });
          // setLoading(false);
          if (response.data.user !== null) {
            // setUser(response.data.user);
            localStorage.setItem("id", response.data.user.id);
            localStorage.setItem("irfUserID", response.data.user.IRFuserId);
            localStorage.setItem("roleType", response.data.user.roleType);
            localStorage.setItem("email", response.data.user.email);
            setRoleType(response.data.user.roleType);
          }
        } catch (e) {
          // swal("Something went wrong!", e.response, "error");
          // setLoading(false);
        }
      }
      getProfile();
    } else {
      localStorage.clear();
    }
  });

  const menuToggle = () => {
    if (window.outerWidth > 991) {
      setMenuHandleValue(menuHandleValue === "shrink" ? "" : "shrink");
      setPageValue(pageValue === "active" ? "" : "active");
    } else {
      setMenuHandleValue(menuHandleValue === "show-sm" ? "" : "show-sm");
      setPageValue(pageValue === "active-sm" ? "" : "active-sm");
    }
  };

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <HashRouter>
          <LoadingOverlay active={state.loading} spinner={<Loader type="ThreeDots" color="#00BFFF" height={100} width={100} visible={true} />}>
            {state.loggedIn ? <SideNavigation menuHandleValue={menuHandleValue} roleType={roleType}/> : null}
            <div className={`${state.loggedIn ? `${"page " + pageValue}` : ""}`}>
              {state.loggedIn ? <Header menuHandle={menuToggle} /> : null}
              <Switch>
                <Route exact path="/">
                  {/* !state.loggedIn ? (state.signIn ? <SignIn /> : <SignUp />) : (roleType === 'Participant' ? <Redirect to="/profile" /> : <Redirect to="/initial-registration-form" />) */}
                  {!state.loggedIn ? (state.signIn ? <SignIn /> : <SignUp />) : <Redirect to="/profile" />}
                </Route>

                <GuardedRoute path="/initial-registration-form" component={IRF} auth={state.loggedIn} />
                <GuardedRoute path="/search" component={Search} auth={state.loggedIn} />
                <GuardedRoute path="/adminAddProgram" component={AdminAddProgram} auth={state.loggedIn} />
                <GuardedRoute path="/adminDeleteUsers" component={AdminDeleteUsers} auth={state.loggedIn} />
                <GuardedRoute path="/programDetailsNew" component={ProgramDetailsNew} auth={state.loggedIn} />
                <GuardedRoute path="/profile" component={Profile} auth={state.loggedIn} />
                <GuardedRoute path="/reports" component={Reports} auth={state.loggedIn} />
                <GuardedRoute path="/schedule" component={Schedule} auth={state.loggedIn} />
                <GuardedRoute path="/editUserDetails" component={EditUserDetails} auth={state.loggedIn} userDetails={state.userDetails} />
                <GuardedRoute path="/addGoal" component={AddGoal} auth={state.loggedIn} goalDetails={state.goalDetails} registrationId={state.registrationId} />
                <GuardedRoute path="/editGoal" component={EditGoal} auth={state.loggedIn} registrationId={state.registrationId} />
                <GuardedRoute path="/addChild" component={AddChild} auth={state.loggedIn} childDetails={state.childDetails} registrationId={state.registrationId} />
                <GuardedRoute path="/editChild" component={EditChild} auth={state.loggedIn} registrationId={state.registrationId} />
                <GuardedRoute path="/editProgram" component={EditProgramDetails} auth={state.loggedIn} programDetails={state.programDetails} registrationId={state.registrationId} />
                <GuardedRoute path="/updateHealth" component={UpdateHealthDetails} auth={state.loggedIn} healthDetails={state.healthDetails} registrationId={state.registrationId} />
                <GuardedRoute path="/programReport" component={ProgramReport} auth={state.loggedIn} />
                <GuardedRoute path="/goalsReport" component={GoalsReport} auth={state.loggedIn} />
                <GuardedRoute path="/notesReport" component={NotesReport} auth={state.loggedIn} />
              </Switch>
            </div>
          </LoadingOverlay>
        </HashRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
