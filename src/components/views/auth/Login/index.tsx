import styles from "./Login.module.scss";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import AuthLayout from "@/components/layouts/AuthLayout";

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
    <AuthLayout title="Login" error={error} link="/auth/register" authText="Don&apos;t have any account?" linkText="Sign Up">
      <form className={styles.login__form} onSubmit={handleSubmit}>
        <Input label="Email" type="email" name="email" id="email" />
        <Input label="Password" type="password" name="password" id="password" />
        <Button 
        type="submit" 
        className={styles.login__form__button}>
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </form>
      <div className={styles.or}>
        <div className={styles.or__line}></div>
        <p className={styles.or__test}>OR</p>
        <div className={styles.or__line}></div>
      </div>
      <Button 
      type="button" 
      variant="secondary" 
      className={styles.login__google__button} 
      onClick={() => signIn("google", { callbackUrl, redirect: false })}>
        <i className='bx bxl-google'></i>
        {isLoading ? "Loading..." : "Login with Google"}
      </Button>
    </AuthLayout>
  );
};

export default LoginViews;
