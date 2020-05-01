import React, { Component } from 'react';
import Table from './Table/table';
import './home.css';

class Home extends Component {
    
    render(){
        return(
            <div className="main">
                <Table className="table" />
            </div>
        )
    }
}

export default Home;