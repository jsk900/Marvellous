// setup and imports
import React, { PureComponent } from "react";
import axios from "../axios";
import { HashPassword } from "../encrypt.js";
import { Link } from "react-router";

// Our register form component. Used on our Welcome Master app
class Register extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};

        // We need to bind our functions to "this"
        this.clearInput = this.clearInput.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.activateButton = this.activateButton.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Focus on first field before the render
    componentDidMount() {
        this.firstInput.focus();
    }

    // Clean input fields after errors
    clearInput() {
        this.setState({
            name: "",
            last: "",
            email: "",
            password: ""
        });
    }

    //Neat gizmo from Matt to place all form fields and their values as key pairs into state.
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    activateButton(event) {
        if (event.which == 13) {
            this.button.click();
        }
    }

    // Ok submit button clicked on our register form. Check for input and valid email.
    // If all is ok hash the password and send all entered data as an Axios request to the server-
    // index.js. This will action a query on the db to insert the data. We get a response back as
    // success or not.
    handleSubmit(e) {
        e.preventDefault();

        if (!this.state.name || !this.state.email || !this.state.password) {
            this.setState({ Emessage: "Please fill in all fields" });
            this.clearInput();
            this.firstInput.focus();
        } else if (this.state.email.indexOf("@") == -1) {
            this.setState({ Emessage: "This email is not valid" });
            this.clearInput();
            this.firstInput.focus();
        } else {
            const email = this.state.email;
            axios
                .post("/checkEmail", {
                    email
                })
                .then(resp => {
                    if (resp.data.success == true) {
                        this.setState({
                            Emessage: "This email already exists"
                        });
                        this.clearInput();
                        this.firstInput.focus();
                    } else {
                        this.setState({ Emessage: null });
                        const { name, email, password } = this.state;
                        HashPassword(this.state.password).then(password => {
                            axios
                                .post("/register", {
                                    name,
                                    email,
                                    password
                                })
                                .then(resp => {
                                    resp.data.success
                                        ? location.replace("/")
                                        : this.setState({
                                              Emessage:
                                                  "There was an error with the DB"
                                          });
                                });
                        });
                    }
                });
        }
    }

    // This is our form :) Just a normal form. But made with JSX not html. Only thing to make a note of
    // are the onchange and onclick function calls. This is why we had to bind our functions to "this"
    render() {
        return (
            <div className="main">
                <form className="registerForm" method="post" action="">
                    <p>Please Register</p>
                    <input
                        ref={input => {
                            this.firstInput = input;
                        }}
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        onKeyPress={this.activateButton}
                    />

                    <button
                        ref={button => {
                            this.button = button;
                        }}
                        onClick={this.handleSubmit}
                        type="button"
                    >
                        Register
                    </button>
                    <p>Already registered please...</p>
                    <Link className="link" to="/">
                        Login
                    </Link>
                    <p className="error">{this.state.Emessage}</p>
                </form>
            </div>
        );
    }
}

export default Register;
