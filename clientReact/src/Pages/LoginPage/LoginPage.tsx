import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button.tsx";
import styles from "./LoginPage.module.css";
import btnStyles from "../../Components/Button/Button.module.css";
import Title from "../../Components/Title/Title.tsx";
import Form from "../../Components/Form/Form.tsx";

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <Form>
      <Title>Log In</Title>
      <Input name="email" label="Email" />
      <Input name="password" label="Password" />
      <div className={styles.flex}>
        <Link className={styles.link} to="/forgot-password">
          Forgot Password?
        </Link>
        <Button
          className={`${btnStyles.btnSmall} ${btnStyles.colorWhite}`}
          onClick={() => {}}
        >
          Log In
        </Button>
      </div>
      <Button
        className={`${btnStyles.btnLarge} ${btnStyles.borderPink}`}
        onClick={() => navigate("/register")}
      >
        Don't have an account?
      </Button>
    </Form>
  );
};

export default LoginPage;
