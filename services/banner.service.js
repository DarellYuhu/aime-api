var firebase = require("../config");
var {
  doc,
  addDoc,
  Timestamp,
  getDocs,
  collection,
  getFirestore,
  deleteDoc,
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

// exports.update = async (id, title, category, url) => {
//   const bannerCollection = collection(db, "banner");
//   const payload = {
//     title,
//     category,
//     url,
//     timestamp: Timestamp.now(),
//   };
//   return await bannerCollection.doc(id).update(payload);
// }

exports.delete = async (id) => {
  return await deleteDoc(doc(db, "banner", id));
};
