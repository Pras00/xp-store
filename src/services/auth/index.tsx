import instance from '@/lib/axios/instance';


const authServices = {
  registerAccount: (data: {email: string, fullname: string, phone: string, password: string}) => instance.post('/api/user/register', data),
}

export default authServices;
