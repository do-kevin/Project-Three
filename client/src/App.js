import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Reminder from "./pages/Reminder";
import Profile from "./pages/Profile";
import Decks from "./pages/Decks";
import Todo from "./pages/Todo";
import ChooseDeck from "./pages/ChooseDeck";

// Components
// import Sidebar from "./components/Sidebar";

// CSS
import "./css/App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/reminder" component={Reminder} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/todo" component={Todo} />
          <Route exact path="/decks" component={Decks} />
          <Route exact path="/choose" component={ChooseDeck} />
        </div>
      </Router>
    );
  }
}

export default App;
