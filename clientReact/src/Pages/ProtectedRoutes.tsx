import { Outlet } from "react-router";
import { useAppSelector } from "../hooks";
import LoginPage from "./LoginPage/LoginPage";

const ProtectedRoutes = () => {
  const loggedIn = useAppSelector((state) => state.loggedUser.isLoggedIn);
  return loggedIn ? <Outlet /> : <LoginPage />;
};

export default ProtectedRoutes;
