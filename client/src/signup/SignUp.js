import React, { Component } from 'react';
import logo from '../images/user(2).jpg';
import axios from 'axios';
import validator from 'validator';
import { Redirect } from 'react-router-dom';
import './signup.css'

export default class SignUp extends Component {

    url = '/users/signUp'

    constructor(props) {
        super(props);
        this.state = {
            redirectToHome: false,
            userName: {
                value: '',
                valid: false
            },
            email: {
                value: '',
                valid: false
            },
            password: {
                value: '',
                valid: false
            },
            confirmPassword: ''
        }

    }

    handleInput = (event) => {
        let field = {
            value: event.target.value,
            valid: false
        }


        switch (event.target.name) {
            case "userName":
                field.valid = event.target.value.length > 2
                
                break;

            case "email":
                field.valid = validator.isEmail(field.value)
              
                break;
            case "password":
                field.valid = field.value.length > 4
               
                break;

            default:
                break;
        }

        this.setState({
            [event.target.name]: field
        })

    }

    isFormValid = () => {
        return (
            this.state.email.valid &&
            this.state.userName.valid &&
            this.state.password.valid &&
            this.state.password.value === this.state.confirmPassword.value
        )
    }



    signUp = (e) => {
        e.preventDefault();
        let user = {
            name: this.state.userName.value,
            password: this.state.password.value,
            email: this.state.email.value,
           
        }

     
        axios.post(this.url, user)
            .then(res => {
                if (res.status === 201) {
                   const response = res.data.ops;
                   localStorage.name = response[0].name;
                   localStorage.email = response[0].email;
                   localStorage.id = response[0]._id;
                   this.props.setUser(localStorage)
                    this.setState({ redirectToHome: true })
                }
                // console.log(res);
            }).catch(err => {
                console.log(err);
            })
    }


    render() {

        if (this.state.redirectToHome) {
            return <Redirect to='/' />
        }

        return (
            <div className="account-signup">
                <form className="signup-form">
                    <div className="container">
                        <h1>SignUp</h1>
                        <p>Please fill in this form to create an account.</p>
                        <hr />
                        <div className = "avatar-container">
                        <img
                         src={logo}
                         alt="Avatar"
                         className="avatar"
                        />
                    </div>

                        <label htmlFor="name"><b>Name</b></label>
                        <input
                            type="text"
                            placeholder="User Name"
                            name="userName"
                            onChange={this.handleInput}
                        />
                        {!this.state.userName.valid && this.state.userName.value !== '' &&
                            <div className="error-msg alert alert-danger">*Username: atleast 2 characters</div>
                        }

                        <label htmlFor="email"><b>Email</b></label>
                        <input type="email"
                            placeholder="Enter Email"
                            name="email"
                            onChange={this.handleInput}
                        />
                        {!this.state.email.valid && this.state.email.value !== '' &&
                            <div className="error-msg alert alert-danger">*Email: must be a valid format</div>
                        }

                        <label htmlFor="psw"><b>Password</b></label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            autoComplete="on"
                            onChange={this.handleInput}
                        />
                        {!this.state.password.valid && this.state.password.value !== '' &&
                            <div className="error-msg alert alert-danger">Passwod: atleast 5 characters</div>
                        }

                        <label htmlFor="psw-repeat"><b>Confirm Password</b></label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            autoComplete="on"
                            onChange={this.handleInput}
                        />
                        {this.state.password.value !== this.state.confirmPassword.value && this.state.password.value !== '' &&
                            <div className="error-msg alert alert-danger">Confirm Password: must match password</div>
                        }
                        <button
                            disabled={!this.isFormValid()}
                            type="submit" className="registerbtn"
                            onClick={this.signUp}
                        >Register</button>
                    </div>

                    
                </form>

            </div >
        )
    }
}


