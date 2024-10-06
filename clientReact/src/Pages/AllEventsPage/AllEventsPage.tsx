import { Outlet } from "react-router";
import Title from "../../Components/Title/Title";

const AllEventsPage = () => {
  return (
    <div>
      <Title>All Events</Title>
      <Outlet />
    </div>
  );
};

export default AllEventsPage;
