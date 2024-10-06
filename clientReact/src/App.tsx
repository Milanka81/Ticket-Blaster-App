import { Outlet } from "react-router";
import MainBar from "./Components/MainBar/MainBar";
import "./App.css";

function App() {
  return (
    <>
      <MainBar role="header" />
      <div className="container">
        <Outlet />
      </div>
      <MainBar role="footer" />
    </>
  );
}

export default App;
