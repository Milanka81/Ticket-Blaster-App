import { FC } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "../Form/Form.module.css";
import Input from "../Input/Input";
import { useLocation } from "react-router-dom";

interface PasswordFormProps {
  onSubmit: (values: { password: string; passwordConfirm: string }) => void;
  buttonText?: string;
  buttonClassName?: string;
}

const ReusablePasswordForm: FC<PasswordFormProps> = ({
  onSubmit,
  buttonText = "",
  buttonClassName = "",
}) => {
  const { pathname } = useLocation();
  const formik = useFormik({
    initialValues: {
      password: "",
      passwordConfirm: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password can't be less than 8 characters"),
      passwordConfirm: Yup.string()
        .required("Password confirmation is required")
        .oneOf([Yup.ref("password")], "Passwords do not match"),
    }),
    onSubmit,
  });

  return (
    <form
      className={
        pathname === "/user-details"
          ? styles.reusableFormContainer
          : styles.form
      }
      onSubmit={formik.handleSubmit}
    >
      <div className={styles.inputErrorWrapper}>
        <Input
          name="password"
          type="password"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <p className={styles.inputError}>{formik.errors.password}</p>
        )}
      </div>
      <div className={styles.inputErrorWrapper}>
        <Input
          name="passwordConfirm"
          type="password"
          label="Re-type Password"
          value={formik.values.passwordConfirm}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
          <p className={styles.inputError}>{formik.errors.passwordConfirm}</p>
        )}
      </div>
      <button className={buttonClassName} type="submit">
        {buttonText}
      </button>
    </form>
  );
};

export default ReusablePasswordForm;
