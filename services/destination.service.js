var firebase = require('../config');
var { getDocs, collection, getFirestore } = require('firebase/firestore');

exports.getDestination = async function () {
    const db = getFirestore(firebase);
    const destCollection = collection(db, 'destinations');

    try {
        const querySnapshot = await getDocs(destCollection);

        const data = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
        });

        return data;
    } catch (error) {
        console.error(error);
        // res.status(500).json({ error: 'Server Error' });
        return JSON.parse({ error: 'Server Error' });
    }
}