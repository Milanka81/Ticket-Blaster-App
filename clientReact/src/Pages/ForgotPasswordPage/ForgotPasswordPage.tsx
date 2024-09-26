import { useNavigate } from "react-router";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../Components/Input/Input";
import btnStyles from "../../Components/Button/Button.module.css";
import Title from "../../Components/Title/Title.tsx";
import styles from "../../Components/Form/Form.module.css";
import Form from "../../Components/Form/Form.tsx";
import { forgotPassword } from "../../services/authService/index.tsx";
const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email is not valid")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      const clientUrl = window.location;
      forgotPassword({ ...values, clientUrl })
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
      <Title>Forgot Password?</Title>
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
      <button
        className={`${btnStyles.btnLarge} ${btnStyles.colorWhite} ${btnStyles.backgroundPink}`}
        type="submit"
      >
        Send password reset email
      </button>
      <button
        className={`${btnStyles.btnLarge} ${btnStyles.borderPink}`}
        onClick={() => navigate("/login")}
      >
        Back to login
      </button>
      {message && <p className={styles.message}>{message}</p>}
    </Form>
  );
};

export default ForgotPasswordPage;
