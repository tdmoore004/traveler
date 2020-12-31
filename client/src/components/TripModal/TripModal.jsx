import React, { Component } from 'react';
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import { TimePicker } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';
import "react-datepicker/dist/react-datepicker.css";

class EventModal extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
            eventType: "",
            departureDate: "",
            departureTime: "",
            returnDate: "",
            returnTime: ""
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
        overlay: { zIndex: 1000 }
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
                <button onClick={this.handleOpenModal}>Add Trip</button>
                <Modal
                    isOpen={this.state.showModal}
                    contentLabel="onRequestClose Example"
                    onRequestClose={this.handleCloseModal}
                    shouldCloseOnOverlayClick={false}
                    style={this.customStyles}
                    ariaHideApp={false}
                >
                    <button onClick={this.handleCloseModal}>X</button>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Where are you going?
                            <input type="text" name="additionalInfoActivity" />
                        </label>
                        <label>
                            Are you flying or driving?
                        <select value={this.state.eventType} onChange={this.handleChange}>
                                <option value="">Select event type...</option>
                                <option value="flight">Flying</option>
                                <option value="drive">Driving</option>
                            </select>
                        </label>
                        {this.state.eventType === "flight" &&
                            <div>
                                <label>
                                    Flight Number:
                                <input type="text" name="flightNum" />
                                </label>
                                <label>
                                    Departure Time:
                                <input type="text" name="departureTime" />
                                </label>
                                <label>
                                    Arrival Time:
                                <input type="text" name="arrivalTime" />
                                </label>
                                <label>
                                    Additional Info:
                                <input type="text" name="additionalInfoFlight" />
                                </label>
                            </div>
                        }
                        {this.state.eventType === "drive" &&
                            <div>
                                <div>
                                    Departure:
                                    <DatePicker
                                        selected={this.state.departureDate}
                                        onChange={date => this.setState({ departureDate: date })}
                                        shouldCloseOnSelect="true"
                                    />
                                    <TimePicker 
                                        use12Hours
                                        defaultValue={moment('12:08', 'HH:mm')}
                                        onChange={time => this.setState({ departureTime: time })}
                                        format="h:mm a"
                                    />
                                </div>
                                <div>
                                    Return:
                                    <DatePicker
                                        selected={this.state.returnDate}
                                        onChange={date => this.setState({ returnDate: date })}
                                        shouldCloseOnSelect="true"
                                    />
                                    <TimePicker 
                                        use12Hours
                                        defaultValue={moment('12:08', 'HH:mm')}
                                        onChange={time => this.setState({ returnTime: time })}
                                        format="h:mm a"
                                    />
                                </div>

                            </div>
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