import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import cuid from 'cuid';
import EventList from '../eventList/EventList';
import EventForm from '../eventForm/EventForm';
import { connect } from 'react-redux';
import { createEvent, deleteEvent, updateEvent } from '../eventActions';

const events = [
    {
        id: '1',
        title: 'Trip to Tower of London',
        date: '2018-03-27',
        category: 'culture',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
        city: 'London, UK',
        venue: 'Tower of London, St Katharine\'s & Wapping, London',
        hostedBy: 'Bob',
        hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
        attendees: [
            {
                id: 'a',
                name: 'Bob',
                photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
            },
            {
                id: 'b',
                name: 'Tom',
                photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
            }
        ]
    },
    {
        id: '2',
        title: 'Trip to Punch and Judy Pub',
        date: '2018-03-28',
        category: 'drinks',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
        city: 'London, UK',
        venue: 'Punch & Judy, Henrietta Street, London, UK',
        hostedBy: 'Tom',
        hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
        attendees: [
            {
                id: 'b',
                name: 'Tom',
                photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
            },
            {
                id: 'a',
                name: 'Bob',
                photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
            }
        ]
    }
];

class EventDashboard extends Component {
    state = {
        isOpen: false,
        selectedEvent: null
    };

    handleFormOpen = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    handleCancel = () => {
        this.setState({
            selectedEvent: null,
            isOpen: false
        });
    };

    handleCreateEvent = newEvent => {
        newEvent.id = cuid();
        newEvent.hostPhotoURL = '/assets/user.png';
        this.props.createEvent(newEvent);
        this.setState({
            isOpen: false
        });
    };

    handleEditEvent = eventToUpdate => () => {
        this.setState({
            selectedEvent: eventToUpdate,
            isOpen: true
        });
    };

    handleUpdateEvent = updatedEvent => {
        this.props.updateEvent(updatedEvent);
        this.setState({
            isOpen: false,
            selectedEvent: null
        });
    };

    handleDeleteEvent = eventId => () => {
        this.props.deleteEvent(eventId);
    };

    render() {
        const { events } = this.props;
        console.log('events: ', events);

        return (
            <Grid>
                <Grid.Column width={10}>
                    <EventList
                        handleDeleteEvent={this.handleDeleteEvent}
                        events={events}
                        onEventEdit={this.handleEditEvent}
                    />
                </Grid.Column>
                <Grid.Column width={6}>
                    <Button
                        onClick={this.handleFormOpen}
                        positive
                        content="Create event"
                    />
                    {this.state.isOpen && (
                        <EventForm
                            handleUpdateEvent={this.handleUpdateEvent}
                            selectedEvent={this.state.selectedEvent}
                            handleCreateEvent={this.handleCreateEvent}
                            handleCancel={this.handleCancel}
                        />
                    )}
                </Grid.Column>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    events: state.events
});

const mapActionsToProps = {
    createEvent,
    deleteEvent,
    updateEvent
};
export default connect(
    mapStateToProps,
    mapActionsToProps
)(EventDashboard);
