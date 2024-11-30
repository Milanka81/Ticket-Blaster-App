import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { setLogout } from "../../store/userSlice.ts";
import styles from "./UserBar.module.css";
import { logout } from "../../services/authService/index.tsx";
import { useAppDispatch } from "../../hooks.ts";

const UserBar = ({ userRole }: { userRole: string }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
