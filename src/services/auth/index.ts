import { addData, retrieveDataByField, updateData } from '@/lib/firebase/service';
import bcrypt from 'bcrypt';


export async function signUp(
  userData: {
    email: string;
    fullname: string;
    phone: string;
    password: string;
    role?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }, callback: (status: boolean) => void) {
  const data = await retrieveDataByField('users', 'email', userData.email);
  if (data.length > 0) {
    callback(false)
  } else {
    if (!userData.role) {
      userData.role = 'member';
    }
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.createdAt = new Date();
    userData.updatedAt = new Date();
    await addData('users', userData, (result: boolean) => {
      callback(result);
    });
  }
}


export async function signIn(email: string) {
  const data = await retrieveDataByField('users', 'email', email);
  if (data) {
    return data[0];
  } else {
    return null;
  }
}


export async function loginWithGoogle(userData: {email: string, role?: string}, callback: (userData: {email: string, role?: string}) => void) {
  const user = await retrieveDataByField('users', 'email', userData.email) as { id: string; role: string }[];
  if (user.length > 0) {
    userData.role = user[0].role;
    await updateData('users', user[0].id, userData, (status: boolean) => {
      if (status) {
        callback(userData)
      }
    });
  } else {
    userData.role = 'member';
    await addData('users', userData, (status: boolean) => {
      if (status) {
        callback(userData)
      }
    });
  }
}