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
import Feed from "./components/module/feed/Feed";
import Profile from "./components/module/profile/Profile";
import Search from "./components/module/search/Search";
import Reports from "./components/module/reports/Reports";
import Schedule from "./components/module/schedule/Schedule";
import EditUserDetails from "./components/module/search/userDetails/EditUserDetails";
import AddGoal from "./components/module/search/userDetails/AddGoal";
import GuardedRoute from "./components/auth/GuardedRoute";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import { useState } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";

// Axios.defaults.baseURL = "http://localhost:8080";
// Axios.defaults.baseURL = "https://test4cmt.000webhostapp.com/api";
Axios.defaults.baseURL = "https://cors-anywhere.herokuapp.com/https://test4cmt.000webhostapp.com/api";

function App(props) {
  const initialState = {
    signIn: true,
    flashMessages: [],
    loggedIn: Boolean(localStorage.getItem("communityMattersToken")),
    user: {
      token: localStorage.getItem("communityMattersToken"),
      username: localStorage.getItem("communityMattersUsername")
    },
    isToggled: true,
    userDetails: {},
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
      case "userDetails":
        draft.userDetails = action.value;
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
      localStorage.setItem("communityMattersUsername", state.user.username);
    } else {
      localStorage.removeItem("communityMattersToken");
      localStorage.removeItem("communityMattersUsername");
    }
  });

  const [menuHandleValue, setMenuHandleValue] = useState("");
  const [pageValue, setPageValue] = useState("");

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
            {state.loggedIn ? <SideNavigation menuHandleValue={menuHandleValue} /> : null}
            <div className={`${state.loggedIn ? `${"page " + pageValue}` : ""}`}>
              {state.loggedIn ? <Header menuHandle={menuToggle} /> : null}
              <Switch>
                <Route exact path="/">
                  {!state.loggedIn ? state.signIn ? <SignIn /> : <SignUp /> : <Redirect to="/initial-registration-form" />}
                </Route>

                <GuardedRoute path="/initial-registration-form" component={IRF} auth={state.loggedIn} />
                <GuardedRoute path="/search" component={Search} auth={state.loggedIn} />
                <GuardedRoute path="/feed" component={Feed} auth={state.loggedIn} />
                <GuardedRoute path="/profile" component={Profile} auth={state.loggedIn} />
                <GuardedRoute path="/reports" component={Reports} auth={state.loggedIn} />
                <GuardedRoute path="/schedule" component={Schedule} auth={state.loggedIn} />
                <GuardedRoute path="/editUserDetails" component={EditUserDetails} auth={state.loggedIn} userDetails={state.userDetails} />
                <GuardedRoute path="/addGoal" component={AddGoal} auth={state.loggedIn} />
              </Switch>
            </div>
          </LoadingOverlay>
        </HashRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
