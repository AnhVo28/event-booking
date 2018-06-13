import React, { Component } from 'react';
import { Form, Label } from 'semantic-ui-react';
import Script from 'react-load-script';
import PlaceAutocomplete from 'react-places-autocomplete';

const style = {
    autocompleteContainer: {
        zIndex: 1000
    }
};
class PlaceInput extends Component {
    state = {
        scriptLoaded: false
    };

    handleScriptLoaded = () => {
        this.setState({ scriptLoaded: true });
    };

    render() {
        const {
            input,
            width,
            onSelect,
            placeholder,
            options,
            meta: { touched, error }
        } = this.props;
        return (
            <Form.Field error={touched && !!error} width={width}>
                <Script
                    url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBkb5eF3TFlOHwyKqEKcaRo_su5DSgFvP0&libraries=places"
                    onLoad={this.handleScriptLoaded}
                />
                {this.state.scriptLoaded && (
                    <PlaceAutocomplete
                        styles={style}
                        inputProps={{ ...input, placeholder }}
                        options={options}
                        onSelect={onSelect}
                    />
                )}
                {touched &&
                    error && (
                        <Label basic color="red">
                            {error}
                        </Label>
                    )}
            </Form.Field>
        );
    }
}

export default PlaceInput;
