import Sidebar from "@/components/fragments/Sidebar";
import styles from "./AdminLayout.module.scss";

type Proptypes = {
  children: React.ReactNode;
}

const listSidebarItem = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: "bxs-dashboard"
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: "bxs-user"
  },
  {
    title: "Profiles",
    url: "/admin/profiles",
    icon: "bxs-user-rectangle"
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: "bxs-box"
  }
]

const AdminLayout = (props: Proptypes) => {
  const { children } = props;
  return (
    <div className={styles.adminLayout}>
      <Sidebar lists={listSidebarItem} />
      <div className={styles.adminLayout__main}>
        {children}
      </div>
    </div>
  )
}

export default AdminLayout;
