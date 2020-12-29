import React, { Component } from 'react';
import axios from "axios";

class Login extends Component {

    constructor() {
        super();
        this.state = {
            emailInput: "",
            passwordInput: ""
        };
    }

    handleLoginSubmit = (event) => {
        event.preventDefault();

        console.log(this.state.emailInput)

        var userData = {
            email: this.state.emailInput,
            password: this.state.passwordInput
        };

        if (!userData.email || !userData.password) {
            return;
        }

        // If we have an email and password we run the loginUser function and clear the form
        this.loginUser(userData.email, userData.password);
        // emailInput.val("");
        // passwordInput.val("");
    };

    loginUser = (email, password) => {
        console.log(email);
        console.log(password);
        axios.post("/api/traveler/login", {
            email: email,
            password: password
        })
            .then(function () {
                window.location.replace("/");
                // If there's an error, log the error
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    render () {
        return (
            <div class="grid-x">
                <form onSubmit={this.handleLoginSubmit} class="cell medium-4" action="/login" method="post">
                    <div>
                        <label>Email:</label>
                        <input type="text" name="username" onChange={e => this.setState({emailInput: e.target.value})} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password" onChange={e => this.setState({passwordInput: e.target.value})} />
                    </div>
                    <div>
                        <input type="submit" value="Log In" />
                    </div>
                </form>
            </div>
        );
    }
};

export default Login;