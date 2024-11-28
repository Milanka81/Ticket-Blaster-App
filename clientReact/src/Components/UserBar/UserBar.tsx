import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setLogout } from "../../store/userSlice.ts";
import styles from "./UserBar.module.css";
import { logout } from "../../services/authService/index.tsx";
import { useAppSelector } from "../../hooks.ts";

const UserBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userRole = useAppSelector((state) => state.user.role);

  const handleLogOut = () => {
    logout().then(() => {
      dispatch(setLogout());
      navigate("/login");
    });
  };

  return (
    <>
      {userRole ? (
        <nav className={styles.navContainer}>
          <div className={styles.dropdownMenu}>
            {userRole === "admin" && (
              <>
                <NavLink to="/admin/events">Events</NavLink>
                <NavLink to="/admin/users">Users</NavLink>
              </>
            )}
            <NavLink to="/ecommerce/tickets-history">Tickets History</NavLink>
            <NavLink to="/user-details">User Details</NavLink>
            <NavLink to="#" onClick={handleLogOut}>
              Log Out
            </NavLink>
          </div>
        </nav>
      ) : null}
    </>
  );
};
export default UserBar;
