import React, { useState } from 'react';
import Modal from "react-modal";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useGlobalContext } from "../../utils/GlobalContext.js";

const LoginModal = () => {

    const [showModal, setShowModal] = useState(false);
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [userContext, setUserContext] = useGlobalContext();

    const customStyles = {
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

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleLoginSubmit = (event) => {
        event.preventDefault();

        var userData = {
            email: emailInput,
            password: passwordInput
        };

        if (!userData.email || !userData.password) {
            return;
        }

        // If we have an email and password we run the loginUser function and clear the form
        loginUser(userData.email, userData.password);
    };

    const loginUser = (email, password) => {
        axios.post("/api/traveler/login", {
            email: email,
            password: password
        })
            .then((response) => {
                console.log(response);
                console.log(userContext);
                setUserContext({ user: response.data, isAuth: true });
                handleCloseModal();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <Link className="userLog login-logout" onClick={handleOpenModal}>Login</Link>
            <Modal
                isOpen={showModal}
                contentLabel="onRequestClose Example"
                onRequestClose={handleCloseModal}
                shouldCloseOnOverlayClick={false}
                style={customStyles}
                ariaHideApp={false}
            >
                <button onClick={handleCloseModal}>X</button>
                <form onSubmit={handleLoginSubmit} class="cell medium-4" action="/login" method="post">
                    <div>
                        <label>Email:</label>
                        <input type="text" name="username" onChange={e => setEmailInput(e.target.value)} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password" onChange={e => setPasswordInput(e.target.value)} />
                    </div>
                    <div>
                        <input type="submit" value="Log In" />
                    </div>
                </form>
            </Modal>
        </div>
    );

};

export default LoginModal;