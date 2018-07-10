import moment from 'moment';
import { toastr } from 'react-redux-toastr';
import cuid from 'cuid';
import {
    asyncActionError,
    asyncActionStart,
    asyncActionFinish
} from '../async/asyncActions';
import firebase from '../../app/config/firebase';
import { FETCH_EVENTS } from '../event/eventConstant';

// update profile in firebase
export const updateProfile = user => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const { isEmpty, isLoaded, ...updatedUser } = user;

        if (
            updatedUser.dateOfBirth !== getState().firebase.profile.dateOfBirth
        ) {
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

export const uploadProfileImage = (file, fileName) => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    const imageName = cuid();
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    const path = `${user.uid}/user_images`;
    const options = {
        name: imageName
    };
    try {
        dispatch(asyncActionStart());
        // upload the file to fb storage
        let uploadedFile = await firebase.uploadFile(path, file, null, options);
        // get url of image
        let downloadURL = await uploadedFile.uploadTaskSnapshot.downloadURL;
        // get the userdoc from firestore
        let userDoc = await firestore.get(`users/${user.uid}`);
        // check if user has photo, if not update profile
        if (!userDoc.data().photoURL) {
            await firebase.updateProfile({
                photoURL: downloadURL
            });
            await user.updateProfile({
                photoURL: downloadURL
            });
        }
        // add the new photo to photos collection
        await firestore.add(
            {
                collection: 'users',
                doc: user.uid,
                subcollections: [{ collection: 'photos' }]
            },
            {
                name: imageName,
                url: downloadURL
            }
        );
        dispatch(asyncActionFinish());
    } catch (error) {
        console.log(error);
        dispatch(asyncActionError());
        throw new Error('Problem uploading photo');
    }
};

export const deletePhoto = photo => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;

    try {
        // delete photo from firebase storage
        await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
        // delete photo from firestore db
        await firestore.delete({
            collection: 'users',
            doc: user.uid,
            subcollections: [{ collection: 'photos', doc: photo.id }]
        });
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const setMainPhoto = photo => async (
    dispatch,
    getState,
    { getFirebase }
) => {
    const firebase = getFirebase();
    try {
        return await firebase.updateProfile({
            photoURL: photo.url
        });
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const getUserEvent = (userUid, tabEvent) => async (
    dispatch,
    getState
) => {
    dispatch(asyncActionStart());
    const firestore = firebase.firestore();
    const today = new Date(Date.now());
    const eventRef = firestore.collection('event_attendee');

    let query;
    switch (tabEvent) {
    // past events
    case 1:
        query = eventRef
            .where('userUid', '==', userUid)
            .where('eventDate', '<=', today)
            .orderBy('eventDate', 'desc');
        break;
        // future events
    case 2:
        query = eventRef
            .where('userUid', '==', userUid)
            .where('eventDate', '>=', today)
            .orderBy('eventDate');
        break;
        // hostEvent
    case 3:
        query = eventRef
            .where('userUid', '==', userUid)
            .where('host', '==', true)
            .orderBy('eventDate', 'desc');
        break;
    default:
        query = eventRef
            .where('userUid', '==', userUid)
            .orderBy('eventDate', 'desc');

        break;
    }

    try {
        let querySnap = await query.get();
        let events = [];

        for (let i = 0; i < querySnap.docs.length; i++) {
            let evt = await firestore
                .collection('events')
                .doc(querySnap.docs[i].data().eventId)
                .get();

            events.push({ ...evt.data(), id: evt.id });
        }

        dispatch({ type: FETCH_EVENTS, payload: { events } });
        dispatch(asyncActionFinish());
    } catch (error) {
        console.log(error.message);
        dispatch(asyncActionError());
    }
};
