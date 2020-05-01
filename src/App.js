import React, { Component } from 'react';
import Home from './Components/home';
import Sidebar from './Components/sideBar/sideBar';
import Header from './Components/Header/header';
class App extends Component {

  state = {
    show: false,
  }

  showListHandler = () => {
    this.setState({
      show: !this.state.show,
    });
  }

  render() {
    return (
      <div className="App">
        <Sidebar show={this.showListHandler} />
        <Header />
        {
          this.state.show ?
          <Home /> :
          <div style={{textAlign: 'center', marginTop: '3%'}}>Please click on Button "Show Banks" .</div>
        }
      </div>
    );
  }
}

export default App;
