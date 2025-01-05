import Link from "next/link";
import styles from "./Sidebar.module.scss";
import { useRouter } from "next/router";
import Button from "@/components/ui/Button";
import { signOut } from "next-auth/react";

type Proptypes = {
  lists: {
    title: string;
    url: string;
    icon: string;
  }[];
}

const Sidebar = (props: Proptypes) => {
  const { lists } = props;
  const { pathname } = useRouter();
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__header}>
        <h1 className={styles.sidebar__header__title}>Admin Panel</h1>
        <div className={styles.sidebar__header__list}>
          {lists.map((list, index) => (
            <Link 
              href={list.url}
              key={index} 
              className={`${styles.sidebar__header__list__item} ${pathname === list.url ? styles.sidebar__header__list__item__active : ""}`}>
              <i className={`bx ${list.icon} ${styles.sidebar__header__list__item__icon}`}></i>
              <p className={styles.sidebar__header__list__item__title}>{list.title}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.sidebar__footer}>
        <hr />
        <Button 
        type="button" 
        variant="primary1" 
        onClick={() => {signOut()}}
        className={styles.sidebar__footer__button}>
          Logout
        </Button>
      </div>
    </div>
  )
}

export default Sidebar;