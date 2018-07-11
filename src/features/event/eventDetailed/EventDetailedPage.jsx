import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withFirestore, firebaseConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
// import { toastr } from 'react-redux-toastr';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';
import { objectToArray } from '../../../app/common/util/helper';
import { goingEvent, cancelGoingEvent } from '../eventActions';
import { addEventComment } from '../eventActions';

const mapState = (state, ownProps) => {
    let event = {};

    // Return the matched eventId when routing
    if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
        event = state.firestore.ordered.events[0];
    }

    // Return the Obj since currently in MapToProps
    return {
        event,
        auth: state.firebase.auth,
        eventChat:
            !isEmpty(state.firebase.data.event_chat) &&
            objectToArray(
                state.firebase.data.event_chat[ownProps.match.params.id]
            )
    };
};

const actions = {
    goingEvent,
    cancelGoingEvent,
    addEventComment
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
        const {
            event,
            auth,
            goingEvent,
            cancelGoingEvent,
            addEventComment,
            eventChat
        } = this.props;

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
                    <EventDetailedChat
                        eventChat={eventChat}
                        addEventComment={addEventComment}
                        eventId={event.id}
                    />
                </Grid.Column>
                <Grid.Column width={6}>
                    <EventDetailedSidebar attendees={attendees} />
                </Grid.Column>
            </Grid>
        );
    }
}

export default compose(
    withFirestore,
    connect(
        mapState,
        actions
    ),
    firebaseConnect(props => [`event_chat/${props.match.params.id}`])
)(EventDetailedPage);
