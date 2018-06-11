import React, { Component } from 'react';
import EventListItem from './EventListItem';

export class EventList extends Component {
    render() {
        const { events, handleDeleteEvent } = this.props;
        return (
            <div>
                {events.map(event => (
                    <EventListItem
                        onEventDelete={handleDeleteEvent}
                        key={event.id}
                        event={event}
                    />
                ))}
            </div>
        );
    }
}

export default EventList;
