import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SettingsNav from './SettingsNav';
import BasicPage from './BasicPage';
import AboutPage from './AboutPage';
import AccountPage from './AccountPage';
import PhotoPage from './PhotoPage';

const SettingsDashboard = () => {
    return (
        <Grid>
            <Grid.Column width={12}>
                <h1>Settings</h1>
                <Switch>
                    <Redirect exact from="/settings" to="/settings/basics" />
                    <Route path="/settings/basics" component={BasicPage} />
                    <Route path="/settings/about" component={AboutPage} />
                    <Route path="/settings/photos" component={PhotoPage} />
                    <Route path="/settings/account" component={AccountPage} />
                </Switch>
            </Grid.Column>
            <Grid.Column width={4}>
                <SettingsNav />
            </Grid.Column>
        </Grid>
    );
};

export default SettingsDashboard;
