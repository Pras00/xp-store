import AdminLayout from "@/components/layouts/AdminLayout";
import { User } from "@/types/user";
import Button from "@/components/ui/Button";
import styles from "./Users.module.scss";
import { useEffect, useState } from "react";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";

type Proptypes = {
  users: User[];
}

const AdminUsersView = (props: Proptypes) => {
  const { users } = props;
  const [updatedUser, setUpdatedUser] = useState({});
  const [deletedUser, setDeletedUser] = useState({});
  const [userData, setUserData] = useState<User[]>([]);
  useEffect(() => {
    setUserData(users);
  }, [users]);
  return (
    <>
      <AdminLayout>
        <div className={styles.users}>
          <h1 className={styles.users__title}>User Management</h1>
          <table className={styles.users__table}>
            <thead className={styles.users__table__head}>
              <tr className={styles.users__table__head__row}>
                <th className={styles.users__table__head__row__no}>No</th>
                <th className={styles.users__table__head__row__fullname}>Fullname</th>
                <th className={styles.users__table__head__row__email}>Email</th>
                <th className={styles.users__table__head__row__phone}>Phone</th>
                <th className={styles.users__table__head__row__role}>Role</th>
                <th className={styles.users__table__head__row__action}>Action</th>
              </tr>
            </thead>
            <tbody className={styles.users__table__body}>
              {userData.map((user: User, index: number) => (
                <tr key={index} className={styles.users__table__body__row}>
                  <td className={styles.users__table__body__row__no}>{index + 1}</td>
                  <td className={styles.users__table__body__row__fullname}>{user.fullname}</td>
                  <td className={styles.users__table__body__row__email}>{user.email}</td>
                  <td className={styles.users__table__body__row__phone}>{user.phone}</td>
                  <td className={styles.users__table__body__row__role}>{user.role}</td>
                  <td className={styles.users__table__body__row__action}>
                    <Button className={styles.users__table__body__row__action__button} type="button" variant="secondary1" onClick={() => setUpdatedUser(user)}>
                      <i className='bx bxs-edit'></i>
                      Edit
                    </Button>
                    <Button className={styles.users__table__body__row__action__button} type="button" variant="secondary" onClick={() => setDeletedUser(user)}>
                      <i className='bx bxs-trash'></i>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      {Object.keys(updatedUser).length > 0 && (
        <ModalUpdateUser 
          updatedUser={updatedUser as User} 
          setUpdatedUser={setUpdatedUser} 
          setUserData={setUserData} />
      )}
      {Object.keys(deletedUser).length > 0 && (
        <ModalDeleteUser 
          deletedUser={deletedUser as User} 
          setDeletedUser={setDeletedUser} 
          setUserData={setUserData} />
      )}
    </>
  );
};

export default AdminUsersView;