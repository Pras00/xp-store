import { signIn, signOut, useSession } from "next-auth/react";
import styles from './Navbar.module.scss';

const Navbar = () => {
  const {data} = useSession();
  console.log(data);
  return (
    <div className={styles.navbar}>
      <h1 className={styles.navbar__title}>Navbar</h1>
      <div className={styles.navbar__account}>
        <p></p>
        <button className={styles.navbar__account__auth} onClick={() => (data ? signOut() : signIn())}>
          {data ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  )
};

export default Navbar;