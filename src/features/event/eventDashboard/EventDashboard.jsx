import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from '../eventList/EventList';
import { connect } from 'react-redux';
import { deleteEvent } from '../eventActions';
import LoadingComp from '../../../app/layout/LoadingComp';

const mapActionsToProps = {
    deleteEvent
};

const mapStateToProps = state => ({
    events: state.events,
    loading: state.async.loading
});

class EventDashboard extends Component {
    handleDeleteEvent = eventId => () => {
        this.props.deleteEvent(eventId);
    };

    render() {
        const { events, loading } = this.props;
        if (loading) return <LoadingComp inverted={true}/>;
        return (
            <Grid>
                <Grid.Column width={10}>
                    <EventList
                        handleDeleteEvent={this.handleDeleteEvent}
                        events={events}
                    />
                </Grid.Column>
                <Grid.Column width={6} />
            </Grid>
        );
    }
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(EventDashboard);
