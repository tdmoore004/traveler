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
                initialTrips.sort((a, b) => (a.startDate > b.startDate) ? 1 : -1);
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
        let createAllTripOptions = (trips.map(trip => {
            let location = trip.location;
            let flights = [];
            let lodging = [];
            let activities = [];
            trip.flight.map(flight => flights.push(flight));
            trip.lodging.map(lodge => lodging.push(lodge));
            trip.activity.map(activity => activities.push(activity));

            let allFlights;
            let allLodging;
            let allActivities;

            if (flights !== []) {
                allFlights = flights.map(flight =>
                    <li>{flight.name}</li>
                )
            };

            if (lodging !== []) {
                allLodging = lodging.map(lodge =>
                    <li>{lodge.name}</li>
                )
            };

            if (activities !== []) {
                allActivities = activities.map(activity =>
                    <li>{activity.name}</li>
                )
            };

            return (
                <li id="accordion-item" className="accordion-item" data-accordion-item>
                    <a href="#" className="accordion-title">{location}</a>
                    <div className="accordion-content" data-tab-content>
                        <p>
                            Flights
                            <ul>
                                {allFlights}
                            </ul>
                        </p>
                        <p>
                            Lodging
                            <ul>
                                {allLodging}
                            </ul>
                        </p>
                        <p>
                            Activities
                            <ul>
                                {allActivities}
                            </ul>
                        </p>
                    </div>
                </li>
            );
        }));

        return (
            <>
                <EventModal />
                <TripModal />
                {/* <div class="primary button-group">
                    <a class="trip-button button">Add Trip</a>
                    <a class="event-button button" onClick={<EventModal/>}>Add Event</a>
                </div> */}
                <div className="callout">
                    <ul className="accordion" data-accordion>
                        {createAllTripOptions}
                    </ul>
                </div>
            </>
        );
    }
};

export default TripMenu;