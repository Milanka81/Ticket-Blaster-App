import { useState } from "react";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../Components/Input/Input";
import btnStyles from "../../Components/Button/Button.module.css";
import styles from "../../Components/Form/Form.module.css";
import Title from "../../Components/Title/Title.tsx";
import Form from "../../Components/Form/Form.tsx";
import { register } from "../../services/authService/index.tsx";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full name is required"),
      email: Yup.string()
        .email("Email is not valid")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password can't be less then 8 characters"),
      passwordConfirm: Yup.string()
        .required("Password confirmation is required")
        .oneOf([Yup.ref("password")], "Passwords do not match"),
    }),
    onSubmit: (values) => {
      register(values)
        .then((res) => {
          setMessage(res.data.message);
        })
        .catch((error) => {
          setMessage(error.response?.data.message);
        });
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Title>Create Account</Title>
      <div className={styles.inputErrorWrapper}>
        <Input
          name="fullName"
          type="text"
          label="Full Name"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.fullName && formik.errors.fullName && (
          <p className={styles.inputError}>{formik.errors.fullName}</p>
        )}
      </div>
      <div className={styles.inputErrorWrapper}>
        <Input
          name="email"
          type="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <p className={styles.inputError}>{formik.errors.email}</p>
        )}
      </div>
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
      <button
        className={`${btnStyles.btnLarge} ${btnStyles.colorWhite} ${btnStyles.backgroundPink}`}
        type="submit"
      >
        Create Account
      </button>
      <button
        className={`${btnStyles.btnLarge} ${btnStyles.borderPink}`}
        onClick={() => navigate("/login")}
      >
        Already have an account?
      </button>
      {message && <p className={styles.message}>{message}</p>}
    </Form>
  );
};

export default RegisterPage;
