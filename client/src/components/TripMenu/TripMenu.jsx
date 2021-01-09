import React, { Component } from 'react';
import { Accordion } from 'foundation-sites';
import './tripMenu.css'
import EventModal from "../EventModal/EventModal.jsx"
import TripModal from "../TripModal/TripModal.jsx"
import $ from "jquery";
import axios from "axios";
import { GlobalContext } from "../../utils/GlobalContext.js";

class TripMenu extends Component {
    static contextType = GlobalContext;

    constructor(props) {
        super(props);
        this.state = {
            eventType: '',
            trips: [],
        };

    }

    componentDidMount() {
        const userContext = this.context;

        axios.get(`/api/traveler/trips/${userContext[0].user}`)
            .then(res => {
                let initialTrips = [];
                res.data.data.forEach(trip => {
                    initialTrips.push(trip)
                });
                return initialTrips
            })
            .then(data => {
                this.setState({
                    trips: data
                }, () => {
                    this.initializeFoundation();
                })
            })
            .catch(err => {
                console.log("Unable to get trips from backend: ", err);
            });

    }

    initializeFoundation = () => {
        console.log('initialized')
        // $(document).foundation();

        new Accordion($(".accordion"), {
            slideSpeed: 500,
            multiExpand: true
        })
    }

    render() {
        let trips = this.state.trips;
        let createAllTripOptions = (trips.map(trip =>
            <li id="accordion-item" class="accordion-item" data-accordion-item>
                <a href="#" class="accordion-title">{trip.location}</a>
                <div class="accordion-content" data-tab-content>
                    <p><a href="#">Flights</a></p>
                    <p><a href="#">Lodging</a></p>
                    <p><a href="#">Activities</a></p>
                </div>
            </li>
        )
        )

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
                    {createAllTripOptions}
                    </ul>
                </div>
            </>
        );
    }
};

export default TripMenu;