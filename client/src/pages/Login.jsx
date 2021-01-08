import React, { Component } from 'react';
import LoginModal from "../components/LoginModal/LoginModal.jsx"
import SignupModal from "../components/SignupModal/SignupModal.jsx"

class Login extends Component {

    render () {
        return (
            <div className="grid-x">
                <LoginModal/>
                <SignupModal/>
            </div>
        );
    }
};

export default Login;