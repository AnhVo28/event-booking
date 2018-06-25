import React from 'react';
import { Form } from 'semantic-ui-react';

const RadioInput = (props) => {
    const { input, type, label } = props;
    console.log('input props: ', props);
    
    return (
        <Form.Field>
            <div className='ui radio'>
                <input {...input} type={type}/>{' '}
                <label>{label}</label>
            </div>
        </Form.Field>
    );
};

export default RadioInput;
