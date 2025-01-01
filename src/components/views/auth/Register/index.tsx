import Link from "next/link";
import styles from "./Register.module.scss";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const RegisterViews = () => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const form = e.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
      phone: form.phone.value,
      email: form.email.value,
      password: form.password.value,
    };
    const result = await fetch("/api/user/register", {
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
      setError("Email already exists");
    }
  };

  return (
    <div className={styles.register}>
      <div className={styles.register__container}>
        <h1 className={styles.register__title}>Register</h1>
        {error && <p className={styles.register__error}>{error}</p>}
        <form className={styles.register__form} onSubmit={handleSubmit}>
          <div className={styles.register__form__item}>
            <label className={styles.register__form__item__label} htmlFor="fullname">Fullname</label>
            <input
              className={styles.register__form__item__input}
              type="text"
              name="fullname"
              id="fullname"
              required
            />
          </div>
          <div className={styles.register__form__item}>
            <label className={styles.register__form__item__label} htmlFor="phone">Phone</label>
            <input
              className={styles.register__form__item__input}
              type="text"
              name="phone"
              id="phone"
              required
            />
          </div>
          <div className={styles.register__form__item}>
            <label className={styles.register__form__item__label} htmlFor="email">Email</label>
            <input
              className={styles.register__form__item__input}
              type="email"
              name="email"
              id="email"
              required
            />
          </div>
          <div className={styles.register__form__item}>
            <label className={styles.register__form__item__label} htmlFor="password">Password</label>
            <input
              className={styles.register__form__item__input}
              type="password"
              name="password"
              id="password"
              required
            />
          </div>
          <button className={styles.register__form__button} type="submit">
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
        <p>
          Have an account? <Link href={"/auth/login"} className={styles.signin}>Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterViews;
