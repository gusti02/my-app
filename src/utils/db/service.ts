{
  /* This service is used to access the database and get the data from Firebase */
}

import {
  collection,
  getDocs,
  getFirestore,
  getDoc,
  doc,
  query,
  where,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import app from "./firebase";
import bycrypt from "bcrypt";

const firestore = getFirestore(app);

export async function retriveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function retriveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();
  return data;
}

// This function will be used in login page
export async function signIn(userData: { email: string }) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (data) {
    return data[0];
  } else {
    return null;
  }
}

// this export function will be used in Register Page
export async function signUp(
  userData: {
    email: string;
    fullname: string;
    password: string;
    role?: string;
  },
  callback: Function
) {
  // this query will be used to check if email already exist
  // if exist then will not allow to register
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (data.length > 0) {
    callback({ status: false, message: "Email Already Exist" });
  } else {
    // encrypt the password
    userData.password = await bycrypt.hash(userData.password, 10);
    userData.role = "member";

    // add data to the database
    await addDoc(collection(firestore, "users"), userData)
      .then(() => {
        callback({ status: true, message: "Register Success" });
      })
      .catch((error) => {
        callback({ status: false, message: error.message });
      });
  }
}

// this function will be used in login page, and it will be used to sign in with google
export async function signInWithGoogle(userData: any, callback: any) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );
  const snapshot = await getDocs(q);
  const data: any = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (data.length > 0) {
    console.log(data);
    userData.role = data[0].role;
    await updateDoc(doc(firestore, "users", data[0].id), userData).then(() => {
      callback({
        status: true,
        message: "Sign in with Google success",
        data: userData,
      }).catch(() => {
        callback({ status: false, message: "Sign in with Google failed" });
      });
    });
  } else {
    userData.role = "member";
    await addDoc(collection(firestore, "users"), userData)
      .then(() => {
        callback({
          status: true,
          message: "Sign in with Google success",
          data: userData,
        });
      })
      .catch(() => {
        callback({ status: false, message: "Sign in with Google failed" });
      });
  }
}
