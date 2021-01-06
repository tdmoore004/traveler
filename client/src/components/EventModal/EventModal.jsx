import React, { Component } from 'react';
import Modal from "react-modal";
import axios from "axios";

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
        console.log(this.state.location, this.state.departureDate, this.state.returnDate);
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
            trip: "hello",
            type: type,
            startDate: startDate,
            endDate: endDate
        })
            .then(function () {
                console.log("success");
                // window.location.replace("/");
                // If there's an error, log the error
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    render() {
        return (
            <div>
                <button class="event-button button" onClick={this.handleOpenModal}>Add Event</button>
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
                        {this.state.eventType === "lodging" &&
                            <div>
                                <label>
                                    Lodging Name:
                            <input type="text" name="lodgingName" />
                                </label>
                                <label>
                                    Check-in Date:
                            <input type="text" name="checkInDate" />
                                </label>
                                <label>
                                    Check-out Date:
                            <input type="text" name="checkOutDate" />
                                </label>
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
                                    Start Time:
                            <input type="text" name="activityStart" />
                                </label>
                                <label>
                                    End Time:
                            <input type="text" name="activityEnd" />
                                </label>
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