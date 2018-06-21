import { closeModal } from '../modals/modalActions';
import { toastr } from 'react-redux-toastr';
import { SubmissionError } from 'redux-form';

export const login = creds => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        try {
            // comparing the result with the existing database
            await firebase
                .auth()
                .signInWithEmailAndPassword(creds.email, creds.password);
            dispatch(closeModal());
            toastr.success('Success!', 'Sign in successfully');
        } catch (error) {
            // pass the error props to login form
            throw new SubmissionError({
                _error: 'Login Failed'
            });
        }
    };
};

export const registerUser = user => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    try {
        const firebase = getFirebase();
        const firestore = getFirestore();

        // Create the user in auth
        let createdUser = await firebase
            .auth()
            .createUserWithEmailAndPassword(user.email, user.password);
        console.log('createdUser:', createdUser);
        // Update the auth profile in firebase profile in redux
        await createdUser.updateProfile({
            displayName: user.displayName
        });
        // Create the new profile
        let newUser = {
            displayName: user.displayName,
            createdAt: firestore.FieldValue.serverTimestamp()
        };

        await firestore.set(`users/${createdUser.uid}`, { ...newUser });
        dispatch(closeModal());
    } catch (error) {
        // pass the error props to login form
        throw new SubmissionError({
            _error: error.message
        });
    }
};

export const socialLogin = selectedProvider => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        try {
            dispatch(closeModal());
            let user = await firebase.login({
                provider: selectedProvider,
                type: 'popup'
            });

            console.log('user: ', user);
        } catch (error) {
            console.log(error);
        }
    };
};
