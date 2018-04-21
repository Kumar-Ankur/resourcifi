/**
 * {App} React Component to display Home Page
 * @dependency {Material UI, store} for Layout Display and to save Login ID in local storage
 */


import React, { Component } from "react";
import "./App.css";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import AppBar from "material-ui/AppBar";
import FlatButton from "material-ui/FlatButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import { Link } from "react-router-dom";
import store from "store";

class App extends Component {
  constructor(porps) {
    super(porps);

    this.state = { isLoggedIn: false };
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    let localDataCheck = store.get("user");
    if (localDataCheck) {
      this.setState({ isLoggedIn: true });
    }
  }

  // Function call when user click on Logout Button
  handleLogout = () => {
    store.remove("user");
    this.setState({ isLoggedIn: false });
    console.log("A user logs out");
  };

  render() {
    const buttonStyle = {
      backgroundColor: "transparent",
      color: "white"
    };

    const rightButtons = (
      <div>
        <Link to="/">
          <FlatButton label="Home" style={buttonStyle} />
        </Link>
        <Link to="/Form">
          <FlatButton label="Fill Form" style={buttonStyle} />
        </Link>
        <Link to="/Login">
          <FlatButton label="Admin Login" style={buttonStyle} />
        </Link>
      </div>
    );

    const rightButtonsLogOut = (
      <div>
        <Link to="/">
          <FlatButton label="Home" style={buttonStyle} />
        </Link>
        <Link to="/Form">
          <FlatButton label="Fill Form" style={buttonStyle} />
        </Link>
        <Link to="/Admin">
          <FlatButton label="Administrative Interface" style={buttonStyle} />
        </Link>

        <FlatButton
          label="Logout"
          style={buttonStyle}
          onClick={this.handleLogout}
        />
      </div>
    );

    const adminButton = (
      <Link to="/Admin">
        <button className="btn btn-success buttonStyle">
          Administrative Interface
        </button>
      </Link>
    );

    const loginButton = (
      <Link to="/Login">
        <button className="btn btn-success buttonStyle">Admin Login</button>
      </Link>
    );
    return (
      <div>
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
          <AppBar
            title={<span>Resourcifi</span>}
            iconElementRight={
              this.state.isLoggedIn ? rightButtonsLogOut : rightButtons
            }
          />
        </MuiThemeProvider>
        <div className="bodyStyle">
          <div className="container-fluid">
            <div className="row">
              <Link to="/Form">
                <button className="btn btn-primary buttonStyle">
                  Fill Form
                </button>
              </Link>
              {this.state.isLoggedIn ? adminButton : loginButton}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
