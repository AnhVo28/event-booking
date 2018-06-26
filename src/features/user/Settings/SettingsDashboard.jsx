import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SettingsNav from './SettingsNav';
import BasicPage from './BasicPage';
import AboutPage from './AboutPage';
import AccountPage from './AccountPage';
import PhotoPage from './PhotoPage';
import { updatePassword } from '../../auth/authActions';
import { updateProfile } from '../userActions';

const mapStateToProps = state => ({
    providerId:
        state.firebase.auth.isLoaded &&
        state.firebase.auth.providerData[0].providerId,
    user: state.firebase.profile
});

const actions = {
    updatePassword,
    updateProfile
};

const SettingsDashboard = props => {
    return (
        <Grid>
            <Grid.Column width={12}>
                <Switch>
                    <Redirect exact from="/settings" to="/settings/basics" />
                    <Route
                        path="/settings/basics"
                        render={() => (
                            <BasicPage
                                updateProfile={props.updateProfile}
                                initialValues={props.user}
                            />
                        )}
                    />
                    <Route
                        path="/settings/about"
                        render={() => (
                            <AboutPage
                                updateProfile={props.updateProfile}
                                initialValues={props.user}
                            />
                        )}
                    />
                    <Route path="/settings/photos" component={PhotoPage} />
                    <Route
                        path="/settings/account"
                        render={() => (
                            <AccountPage
                                updatePassword={props.updatePassword}
                                providerId={props.providerId}
                            />
                        )}
                    />
                </Switch>
            </Grid.Column>
            <Grid.Column width={4}>
                <SettingsNav />
            </Grid.Column>
        </Grid>
    );
};

export default connect(
    mapStateToProps,
    actions
)(SettingsDashboard);
