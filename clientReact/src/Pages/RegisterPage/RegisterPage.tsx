import { useNavigate } from "react-router";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button.tsx";
import btnStyles from "../../Components/Button/Button.module.css";
import Title from "../../Components/Title/Title.tsx";
import Form from "../../Components/Form/Form.tsx";
const RegisterPage = () => {
  const navigate = useNavigate();
  return (
    <Form>
      <Title>Create Account</Title>
      <Input name="fullName" label="Full Name" />
      <Input name="email" label="Email" />
      <Input name="password" label="Password" />
      <Input name="passwordConfirm" label="Re-type Password" />
      <Button
        className={`${btnStyles.btnLarge} ${btnStyles.colorWhite} ${btnStyles.backgroundPink}`}
        onClick={() => {}}
      >
        Create Account
      </Button>
      <Button
        className={`${btnStyles.btnLarge} ${btnStyles.borderPink}`}
        onClick={() => navigate("/login")}
      >
        Already have an account?
      </Button>
    </Form>
  );
};

export default RegisterPage;
