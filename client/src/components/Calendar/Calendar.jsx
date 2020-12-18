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

class TravelCalendar extends Component {
    state = {
        events: [
            {
                start: moment().toDate(),
                end: moment().add(1, "days").toDate(),
                title: "Some title",
            },
        ],
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

    render() {
        return (
            <div className="App">
                <DnDCalendar
                    selectable
                    defaultDate={moment().toDate()}
                    defaultView="month"
                    events={this.state.events}
                    localizer={localizer}
                    scrollToTime={new Date(1970, 1, 1, 6)}
                    defaultDate={new Date(2015, 3, 12)}
                    onSelectEvent={event => alert(event.title)}
                    onEventDrop={this.onEventDrop}
                    onEventResize={this.onEventResize}
                    resizable
                    onSelectSlot={this.handleSelect}
                    style={{ height: "100vh" }}
                />
            </div>
        );
    }
}

TravelCalendar.propTypes = propTypes

export default TravelCalendar;