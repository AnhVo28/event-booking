import React, { Component } from 'react';
import { Menu, Button, Container } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignOutMenu from '../menus/SignOutMenu';
import SignInMenu from '../menus/SignInMenu';
import { openModal, closeModal } from '../../modals/modalActions';
import { connect } from 'react-redux';
import { logout } from '../../auth/authActions';

const actions = {
    openModal,
    logout,
    closeModal
};

const mapStateToProps = state => ({
    auth: state.auth
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
        this.props.logout();
        this.props.history.push('/');
    };

    render() {
        const { auth } = this.props;
        const authenticated = auth.authenticated;

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
                            currentUser={auth.currentUser}
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

export default withRouter(
    connect(
        mapStateToProps,
        actions
    )(NavBar)
);
