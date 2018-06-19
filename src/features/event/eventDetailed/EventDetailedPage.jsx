import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';

const mapState = (state, ownProps) => {
    //Get the ID from the props via react router
    const eventId = ownProps.match.params.id;

    let event = {};

    // Return the matched eventId when routing
    if (eventId && state.events.length > 0) {
        event = state.events.filter(event => event.id === eventId)[0];
    }

    // Return the Obj since currently in MapToProps 
    debugger;
    return {
        event
    };
};

const EventDetailedPage = ({ event }) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <EventDetailedHeader event={event} />
                <EventDetailedInfo event={event} />
                <EventDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <EventDetailedSidebar attendees={event.attendees} />
            </Grid.Column>
        </Grid>
    );
};

export default connect(mapState)(EventDetailedPage);
