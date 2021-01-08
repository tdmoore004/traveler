import React from 'react';
// import App from '../components/Calendar/Calendar.jsx'
import TravelCalendar from '../components/Calendar/Calendar.jsx';
import TripMenu from '../components/TripMenu/TripMenu.jsx';
import { useGlobalContext } from "../utils/GlobalContext.js";
import Login from "../pages/Login.jsx";

const Homepage = () => {
  const [userContext] = useGlobalContext();
  console.log(userContext);

  return (
    <main className="grid-x">
      {userContext.isAuth === true ? (
        <>
          <div className="cell medium-3" >
            <TripMenu />
          </div>
          <div className="cell medium-9">
            <TravelCalendar />
          </div>
        </>
      ) : (
          <Login />
        )}
    </main>
  );
};

export default Homepage;