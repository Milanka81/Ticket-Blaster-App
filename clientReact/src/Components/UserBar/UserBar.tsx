import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveUserRole, setLogout } from "../../store/userSlice.ts";
import { RootState } from "../../store/index";
import styles from "./UserBar.module.css";
import { logout } from "../../services/authService/index.tsx";
import { getMyAccount } from "../../services/userService/index.tsx";

interface UserBarProps {
  isDropdownOpen: boolean;
}

const UserBar: FC<UserBarProps> = ({ isDropdownOpen }) => {
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
      {isDropdownOpen && (
        <div className={styles.dropdownMenu}>
          {userRole === "admin" && (
            <>
              <NavLink to="/all-events/admin-events">Events</NavLink>
              <NavLink to="/all-users">Users</NavLink>
            </>
          )}
          <NavLink to="/tickets-history">Tickets History</NavLink>
          <NavLink to="/user-details">User Details</NavLink>
          <NavLink to="#" onClick={handleLogOut}>
            Log Out
          </NavLink>
        </div>
      )}
    </nav>
  );
};
export default UserBar;
