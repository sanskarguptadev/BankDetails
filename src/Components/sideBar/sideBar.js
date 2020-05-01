import React from 'react';
import './sideBar.css';

let sidebar = (props)=> {
    return(
        <div className="sidebar">
            <div className="green">
            </div>
            <a className="active" onClick={props.show} href="#home">Show Banks</a>
        </div>
    );
}

export default sidebar;