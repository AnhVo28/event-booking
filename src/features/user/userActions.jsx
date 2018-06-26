import moment from 'moment';
import { toastr } from 'react-redux-toastr';

// update profile in firebase
export const updateProfile = user => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const { isEmpty, isLoaded, ...updatedUser } = user;

        if (updatedUser.dateOfBirth !== getState().firebase.profile.dateOfBirth) {
            updatedUser.dateOfBirth = moment(updatedUser.dateOfBirth).toDate();
        }

        try {
            await firebase.updateProfile(updatedUser);
            toastr.success('Update', 'Successfully updated');
        } catch (error) {
            console.log(error);
        }
    };
};
