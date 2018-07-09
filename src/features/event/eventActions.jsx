import { toastr } from 'react-redux-toastr';
import { FETCH_EVENTS } from './eventConstant';
import {
    asyncActionError,
    asyncActionStart,
    asyncActionFinish
} from '../async/asyncActions';
import { fetchSampleData } from '../../app/common/data/mockApi';
import { createNewEvent } from '../../app/common/util/helper';
import moment from 'moment';
import firebase from '../../app/config/firebase';

export const createEvent = event => {
    return async (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        const user = firestore.auth().currentUser;
        const photoURL = getState().firebase.profile.photoURL;

        let newEvent = createNewEvent(user, photoURL, event);

        try {
            let createdEvent = await firestore.add('events', newEvent);
            await firestore.set(
                `event_attendee/${createdEvent.id}_${user.uid}`,
                {
                    eventId: createdEvent.id,
                    userUid: user.uid,
                    eventDate: event.date,
                    host: true
                }
            );
            toastr.success('Success!', 'Event has been created');
        } catch (error) {
            toastr.error('Oops', error.message);
        }
    };
};

export const cancelEvent = (cancelled, eventID) => async (
    dispatch,
    getState,
    { getFirestore }
) => {
    const firestore = getFirestore();
    const message = cancelled
        ? 'Are you sure you want to cancel event'
        : 'This will activate the event - Are you sure?';
    try {
        toastr.confirm(message, {
            onOk: () =>
                firestore.update(`events/${eventID}`, {
                    cancelled: cancelled
                })
        });
    } catch (error) {
        toastr.error('Oops', error.message);
    }
};

export const updateEvent = event => {
    return async (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        if (event.date !== getState().firestore.ordered.events[0].date) {
            event.date = moment(event.date).toDate();
        }
        try {
            await firestore.update(`events/${event.id}`, event);
            toastr.success('Success!', 'Event has been updated');
        } catch (error) {
            toastr.error('Oops', error.message);
        }
    };
};

export const fetchEvents = events => {
    return {
        type: FETCH_EVENTS,
        payload: events
    };
};

export const loadEvents = () => {
    return async dispatch => {
        try {
            dispatch(asyncActionStart());
            let events = await fetchSampleData();

            dispatch(fetchEvents(events));
            dispatch(asyncActionFinish());
        } catch (error) {
            console.log(error);

            dispatch(asyncActionError());
        }
    };
};

export const goingEvent = event => async (
    dispatch,
    getState,
    { getFirestore }
) => {
    const firestore = getFirestore();
    const user = firestore.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;
    const attendee = {
        displayName: user.displayName,
        going: true,
        host: false,
        photoURL: photoURL || '/assets/user.png',
        joinDate: Date.now()
    };

    try {
        await firestore.update(`events/${event.id}`, {
            // adding new object in to a existing obj
            [`attendees.${user.uid}`]: attendee
        });

        await firestore.set(`event_attendee/${event.id}_${user.uid}`, {
            eventDate: event.date,
            eventId: event.id,
            host: false,
            userUid: user.uid
        });

        toastr.success('Success', 'You are going to this event');
    } catch (error) {
        console.log(error.message);
    }
};

export const cancelGoingEvent = event => async (
    dispatch,
    getState,
    { getFirestore }
) => {
    const firestore = getFirestore();
    const user = firestore.auth().currentUser;

    try {
        // Delete fields
        await firestore.update(`events/${event.id}`, {
            [`attendees.${user.uid}`]: firestore.FieldValue.delete()
        });

        // Remove document
        await firestore.delete(`event_attendee/${event.id}_${user.uid}`);

        toastr.success('Success', 'You have removed yourself from the event');
    } catch (error) {
        console.log(error.message);
    }
};

export const getEventsForDashboard = lastEvent => async (
    dispatch,
    getState
) => {
    let today = new Date(Date.now());
    const firestore = firebase.firestore();
    const eventRef = firestore.collection('events');

    try {
        dispatch(asyncActionStart());
        let startAfter =
            lastEvent &&
            (await firestore
                .collection('events')
                .doc(lastEvent.id)
                .get());
        let query;

        lastEvent
            ? (query = eventRef
                // .where('date', '>=', today)
                .orderBy('date')
                .startAfter(startAfter)
                .limit(2))
            : query= eventRef
            // .where('date', '>=', today)
                .orderBy('date')
                .limit(2);

        let eventQuerySnap = await query.get();
        console.log('eventQuerySnap: ', eventQuerySnap);

        if (eventQuerySnap.docs.length === 0) {
            dispatch(asyncActionFinish());
            return eventQuerySnap;
        }

        let events = [];
        for (let i = 0; i < eventQuerySnap.docs.length; i++) {
            let evt = {
                ...eventQuerySnap.docs[i].data(),
                id: eventQuerySnap.docs[i].id
            };
            events.push(evt);
        }

        dispatch({
            type: FETCH_EVENTS,
            payload: { events }
        });
        dispatch(asyncActionFinish());
        return eventQuerySnap;
    } catch (error) {
        dispatch(asyncActionError());
        console.log('loi: ', error.message);
    }
};
