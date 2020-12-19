import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GlobalProvider from './utils/GlobalContext';
import Homepage from './pages/Homepage';
import AddTodo from './pages/AddTodo';
import ViewTodos from './pages/ViewTodos';
import Navbar from './components/Navbar';
import $ from "jquery";

class App extends Component {

  componentDidMount() {
    $(document).foundation();
  }

  render() {
    return (
      <Router>
        <GlobalProvider>
          <Navbar />
          <div className="App">
            <Switch>
              <Route exact path='/' component={Homepage} />
              <Route exact path='/todos' component={ViewTodos} />
              <Route exact path='/todos/new' component={AddTodo} />
            </Switch>
          </div>
        </GlobalProvider>
      </Router >
    );
  }
}


export default App;
