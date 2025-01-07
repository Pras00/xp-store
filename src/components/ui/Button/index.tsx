import styles from "./Button.module.scss";

type Proptypes = {
  type: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: string;
  className?: string;
  disabled?: boolean;
}

const Button = (props: Proptypes) => {
  const { type, onClick, children, variant = "primary", className, disabled } = props;
  return (
    <>
      <button 
      className={`${styles.button} ${styles[variant]} ${className}`} 
      type={type} 
      onClick={onClick}
      disabled={disabled}>
        {children}
      </button>
    </>
  );
}

export default Button;