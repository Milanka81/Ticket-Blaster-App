import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import styles from "./Navbar.module.css";
import btnStyles from "../Button/Button.module.css";
import Button from "./../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/index";
import { isLogout } from "../../store/userSlice";
import { logout } from "../../services/authService";

const Navbar = ({ role }: { role: string }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const fullName = useSelector((state: RootState) => state.user.fullName);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  console.log(isLoggedIn);
  return (
    <div className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <NavLink className={styles.logo} to="/">
          <img src="/img/Path 1.svg"></img>
        </NavLink>
        <NavLink className={styles.navlinks} to="/events?category=concert">
          Musical Concerts
        </NavLink>
        <NavLink className={styles.navlinks} to="/events?category=stand-up">
          Stand-up Comedy
        </NavLink>
        {role === "header" ? (
          <div className={styles.searchBtnsContainer}>
            <input
              className={styles.searchbar}
              type="text"
              placeholder="Search"
            />

            <Button
              className={btnStyles.btnSmall}
              onClick={() => navigate("/login")}
            >
              Log In
            </Button>
            <Button
              className={btnStyles.btnMedium}
              onClick={() => navigate("/register")}
            >
              Create Account
            </Button>
            <Button
              className={btnStyles.btnSmall}
              onClick={() => {
                dispatch(isLogout());
                logout();
                navigate("/login");
              }}
            >
              Log Out {fullName}
            </Button>
          </div>
        ) : (
          <p className={styles.copyright}>®Copyright TicketBlaster 2024</p>
        )}
      </div>
    </div>
  );
};

export default Navbar;
