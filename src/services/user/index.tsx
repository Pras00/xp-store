import instance from '@/lib/axios/instance';
import { User } from '@/types/user';

const userServices = {
  getAllUsers: () => instance.get('/api/user'),
  updateUser: (id: string, data: User, token: string) => instance.put(`/api/user/${id}`, {data}, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  }),
  deleteUser: (id: string, token: string) => instance.delete(`/api/user/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })
}

export default userServices;
