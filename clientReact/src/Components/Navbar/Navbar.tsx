import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import styles from "./Navbar.module.css";

const Navbar = ({ role }: { role: string }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <NavLink className={styles.logo} to="/">
          <img src="/img/Path 1.svg"></img>
        </NavLink>
        <NavLink className={styles.navlinks} to="/events">
          Musical Concerts
        </NavLink>
        <NavLink className={styles.navlinks} to="/events">
          Stand-up Comedy
        </NavLink>
        {role === "header" ? (
          <div className={styles.searchBtnsContainer}>
            <input
              className={styles.searchbar}
              type="text"
              placeholder="Search"
            />
            <button
              className={styles.btnLogin}
              onClick={() => navigate("/login")}
            >
              Log in
            </button>
            <button
              className={styles.btnCreateAccount}
              onClick={() => navigate("/register")}
            >
              Create Account
            </button>
          </div>
        ) : (
          <p className={styles.copyright}>®Copyright TicketBlaster 2004</p>
        )}
      </div>
    </div>
  );
};

export default Navbar;
