import React, { useState, Fragment, useEffect } from "react";
import { Search, XCircle } from "react-bootstrap-icons";
import PatientCard from "./PatientCard";
import * as Constant from "../Data/Constants";
import "../styles/SearchBar.css";

const SearchBar = ({ placeholder, displayAppointments }) => {
    const [term, setTerm] = useState("");
    const [debouncedTerm, setDebouncedWord] = useState(term);
    const [results, setResults] = useState([]);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedWord(term);
        }, 300);

        return () => {
            clearTimeout(timerId);
        };
    }, [term]);

    useEffect(() => {
        const search = async () => {
            try {
                const response = await fetch(`${Constant.API_ENDPOINT}/dashboard/patients/${debouncedTerm}`, {
                method: "GET",
                credentials: "include"
            });
                const parseRes = await response.json();
                setResults(parseRes);
            } catch (err) {
                console.error(err);
            }
        };
        if(debouncedTerm!==""){
            search();
        };
    }, [debouncedTerm]);

    const handleFilter = (e) => {
      const input = e.target.value;
      setTerm(input);
      input? displayAppointments(true):displayAppointments(false);
      if (input === "") {
        setResults([]);
      }
    };
  
    const clearInput = () => {
      setResults([]);
      setTerm("");
      displayAppointments(false);
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
                            value={term}
                            onChange={handleFilter}
                            style={{fontSize: 18}}
                        />
                        <div className="input-group-append search-icon">
                            <span className="input-group-text search-icon" id="search-addon">
                                {results.length === 0? (
                                        <Search size={18}/> 
                                    ) : (
                                        <XCircle size={18} id="clearBtn" onClick={clearInput} /> 
                                    )
                                }
                            </span>
                        </div>
                    </div> 
                </div>
                {results.length !== 0 && (
                    <div className="dataResult">
                        <h5 className="results-label">Search results</h5>
                        {results.slice(0, 49).map((value, key) => {
                            return (
                                <div key={key} 
                                    className="dataItem"
                                >
                                    <PatientCard
                                        patient_id={value.id} 
                                        first_name={value.first_name} 
                                        last_name={value.last_name} 
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </Fragment>
    );
};

export default SearchBar;