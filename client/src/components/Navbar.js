import React, { Fragment } from "react";
import logo from "../logos/rtf-logo-grey.png";

const Navbar = ({ title }) => {
    return (
        <Fragment>
           <img src={logo} alt="" className="dashboard-logo" width="100%"/>
            <Button     
                className="logout"
                variant="secondary"
                onClick={e => logout(e)}  
            >
            <BoxArrowRight size={24} />
            </Button>
            <h2 className="exercise-label">{title}</h2> 
        </Fragment>
        
    );
};

export default Navbar;