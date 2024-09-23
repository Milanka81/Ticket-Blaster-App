import { useNavigate } from "react-router";
import { useState, FormEvent } from "react";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button.tsx";
import btnStyles from "../../Components/Button/Button.module.css";
import Title from "../../Components/Title/Title.tsx";
import Form from "../../Components/Form/Form.tsx";
import { register } from "../../services/authService/index.tsx";
const RegisterPage = () => {
  const navigate = useNavigate();

  const [signupFormData, setSignupFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  // const [responseMessage, setResponseMessage] = useState("");

  const submitData = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register(signupFormData)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Form onSubmit={submitData}>
      <Title>Create Account</Title>
      {/* {responseMessage && <p>{responseMessage}</p>} */}
      <Input
        name="fullName"
        type="text"
        label="Full Name"
        value={signupFormData.fullName}
        onChange={(event) =>
          setSignupFormData({ ...signupFormData, fullName: event.target.value })
        }
      />
      <Input
        name="email"
        type="email"
        label="Email"
        value={signupFormData.email}
        onChange={(event) =>
          setSignupFormData({ ...signupFormData, email: event.target.value })
        }
      />
      <Input
        name="password"
        type="password"
        label="Password"
        value={signupFormData.password}
        onChange={(event) =>
          setSignupFormData({ ...signupFormData, password: event.target.value })
        }
      />
      <Input
        name="passwordConfirm"
        type="password"
        label="Re-type Password"
        value={signupFormData.passwordConfirm}
        onChange={(event) =>
          setSignupFormData({
            ...signupFormData,
            passwordConfirm: event.target.value,
          })
        }
      />
      <button
        className={`${btnStyles.btnLarge} ${btnStyles.colorWhite} ${btnStyles.backgroundPink}`}
        type="submit"
      >
        Create Account
      </button>
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
