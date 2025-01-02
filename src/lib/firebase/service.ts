import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';
import bcrypt from 'bcrypt';
import app from './init';

const firestore = getFirestore(app);

export async function retriveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))
  return data;
}

export async function retriveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();
  return data;
}

export async function signUp(userData: {
  email: string;
  fullname: string;
  phone: string;
  password: string;
  role?: string;
}, callback: (status: boolean) => void) {
  const q = query(collection(firestore, 'users'), where('email', '==', userData.email));
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))
  if (data.length > 0) {
    callback(false)
  } else {
    if (!userData.role) {
      userData.role = 'member';
    }
    userData.password = await bcrypt.hash(userData.password, 10);
    await addDoc(collection(firestore, 'users'), userData)
    .then(() => {
      callback(true)
    })
    .catch((error) => {
      callback(false)
      console.log(error);
    });
  }
}


export async function signIn(email: string) {
  const q = query(collection(firestore, 'users'), where('email', '==', email));
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))
  if (data) {
    return data[0];
  } else {
    return null;
  }
}


export async function loginWithGoogle(userData: {email: string, role?: string}, callback: (userData: {email: string, role?: string}) => void) {
  const q = query(collection(firestore, 'users'), where('email', '==', userData.email));
  const snapshot = await getDocs(q);
  const user = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as { role?: string })
  }))
  if (user.length > 0) {
    userData.role = user[0].role;
    await updateDoc(doc(firestore, 'users', user[0].id), userData)
    .then(() => {
      callback(userData)
    })

  } else {
    userData.role = 'member';
    await addDoc(collection(firestore, 'users'), userData)
    .then(() => {
      callback(userData)
    })
  }
}