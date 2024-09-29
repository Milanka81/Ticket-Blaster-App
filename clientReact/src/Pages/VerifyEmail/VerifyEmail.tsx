import { useParams } from "react-router";
import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNewToken, verifyEmail } from "../../services/authService";
import Input from "../../Components/Input/Input";
import btnStyles from "../../Components/Button/Button.module.css";
import formStyles from "../../Components/Form/Form.module.css";
import Form from "../../Components/Form/Form";

const getNewVerificationToken = (
  email: string,
  setMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  const clientUrl = window.location.origin;
  getNewToken(email, clientUrl)
    .then((res) => setMessage(res.data.message))
    .catch((error) => {
      setMessage(error.response?.data.message);
    });
};

const VerifyEmail = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [tokenExpired, setTokenExpired] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  useEffect(() => {
    if (token) {
      verifyEmail(token)
        .then((res) => {
          setMessage(res.data.message + ", redirecting to login...");
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        })
        .catch((error) => {
          if (error.response.data.message === "jwt expired") {
            return setTokenExpired(true);
          }
          setMessage(error.response.data.message);
        });
    }
  }, [token, navigate]);

  return (
    <div>
      {tokenExpired && (
        <div>
          <h3 className={formStyles.messageTitle}>
            Your verification token has expired! Enter your email to get a new
            one:
          </h3>
          <Form
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
              getNewVerificationToken(email, setMessage);
            }}
          >
            <Input
              name="email"
              type="email"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className={`${btnStyles.btnLarge} ${btnStyles.colorWhite} ${btnStyles.backgroundPink}`}
              type="submit"
            >
              Get new verification link
            </button>
          </Form>
        </div>
      )}
      {message && (
        <div className={formStyles.infoMessageContainer}>
          <p className={formStyles.infoMessage}>🔖 {message}</p>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
