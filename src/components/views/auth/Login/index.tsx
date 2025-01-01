import Link from "next/link";
import styles from "./Login.module.scss";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const LoginViews = () => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const form = e.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      password: form.password.value,
    };
    const result = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (result.status === 200) {
      form.reset();
      setIsLoading(false);
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError("Email or password is incorrect");
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
