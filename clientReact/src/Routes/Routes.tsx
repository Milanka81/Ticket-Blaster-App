import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import ForgotPasswordPage from "../Pages/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "../Pages/ResetPasswordPage/ResetPasswordPage";
import ConcertsPage from "../Pages/ConcertsPage/ConcertsPage";
import StandUpsPage from "../Pages/StandUpsPage/StandUpsPage";
import ConcertPage from "../Pages/ConcertPage/ConcertPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      {
        path: "concerts",
        element: <ConcertsPage />,
        children: [{ path: ":concertId", element: <ConcertPage /> }],
      },

      { path: "stand-ups", element: <StandUpsPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
      { path: "reset-password/:token", element: <ResetPasswordPage /> },
    ],
  },
]);
