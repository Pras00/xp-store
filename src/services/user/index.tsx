import instance from '@/lib/axios/instance';
import { User } from '@/types/user';

const userServices = {
  getAllUsers: () => instance.get('/api/user'),
  updateUser: (id: string, data: User) => instance.put('/api/user/', {id, data}),
  deleteUser: (id: string) => instance.delete(`/api/user/${id}`)
}

export default userServices;
