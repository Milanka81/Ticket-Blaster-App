import { Outlet } from "react-router";
import { useAppSelector } from "../hooks";
import HomePage from "./HomePage/HomePage";

const AdminRoutes = () => {
  const loggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const userRole = useAppSelector((state) => state.user.role);
  const isAdmin = userRole === "admin";
  return loggedIn && isAdmin ? <Outlet /> : <HomePage />;
};

export default AdminRoutes;
