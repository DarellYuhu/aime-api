var firebase = require('../config');
var { getDocs, collection, getFirestore, setDoc, Timestamp, getDoc, arrayUnion, doc, updateDoc } = require('firebase/firestore');

const db = getFirestore(firebase);
exports.getDestination = async function () {
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

exports.checkInOut = async function (uuid, destinationId) {
    const historyRef = doc(db, 'history', uuid);
    const historyDoc = await getDoc(historyRef);

    const status = historyDoc.exists() ? historyDoc.data().status : undefined;
    const newStatus = status === 'in' ? 'out' : 'in';

    const newHistory = {
        destinationId,
        status: newStatus,
        timestamp: Timestamp.now()
    };

    const updateObj = {
        status: newStatus,
        history: arrayUnion(newHistory)
    };

    await setDoc(historyRef, updateObj, { merge: true });

    return newStatus === 'in' ? 'Checked In' : 'Checked Out';
};
const getDestinationById = async (id) => {
    const destRef = doc(db, 'destinations', id);
    const destDoc = await getDoc(destRef);

    return destDoc.exists() ? destDoc.data() : null;
};

exports.getHistory = async (uuid) => {
    const historyRef = doc(db, 'history', uuid);
    const historyDoc = await getDoc(historyRef);

    if (historyDoc.exists()) {
        const historyData = historyDoc.data().history;

        const history = await Promise.all(historyData.map(async (item) => {
            const destination = await getDestinationById(item.destinationId);

            return {
                destination,
                status: item.status,
                timestamp: item.timestamp.toDate(),
            };
        }));

        return history;
    } else {
        return [];
    }
};
