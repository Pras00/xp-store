/* eslint-disable @typescript-eslint/no-explicit-any */
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import { User } from "@/types/user";
import styles from "./ModalUpdateUser.module.scss";
import Button from "@/components/ui/Button";
import { FormEvent, useState } from "react";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";

type Proptypes = {  
  updatedUser: User;
  setUpdatedUser: React.Dispatch<React.SetStateAction<Partial<User>>>;
  setUserData: React.Dispatch<React.SetStateAction<User[]>>;
}

const ModalUpdateUser = (props: Proptypes) => {
  const { updatedUser, setUpdatedUser, setUserData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const session: any = useSession();
  const handleUpdateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data: User = {
      id: updatedUser.id,
      email: updatedUser.email,
      fullname: updatedUser.fullname,
      phone: updatedUser.phone,
      role: formData.get('role') as string
    };
    try {
      const result = await userServices.updateUser(updatedUser.id, data, session.data?.accessToken || "");
      if (result.status === 200) {
        form.reset();
        setIsLoading(false);
        setUpdatedUser({});
        const { data } = await userServices.getAllUsers();
        setUserData(data.data);
      } else {
        setIsLoading(false);
      }
    } catch {
      setIsLoading(false);
    }
  };
  return (
    <Modal onClose={() => setUpdatedUser({})}>
      <h1 className={styles.modal__title}>Update User</h1>
      <form className={styles.modal__form} onSubmit={handleUpdateUser}>
        <Input 
          label="Fullname" 
          type="text" 
          name="fullname" 
          id="fullname" 
          defaultValue={updatedUser.fullname} 
          disabled />
        <Input 
          label="Phone" 
          type="text" 
          name="phone" 
          id="phone" 
          defaultValue={updatedUser.phone} 
          disabled />
        <Input 
          label="Email" 
          type="email" 
          name="email" 
          id="email" 
          defaultValue={updatedUser.email} 
          disabled />
        <Select
          label="Role" 
          name="role" 
          id="role" 
          options={[
            { value: "admin", label: "Admin" }, 
            { value: "member", label: "Member" }
          ]} 
          defaultValue={updatedUser.role} />
        <Button type="submit" variant="primary" className={styles.modal__form__button} disabled={isLoading}>{isLoading ? "Loading..." : "Update"}</Button>
      </form>
    </Modal>
  )
}

export default ModalUpdateUser; 