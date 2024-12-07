import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import styles from "./MainBar.module.css";
import btnStyles from "../Button/Button.module.css";
import Button from "../Button/Button.tsx";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks.ts";
import { checkAuth, fetchMyAccount } from "../../store/loggedUserSlice.ts";
import { toggleDropdown } from "../../store/dropdownSlice.ts";
import UserBar from "../UserBar/UserBar.tsx";
import { setInput } from "../../store/eventsSlice.ts";

const MainBar = ({ role }: { role: string }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category") || "";
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector((state) => state.loggedUser.isLoggedIn);
  const userRole = useAppSelector((state) => state.loggedUser.role);
  const loading = useAppSelector((state) => state.loggedUser.loading);
  const isDropdownOpen = useAppSelector((state) => state.dropdown.isOpen);
  const input = useAppSelector((state) => state.events.input);
  const inputEl = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputEl.current) inputEl.current.focus();
  }, []);

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(fetchMyAccount());
  }, [dispatch]);

  return (
    <div className={styles.mainbar}>
      {!loading && (
        <div className={styles.mainbarContainer}>
          <NavLink className={styles.logo} to="/">
            <img src="/img/Path 1.svg"></img>
          </NavLink>
          <NavLink
            className={
              category === "concert"
                ? `${styles.navlinks} ${styles.active}`
                : `${styles.navlinks}`
            }
            to="/events?category=concert"
          >
            Musical Concerts
          </NavLink>
          <NavLink
            className={
              category === "stand-up"
                ? `${styles.navlinks} ${styles.active}`
                : `${styles.navlinks}`
            }
            to="/events?category=stand-up"
          >
            Stand-up Comedy
          </NavLink>

          {role === "header" ? (
            <div className={styles.searchBtnsContainer}>
              <input
                className={styles.searchbar}
                type="text"
                placeholder="Search"
                ref={inputEl}
                value={inputEl.current ? input : ""}
                onChange={(e) => dispatch(setInput(e.target.value))}
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
                  <NavLink to="/ecommerce/shopping-cart">
                    <img src="/img/shopping-cart.svg"></img>
                  </NavLink>
                  <div
                    className={styles.userIcon}
                    onClick={() => dispatch(toggleDropdown())}
                  >
                    <img src="/img/user.svg"></img>
                    {isDropdownOpen && <UserBar userRole={userRole} />}
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
