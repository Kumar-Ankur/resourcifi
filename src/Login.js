/**
 * {Login} React Component to display Login Page
 * @dependency {Material UI, store} for Layout Display and to save Login ID in local storage
 */

import React from "react";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import AppBar from "material-ui/AppBar";
import FlatButton from "material-ui/FlatButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import { Link } from "react-router-dom";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import store from "store";
import { Redirect } from "react-router";

const style = {
  margin: 15
};

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      emailError: "",
      email: "",
      password: "",
      verifyEmail: '',
      verifyPassword: '',
      redirectToReferrer: false,
      isLoggedIn: false,
      message: ''
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  // Function call when user click on logout button

  handleLogout = () => {
    store.remove("user");
    this.setState({ isLoggedIn: false });
    console.log('A user logs out');
  };

  componentWillMount(){
    let localDataCheck = store.get("user");
    if (localDataCheck !== undefined) {
      console.log(localDataCheck);
      this.setState({ isLoggedIn: true });
    }

      fetch('/login')
      .then(data => data.json())
      .then(data => {
          this.setState({ verifyEmail : data[0].email, verifyPassword: data[0].password})
      })
  }

  //Email Validation Function
  emailValidator(event) {
    var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (event.target.value.match(pattern)) {
      this.setState({ email: event.target.value, emailError: "" });
    } else {
      this.setState({ emailError: "Please enter Valid email address" });
    }
  }

  // Function call when user clickon Submit button
  handleClick = e => {
    e.preventDefault();

    if(this.state.email === this.state.verifyEmail && this.state.password === this.state.verifyPassword){
        console.log('A user logs in')
        store.set("user", this.state.email);
        this.setState({ redirectToReferrer: true });
    }
    else{
        this.setState({ message : 'Authentication Failed!! Contact Admin'})
        setTimeout(() => {
            this.setState({ message: "" });
          }, 5000);
        console.log('Facing Problem during Logging')
    }
  };

  render() {
    const buttonStyle = {
      backgroundColor: "transparent",
      color: "white"
    };

    if (this.state.redirectToReferrer) {
        return <Redirect to="/Admin" />;
      }

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
  
          <FlatButton label="Logout" style={buttonStyle} onClick= { this.handleLogout }/>
        </div>
      );


    const textStyle = {
      width: 400
    };

    const isDisabled =
      this.state.email !== "" &&
      this.state.password !== "" &&
      this.state.emailError === "";

    return (
      <div>
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
          <AppBar
            title={<span>Resourcifi</span>}
            iconElementRight={
              this.state.isLoggedIn ? rightButtonsLogOut : rightButtons
            }
          />

          <form className="formStyle">
          <p className="loginFail">{this.state.message}</p>
          <h3>ADMIN LOGIN</h3>
            <p className="messageStyle">{this.state.message}</p>
            <TextField
              hintText="Enter your Email"
              floatingLabelText="Username"
              style={textStyle}
              errorText={this.state.emailError}
              onChange={event => this.emailValidator(event)}
            />
            <br />
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              style={textStyle}
              onChange={(event, newPassword) =>
                this.setState({ password: newPassword })
              }
            />
            <br />
            <RaisedButton
              label="Submit"
              primary={true}
              disabled={!isDisabled}
              style={style}
              onClick={event => this.handleClick(event)}
            />
          </form>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Login;
