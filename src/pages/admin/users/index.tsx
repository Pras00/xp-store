import AdminUsersView from "@/components/views/admin/Users";
import { useEffect, useState } from "react";
import userService from "@/services/user";


const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await userService.getAllUsers();
      setUsers(data.data);
    };
    getAllUsers();
  }, []);
  return (
    <AdminUsersView users={users} />
  )
}

export default AdminUsersPage;