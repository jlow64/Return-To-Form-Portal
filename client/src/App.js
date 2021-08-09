import React , { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import './App.css';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";

toast.configure();

function App() {
  const [pageColor, setPageColor] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const isAuth = async() => {
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
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
        <div className="container">
          <Switch>          
            <Route exact path="/login" render={props => !isAuthenticated ? <Login {...props} setAuth={setAuth} /> : <Redirect to="/dashboard" />} />
            <Route exact path="/dashboard" render={props => isAuthenticated ? <Dashboard {...props} setAuth={setAuth} /> : <Redirect to="/login" />} />
            <Route exact path="/forgot-password" render={props => <ForgotPassword {...props} />} />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
