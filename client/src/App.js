import React , { Fragment, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import './App.css';

// components
// import InputItem from "./components/InputItem";
// import ListItems from "./components/ListItems";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

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
