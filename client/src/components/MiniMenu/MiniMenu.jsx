import React, { Component } from 'react';
import './miniMenu.css'

class MiniMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eventType: ''
        };
    }
    render() {
        return (
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
        );
    }
};

export default MiniMenu;