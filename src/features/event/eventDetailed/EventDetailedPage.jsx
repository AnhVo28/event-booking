import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import { toastr } from 'react-redux-toastr';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';
import { objectToArray } from '../../../app/common/util/helper';

const mapState = state => {
    let event = {};

    // Return the matched eventId when routing
    if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
        event = state.firestore.ordered.events[0];
    }

    // Return the Obj since currently in MapToProps
    return {
        event
    };
};

export class EventDetailedPage extends Component {

    // Get the event from firestore 
    async componentDidMount() {
        const { firestore, match, history } = this.props;
        let event = await firestore.get(`events/${match.params.id}`);
        if (!event.exists) {
            history.push('/events');
            toastr.error('Sorry', 'Event not found');
        }
    }

    render() {
        const { event } = this.props;
        const attendees =
            event && event.attendees && objectToArray(event.attendees);

        return (
            <Grid>
               
               
                <Grid.Column width={10}>
                    <EventDetailedHeader event={event} />
                    <EventDetailedInfo event={event} />
                    <EventDetailedChat />
                </Grid.Column>
                <Grid.Column width={6}>
                    <EventDetailedSidebar attendees={attendees} />
                </Grid.Column>
                 
            
            </Grid>
        );
    }
}

export default withFirestore(connect(mapState)(EventDetailedPage));
