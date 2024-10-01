import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import styles from "./Navbar.module.css";
import btnStyles from "../Button/Button.module.css";
import Button from "./../Button/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index";
import { isLoggedIn, logout } from "../../services/authService";
import { useEffect, useState } from "react";

const Navbar = ({ role }: { role: string }) => {
  const navigate = useNavigate();
  const fullName = useSelector((state: RootState) => state.user.fullName);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    isLoggedIn()
      .then((res) => {
        console.log(res.data);
        setLoggedIn(res.data.loggedIn);
      })
      .catch((err) => console.log(err));
  }, [loggedIn]);

  const handleLogOut = () => {
    logout().then(() => {
      navigate("/login");
    });
  };

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

            {!loggedIn ? (
              <div>
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
              </div>
            ) : (
              <Button className={btnStyles.btnSmall} onClick={handleLogOut}>
                Log Out {fullName}
              </Button>
            )}
          </div>
        ) : (
          <p className={styles.copyright}>®Copyright TicketBlaster 2024</p>
        )}
      </div>
    </div>
  );
};

export default Navbar;
