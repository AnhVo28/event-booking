import moment from 'moment';
import { toastr } from 'react-redux-toastr';

// update profile in firebase
export const updateProfile = (user)=> {
    return async (dispatch, getState, { getFirebase})=>{
        const firebase = getFirebase();

        if (user.dateOfBirth) {
            user.dateOfBirth = moment(user.dateOfBirth).toDate();
        }

        try {
            await firebase.updateProfile(user);
            toastr.success('Update', 'Successfully updated');
        } catch (error) {
            console.log(error);
            
        }
    };
};
