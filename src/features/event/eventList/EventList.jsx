import React, { Component } from 'react';
import EventListItem from './EventListItem';

export class EventList extends Component {
    render() {
        const { events, onEventEdit, handleDeleteEvent } = this.props;
        return (
            <div>
                <h1>Event List</h1>
                {events.map(event => (
                    <EventListItem
                        onEventDelete={handleDeleteEvent}
                        key={event.id}
                        event={event}
                        onEventEdit={onEventEdit}
                    />
                ))}
            </div>
        );
    }
}

export default EventList;
