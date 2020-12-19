import React, { Component } from 'react';

class EventModal extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            eventType: '' 
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ eventType: event.target.value });
    }

    handleSubmit(event) {
        console.log('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <div class="reveal" id="eventModal" data-reveal>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Type of Event:
                        <select value={this.state.eventType} onChange={this.handleChange}>
                            <option value="flight">Flight</option>
                            <option value="lodging">Lodging</option>
                            <option value="activity">Activity</option>
                        </select>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
};

export default EventModal;