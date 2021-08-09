import React, { useState, Fragment } from "react";

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
                    <input
                        type="text"
                        className="form-control"
                        placeholder={placeholder}
                        value={wordEntered}
                        onChange={handleFilter}
                    />
                    <div className="searchIcon">
                        {/* {filteredData.length === 0 ? (
                            <SearchIcon />
                        ) : (
                            <CloseIcon id="clearBtn" onClick={clearInput} />
                        )} */}
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