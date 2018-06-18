import React from 'react';
import { Dimmer } from 'semantic-ui-react';
import LoaderManual from './LoaderManual';

const LoadingComp = ({ inverted }) => {
    return (
        <Dimmer inverted={inverted} active={true}>
            <LoaderManual/>
        </Dimmer>
    );
};

export default LoadingComp;
