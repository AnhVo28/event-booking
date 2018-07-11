import moment from 'moment';



export const objectToArray = (obj)=>{
    if (obj) {
        return Object.entries(obj).map(e=> Object.assign(e[1], {id: e[0]}));
    }
};

export const createNewEvent = (user, photoURL, event)=>{
    event.date = moment(event.date).toDate();
    return {
        ...event,
        hostUid: user.uid,
        hostedBy: user.displayName,
        hostPhotoURL: photoURL,
        created: Date.now(),
        attendees: {
            [user.uid]:{
                going: true,
                joinDate: Date.now(),
                photoURL: photoURL || '/assets/user.png',
                displayName: user.displayName,
                host: true
            }
        }
    };
};


export const createDataTree = dataset => {
    let hashTable = Object.create(null);
    dataset.forEach(a => hashTable[a.id] = {...a, childNodes: []});
    let dataTree = [];
    dataset.forEach(a => {
        if (a.parentId) hashTable[a.parentId].childNodes.push(hashTable[a.id]);
        else dataTree.push(hashTable[a.id]);
    });
    return dataTree;
};