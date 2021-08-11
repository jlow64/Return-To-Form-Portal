import React, { useState, Fragment } from "react";
import { Search, XCircle } from "react-bootstrap-icons";

const UserSearchBar = ({ placeholder, data }) => {
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
                            aria-describedby="search-addon"
                        />
                        <div className="input-group-append">
                            <span className="input-group-text search-icon" id="search-addon">
                                <Search size={18} />
                            </span>
                        </div>
                    </div> 
                    <div class="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon2">@example.com</span>
                        </div>
                    </div>
                </div>
                {filteredData.length !== 0 && (
                <div className="dataResult">
                    {filteredData.slice(0, 15).map((value, key) => {
                        return (
                            <a className="dataItem" href={value.link} target="_blank">
                            <p>{value.title} </p>
                            </a>
                        );
                    })}
                </div>
                )}
            </div>
        </Fragment>
    );
};

export default UserSearchBar;