import { useNavigate } from "react-router";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button.tsx";
import btnStyles from "../../Components/Button/Button.module.css";
import Title from "../../Components/Title/Title.tsx";
import Form from "../../Components/Form/Form.tsx";
const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  return (
    <Form>
      <Title>Forgot Password?</Title>
      <Input name="email" label="Email" />
      <Button
        className={`${btnStyles.btnLarge} ${btnStyles.colorWhite} ${btnStyles.backgroundPink}`}
        onClick={() => {}}
      >
        Send password reset email
      </Button>
      <Button
        className={`${btnStyles.btnLarge} ${btnStyles.borderPink}`}
        onClick={() => navigate("/login")}
      >
        Back to login
      </Button>
    </Form>
  );
};

export default ForgotPasswordPage;
