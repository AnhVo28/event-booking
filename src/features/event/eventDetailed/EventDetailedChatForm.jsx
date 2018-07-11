import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'semantic-ui-react';
import Textarea from '../../../app/common/form/TextArea';

class eventDetailedChatForm extends React.Component{
    handleCommitSubmit = values => {
        const { addEventComment, reset, eventId } = this.props;
        addEventComment(eventId, values);
        reset();
    };

    render() {
        return (
            <Form onSubmit={this.props.handleSubmit(this.handleCommitSubmit)}>
                <Field
                    name="comment"
                    type="text"
                    component={Textarea}
                    row={2}
                />
                <Button
                    content="Add Reply"
                    labelPosition="left"
                    icon="edit"
                    primary
                />
            </Form>
        );
    }
}

export default reduxForm({ form: 'eventChat' })(eventDetailedChatForm);
