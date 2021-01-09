import React, { useState } from 'react';
import Modal from "react-modal";
import axios from "axios";
import { useGlobalContext } from "../../utils/GlobalContext.js";


const SignupModal = () => {

    const [showModal, setShowModal] = useState(false);
    const [firstNameInput, setFirstNameInput] = useState("");
    const [lastNameInput, setLastNameInput] = useState("");
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
            firstName: firstNameInput,
            lastName: lastNameInput,
            email: emailInput,
            password: passwordInput
        };

        if (!userData.email || !userData.password) {
            return;
        }

        // If we have an email and password we run the loginUser function and clear the form
        loginUser(userData.firstName, userData.lastName, userData.email, userData.password);
    };

    const loginUser = (firstName, lastName, email, password) => {
        axios.post("/api/traveler/signup", {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        })
            .then((response) => {
                console.log(response);
                console.log(userContext);
                setUserContext({ user: response.data, isAuth: true });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <button onClick={handleOpenModal}>Signup</button>
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
                        <label>First Name:</label>
                        <input type="text" name="firstName" onChange={e => setFirstNameInput(e.target.value)} />
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input type="text" name="lastName" onChange={e => setLastNameInput(e.target.value)} />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="text" name="username" onChange={e => setEmailInput(e.target.value)} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password" onChange={e => setPasswordInput(e.target.value)} />
                    </div>
                    <div>
                        <input type="submit" value="Signup" />
                    </div>
                </form>
            </Modal>
        </div>
    );
};

// class SignupModal extends Component {

//     constructor() {
//         super();
//         this.state = {
//             showModal: false,
//             firstNameInput: "",
//             lastNameInput: "",
//             emailInput: "",
//             passwordInput: ""
//         };

//         this.handleOpenModal = this.handleOpenModal.bind(this);
//         this.handleCloseModal = this.handleCloseModal.bind(this);
//         this.handleSubmit = this.handleLoginSubmit.bind(this);
//     }

//     customStyles = {
//         content: {
//             top: '50%',
//             left: '50%',
//             right: 'auto',
//             bottom: 'auto',
//             marginRight: '-50%',
//             transform: 'translate(-50%, -50%)'
//         },
//         overlay: { zIndex: 1000 }
//     };

//     handleOpenModal() {
//         this.setState({ showModal: true });
//     }

//     handleCloseModal() {
//         this.setState({ showModal: false });
//     }

    // handleLoginSubmit = (event) => {
    //     event.preventDefault();

    //     console.log(this.state.emailInput)

    //     var userData = {
    //         firstName: this.state.firstNameInput,
    //         lastName: this.state.lastNameInput,
    //         email: this.state.emailInput,
    //         password: this.state.passwordInput
    //     };

    //     if (!userData.email || !userData.password) {
    //         return;
    //     }

    //     // If we have an email and password we run the loginUser function and clear the form
    //     this.loginUser(userData.firstName, userData.lastName, userData.email, userData.password);
    //     // emailInput.val("");
    //     // passwordInput.val("");
    // };

    // loginUser = (firstName, lastName, email, password) => {
    //     axios.post("/api/traveler/signup", {
    //         firstName: firstName,
    //         lastName: lastName,
    //         email: email,
    //         password: password
    //     })
    //         .then((response) => {
    //             localStorage.setItem("user", response.data);
    //             window.location.replace("/");
    //             // If there's an error, log the error
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }

//     render() {
        // return (
        //     <div>
        //         <button onClick={this.handleOpenModal}>Signup</button>
        //         <Modal
        //             isOpen={this.state.showModal}
        //             contentLabel="onRequestClose Example"
        //             onRequestClose={this.handleCloseModal}
        //             shouldCloseOnOverlayClick={false}
        //             style={this.customStyles}
        //             ariaHideApp={false}
        //         >
        //             <button onClick={this.handleCloseModal}>X</button>
        //             <form onSubmit={this.handleLoginSubmit} class="cell medium-4" action="/login" method="post">
        //                 <div>
        //                     <label>First Name:</label>
        //                     <input type="text" name="firstName" onChange={e => this.setState({ firstNameInput: e.target.value })} />
        //                 </div>
        //                 <div>
        //                     <label>Last Name:</label>
        //                     <input type="text" name="lastName" onChange={e => this.setState({ lastNameInput: e.target.value })} />
        //                 </div>
        //                 <div>
        //                     <label>Email:</label>
        //                     <input type="text" name="username" onChange={e => this.setState({ emailInput: e.target.value })} />
        //                 </div>
        //                 <div>
        //                     <label>Password:</label>
        //                     <input type="password" name="password" onChange={e => this.setState({ passwordInput: e.target.value })} />
        //                 </div>
        //                 <div>
        //                     <input type="submit" value="Signup" />
        //                 </div>
        //             </form>
        //         </Modal>
        //     </div>
        // );
//     }
// };

export default SignupModal;