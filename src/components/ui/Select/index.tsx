import styles from "./Select.module.scss";

type Option = {
  value: string;
  label: string;
}

type Proptypes = {
  label?: string;
  name: string;
  id: string;
  options: Option[];
  defaultValue?: string;
  disabled?: boolean;
}

const Select = (props: Proptypes) => {
  const { label, name, id, options, defaultValue, disabled } = props;
  return (
    <div className={styles.select}>
      <label className={styles.select__label} htmlFor={id}>{label}</label>
      <select className={styles.select__input} id={id} name={name} defaultValue={defaultValue} disabled={disabled}>
        {options.map((option) => (
          <option className={styles.select__input__option} key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  )
}

export default Select;