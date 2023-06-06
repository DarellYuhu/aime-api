var {
  getFirestore,
  where,
  collection,
  getDocs,
  query,
} = require("firebase/firestore");
const firebase = require("../config");
const db = getFirestore(firebase);

exports.adminLogin = (username, password) => {
  if (username === "admin" && password === "admin") {
    return { user: username, role: "admin" };
  } else if (username === "user" && password === "user") {
    return { user: username, role: "user" };
  } else {
    return false;
  }
};

exports.clientLogin = async (email, uid) => {
  const q = query(collection(db, "users"), where("uuid", "==", uid));
  try {
    const querySnapshot = await getDocs(q);
    const user = querySnapshot.docs[0]?.data();
    if (!user) {
      return false;
    }
    return { user: { email, uid }, role: "client" };
  } catch (e) {
    return e;
  }
};
