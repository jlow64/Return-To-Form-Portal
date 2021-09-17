import React , { Fragment, useState, useEffect, StrictMode } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import './App.css';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';

// components
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Patient from "./pages/Patient";
import CreateExercise from "./pages/CreateExercise";
import EditExercise from"./pages/EditExercise";

toast.configure();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  // const logout = async (e) => {
  //     e.preventDefault();
  //     try {
  //         // inMemoryJWT.eraseToken();
  //         // sessionStorage.removeItem("token");
  //         setAuth(false);
  //         toast.success("Logged out Successfully!");
  //     } catch (err) {
  //         console.error(err.message);
  //     }
  // };

  const logout = async () => {
    const url = 'http://192.168.1.79:5000/auth/logout';
    const response = await fetch (url, {
      method: 'GET',
      credentials: 'include'
    });
    setAuth(false);
    const parseRes = await response.status;
    toast.success("Successfully logged out!");
  };

  const isAuth = async() => {
    try {
      const response = await fetch("http://192.168.1.79:5000/auth/is-verify", {
        method: "GET",
        credentials: 'include',
        // headers: { jwt_token: localStorage.token },
      });

      const parseRes = await response.json(); 
      parseRes === true? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    isAuth();
  });

  return (
    <Fragment>
      <Router>
        <div className="container-fluid">
          <Switch>       
            <Route exact path="/" >
              <Redirect to="/login" />
            </Route>   
            <Route exact path="/login" render={props => !isAuthenticated ? <Login {...props} setAuth={setAuth} logout={logout} /> : <Redirect to="/dashboard" />} />
            <Route exact path="/dashboard" render={props => isAuthenticated ? <Dashboard {...props} setAuth={setAuth} logout={logout} /> : <Redirect to="/login" />} />
            <Route exact path="/dashboard/patient" render={props => isAuthenticated ? <Patient {...props} setAuth={setAuth} logout={logout} /> : <Redirect to="/login" />} />
            <Route exact path="/dashboard/patient/create-exercise" render={props => isAuthenticated ? <CreateExercise {...props} setAuth={setAuth} logout={logout} /> : <Redirect to="/login" />} />
            <Route exact path="/dashboard/patient/edit-exercise" render={props => isAuthenticated ? <EditExercise {...props} setAuth={setAuth} logout={logout} /> : <Redirect to="/login" />} />
            <Route exact path="/forgot-password" render={props => <ForgotPassword {...props} />} />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
