import React, { Component } from 'react';
import Modal from "react-modal";
import axios from "axios";
import DatePicker from "react-datepicker";
// import { TimePicker } from 'antd';
// import moment from 'moment';
import 'antd/dist/antd.css';
import "react-datepicker/dist/react-datepicker.css";
import { GlobalContext } from "../../utils/GlobalContext.js";

class EventModal extends Component {
    static contextType = GlobalContext

    constructor() {
        super();
        this.state = {
            showModal: false,
            eventType: "",
            tripLocation: [],
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
        event.preventDefault();
        var eventData = {
            type: this.state.eventType,
            location: this.state.location,
            startDate: this.state.departureDate,
            endDate: this.state.returnDate,
        };

        // if (!eventData.email || !eventData.password) {
        //     return;
        // }

        this.logEvent(eventData.type, eventData.location, eventData.startDate, eventData.endDate);
        this.handleCloseModal();
    };

    logEvent = (type, location, startDate, endDate) => {
        axios.post("/api/traveler/add-event", {
            type: type,
            name: type,
            startDate: startDate,
            endDate: endDate
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
        console.log(userContext[0].user)

        axios.get(`/api/traveler/trips/${userContext[0].user}`)
            .then(res => {
                let tripLocations = [];
                res.data.data.forEach(trip => {
                    tripLocations.push(trip.location)
                });
                return tripLocations
            })
            .then(data => {
                this.setState({
                    tripLocation: data
                })
            })
            .catch(err => {
                console.log("Unable to get trips from backend: ", err);
            });
    };


    render() {
        let trips = this.state.tripLocation;
        console.log("TRIPS: ", trips)
        let createAllTripOptions = trips.map(trip => 
            <option value={trip}>{trip}</option>
        )


        console.log("CREATED ALL TRIPS: ", createAllTripOptions)



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
                        <select value={this.state.eventType} onChange={this.handleChange}>
                                {createAllTripOptions}
                            </select>
                        </label>
                        <label>
                            Type of Event:
                        <select value={this.state.eventType} onChange={this.handleChange}>
                                <option value="">Select event type...</option>
                                <option value="flight">Flight</option>
                                <option value="lodging">Lodging</option>
                                <option value="activity">Activity</option> 
                            </select>
                        </label>
                        {this.state.eventType === "flight" &&
                            <div>
                                <label>
                                    Flight Number:
                                <input type="text" name="flightNum" />
                                </label>
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
                                <label>
                                    Additional Info:
                                <input type="text" name="additionalInfoFlight" />
                                </label>
                            </div>
                        }
                        {this.state.eventType === "lodging" &&
                            <div>
                                <label>
                                    Lodging Name:
                            <input type="text" name="lodgingName" />
                                </label>
                                <label>
                                    Where are you going?
                            <input onChange={e => this.setState({ location: e.target.value })} type="text" name="tripLocation" />
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
                            <input type="text" name="additionalInfoLodge" />
                                </label>
                            </div>
                        }
                        {this.state.eventType === "activity" &&
                            <div>
                                <label>
                                    Activity Name:
                            <input type="text" name="activityName" />
                                </label>
                                <label>
                                    Date:
                            <input type="text" name="activityDate" />
                                </label>
                                <label>
                                    Where are you going?
                            <input onChange={e => this.setState({ location: e.target.value })} type="text" name="tripLocation" />
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
                            <input type="text" name="additionalInfoActivity" />
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