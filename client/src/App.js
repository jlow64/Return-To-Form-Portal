import React , { Fragment } from "react";
import './App.css';

// components
import InputItem from "./components/InputItem";
import ListItems from "./components/ListItems";


function App() {
  return (
    <Fragment>
      <div className="container">
        <InputItem />
        <ListItems />
      </div>
    </Fragment>
  );
}

export default App;
