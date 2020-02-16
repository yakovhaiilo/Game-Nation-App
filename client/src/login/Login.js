import React, { Component } from "react";
import logo from "../images/user(2).jpg";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';
import validator from "validator";

export default class Login extends Component {
  url = "/users/login";
  constructor(props) {
    super(props);
    this.state = {
      redirectToHome: false,
      email: {
        value: "",
        valid: false
      },
      password: {
        value: "",
        valid: false
      }
    };
  }

  login = e => {
    e.preventDefault();

    let user = {
      password: this.state.password.value,
      email: this.state.email.value
    };

    axios
      .post(this.url, user)
      .then(res => {
        if (res.status === 200) {
          localStorage.id = res.data._id
          localStorage.name = res.data.name
          localStorage.email = res.data.email
          this.props.setUser(localStorage);
          this.setState({ redirectToHome: true });
        } else {
          this.setState({ isError: true });
        }
      })
      .catch(err => {
        this.setState({ isError: true });
      });
  };

  handleInput = event => {
    let field = {
      value: event.target.value,
      valid: false
    };

    switch (event.target.name) {
      case "email":
        field.valid = validator.isEmail(field.value);
        break;
      case "password":
        field.valid = field.value.length > 4;

        break;

      default:
        break;
    }

    this.setState({
      [event.target.name]: field
    });
  };

  isFormValid = () => {
    return this.state.email.valid && this.state.password.valid;
  };

  render() {
    if (this.state.redirectToHome) {
      return <Redirect to="/" />;
    }
    return (
      <div className="account-login">
        <form className="login-form">
          <div className="container">
            <h1>Login</h1>
            <p>Complete this form to enter the site.</p>
            <hr />
            <div className="avatar-container">
              <img src={logo} alt="Avatar" className="avatar" />
            </div>

            <div className="container">
              <label htmlFor="Username">
                <b>Email</b>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                // value={this.state.email.value}
                onChange={this.handleInput}
              />
              {!this.state.email.valid && this.state.email.value !== "" && (
                <div className="error-msg alert alert-danger">
                  *Email: must be a valid format
                </div>
              )}

              <label htmlFor="Password">
                <b>Password</b>
              </label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="on"
                // value={this.state.password.value}
                onChange={this.handleInput}
              />
              {!this.state.password.valid &&
                this.state.password.value !== "" && (
                  <div className="error-msg alert alert-danger">
                    Passwod: atleast 5 characters
                  </div>
                )}

              <button
                type="submit"
                disabled={!this.isFormValid()}
                onClick={this.login}
              >
                Login
              </button>
            </div>
            <div className="container signin">
                  <p> Do not have an account?. <Link to="/signup/SignUp">Register</Link>  </p>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
