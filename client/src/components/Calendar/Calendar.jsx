import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import axios from "axios";
import EventModal from "../EventModal/EventModal.jsx";
import TripModal from "../TripModal/TripModal.jsx";
import { GlobalContext } from "../../utils/GlobalContext.js";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import './calendar.css';

const localizer = momentLocalizer(moment);
const propTypes = {};

class TravelCalendar extends Component {
    static contextType = GlobalContext;
    
    state = {
        events: [],
        displayDragItemInCell: true
    };

    componentDidMount = () => {
        const userContext = this.context;

        axios.get(`/api/traveler/trips/${userContext[0].user}`)
            .then((res) => {
                const tripArr = res.data.data;
                this.addTrip(tripArr);
                tripArr.forEach(trip => {
                    this.addEvent(trip.activity);
                    this.addEvent(trip.flight);
                    this.addEvent(trip.lodging);

                })
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    addTrip = (tripArr) => {
        tripArr.forEach(trip => {
            const tripTitle = ('Trip to: ' + trip.location);

            const startDateYear = trip.startDate.slice(0, 4);
            const startDateMonth = trip.startDate.slice(5, 7) - 1;
            const startDateDay = trip.startDate.slice(8, 10);
            const startDateHour = trip.startDate.slice(11, 13);
            const startDateMinute = trip.startDate.slice(14, 16);
            
            const endDateYear = trip.endDate.slice(0, 4);
            const endDateMonth = trip.endDate.slice(5, 7) - 1;
            const endDateDay = trip.endDate.slice(8, 10);
            const endDateHour = trip.endDate.slice(11, 13);
            const endDateMinute = trip.endDate.slice(14, 16);

            this.setState({
                events: [
                    ...this.state.events,
                    {
                        type: "trip",
                        title: tripTitle,

                        start: new Date(startDateYear, startDateMonth, startDateDay, startDateHour, startDateMinute),
                        end: new Date(endDateYear, endDateMonth, endDateDay, endDateHour, endDateMinute)
                    }
                ]
            });
        });
    };
    
    addEvent = (eventArr) => {
        eventArr.forEach(event => {
            const startDateYear = event.startDate.slice(0, 4);
            const startDateMonth = event.startDate.slice(5, 7) - 1;
            const startDateDay = event.startDate.slice(8, 10);
            const startDateHour = event.startDate.slice(11, 13);
            const startDateMinute = event.startDate.slice(14, 16);
            
            const endDateYear = event.endDate.slice(0, 4);
            const endDateMonth = event.endDate.slice(5, 7) - 1;
            const endDateDay = event.endDate.slice(8, 10);
            const endDateHour = event.endDate.slice(11, 13);
            const endDateMinute = event.endDate.slice(14, 16);

            this.setState({
                events: [
                    ...this.state.events,
                    {
                        type: "event",
                        title: event.name,
                        start: new Date(startDateYear, startDateMonth, startDateDay, startDateHour, startDateMinute),
                        end: new Date(endDateYear, endDateMonth, endDateDay, endDateHour, endDateMinute)
                    }
                ]
            })
        })
    };


    // handleSelect = ({ start, end }) => {
    //     const title = window.prompt('New Event name')
    //     if (title)
    //         this.setState({
    //             events: [
    //                 ...this.state.events,
    //                 {
    //                     start,
    //                     end,
    //                     title,
    //                 },
    //             ],
    //         })
    // };

    handleEventEditModal = (event) => {
        return (
            <EventModal />,
            <TripModal />
        )
    };

    eventStyleGetter = (event) => {
        let style = {};
        if(event.type === "trip") {
            style = {
                backgroundColor: "#64b8b1",
                borderRadius: '10px',
                opacity: 0.8,
                color: 'white',
                border: '0px',
                display: 'block'
            };
        } else if (event.type === "event") {
            style = {
                backgroundColor: "#92C4EE",
                borderRadius: '10px',
                opacity: 0.8,
                color: 'white',
                border: '0px',
                display: 'block'
            }
        };
        return {
            style: style
        };
    };


    render() {
        return (
            <div className="App">
                <Calendar
                    data-toggle="eventModal"
                    selectable
                    defaultDate={moment().toDate()}
                    defaultView="month"
                    events={this.state.events}
                    localizer={localizer}
                    style={{ height: "75vh" }}
                    popup
                    eventPropGetter={this.eventStyleGetter}
                    // onSelectSlot={this.handleSelect}
                />
            </div>
        );
    };
};

TravelCalendar.propTypes = propTypes

export default TravelCalendar;