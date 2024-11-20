import { Outlet } from "react-router";
import MainBar from "./Components/MainBar/MainBar";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks";
import { closeDropdown } from "./store/dropdownSlice";
import EventsPage from "./Pages/EventsPage/EventsPage";
import { clearInput } from "./store/eventsSlice";
import { closeModal } from "./store/modalSlice";

function App() {
  const dispatch = useAppDispatch();
  const isDropdownOpen = useAppSelector((state) => state.dropdown.isOpen);
  const isModalOpen = useAppSelector((state) => state.modal.isOpen);
  const input = useAppSelector((state) => state.events.input);
  const closeDropdownHandler = () => {
    if (isDropdownOpen) dispatch(closeDropdown());
    if (isModalOpen) dispatch(closeModal());
    if (input) dispatch(clearInput());
  };
  return (
    <div onClick={closeDropdownHandler}>
      <MainBar role="header" />
      <div className="container">{input ? <EventsPage /> : <Outlet />}</div>
      <MainBar role="footer" />
    </div>
  );
}

export default App;
