// Query in our firebase
export const userDetailedQuery = ({ auth, userUid }) => {
    if (userUid !== null) {
        return [
            {
                collection: 'users',
                doc: userUid,
                storeAs: 'profile'
            },
            {
                collection: 'users',
                doc: userUid,
                subcollections: [{ collection: 'photos' }],
                // Save as photos props in redux firestore.ordered
                storeAs: 'photos'
            }
        ];
    } else {
        return [
            {
                collection: 'users',
                doc: auth.uid,
                subcollections: [{ collection: 'photos' }],
                // Save as photos props in redux firestore.ordered
                storeAs: 'photos'
            }
        ];
    }
};
