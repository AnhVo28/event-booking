import React, { Component } from "react";
import { Segment, Form, Button } from "semantic-ui-react";

export class EventForm extends Component {
    state = {
        event: {
            title: "",
            date: "",
            city: "",
            venue: "",
            hostedBy: ""
        }
    };

    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state.event);
        this.props.handleCreateEvent(this.state.event);
    };

    onInputChange = e => {
        const newEvent = this.state.event;
        newEvent[e.target.name] = e.target.value;
        this.setState({
            event: newEvent
        });
    };
    render() {
        const { handleCancel } = this.props;
        return (
            <Segment>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <label>Event Title</label>
                        <input
                            name="title"
                            onChange={this.onInputChange}
                            value={this.state.event.title}
                            placeholder="First Name"
                        />
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
                    <Button onClick={handleCancel} type="button">
                        Cancel
                    </Button>
                </Form>
            </Segment>
        );
    }
}

export default EventForm;
