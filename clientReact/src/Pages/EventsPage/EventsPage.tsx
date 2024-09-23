import { Outlet } from "react-router";
import { useLocation } from "react-router-dom";
import Title from "../../Components/Title/Title.tsx";

const EventsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");
  return (
    <>
      <Title>EventsPage: {category}</Title>
      <Outlet />
    </>
  );
};

export default EventsPage;
