import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Segment, Form, Button } from 'semantic-ui-react';
import { createEvent, updateEvent } from '../eventActions';
import cuid from 'cuid';

const mapStateToProps = (state, ownProps) => {
    const eventId = ownProps.match.params.id;

    let event = {
        title: '',
        date: '',
        city: '',
        venue: '',
        hostedBy: ''
    };

    if (eventId && state.events.length > 0) {
        event = state.events.filter(event => event.id === eventId)[0];
    }
    return {
        event
    };
};

const action = {
    createEvent,
    updateEvent
};

export class EventForm extends Component {
    state = {
        event: Object.assign({}, this.props.event)
    };

    onFormSubmit = e => {
        e.preventDefault();
        if (this.state.event.id) {
            this.props.updateEvent(this.state.event);
            this.props.history.goBack();
        } else {
            const newEvent = {
                ...this.state.event,
                id: cuid(),
                hostPhotoURL: '/assets/user.png',
                category: 'culture'
            };
            this.props.createEvent(newEvent);
            this.props.history.push('/events');
        }
    };

    onInputChange = e => {
        const newEvent = this.state.event;
        newEvent[e.target.name] = e.target.value;
        this.setState({
            event: newEvent
        });
    };
    render() {
        return (
            <Segment>
                <Form onSubmit={this.onFormSubmit}>
                    <Form.Field>
                        <label>Title</label>
                        <Field name="title" type="text" component="input" placeholder="Event Title"/>
                    </Form.Field>
                    <Form.Field>
                        <label>Event Date</label>
                        <input
                            name="date"
                            onChange={this.onInputChange}
                            value={this.state.event.date}
                            type="date"
                            placeholder="Event Date"
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>City</label>
                        <input
                            name="city"
                            onChange={this.onInputChange}
                            value={this.state.event.city}
                            placeholder="City event is taking place"
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Venue</label>
                        <input
                            name="venue"
                            onChange={this.onInputChange}
                            value={this.state.event.venue}
                            placeholder="Enter the Venue of the event"
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Hosted By</label>
                        <input
                            name="hostedBy"
                            onChange={this.onInputChange}
                            value={this.state.event.hostedBy}
                            placeholder="Enter the name of person hosting"
                        />
                    </Form.Field>
                    <Button positive type="submit">
                        Submit
                    </Button>
                    <Button onClick={this.props.history.goBack} type="button">
                        Cancel
                    </Button>
                </Form>
            </Segment>
        );
    }
}

export default connect(
    mapStateToProps,
    action
)(reduxForm({ form: 'eventForm'})(EventForm));
