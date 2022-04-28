import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
} from "firebase/firestore";

export const checkUserDb = () => {
  const auth = getAuth();
  const db = getFirestore();
  const docRef = doc(db, `users/${auth.currentUser.uid}`);
  getDoc(docRef)
    .then((snapshot) => {
      if (!snapshot.exists()) {
        setDoc(docRef, {
          userEmail: auth.currentUser.email,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addTrackedBook = (bookName, ownVolume, totalVolume, status) => {
  const auth = getAuth();
  const db = getFirestore();
  const collectionRef = collection(
    db,
    `users/${auth.currentUser.uid}/trackedBooks`
  );

  return addDoc(collectionRef, {
    bookName: bookName,
    ownVolume: parseInt(ownVolume),
    totalVolume: parseInt(totalVolume),
    status: status,
  });
};

export const editTrackedBook = (
  id,
  bookName,
  ownVolume,
  totalVolume,
  status
) => {
  const auth = getAuth();
  const db = getFirestore();
  const docRef = doc(db, `users/${auth.currentUser.uid}/trackedBooks/${id}`);

  return setDoc(docRef, {
    bookName: bookName,
    ownVolume: parseInt(ownVolume),
    totalVolume: parseInt(totalVolume),
    status: status,
  });
};

export const deleteTrackedBook = (id) => {
  const auth = getAuth();
  const db = getFirestore();
  const docRef = doc(db, `users/${auth.currentUser.uid}/trackedBooks/${id}`);

  deleteDoc(docRef);
};

export const getTrackedBook = (id) => {
  const auth = getAuth();
  const db = getFirestore();
  const docRef = doc(db, `users/${auth.currentUser.uid}/trackedBooks/${id}`);

  return new Promise((resolve) => {
    getDoc(docRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          resolve(snapshot.data());
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

export const getAllTrackedBooks = () => {
  const auth = getAuth();
  const db = getFirestore();
  const collectionRef = collection(
    db,
    `users/${auth.currentUser.uid}/trackedBooks`
  );
  const q = query(collectionRef);
  return new Promise((resolve) => {
    getDocs(q)
      .then((querySnapshot) => {
        let data = { onGoingBooks: [], onPauseBooks: [] };
        querySnapshot.forEach((snapshot) => {
          let currentData = snapshot.data();
          currentData.id = snapshot.id;
          switch (snapshot.data().status) {
            case "onGoing":
              data.onGoingBooks.push(currentData);
              break;

            case "onPause":
              data.onPauseBooks.push(currentData);
              break;
          }
        });

        resolve(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
};
