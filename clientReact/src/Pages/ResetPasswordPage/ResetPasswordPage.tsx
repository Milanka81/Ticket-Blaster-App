import { useNavigate } from "react-router";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button.tsx";
import btnStyles from "../../Components/Button/Button.module.css";
import Title from "../../Components/Title/Title.tsx";
import Form from "../../Components/Form/Form.tsx";
const ResetPasswordPage = () => {
  const navigate = useNavigate();
  return (
    <Form>
      <Title>Reset Password</Title>
      <Input name="password" label="Password" />
      <Input name="passwordConfirm" label="Re-type Password" />
      <Button
        className={`${btnStyles.btnLarge} ${btnStyles.colorWhite} ${btnStyles.backgroundPink}`}
        onClick={() => {}}
      >
        Reset password
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

export default ResetPasswordPage;
