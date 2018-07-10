import React, { Component } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import EventList from '../eventList/EventList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
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
    state = {
        moreEvent: false,
        loadingInitial: true,
        loadedEvents: []
    };

    async componentDidMount() {
        let next = await this.props.getEventsForDashboard();



        if (next && next.docs && next.docs.length > 1) {
            this.setState({
                moreEvent: true,
                loadingInitial: false
            });
        }
    }

    getNextEvents = async () => {
        const { events } = this.props;
        let lastEvent = events && events[events.length - 1];
        let next = await this.props.getEventsForDashboard(lastEvent);

        if (next && next.docs && next.docs.length <= 1) {
            this.setState({
                moreEvent: false
            });
        }
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.events !== nextProps.events) {
            this.setState({
                loadedEvents: [...this.state.loadedEvents, ...nextProps.events]
            });
        }
    }
    render() {
        const { loadedEvents, moreEvent } = this.state;
        const { loading } = this.props;

        if (this.state.loadingInitial) return <LoadingComp inverted={true} />;
        return (
            <Grid>
                <Grid.Column width={10}>
                    <EventList
                        events={loadedEvents}
                        moreEvent={moreEvent}
                        loading={loading}
                        getNextEvents={this.getNextEvents}
                    />
                </Grid.Column>
                <Grid.Column width={6}>
                    <EventActivity />
                </Grid.Column>
                <Grid.Column width={10}>
                    <Loader active={loading} />
                </Grid.Column>
            </Grid>
        );
    }
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(firestoreConnect([{ collection: 'events' }])(EventDashboard));
