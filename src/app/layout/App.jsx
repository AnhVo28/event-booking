import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import EventDashboard from '../../features/event/eventDashboard/EventDashboard';
import NavBar from '../../features/nav/navBar/NavBar';
import UserDetailed from '../../features/user/userDetailed/UserDetailedPage';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
import EventForm from '../../features/event/eventForm/EventForm';
import EventDetailedPage from '../../features/event/eventDetailed/EventDetailedPage';
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard';
import HomePage from '../../features/home/HomePage';
import TestComponent from '../../features/testArea/TestComponent';
import ModalMananger from '../../features/modals/ModalMananger';
class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                </Switch>
                <ModalMananger/>
                <Route
                    path="/(.+)"
                    render={() => (
                        <div>
                            <NavBar />
                            <Container className="main">
                                <Switch>
                                    <Route
                                        path="/events"
                                        component={EventDashboard}
                                    />
                                    <Route
                                        path="/test"
                                        component={TestComponent}
                                    />
                                    <Route
                                        path="/event/:id"
                                        component={EventDetailedPage}
                                    />
                                    <Route
                                        path="/people"
                                        component={PeopleDashboard}
                                    />
                                    <Route
                                        path="/manage/:id"
                                        component={EventForm}
                                    />
                                    <Route
                                        path="/profile/:id"
                                        component={UserDetailed}
                                    />
                                    <Route
                                        path="/settings"
                                        component={SettingsDashboard}
                                    />
                                    <Route
                                        path="/createEvent"
                                        component={EventForm}
                                    />
                                </Switch>
                            </Container>
                        </div>
                    )}
                />
            </div>
        );
    }
}

export default App;
