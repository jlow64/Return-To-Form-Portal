import React, { useState, Fragment } from "react";
import { Search, XCircle } from "react-bootstrap-icons";
import PatientItem from "./PatientItem";
import "../styles/SearchBar.css";

const SearchBar = ({ placeholder, data }) => {
    // const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    return (
        <Fragment>
            <div className="search">
                <div className="searchInputs">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control search-bar"
                            placeholder={placeholder}
                            value={wordEntered}
                            style={{fontSize: 18}}
                        />
                        <div className="input-group-append search-icon">
                            <span className="input-group-text search-icon" id="search-addon">
                                <Search size={18} />
                            </span>
                        </div>
                    </div> 
                </div>
                <div className="dataResult">
                    {data.map((value, key) => {
                        return (
                            <a key={key} onClick={() => console.log(value.first_name, value.last_name)}>
                                <PatientItem url={value.appointments.links.self} first_name={value.first_name} last_name={value.last_name} />
                            </a>
                        );
                    })}
               </div>
            </div>
        </Fragment>
    );
};

export default SearchBar;