import React, { Component, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GlobalProvider from './utils/GlobalContext.js';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
import Footer from "./components/Footer/Footer.jsx"
import $ from "jquery";

const App = () => {

  useEffect(() => {
    $(document).foundation();
  });

  return (
    <Router>
      <GlobalProvider>
        <Navbar />
        <div className="App">
          <Switch>
            <Route exact path='/' component={Homepage} />
          </Switch>
        </div>
        <Footer/>
      </GlobalProvider>
    </Router >
  );
}

export default App;
