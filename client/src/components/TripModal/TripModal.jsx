import React, { Component } from 'react';
import Modal from "react-modal";
import axios from "axios";
import DatePicker from "react-datepicker";
import { TimePicker } from 'antd';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import { GlobalContext } from "../../utils/GlobalContext.js";
import "./tripModal.css";

class EventModal extends Component {
    static contextType = GlobalContext;

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            location: "",
            departureDate: "",
            departureTime: "",
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
    };

    handleCloseModal() {
        this.setState({ showModal: false });
    };

    handleChange(event) {
        this.setState({ eventType: event.target.value });
    };

    handleSubmit(event) {
        console.log(this.state.location, this.state.departureDate, this.state.returnDate);
        event.preventDefault();
        var tripData = {
            location: this.state.location,
            startDate: this.state.departureDate,
            endDate: this.state.returnDate,
        };

        this.logTrip(tripData.location, tripData.startDate, tripData.endDate);
        this.handleCloseModal();
    };

    logTrip = (location, startDate, endDate) => {
        const userContext = this.context;
        axios.post("/api/traveler/add-trip", {
            user: userContext[0].user,
            location: location,
            startDate: startDate,
            endDate: endDate
        })
            .then((response) => {
                console.log("success");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    render() {
        return (
            <div>
                <button class="trip-button button" onClick={this.handleOpenModal}>Add Trip</button>
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
                            <input onChange={e => this.setState({ location: e.target.value })} type="text" name="tripLocation" />
                        </label>
                        <div>
                            Departure:
                            <DatePicker
                                selected={this.state.departureDate}
                                onChange={date => this.setState({ departureDate: date })}
                                shouldCloseOnSelect="true"
                            />
                        </div>
                        <div>
                            Return:
                            <DatePicker
                                selected={this.state.returnDate}
                                onChange={date => this.setState({ returnDate: date })}
                                shouldCloseOnSelect="true"
                            />
                        </div>
                        {this.state.eventType === "flight" &&
                            <div>
                                <label>
                                    Flight Number:
                                <input type="text" name="flightNum" />
                                </label>
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

export default EventModal;