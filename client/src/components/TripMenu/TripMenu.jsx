import React, { Component } from 'react';
import './tripMenu.css'
import EventModal from "../EventModal/EventModal.jsx"
import TripModal from "../TripModal/TripModal.jsx"
import $ from "jquery";

class TripMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eventType: '',
        };

    }

    componentDidMount() {
        $(document).foundation();
    }

    render() {
        return (
            <>
                <EventModal/>
                <TripModal/>
                {/* <div class="primary button-group">
                    <a class="trip-button button">Add Trip</a>
                    <a class="event-button button" onClick={<EventModal/>}>Add Event</a>
                </div> */}
                <div class="callout">
                    <ul class="accordion" data-accordion>
                        <li class="accordion-item is-active" data-accordion-item>
                            <a href="#" class="accordion-title">Next Trip</a>
                            <div class="accordion-content" data-tab-content>
                                <p><a href="#">Flights</a></p>
                                <p><a href="#">Lodging</a></p>
                                <p><a href="#">Activities</a></p>
                            </div>
                        </li>
                        <li class="accordion-item" data-accordion-item>
                            <a href="#" class="accordion-title">Trip B</a>
                            <div class="accordion-content" data-tab-content>
                                <p><a href="#">Flights</a></p>
                                <p><a href="#">Lodging</a></p>
                                <p><a href="#">Activities</a></p>
                            </div>
                        </li>
                        <li class="accordion-item" data-accordion-item>
                            <a href="#" class="accordion-title">Trip C</a>
                            <div class="accordion-content" data-tab-content>
                                <p><a href="#">Flights</a></p>
                                <p><a href="#">Lodging</a></p>
                                <p><a href="#">Activities</a></p>
                            </div>
                        </li>
                    </ul>
                </div>
            </>
        );
    }
};

export default TripMenu;