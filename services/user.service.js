const firebase = require('../config');
const { getFirestore, doc, setDoc } = require('firebase/firestore');
const db = getFirestore(firebase);

exports.createUser = async (userData) => {
    console.log('Creating user...');
    const userRef = doc(db, 'users', userData.uuid);
    await setDoc(userRef, userData);
    return 'User created';
}
exports.getUser = async (uuid) => {
    console.log('Getting user...');
    const userRef = doc(db, 'users', uuid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
        return userSnap.data();
    } else {
        return 'User does not exist';
    }
}