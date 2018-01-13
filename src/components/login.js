// Setup
import React, { Component } from "react";
import axios                from "../axios";
import {HashPassword}       from "../encrypt.js";
import { Link }             from "react-router";

// Login form Component. Used on welcome master Component
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {name: null}
        this.clearInput=this.clearInput.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.activateButton = this.activateButton.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.firstInput.focus()
    }

    // Clean input fields after errors
    clearInput() {
        this.setState({
            email:    "",
            password: ""
        })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    activateButton(event) {
       if(event.which == 13) {
           this.button.click();
       }
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.email || !this.state.password) {
            this.setState({"Emessage": "Please fill in all fields"});
            this.clearInput()
            this.firstInput.focus()
        } else if (this.state.email.indexOf("@")==-1) {
                this.setState({"Emessage": "This email is not valid"});
                this.clearInput()
                this.firstInput.focus()
        } else {
            this.setState({"Emessage": ""});
            const {email, password} = this.state;
            axios.post("/login", {
                email,
                password
            }).then((resp) => {

                if(resp.data.success) {
                    this.setState({name: resp.data.name})
                    location.replace("/");
                } else if(resp.data.email_not_registered) {
                    this.setState({ Emessage: "The entered e-mail is not registered!" })
                    this.clearInput()
                    this.firstInput.focus()
                } else {
                    this.setState({ Emessage: "Email or Password not correct" })
                    this.clearInput()
                    this.firstInput.focus()
                }
            });
        }
    }
    render() {
        return (
            <div className="main">
                <form className="loginForm" method="post" action="">
                    <p>Please Login</p>
                    <input ref={(input) => {this.firstInput = input; }} type="email" name="email" placeholder="Enter email" value={this.state.email} onChange={this.handleChange}/>
                    <input type="password" name="password" placeholder="Enter password" value={this.state.password} onChange={this.handleChange} onKeyPress={this.activateButton}/>
                    <button ref={(button) => {this.button = button; }} onClick={this.handleSubmit} type="submit">Login</button>
                    <p>Not registered yet. Please...</p><Link className="link" to="/register">Register</Link>
                    <p className="error">{this.state.Emessage}</p>
                </form>
            </div>
        )
    }
}
