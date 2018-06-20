import { SIGN_OUT_USER } from './authConstants';
import { closeModal } from '../modals/modalActions';
import { toastr } from 'react-redux-toastr';
// import haha from 'firebase';

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
            toastr.error('Oops', error.message);
            console.log('Auth err: ', error);
        }
    };
};

export const logout = () => {
    return {
        type: SIGN_OUT_USER
    };
};
