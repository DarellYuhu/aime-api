var firebase = require("../config");
var {
  addDoc,
  Timestamp,
  getDocs,
  collection,
  getFirestore,
} = require("firebase/firestore");
const db = getFirestore(firebase);

exports.create = (title, category, url) => {
  const bannerCollection = collection(db, "banner");
  const payload = {
    title,
    category,
    url,
    timestamp: Timestamp.now(),
  };
  return addDoc(bannerCollection, payload);
};

exports.get = async () => {
  const bannerCollection = collection(db, "banner");
  const querySnapshot = await getDocs(bannerCollection);
  const data = querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return data;
};
