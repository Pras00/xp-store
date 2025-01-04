import Link from "next/link";
import styles from "./Register.module.scss";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
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
          <Input label="Fullname" type="text" name="fullname" id="fullname" />
          <Input label="Phone" type="text" name="phone" id="phone" />
          <Input label="Email" type="email" name="email" id="email" />
          <Input label="Password" type="password" name="password" id="password" />
          <Button 
          type="submit" 
          className={styles.register__form__button}>
            {isLoading ? "Loading..." : "Register"}
          </Button>
        </form>
        <p>
          Have an account? <Link href={"/auth/login"} className={styles.signin}>Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterViews;
