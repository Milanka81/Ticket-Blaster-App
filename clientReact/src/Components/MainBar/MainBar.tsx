import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import styles from "./MainBar.module.css";
import btnStyles from "../Button/Button.module.css";
import Button from "../Button/Button.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index";
import { isLoggedIn } from "../../services/authService/index.tsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateStatus } from "../../store/userSlice.tsx";

const MainBar = ({ role }: { role: string }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const fullName = useSelector((state: RootState) => state.user.fullName);
  const loggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  useEffect(() => {
    isLoggedIn().then((res) => {
      dispatch(updateStatus(res.data.loggedIn));
    });
  }, [loggedIn, dispatch]);

  return (
    <div className={styles.mainbar}>
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
                <NavLink to="/user-details">
                  <img src="/img/user.svg"></img>
                </NavLink>
              </div>
            )}
          </div>
        ) : (
          <p className={styles.copyright}>®Copyright TicketBlaster 2024</p>
        )}
      </div>
    </div>
  );
};

export default MainBar;
