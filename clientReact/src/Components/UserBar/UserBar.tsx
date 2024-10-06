import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import Title from "../Title/Title";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveUserRole, setLogout } from "../../store/userSlice.tsx";
import { RootState } from "../../store/index";
import styles from "./UserBar.module.css";
import { logout } from "../../services/authService/index.tsx";
import { getMyAccount } from "../../services/userService/index.tsx";

interface UserBarProps {
  title: string;
}

const UserBar: FC<UserBarProps> = ({ title }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getMyAccount().then((res) => dispatch(saveUserRole(res.data.user.role)));
  }, [dispatch]);

  const userRole = useSelector((state: RootState) => state.user.role);

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
              to="/all-events/admin-events"
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
