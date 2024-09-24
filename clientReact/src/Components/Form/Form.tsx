import styles from "./Form.module.css";
import { FormEventHandler, ReactNode } from "react";

interface FormProps {
  children: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

const Form = ({ children, onSubmit, ...rest }: FormProps) => {
  return (
    <form className={styles.form} onSubmit={onSubmit} {...rest}>
      {children}
    </form>
  );
};

export default Form;
