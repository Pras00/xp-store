/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import userServices from "@/services/user";
import { User } from "@/types/user";
import styles from "./ModalDeleteUser.module.scss";
import { useState } from "react";
import { useSession } from "next-auth/react";

type Proptypes = {
  deletedUser: User;
  setDeletedUser: React.Dispatch<React.SetStateAction<Partial<User>>>;
  setUserData: React.Dispatch<React.SetStateAction<User[]>>;
}

const ModalDeleteUser = (props: Proptypes) => {
  const { deletedUser, setDeletedUser, setUserData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const session: any = useSession();
  const handleDeleteUser = async () => {
    setIsLoading(true);
    await userServices.deleteUser(deletedUser.id, session.data?.accessToken || "");
    setDeletedUser({});
    const { data } = await userServices.getAllUsers();
    setUserData(data.data);
    setIsLoading(false);
  }
  return (
    <Modal onClose={() => setDeletedUser({})}>
      <h1 className={styles.modal__title}>Are you sure?</h1>
      <div className={styles.modal__content}>
        <Button 
          type="button" 
          variant="secondary" 
          onClick={handleDeleteUser}
          className={styles.modal__content__button}
          disabled={isLoading} 
        >
          {isLoading ? "Deleting..." : "Yes"}
        </Button>
        <Button 
          type="button" 
          variant="primary" 
          onClick={() => setDeletedUser({})}
          className={styles.modal__content__button}
          disabled={isLoading}
        >
          No
        </Button>
      </div>
    </Modal>
  )
}

export default ModalDeleteUser;
