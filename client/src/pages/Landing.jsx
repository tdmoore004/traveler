import React, { Component } from 'react';
import beachPic from "../assets/images/traveler-beach.jpg";


class Login extends Component {

    render () {
        return (
            <main className="card grid-container grid-x align-center about">

            {/* Headline introducing who I am. */}
            <h3 className="card-divider about">
                Are you dreaming of relaxing on a secluded island?
            </h3>

            <section className="card-section">

                {/* Profile picture */}
                <img id="profilePic" src={beachPic} alt="beach" loading="lazy" />

                {/* Introduction to who I am and what I do. */}
                <p className="aboutMe">How about checking out the canals of Venice, or the majestic snow capped alps? Or maybe you just have a business trip to New York for a few days, or just need to take a short road trip to get out of your house? Well look no further than Traveler for staying organized no matter what your next getaway may be.</p>
                <p className="aboutMe">Keep track of all of your upcoming travels and all the included activities and events that come with. Even if you are out of the country and don't have internet you can still get all the info you need for your next tour right in Traveler.</p>

            </section>
            
        </main>
        );
    }
};

export default Login;