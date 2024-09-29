import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../Components/Input/Input";
import btnStyles from "../../Components/Button/Button.module.css";
import styles from "../../Components/Form/Form.module.css";
import Title from "../../Components/Title/Title.tsx";
import Form from "../../Components/Form/Form.tsx";
import { resetPassword } from "../../services/authService/index.tsx";
const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const { token } = useParams<{ token: string }>();

  const formik = useFormik({
    initialValues: {
      password: "",
      passwordConfirm: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password can't be less then 8 characters"),
      passwordConfirm: Yup.string()
        .required("Password confirmation is required")
        .oneOf([Yup.ref("password")], "Passwords do not match"),
    }),
    onSubmit: (values) => {
      if (token) {
        resetPassword(token, values)
          .then((res) => {
            setMessage(res.data.message + ", redirecting to login...");
            setTimeout(() => {
              navigate("/login");
            }, 3000);
          })
          .catch((error) => {
            setMessage(error.response?.data.message);
          });
      } else {
        setMessage("Token is missing or invalid");
      }
    },
  });

  return (
    <div>
      <Form onSubmit={formik.handleSubmit}>
        <Title>Reset Password</Title>
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
          Reset password
        </button>
        <button
          className={`${btnStyles.btnLarge} ${btnStyles.borderPink}`}
          onClick={() => navigate("/login")}
        >
          Back to login
        </button>
      </Form>
      {message && (
        <div className={styles.infoMessageContainer}>
          <p className={styles.infoMessage}>🔖 {message}</p>
        </div>
      )}
    </div>
  );
};

export default ResetPasswordPage;
