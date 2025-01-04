import styles from "./Register.module.scss";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import authServices from "@/services/auth";
import AuthLayout from "@/components/layouts/AuthLayout";

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
    try {
      const result = await authServices.registerAccount(data);
      if (result.status === 200) {
        form.reset();
        setIsLoading(false);
        push("/auth/login");
      } else {
        setIsLoading(false);
        setError("Email already exists");
      }
    } catch {
      setIsLoading(false);
      setError("Terjadi kesalahan saat registrasi");
    }
  };

  return (
    <AuthLayout title="Register" error={error} link="/auth/login" authText="Have an account?" linkText="Sign In">
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
    </AuthLayout>
  );
};

export default RegisterViews;
