import { useEffect, useState } from "react";
// import axios from "axios";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { login } from "../../services/authService/index.tsx";
import Input from "../../Components/Input/Input";
import styles from "../../Components/Form/Form.module.css";
import btnStyles from "../../Components/Button/Button.module.css";
import Title from "../../Components/Title/Title.tsx";
import Form from "../../Components/Form/Form.tsx";
import { useAppDispatch } from "../../hooks.ts";
import { fetchMyAccount, setLogin } from "../../store/userSlice.ts";

const LoginPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [message, setMessage] = useState("");
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email is not valid")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password can't be less then 8 characters"),
    }),
    onSubmit: (values) => {
      login(values)
        .then(() => {
          dispatch(setLogin());
          dispatch(fetchMyAccount());
          navigate("/");
        })
        .catch((error) => {
          setMessage(error.response?.data.message);
        });
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Title>Log In</Title>
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
      <div className={styles.flex}>
        <Link className={styles.link} to="/forgot-password">
          Forgot Password?
        </Link>
        <button
          className={`${btnStyles.btnSmall} ${btnStyles.colorWhite}`}
          type="submit"
        >
          Log In
        </button>
      </div>
      <button
        className={`${btnStyles.btnLarge} ${btnStyles.borderPink}`}
        onClick={() => navigate("/register")}
      >
        Don't have an account?
      </button>
      {message && <p className={styles.infoMessage}>🔖 {message}</p>}
    </Form>
  );
};

export default LoginPage;
