import styles from "./Form.module.css";
interface FormProps {
  children: React.ReactNode;
}

const Form = ({ children }: FormProps) => {
  return <form className={styles.form}>{children}</form>;
};

export default Form;
