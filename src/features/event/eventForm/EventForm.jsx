import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { createEvent, updateEvent } from '../eventActions';
import cuid from 'cuid';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';

const mapStateToProps = (state, ownProps) => {
    const eventId = ownProps.match.params.id;

    let event = {};

    if (eventId && state.events.length > 0) {
        event = state.events.filter(event => event.id === eventId)[0];
    }
    return {
        // Poplulate the data right after clicking manage event
        initialValues: event
    };
};

const action = {
    createEvent,
    updateEvent
};

const category = [
    { key: 'drinks', text: 'Drinks', value: 'drinks' },
    { key: 'culture', text: 'Culture', value: 'culture' },
    { key: 'film', text: 'Film', value: 'film' },
    { key: 'food', text: 'Food', value: 'food' },
    { key: 'music', text: 'Music', value: 'music' },
    { key: 'travel', text: 'Travel', value: 'travel' }
];
export class EventForm extends Component {
    onFormSubmit = values => {
        if (this.props.initialValues.id) {
            this.props.updateEvent(values);
            this.props.history.goBack();
        } else {
            const newEvent = {
                ...values,
                id: cuid(),
                hostPhotoURL: '/assets/user.png',
                category: 'culture',
                hostedBy: 'Anh'
            };
            this.props.createEvent(newEvent);
            this.props.history.push('/events');
        }
    };

    render() {
        return (
            <Grid>
                <Grid.Column width={10}>
                    <Segment>
                        <Form
                            onSubmit={this.props.handleSubmit(
                                this.onFormSubmit
                            )}
                        >
                            <Header sub color="teal" content="Event Details" />
                            <Field
                                name="title"
                                type="text"
                                component={TextInput}
                                placeholder="Event Title"
                            />
                            <Field
                                name="category"
                                type="text"
                                component={SelectInput}
                                options={category}
                                placeholder="What is your event about"
                            />
                            <Field
                                name="description"
                                type="text"
                                component={TextArea}
                                rows={3}
                                placeholder="Brief introduction about event"
                            />
                            <Header
                                sub
                                color="teal"
                                content="Event Location Details"
                            />
                            <Field
                                name="city"
                                type="text"
                                component={TextInput}
                                placeholder="Event City"
                            />
                            <Field
                                name="venue"
                                type="text"
                                component={TextInput}
                                placeholder="Event Venue"
                            />
                            <Field
                                name="date"
                                type="text"
                                component={TextInput}
                                placeholder="Event Date"
                            />

                            <Button positive type="submit">
                                Submit
                            </Button>
                            <Button
                                onClick={this.props.history.goBack}
                                type="button"
                            >
                                Cancel
                            </Button>
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid>
        );
    }
}

export default connect(
    mapStateToProps,
    action
)(reduxForm({ form: 'eventForm', enableReinitialize: true })(EventForm));
