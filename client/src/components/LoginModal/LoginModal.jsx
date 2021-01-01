import React, { Component } from 'react';
import Modal from "react-modal";
import axios from "axios";


class LoginModal extends Component {

    constructor() {
        super();
        this.state = {
            showModal: false,
            emailInput: "",
            passwordInput: ""
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleSubmit = this.handleLoginSubmit.bind(this);
    }

    customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        },
        overlay: { zIndex: 1000 }
    };

    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
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

    render() {
        return (
            <div>
                <button onClick={this.handleOpenModal}>Login</button>
                <Modal
                    isOpen={this.state.showModal}
                    contentLabel="onRequestClose Example"
                    onRequestClose={this.handleCloseModal}
                    shouldCloseOnOverlayClick={false}
                    style={this.customStyles}
                    ariaHideApp={false}
                >
                    <button onClick={this.handleCloseModal}>X</button>
                    <form onSubmit={this.handleLoginSubmit} class="cell medium-4" action="/login" method="post">
                        <div>
                            <label>Email:</label>
                            <input type="text" name="username" onChange={e => this.setState({ emailInput: e.target.value })} />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input type="password" name="password" onChange={e => this.setState({ passwordInput: e.target.value })} />
                        </div>
                        <div>
                            <input type="submit" value="Log In" />
                        </div>
                    </form>
                </Modal>
            </div>
        );
    }
};

export default LoginModal;