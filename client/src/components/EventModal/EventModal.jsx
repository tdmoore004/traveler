import React, { Component } from 'react';
import Modal from "react-modal";

class EventModal extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
            eventType: ""
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        overlay: {zIndex:1000}
    };

    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    handleChange(event) {
        console.log(event)
        this.setState({ eventType: event.target.value });
        console.log(this.state.eventType)
    }

    handleSubmit(event) {
        console.log('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <button onClick={this.handleOpenModal}>Add Event</button>
                <Modal
                    isOpen={this.state.showModal}
                    contentLabel="onRequestClose Example"
                    onRequestClose={this.handleCloseModal}
                    shouldCloseOnOverlayClick={false}
                    style={this.customStyles}
                >
                    <p>Modal text!</p>
                    <button onClick={this.handleCloseModal}>X</button>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Type of Event:
                        <select value={this.state.eventType} onChange={this.handleChange}>
                                <option value="">Select event type...</option>
                                <option value="flight">Flight</option>
                                <option value="lodging">Lodging</option>
                                <option value="activity">Activity</option>
                            </select>
                        </label>
                        {this.state.eventType === "lodging" &&
                            <label>
                                Name:
                        <input type="text" name="name" />
                            </label>
                        }
                        <input type="submit" value="Submit" />
                    </form>
                </Modal>
            </div>
        );
    }
}

const props = {};

export default EventModal;