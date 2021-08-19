import React, { useState, Fragment } from "react";
import { Search, XCircle } from "react-bootstrap-icons";
import PatientItem from "./PatientItem";
import "../styles/SearchBar.css";

const SearchBar = ({ placeholder, data }) => {
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
  
    const handleFilter = (e) => {
      const input = e.target.value;
      setWordEntered(input);
      const newFilter = data.filter((value) => {
        return value.first_name.toLowerCase().includes(input.toLowerCase());
      });
  
      if (input === "") {
        setFilteredData([]);
      } else {
        setFilteredData(newFilter);
      }
    };
  
    const clearInput = () => {
      setFilteredData([]);
      setWordEntered("");
    };

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
                            onChange={handleFilter}
                            style={{fontSize: 18}}
                        />
                        <div className="input-group-append search-icon">
                            <span className="input-group-text search-icon" id="search-addon">
                                {filteredData.length === 0? (
                                        <Search size={18}/> 
                                    ) : (
                                        <XCircle size={18} id="clearBtn" onClick={clearInput} /> 
                                    )
                                }
                            </span>
                        </div>
                    </div> 
                </div>
                {filteredData.length != 0 && (
                    <div className="dataResult">
                        {filteredData.slice(0, 7).map((value, key) => {
                            return (
                                <a  key={key} 
                                    onClick={() => console.log(value.first_name, value.last_name)}
                                    className="dataItem"
                                >
                                    <PatientItem url={value.appointments.links.self} first_name={value.first_name} last_name={value.last_name} />
                                </a>
                            );
                        })}
                    </div>
                )}
            </div>
        </Fragment>
    );
};

export default SearchBar;