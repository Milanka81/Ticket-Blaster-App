import { Outlet } from "react-router";
import { useLocation } from "react-router-dom";

const EventsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");
  return (
    <>
      <div>EventsPage {category}</div>
      <Outlet />
    </>
  );
};

export default EventsPage;
