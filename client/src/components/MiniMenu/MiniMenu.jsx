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
            <div className="callout">
                <table className="hover unstriped">
                    <tbody>
                        <tr>
                            <td>Travel</td>
                        </tr>
                        <tr>
                            <td>Lodging</td>
                        </tr>
                        <tr>
                            <td>Activities</td>
                        </tr>
                        <tr>
                            <td>Notes</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
};

export default MiniMenu;