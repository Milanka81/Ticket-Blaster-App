import { Outlet } from "react-router";
import Navbar from "./Components/Navbar/Navbar";
import "./App.css";

function App() {
  return (
    <>
      <Navbar role="header" />
      <div className="container">
        <Outlet />
      </div>
      <Navbar role="footer" />
    </>
  );
}

export default App;
