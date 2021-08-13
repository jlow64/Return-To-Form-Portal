import React, { useState, Fragment } from "react";
import { Search, XCircle } from "react-bootstrap-icons";
import "./SearchBar.css";

const SearchBar = ({ placeholder, data }) => {
    const [filteredData, setFilteredData] = useState([]);
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
                        />
                        <div className="input-group-append search-icon">
                            <span className="input-group-text search-icon" id="search-addon">
                                <Search size={18} />
                            </span>
                        </div>
                    </div> 
                </div>
                <div className="dataResult"></div>
            </div>
        </Fragment>
    );
};

export default SearchBar;