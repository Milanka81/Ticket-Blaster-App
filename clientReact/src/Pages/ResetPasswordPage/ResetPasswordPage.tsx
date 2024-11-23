import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import btnStyles from "../../Components/Button/Button.module.css";
import styles from "../../Components/Form/Form.module.css";
import Title from "../../Components/Title/Title.tsx";
import { resetPassword } from "../../services/authService/index.tsx";
import ReusablePasswordForm from "../../Components/ReusablePasswordForm/ReusablePasswordForm.tsx";
const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const { token } = useParams<{ token: string }>();

  const handleResetPassword = (values: {
    password: string;
    passwordConfirm: string;
  }) => {
    if (token) {
      resetPassword(token, values)
        .then(() => {
          setMessage("Password has been changed successfully, redirecting...");
          setTimeout(() => navigate("/login"), 3000);
        })
        .catch(() => setMessage("Something went wrong"));
    } else {
      setMessage("Token is missing or invalid");
    }
  };

  return (
    <div className={styles.form}>
      <Title>Reset Password</Title>
      <ReusablePasswordForm
        onSubmit={handleResetPassword}
        buttonText="Reset Password"
        buttonClassName={`${btnStyles.btnLarge} ${btnStyles.colorWhite} ${btnStyles.backgroundPink}`}
      />
      <button
        className={`${btnStyles.btnLarge} ${btnStyles.borderPink}`}
        onClick={() => navigate("/login")}
      >
        Back to login
      </button>
      {message && (
        <div className={styles.infoMessageContainer}>
          <p className={styles.infoMessage}>🔖 {message}</p>
        </div>
      )}
    </div>
  );
};

export default ResetPasswordPage;
