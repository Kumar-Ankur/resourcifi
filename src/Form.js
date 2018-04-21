/**
 * {Form} React Component to display Login Page
 * @dependency {Material UI,store} for Layout Display and to store login ID
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
import country from "./US.json";
import AutoComplete from "material-ui/AutoComplete";
import store from "store";
import { setTimeout } from "timers";

const style = {
  margin: 40
};

const dataSource1 = country.results;

const dataSourceConfig = {
  text: "text",
  value: "id"
};

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postal: "",
      country: "",
      Comments: "",
      emailError: "",
      phoneError: "",
      postalError: "",
      countryArray: [],
      searchText: "",
      message: "",
      isLoggedIn: false
    };

    this.emailValidator = this.emailValidator.bind(this);
    this.phoneValidator = this.phoneValidator.bind(this);
    this.postalValidator = this.postalValidator.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  // Handle Logout function

  handleLogout = () => {
    store.remove("user");
    this.setState({ isLoggedIn: false });
    console.log("A user logs out");
  };

  componentWillMount() {
    console.log("A user create a new form");

    let localDataCheck = store.get("user");
    if (localDataCheck !== undefined) {
      this.setState({ isLoggedIn: true });
    }

    setTimeout(() => {
      console.log("A user leaves a form unfilled");
    }, 3600000);
  }

  //Function call after click on submit button

  handleClick = e => {
    e.preventDefault();
    console.log(this.state.postal, this.state.country.text);
    var payload = {
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      phone: this.state.phone,
      address: this.state.address,
      city: this.state.city,
      postal: this.state.postal,
      country: this.state.country.text,
      Comments: this.state.Comments
    };

    fetch("/form", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          console.log("A user submits a form");
          this.setState({
            fname: "",
            lname: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            postal: "",
            country: "",
            Comments: "",
            message: "Form has been submitted successfully"
          });
          setTimeout(() => {
            this.setState({ message: "" });
          }, 5000);
        } else {
          this.setState({ message: "Problem during Form Submission" });
          setTimeout(() => {
            this.setState({ message: "" });
          }, 5000);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  //Email Validation Function

  emailValidator(event) {
    var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (event.target.value.match(pattern)) {
      this.setState({ email: event.target.value, emailError: "" });
    } else {
      this.setState({ emailError: "Please enter Valid email address" });
    }
  }

  // Phone Validation function

  phoneValidator(event) {
    var pattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (event.target.value.match(pattern)) {
      this.setState({ phone: event.target.value, phoneError: "" });
    } else {
      this.setState({ phoneError: "Please enter Valid Phone Number" });
    }
  }

 //Postal Code Validation function

  postalValidator(event) {
    var pattern = /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$/;
    if (event.target.value.match(pattern)) {
      this.setState({ postal: event.target.value, postalError: "" });
    } else {
      this.setState({ postalError: "Please enter Valid Postal Number" });
    }
  }

  render() {
    const isdisable =
      this.state.fname !== "" &&
      this.state.lname !== "" &&
      this.state.email !== "" &&
      this.state.address !== "" &&
      this.state.city !== "" &&
      this.state.postal !== "" &&
      this.state.emailError === "" &&
      this.state.phoneError === "" &&
      this.state.postalError === "" &&
      this.state.country !== "";

    const textStyle = {
      width: 250
    };

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

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
          <AppBar
            title={<span>Resourcifi</span>}
            iconElementRight={
              this.state.isLoggedIn ? rightButtonsLogOut : rightButtons
            }
          />
          <p className="messStyle">{this.state.message}</p>
          <form className="formStyle">
            <h3>FORM</h3>
            <div className="container">
              <div className="row">
                <div className="col-md-6 divStyle">
                  <TextField
                    hintText="Enter your Firstname"
                    floatingLabelText=" First Name"
                    style={textStyle}
                    value={this.state.fname}
                    onChange={(event, newValue) =>
                      this.setState({ fname: newValue })
                    }
                  />
                  <br />
                  <TextField
                    hintText="Enter your Lastname"
                    floatingLabelText=" Last Name"
                    style={textStyle}
                    value={this.state.lname}
                    onChange={(event, newValue) =>
                      this.setState({ lname: newValue })
                    }
                  />

                  <br />

                  <TextField
                    hintText="Enter your Email"
                    floatingLabelText=" Email"
                    style={textStyle}
                    errorText={this.state.emailError}
                    value={this.state.email}
                    onChange={event => {
                      this.setState({ email: event.target.value });
                      this.emailValidator(event);
                    }}
                  />

                  <br />
                  <TextField
                    type="Number"
                    hintText="Eg. 123-456-7890"
                    floatingLabelText=" Phone Number"
                    value={this.state.phone}
                    style={textStyle}
                    errorText={this.state.phoneError}
                    onChange={event => {
                      this.setState({ phone: event.target.value });
                      this.phoneValidator(event);
                    }}
                  />

                  <br />

                  <TextField
                    hintText="Enter your Address"
                    floatingLabelText=" Address"
                    style={textStyle}
                    value={this.state.address}
                    onChange={(event, newValue) =>
                      this.setState({ address: newValue })
                    }
                  />
                </div>
                <div className="col-md-6 divStyle">
                  <TextField
                    hintText="Enter your City"
                    floatingLabelText=" City"
                    style={textStyle}
                    value={this.state.city}
                    onChange={(event, newValue) =>
                      this.setState({ city: newValue })
                    }
                  />

                  <br />

                  <TextField
                    hintText="Eg. K1A 0B1"
                    floatingLabelText=" Postal Code"
                    style={textStyle}
                    value={this.state.postal}
                    errorText={this.state.postalError}
                    onChange={event => {
                      this.setState({ postal: event.target.value });
                      this.postalValidator(event);
                    }}
                  />

                  <br />

                  <AutoComplete
                    hintText="Enter your Country"
                    floatingLabelText="Country"
                    filter={(searchText, key) =>
                      key
                        .toString()
                        .toLowerCase()
                        .indexOf(searchText) > -1
                    }
                    dataSource={dataSource1}
                    openOnFocus={true}
                    menuStyle={{ width: 400 }}
                    listStyle={{ width: 400 }}
                    dataSourceConfig={dataSourceConfig}
                    onNewRequest={(event, newValue) => {
                      this.setState({ country: event });
                    }}
                    onUpdateInput={(event, newValue) => {
                      this.setState({ country: event });
                    }}
                  />

                  <br />

                  <TextField
                    hintText="Enter your Comments"
                    floatingLabelText=" Comments"
                    style={textStyle}
                    value={this.state.Comments}
                    onChange={(event, newValue) =>
                      this.setState({ Comments: newValue })
                    }
                  />
                  <br />
                  <RaisedButton
                    label="Submit"
                    primary={true}
                    disabled={!isdisable}
                    style={style}
                    onClick={event => this.handleClick(event)}
                  />
                </div>
              </div>
            </div>

            <br />
          </form>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Form;
