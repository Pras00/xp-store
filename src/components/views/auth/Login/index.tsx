import Link from "next/link";
import styles from "./Login.module.scss";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

const LoginViews = () => {
  const { push, query } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const callbackUrl: string = (query.callbackUrl as string) || "/";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const form = e.target as HTMLFormElement;
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl,
      })
      if (!res?.error) {
        form.reset();
        setIsLoading(false);
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError("Email or password is incorrect");
      }
    } catch {
      setIsLoading(false);
      setError("Login Failed");
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.login__container}>
        <h1 className={styles.login__title}>Login</h1>
        {error && <p className={styles.login__error}>{error}</p>}
        <form className={styles.login__form} onSubmit={handleSubmit}>
          <div className={styles.login__form__item}>
            <label className={styles.login__form__item__label} htmlFor="email">Email</label>
            <input
              className={styles.login__form__item__input}
              type="email"
              name="email"
              id="email"
              required
            />
          </div>
          <div className={styles.login__form__item}>
            <label className={styles.login__form__item__label} htmlFor="password">Password</label>
            <input
              className={styles.login__form__item__input}
              type="password"
              name="password"
              id="password"
              required
            />
          </div>
          <button className={styles.login__form__button} type="submit">
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
        <p>
          Don&apos;t have any account? <Link href={"/auth/register"} className={styles.signin}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginViews;
