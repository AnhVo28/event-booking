import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
// import { toastr } from 'react-redux-toastr';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';
import { objectToArray } from '../../../app/common/util/helper';
import { goingEvent, cancelGoingEvent } from '../eventActions';

const mapState = state => {
    let event = {};

    // Return the matched eventId when routing
    if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
        event = state.firestore.ordered.events[0];
    }

    // Return the Obj since currently in MapToProps
    return {
        event,
        auth: state.firebase.auth
    };
};

const actions = {
    goingEvent,
    cancelGoingEvent
};

export class EventDetailedPage extends Component {
    // Get the event from firestore
    async componentDidMount() {
        const { firestore, match } = this.props;
        await firestore.setListener(`events/${match.params.id}`);
        // if (!event.exists) {
        //     history.push('/events');
        //     toastr.error('Sorry', 'Event not found');
        // }
    }
    async componentWillUnmount() {
        const { firestore, match } = this.props;
        await firestore.unsetListener(`events/${match.params.id}`);
    }

    render() {
        const { event, auth, goingEvent, cancelGoingEvent } = this.props;
        const attendees =
            event && event.attendees && objectToArray(event.attendees);
        const isHost = event.hostUid === auth.uid;
        const isGoing = attendees && attendees.some(e => e.id === auth.uid);

        return (
            <Grid>
                <Grid.Column width={10}>
                    <EventDetailedHeader
                        goingEvent={goingEvent}
                        event={event}
                        isHost={isHost}
                        isGoing={isGoing}
                        cancelGoingEvent={cancelGoingEvent}
                    />
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

export default withFirestore(
    connect(
        mapState,
        actions
    )(EventDetailedPage)
);
