import React, { Component } from 'react';
import Modal from "react-modal";
import axios from "axios";
import DatePicker from "react-datepicker";
// import { TimePicker } from 'antd';
// import moment from 'moment';
// import 'antd/dist/antd.css';
import "react-datepicker/dist/react-datepicker.css";
import { GlobalContext } from "../../utils/GlobalContext.js";

class EventModal extends Component {
    static contextType = GlobalContext

    constructor() {
        super();
        this.state = {
            showModal: false,
            trip: [],
            name: "",
            tripId: "",
            additionalInfo: "",
            eventType: ""
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleTripChange = this.handleTripChange.bind(this);
        this.handleEventChange = this.handleEventChange.bind(this);
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

    handleTripChange(event) {
        this.setState({ tripId: event.target.value });
    }

    handleEventChange(event) {
        this.setState({ eventType: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        var eventData = {
            id: this.state.tripId,
            type: this.state.eventType,
            name: this.state.name,
            startDate: this.state.departureDate,
            endDate: this.state.returnDate,
            additionalInfo: this.state.additionalInfo
        };

        this.logEvent(eventData.id, eventData.name, eventData.type, eventData.startDate, eventData.endDate, eventData.additionalInfo);
        this.handleCloseModal();
    };

    logEvent = (id, name, type, startDate, endDate, additionalInfo) => {
        axios.post("/api/traveler/add-event", {
            id: id,
            type: type,
            name: name,
            startDate: startDate,
            endDate: endDate,
            additionalInfo: additionalInfo
        })
            .then(function () {
                console.log("success");
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    componentDidMount = () => {
        const userContext = this.context;

        axios.get(`/api/traveler/trips/${userContext[0].user}`)
            .then(res => {
                let tripInfo = [];
                res.data.data.forEach(trip => {
                    tripInfo.push({
                        id: trip._id,
                        location: trip.location
                    })
                });
                return tripInfo
            })
            .then(data => {
                this.setState({
                    trip: data
                })
            })
            .catch(err => {
                console.log("Unable to get trips from backend: ", err);
            });
    };


    render() {

        let trips = this.state.trip;
        let createAllTripOptions = trips.map(trip =>
            <option value={trip.id}>{trip.location}</option>
        )

        return (
            <div>
                <button className="event-button button" onClick={this.handleOpenModal}>Add Event</button>
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
                            Trip:
                        <select value={this.state.trip.id} onChange={this.handleTripChange}>
                                <option value="">Select trip...</option>
                                {createAllTripOptions}
                            </select>
                        </label>
                        <label>
                            Type of Event:
                        <select value={this.state.eventType} onChange={this.handleEventChange}>
                                <option value="">Select event type...</option>
                                <option value="flight">Flight</option>
                                <option value="lodging">Lodging</option>
                                <option value="activity">Activity</option>
                            </select>
                        </label>
                        {this.state.eventType === "flight" &&
                            <div>
                                <label>
                                    Flight number:
                            <input onChange={e => this.setState({ name: e.target.value })} type="text" name="tripLocation" />
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
                                <label>
                                    Additional Info:
                                <input
                                        type="text"
                                        name="additionalInfoFlight"
                                        onChange={info => this.setState({ additionalInfo: info.target.value })}
                                    />
                                </label>
                            </div>
                        }
                        {this.state.eventType === "lodging" &&
                            <div>
                                <label>
                                    Lodging name:
                            <input onChange={e => this.setState({ name: e.target.value })} type="text" name="tripLocation" />
                                </label>
                                <div>
                                    Check-in:
                            <DatePicker
                                        selected={this.state.departureDate}
                                        onChange={date => this.setState({ departureDate: date })}
                                        shouldCloseOnSelect="true"
                                    />
                                </div>
                                <div>
                                    Check-out:
                            <DatePicker
                                        selected={this.state.returnDate}
                                        onChange={date => this.setState({ returnDate: date })}
                                        shouldCloseOnSelect="true"
                                    />
                                </div>
                                <label>
                                    Additional Info:
                                    <input
                                        type="text"
                                        name="additionalInfoLodge"
                                        onChange={info => this.setState({ additionalInfo: info.target.value })}
                                    />
                                </label>
                            </div>
                        }
                        {this.state.eventType === "activity" &&
                            <div>
                                <label>
                                    Activity name:
                            <input onChange={e => this.setState({ name: e.target.value })} type="text" name="tripLocation" />
                                </label>
                                <div>
                                    Start:
                            <DatePicker
                                        selected={this.state.departureDate}
                                        onChange={date => this.setState({ departureDate: date })}
                                        shouldCloseOnSelect="true"
                                    />
                                </div>
                                <div>
                                    End:
                            <DatePicker
                                        selected={this.state.returnDate}
                                        onChange={date => this.setState({ returnDate: date })}
                                        shouldCloseOnSelect="true"
                                    />
                                </div>
                                <label>
                                    Additional Info:
                                    <input
                                        type="text"
                                        name="additionalInfoActivity"
                                        onChange={info => this.setState({ additionalInfo: info.target.value })}
                                    />
                                </label>
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