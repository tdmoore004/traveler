import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import axios from "axios";
import EventModal from "../EventModal/EventModal.jsx"
import TripModal from "../TripModal/TripModal.jsx"

// import "./App.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);
const propTypes = {}

class TravelCalendar extends Component {
    state = {
        events: [],
        displayDragItemInCell: true
    };

    componentDidMount = () => {
        
        axios.get(`/api/traveler/trips/${localStorage.getItem("user")}`)
            .then((res) => {
                console.log("USER: ", localStorage.getItem("user"))
                const tripArr = res.data.data;

                tripArr.forEach(trip => {
                    console.log(trip)
                    const startDateYear = trip.startDate.slice(0, 4);
                    const startDateMonth = trip.startDate.slice(5, 7);
                    const startDateDay = trip.startDate.slice(8, 10);
                    const startDateHour = trip.startDate.slice(11, 13);
                    const startDateMinute = trip.startDate.slice(14, 16);
                    
                    const endDateYear = trip.endDate.slice(0, 4);
                    const endDateMonth = trip.endDate.slice(5, 7);
                    const endDateDay = trip.endDate.slice(8, 10);
                    const endDateHour = trip.endDate.slice(11, 13);
                    const endDateMinute = trip.endDate.slice(14, 16);

                    this.setState({
                        events: [
                            ...this.state.events,
                            {
                                type: "trip",
                                title: trip.location,
                                start: new Date(startDateYear, startDateMonth, startDateDay, startDateHour, startDateMinute),
                                end: new Date(endDateYear, endDateMonth, endDateDay, endDateHour, endDateMinute)
                            }
                        ]
                    })
                    console.log("state.events: ", this.state.events)
                })
            })
            .catch(function (err) {
                console.log(err);
            });

        
    }

    handleSelect = ({ start, end }) => {
        const title = window.prompt('New Event name')
        if (title)
            this.setState({
                events: [
                    ...this.state.events,
                    {
                        start,
                        end,
                        title,
                    },
                ],
            })
    }

    onEventResize = (data) => {
        const { start, end } = data;

        this.setState((state) => {
            state.events[0].start = start;
            state.events[0].end = end;
            return { events: [...state.events] };
        });
    };

    onEventDrop = (data) => {
        console.log(data);
    };



    // Drag and Drop Code:
    handleDragStart = event => {
        this.setState({ draggedEvent: event })
    }

    dragFromOutsideItem = () => {
        return this.state.draggedEvent
    }

    onDropFromOutside = ({ start, end, allDay }) => {
        const { draggedEvent } = this.state

        const event = {
            id: draggedEvent.id,
            title: draggedEvent.title,
            start,
            end,
            allDay: allDay,
        }

        this.setState({ draggedEvent: null })
        this.moveEvent({ event, start, end })
    }

    moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
        const { events } = this.state

        let allDay = event.allDay

        if (!event.allDay && droppedOnAllDaySlot) {
            allDay = true
        } else if (event.allDay && !droppedOnAllDaySlot) {
            allDay = false
        }

        const nextEvents = events.map(existingEvent => {
            return existingEvent.id == event.id
                ? { ...existingEvent, start, end }
                : existingEvent
        })

        this.setState({
            events: nextEvents,
        })
    }

    resizeEvent = ({ event, start, end }) => {
        const { events } = this.state

        const nextEvents = events.map(existingEvent => {
            return existingEvent.id == event.id
                ? { ...existingEvent, start, end }
                : existingEvent
        })

        this.setState({
            events: nextEvents,
        })
    }

    handleEventEditModal = (event) => {
        console.log("hit event: ", event)
        return (
            <EventModal />,
            <TripModal />
        )
    }

    eventStyleGetter = (event, start, end, isSelected) => {
        console.log("eeeeeeevent: ", event);
        var style = {
            backgroundColor: "orange",
            borderRadius: '10px',
            opacity: 0.8,
            color: 'black',
            border: '0px',
            display: 'block'
        };
        return {
            style: style
        };
    }


    render() {
        return (
            <div className="App">
                <DnDCalendar
                    data-toggle="eventModal"
                    selectable
                    defaultDate={moment().toDate()}
                    defaultView="month"
                    events={this.state.events}
                    localizer={localizer}
                    scrollToTime={new Date(1970, 1, 1, 6)}
                    onEventDrop={this.moveEvent}
                    onEventResize={this.resizeEvent}
                    dragFromOutsideItem={
                        this.state.displayDragItemInCell ? this.dragFromOutsideItem : null
                    }
                    onDropFromOutside={this.onDropFromOutside}
                    handleDragStart={this.handleDragStart}
                    resizable
                    onSelectSlot={this.handleSelect}
                    style={{ height: "75vh" }}
                    popup
                    eventPropGetter={this.eventStyleGetter}
                    // dayPropGetter={this.eventStyleGetter}
                />
            </div>
        );
    }
}

TravelCalendar.propTypes = propTypes

export default TravelCalendar;