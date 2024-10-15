import { Outlet } from "react-router";
import MainBar from "./Components/MainBar/MainBar";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks";
import { closeDropdown } from "./store/dropdownSlice";

function App() {
  const dispatch = useAppDispatch();
  const isDropdownOpen = useAppSelector((state) => state.dropdown.isOpen);

  const closeDropdownHandler = () => {
    if (isDropdownOpen) dispatch(closeDropdown());
  };
  return (
    <div onClick={closeDropdownHandler}>
      <MainBar role="header" />
      <div className="container">
        <Outlet />
      </div>
      <MainBar role="footer" />
    </div>
  );
}

export default App;
