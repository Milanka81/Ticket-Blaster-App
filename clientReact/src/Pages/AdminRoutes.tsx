import { Outlet } from "react-router";
import { useAppSelector } from "../hooks";
import HomePage from "./HomePage/HomePage";

const AdminRoutes = () => {
  const loggedIn = useAppSelector((state) => state.loggedUser.isLoggedIn);
  const userRole = useAppSelector((state) => state.loggedUser.role);
  const isAdmin = userRole === "admin";
  return loggedIn && isAdmin ? <Outlet /> : <HomePage />;
};

export default AdminRoutes;
