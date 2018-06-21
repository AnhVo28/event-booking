import React, { Component } from 'react';
import { Menu, Button, Container } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignOutMenu from '../menus/SignOutMenu';
import SignInMenu from '../menus/SignInMenu';
import { openModal, closeModal } from '../../modals/modalActions';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';

const actions = {
    openModal,
    closeModal
};

const mapStateToProps = state => ({
    auth: state.firebase.auth
});


class NavBar extends Component {
    handleSignIn = () => {
        // this.setState({
        //     authenticated: true
        // });
        this.props.openModal('LoginModal');
    };

    handleRegister = () => {
        this.props.openModal('RegisterModal');
    };
    handleSignOut = () => {
        // this.setState({
        //     authenticated: false
        // });
        this.props.firebase.logout();
        // this.props.logout();
        this.props.history.push('/');
    };

    render() {
        const { auth } = this.props;
        const authenticated = auth.isLoaded && !auth.isEmpty; 
        return (
            <Menu inverted fixed="top">
                <Container>
                    <Menu.Item as={Link} to="/" header>
                        <img src="/assets/logo.png" alt="logo" />
                        Re-vents
                    </Menu.Item>
                    <Menu.Item as={NavLink} to="/events" name="Events" />
                    {authenticated && (
                        <Menu.Item as={NavLink} to="/people" name="People" />
                    )}

                    {authenticated && (
                        <Menu.Item as={Link} to="/createEvent">
                            <Button
                                floated="right"
                                positive
                                inverted
                                content="Create Event"
                            />
                        </Menu.Item>
                    )}
                    {authenticated ? (
                        <SignInMenu
                            auth={auth}
                            signOut={this.handleSignOut}
                        />
                    ) : (
                        <SignOutMenu
                            signIn={this.handleSignIn}
                            register={this.handleRegister}
                        />
                    )}
                </Container>
            </Menu>
        );
    }
}

export default withRouter(withFirebase(
    connect(
        mapStateToProps,
        actions
    )(NavBar))
);
