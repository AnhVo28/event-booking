import React, { Component } from "react";
import EventDashboard from "../../features/event/eventDashboard/EventDashboard";
import NavBar from "../../features/nav/navBar/NavBar";



class App extends Component {
    render() {
        return (
            <div className="App" >
                <h1> Re-event</h1>
                <NavBar/>
                <EventDashboard/>
            </div>
        );
    }
}

export default App;
