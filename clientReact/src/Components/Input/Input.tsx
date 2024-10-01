import styles from "./Input.module.css";
import { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}
const Input: FC<InputProps> = ({ name, label, ...rest }) => {
  return (
    <div className={styles.inputLabelWrapper}>
      <label htmlFor={name}>{label}</label>
      <input
        className={styles.input}
        id={name}
        autoComplete={name === "password" ? "current-password" : name}
        {...rest}
      ></input>
    </div>
  );
};

export default Input;
