import React from 'react';
// import App from '../components/Calendar/Calendar.jsx'
import TravelCalendar from '../components/Calendar/Calendar.jsx';
import TripMenu from '../components/TripMenu/TripMenu.jsx';

const Homepage = () => {
  return (
    <>
      <div className="grid-x">
        <div className="cell large-3">
          <TripMenu />
        </div>
        <div className="cell large-9">
          <TravelCalendar />
        </div>
      </div>
    </>
  );
};

export default Homepage;