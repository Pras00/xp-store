import styles from './AuthLayout.module.scss';
import Link from 'next/link';

type Proptypes = {
  children: React.ReactNode;
  title?: string;
  error?: string;
  link: string;
  linkText?: string;
  authText?: string;
}

const AuthLayout = (props: Proptypes) => {
  const { children, title, error, link, linkText, authText } = props;
  return (
    <div className={styles.authLayout}>
      <div className={styles.authLayout__container}>
        <h1 className={styles.authLayout__title}>{title}</h1>
        {error && <p className={styles.authLayout__error}>{error}</p>}
        {children}
        <p>
          {authText} <Link href={link} className={styles.authLayout__linkText}>{linkText}</Link>
        </p>
      </div>
    </div>
  )
}

export default AuthLayout;