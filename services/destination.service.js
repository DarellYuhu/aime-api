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
    const data = await getDoc(doc(db, "history", uuid));
    if(!data.exists()) {
        setDoc(doc(db, "history", uuid), {
            status: 'in',
            history: arrayUnion({
                destinationId: destinationId,
                status: 'in',
                timestamp: Timestamp.now()
            }),
        })
    } else {
        if (data.data().status !== 'in') {
            updateDoc(doc(db, "history", uuid), {
                status: 'in',
                history: arrayUnion({
                    destinationId: destinationId,
                    status: 'in',
                    timestamp: Timestamp.now()
                }),
            })
        } else {
            updateDoc(doc(db, "history", uuid), {
                status: 'out',
                history: arrayUnion({
                    destinationId: destinationId,
                    status: 'out',
                    timestamp: Timestamp.now()
                }),
            })
        }
    }
};