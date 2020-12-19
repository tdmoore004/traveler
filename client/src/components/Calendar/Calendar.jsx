import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

// import "./App.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);
const propTypes = {}
console.log(DnDCalendar)
class TravelCalendar extends Component {
    state = {
        events: [
            // {
            //     start: moment().toDate(),
            //     end: moment().add(1, "days").toDate(),
            //     title: "Some title",
            // },
        ],
        displayDragItemInCell: true
    };

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

        // alert(`${event.title} was dropped onto ${updatedEvent.start}`)
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

        //alert(`${event.title} was resized to ${start}-${end}`)
    }

    handleEventEditModal = (event) => {
        console.log("hit event: ", event)
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
                    onSelectEvent={this.handleEventEditModal}
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
                />
                <button
                    onClick={this.handleEventEditModal}
                    className="button"
                    data-toggle="eventEditModal"
                >
                    Edit Event
                </button>
            </div>
        );
    }
}

TravelCalendar.propTypes = propTypes

export default TravelCalendar;