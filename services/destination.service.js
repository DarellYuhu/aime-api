var firebase = require("../config");
var {
  getDocs,
  collection,
  getFirestore,
  setDoc,
  Timestamp,
  getDoc,
  arrayUnion,
  doc,
  deleteDoc,
  GeoPoint,
  updateDoc,
  where,
} = require("firebase/firestore");

const db = getFirestore(firebase);

exports.createDestination = async (
  address,
  description,
  destinationName,
  imageURL,
  location,
  previewImages,
  popularDestination
) => {
  const destCollection = collection(db, "destinations");
  const payload = {
    address,
    description,
    destinationName,
    imageURL,
    location: new GeoPoint(location.latitude, location.longitude),
    previewImages,
    popularDestination,
  };
  return await setDoc(doc(destCollection), payload);
};

exports.updateDestination = async (
  id,
  address,
  description,
  destinationName,
  imageURL,
  location,
  previewImages,
  popularDestination
) => {
  const destRef = doc(db, "destinations", id);
  const payload = {
    address,
    description,
    destinationName,
    imageURL,
    location: new GeoPoint(location.latitude, location.longitude),
    previewImages,
    popularDestination,
  };
  return await updateDoc(destRef, payload);
};

exports.getDestination = async function () {
  const destCollection = collection(db, "destinations");

  try {
    const querySnapshot = await getDocs(destCollection);

    const data = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    return data;
  } catch (error) {
    console.error(error);
    // res.status(500).json({ error: 'Server Error' });
    return JSON.parse({ error: "Server Error" });
  }
};

exports.getPopularDestination = async () => {
  const destCollection = collection(db, "destinations");

  try {
    const querySnapshot = await getDocs(
      destCollection,
      where("popularDestination", "==", true)
    );

    const data = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    return data;
  } catch (error) {
    console.error(error);
    // res.status(500).json({ error: 'Server Error' });
    return JSON.parse({ error: "Server Error" });
  }
};

exports.checkInOut = async function (uuid, destinationId) {
  const historyRef = doc(db, "history", uuid);
  const historyDoc = await getDoc(historyRef);

  const historyData = historyDoc.exists() ? historyDoc.data() : undefined;
  let newStatus;

  const lastHistory = historyData?.history?.[historyData.history.length - 1];

  const historyCondition = lastHistory ? true : false;
  if (
    historyCondition &&
    lastHistory?.destinationId !== destinationId &&
    lastHistory?.status === "in"
  ) {
    await setDoc(
      historyRef,
      {
        history: arrayUnion({
          destinationId: lastHistory?.destinationId,
          status: "out",
          timestamp: Timestamp.now(),
        }),
      },
      { merge: true }
    );
    await setDoc(
      historyRef,
      {
        history: arrayUnion({
          destinationId,
          status: "in",
          timestamp: Timestamp.now(),
        }),
        status: "in",
      },
      { merge: true }
    );
    newStatus = "in";
  } else {
    await setDoc(
      historyRef,
      {
        history: arrayUnion({
          destinationId,
          status: historyData?.status === "in" ? "out" : "in",
          timestamp: Timestamp.now(),
        }),
        status: historyData?.status === "in" ? "out" : "in",
      },
      { merge: true }
    );
    newStatus = historyData?.status === "in" ? "out" : "in";
  }

  return newStatus === "in" ? "Checked In" : "Checked Out";
};

const getDestinationById = async (id) => {
  const destRef = doc(db, "destinations", id);
  const destDoc = await getDoc(destRef);

  return destDoc.exists() ? destDoc.data() : null;
};

exports.getHistory = async (uuid) => {
  const historyRef = doc(db, "history", uuid);
  const historyDoc = await getDoc(historyRef);

  if (historyDoc.exists()) {
    const historyData = historyDoc.data().history;

    const history = await Promise.all(
      historyData.map(async (item) => {
        const destination = await getDestinationById(item.destinationId);

        return {
          destination,
          status: item.status,
          timestamp: item.timestamp.toDate(),
        };
      })
    );

    return history;
  } else {
    return [];
  }
};

exports.deleteDestination = async (id) => {
  const destRef = doc(db, "destinations", id);
  await deleteDoc(destRef);
};
