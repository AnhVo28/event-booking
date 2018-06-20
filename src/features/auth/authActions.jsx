import { SIGN_OUT_USER } from './authConstants';
import { closeModal } from '../modals/modalActions';
import { toastr } from 'react-redux-toastr';
import { SubmissionError } from 'redux-form';

export const login = creds => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        try {
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

export const logout = () => {
    return {
        type: SIGN_OUT_USER
    };
};
