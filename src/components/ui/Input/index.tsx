import styles from "./Input.module.scss";

type Proptypes = {
  label?: string;
  type: string;
  name: string;
  id: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
}

const Input = (props: Proptypes) => {
  const { label, type, name, id, placeholder, defaultValue, disabled } = props;
  return (
    <>
      <div className={styles.form__item}>
        {label && <label className={styles.form__item__label} htmlFor={id}>{label}</label>}
        <input
          className={styles.form__item__input}
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          defaultValue={defaultValue}
          disabled={disabled}
          required
        />
      </div>
    </>
  )
}

export default Input;