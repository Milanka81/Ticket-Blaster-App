import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNewToken, verifyEmail } from "../../services/authService";
import Input from "../../Components/Input/Input";
import btnStyles from "../../Components/Button/Button.module.css";
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
            setTokenExpired(true);
          }
          setMessage(error.response.data.message);
        });
    }
  }, [token, navigate]);

  return (
    <div>
      {tokenExpired ? (
        <div>
          <p>Your verification token has expired</p>

          <Input
            name="email"
            type="email"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className={`${btnStyles.btnLarge} ${btnStyles.borderPink}`}
            onClick={() => getNewVerificationToken(email, setMessage)}
          >
            Get new verification link
          </button>
          {message && <p>{message}</p>}
        </div>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
};

export default VerifyEmail;
