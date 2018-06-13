import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
// Add script into specific component
import Script from 'react-load-script';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from 'react-places-autocomplete';

const mapState = state => ({
    data: state.test.data
});

class TestComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            scriptLoaded: false
        };
    }

    handleScriptLoad = () => {
        this.setState({ scriptLoaded: true });
    };

    handleFormSubmit = event => {
        event.preventDefault();

        geocodeByAddress(this.state.address)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error));
    };

    onChange = address => {
        this.setState({ address });
    };

    render() {
        const inputProps = {
            value: this.state.address,
            onChange: this.onChange
        };
        const { data } = this.props;
        return (
            <div>
                <Script
                    url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBkb5eF3TFlOHwyKqEKcaRo_su5DSgFvP0&libraries=places"
                    onLoad={this.handleScriptLoad}
                />>
                <h1>Test Area</h1>
                <h3>The answer is: {data}</h3>
                <form onSubmit={this.handleFormSubmit}>
                    {/* Make sure the script is loaded before executing this component */}
                    {this.state.scriptLoaded && 
                        <PlacesAutocomplete inputProps={inputProps} />
                    }
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default connect(mapState)(TestComponent);
