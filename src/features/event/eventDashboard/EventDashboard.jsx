import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from '../eventList/EventList';
import { connect } from 'react-redux';
import { firestoreConnect, isEmpty, isLoaded } from 'react-redux-firebase';
import { getEventsForDashboard } from '../eventActions';
import LoadingComp from '../../../app/layout/LoadingComp';
import EventActivity from '../eventActivity/EventActivity';

const mapActionsToProps = {
    getEventsForDashboard
};

const mapStateToProps = state => ({
    events: state.events,
    loading: state.async.loading
});

class EventDashboard extends Component {
    handleDeleteEvent = eventId => () => {
        this.props.deleteEvent(eventId);
    };

    async componentDidMount() {
        await this.props.getEventsForDashboard();
    }

    render() {
        const { events , loading } = this.props;
        console.log('events: ', events);

        if (loading) return <LoadingComp inverted={true} />;
        return (
            <Grid>
                <Grid.Column width={10}>
                    <EventList
                        handleDeleteEvent={this.handleDeleteEvent}
                        events={events}
                    />
                </Grid.Column>
                <Grid.Column width={6}>
                    <EventActivity />
                </Grid.Column>
            </Grid>
        );
    }
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(firestoreConnect([{ collection: 'events' }])(EventDashboard));
