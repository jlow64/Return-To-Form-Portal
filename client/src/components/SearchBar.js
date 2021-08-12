import React, { useState, Fragment } from "react";
import { Search, XCircle } from "react-bootstrap-icons";
import "./SearchBar.css";

const SearchBar = ({ placeholder, data }) => {
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = data.filter((value) => {
          return value.title.toLowerCase().includes(searchWord.toLowerCase());
        });
    
        if (searchWord === "") {
          setFilteredData([]);
        } else {
          setFilteredData(newFilter);
        }
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
                            aria-describedby="search-addon"
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