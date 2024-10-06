import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import Title from "../Title/Title";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../store/userSlice.tsx";
import { RootState } from "../../store/index";
import styles from "./UserBar.module.css";
import { logout } from "../../services/authService/index.tsx";
interface UserBarProps {
  title: string;
}

const UserBar: FC<UserBarProps> = ({ title }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  const userRole = user?.role || "guest";

  console.log(userRole);

  const handleLogOut = () => {
    logout().then(() => {
      dispatch(setLogout());
      navigate("/login");
    });
  };

  return (
    <nav className={styles.navContainer}>
      <Title>{title}</Title>
      <div className={styles.navLinks}>
        {userRole === "admin" && (
          <>
            <NavLink
              className={({ isActive }) => (isActive ? `${styles.active}` : "")}
              to="/admin-events"
            >
              Events
            </NavLink>
            <NavLink to="/all-users">Users</NavLink>
          </>
        )}
        <NavLink to="/tickets-history">Tickets History</NavLink>
        <NavLink to="/user-details">User Details</NavLink>
        <NavLink to="#" onClick={handleLogOut}>
          Log Out
        </NavLink>
      </div>
    </nav>
  );
};
export default UserBar;
