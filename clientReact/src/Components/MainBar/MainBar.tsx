import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import styles from "./MainBar.module.css";
import btnStyles from "../Button/Button.module.css";
import Button from "../Button/Button.tsx";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks.ts";
import { checkAuth } from "../../store/userSlice.ts";
import UserBar from "../UserBar/UserBar.tsx";

const MainBar = ({ role }: { role: string }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const loading = useAppSelector((state) => state.user.loading);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  console.log(isDropdownOpen);
  return (
    <div className={styles.mainbar}>
      {!loading && (
        <div className={styles.mainbarContainer}>
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
                <div className={styles.iconsContainer}>
                  <NavLink to="/shopping-cart">
                    <img src="/img/shopping-cart.svg"></img>
                  </NavLink>
                  <div className={styles.userIcon} onClick={toggleDropdown}>
                    <img src="/img/user.svg"></img>
                    <UserBar isDropdownOpen={isDropdownOpen} />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className={styles.copyright}>®Copyright TicketBlaster 2024</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MainBar;
