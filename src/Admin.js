/**
 * {Admin} React Component to display Administrative Interface Page
 * @dependency {Material UI, store} for Layout Display and to save Login ID in local storage
 */

import React from "react";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import AppBar from "material-ui/AppBar";
import FlatButton from "material-ui/FlatButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import { Link } from "react-router-dom";
import store from "store";
import Dialog from "material-ui/Dialog";
import { Redirect } from "react-router";

class Admin extends React.Component {
  constructor(porps) {
    super(porps);

    this.state = {
      isLoggedIn: false,
      redirectToReferrer: false,
      data: [],
      fname: "",
      lname: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postal: "",
      country: "",
      comments: "",
      open: false
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.description = this.description.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillMount() {

    console.log('A user access the administrative interface');
    let localDataCheck = store.get("user");
    if (localDataCheck !== undefined) {
      this.setState({ isLoggedIn: true });
    }

    fetch("/form")
      .then(data => data.json())
      .then(data => {
        this.setState({ data });
      });
  }

  // function call when user click on OK button in Dialog box
  handleClose = () => {
    this.setState({ open: false });
  };

  // Function call when user click on Logout button
  handleLogout = () => {
    store.remove("user");
    this.setState({ isLoggedIn: false, redirectToReferrer: true });
    console.log("A user logs out");
  };

  description(val) {
    fetch(`/form/${val}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          fname: res[0].fname,
          lname: res[0].lname,
          email: res[0].email,
          phone: res[0].phone,
          address: res[0].address,
          city: res[0].city,
          postal: res[0].postal,
          country : res[0].country,
          comments: res[0].Comments,
          open: true
        });
      });
  }
  render() {
    if (this.state.redirectToReferrer) {
      return <Redirect to="/" />;
    }

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

    const actions = [
      <FlatButton label="OK" primary={true} onClick={this.handleClose} />
    ];

    return (
      
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
          <AppBar
            title={<span>Resourcifi</span>}
            iconElementRight={
              this.state.isLoggedIn ? rightButtonsLogOut : rightButtons
            }
          />
          <h3 className="headerStyle">
            Please click on any link to show description
          </h3>
          <ul className="list-group">
            {this.state.data.map(data => {
              return (
                <li
                  className="list-group-item"
                  id={data._id}
                  key={data._id}
                  onClick={() => this.description(data._id)}
                >
                  {data.fname} {data.lname}
                </li>
              );
            }, this)}
          </ul>
          <Dialog
            title="User Description"
            actions={actions}
            modal={true}
            open={this.state.open}
          >
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>Postal</th>
                    <th>Country</th>
                    <th>Comments</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{this.state.fname}</td>
                    <td>{this.state.lname}</td>
                    <td>{this.state.email}</td>
                    <td>{this.state.phone}</td>
                    <td>{this.state.address}</td>
                    <td>{this.state.city}</td>
                    <td>{this.state.postal}</td>
                    <td>{this.state.country}</td>
                    <td>{this.state.comments}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Dialog>
          </div>
        </MuiThemeProvider>
      
    );
  }
}

export default Admin;
