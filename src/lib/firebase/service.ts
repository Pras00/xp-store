import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';
import app from './init';

const firestore = getFirestore(app);

interface FirebaseData {
  [key: string]: string | number | boolean | object;
}

export async function retrieveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))
  return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();
  return data;
}

export async function retrieveDataByField(collectionName: string, field: string, value: string) {
  const q = query(collection(firestore, collectionName), where(field, '==', value));
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))
  return data;
}

export async function addData(collectionName: string, data: FirebaseData, callback: (status: boolean) => void) {
  await addDoc(collection(firestore, collectionName), data)
  .then(() => {
    callback(true)
  })
  .catch((error) => {
    callback(false)
    console.log(error);
  });
}

export async function updateData(collectionName: string, id: string, data: FirebaseData, callback: (status: boolean) => void) {
  await updateDoc(doc(firestore, collectionName, id), data)
  .then(() => {
    callback(true)
  })
  .catch((error) => {
    callback(false)
    console.log(error);
  });
}

export async function deleteData(collectionName: string, id: string, callback: (status: boolean) => void) {
  await deleteDoc(doc(firestore, collectionName, id))
  .then(() => {
    callback(true)
  })
  .catch((error) => {
    callback(false)
    console.log(error);
  });
}
