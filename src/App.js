/* eslint-disable default-case */
import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useImmerReducer } from "use-immer";
// import { BrowserRouter } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import IRF from "./components/module/irf/IRF";

import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Axios from "axios";
import HomeGuest from "./components/HomeGuest";
import Home from "./components/Home";
import FlashMessages from "./components/FlashMessages";
import StateContext from "./StateContext";
import DispatchContext from "./DispatchContext";

// Axios.defaults.baseURL = "http://localhost:8080";
Axios.defaults.baseURL = "https://test4cmt.000webhostapp.com/api";
// Axios.defaults.baseURL = "https://cors-anywhere.herokuapp.com/https://test4cmt.000webhostapp.com/api";

function App() {
  const initialState = {
    signIn: true,
    flashMessages: [],
    loggedIn: Boolean(localStorage.getItem("communityMattersToken")),
    user: {
      token: localStorage.getItem("communityMattersToken"),
      username: localStorage.getItem("communityMattersUsername")
    }
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

  // Check if token has expired or not on first render
  /*  useEffect(() => {
    if (state.loggedIn) {
      const ourRequest = Axios.CancelToken.source();
      async function fetchResults() {
        try {
          const response = await Axios.post("/checkToken", { token: state.user.token }, { cancelToken: ourRequest.token });
          console.log("Check token:" + response.data);
          if (!response.data) {
            dispatch({ type: "logout" });
            dispatch({ type: "flashMessage", value: "Your session has expired. Please log in again." });
          }
        } catch (e) {
          console.log("There was a problem or the request was cancelled.");
        }
      }
      fetchResults();
      return () => ourRequest.cancel();
    }
  }, [dispatch, state.loggedIn, state.user.token]); */

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <HashRouter>
          <div className="App">
            <FlashMessages messages={state.flashMessages} />
            <Header loggedIn={state.loggedIn} />
            <Switch>
              <Route exact path="/">
                {state.loggedIn ? <Home /> : <HomeGuest signIn={state.signIn} />}
              </Route>
              <Route path="/initial-registration-form" component={IRF} />
            </Switch>
            <Footer />
          </div>
        </HashRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;

/* 
<AppContext.Provider value={{ addFlashMessage, setLoggedIn, setSignIn }}>
...
</AppContext.Provider>
*/

/* 
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("communityMattersToken")));
  const [flashMessages, setFlashMessages] = useState([]);

  function addFlashMessage(msg) {
    setFlashMessages(prev => prev.concat(msg));
  }
*/
