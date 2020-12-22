import React from 'react';
// import App from '../components/Calendar/Calendar.jsx'
import TravelCalendar from '../components/Calendar/Calendar.jsx';
import MiniMenu from '../components/MiniMenu/MiniMenu.jsx';

const Homepage = () => {
  return (
    <>
      <div class="grid-x">
        <div class="cell medium-3">
          <MiniMenu />
        </div>
        <div class="cell medium-9">
          <TravelCalendar />
        </div>
      </div>
    </>
  );
};

export default Homepage;