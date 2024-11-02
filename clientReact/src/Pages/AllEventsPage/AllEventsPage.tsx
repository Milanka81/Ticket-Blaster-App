// import { Outlet } from "react-router";

import Title from "../../Components/Title/Title";
import EventPage from "../EventPage/EventPage";

const AllEventsPage = () => {
  return (
    <div>
      <Title>AllEventsPage</Title>
      <EventPage componentState="add" />
      {/* <Outlet /> */}
    </div>
  );
};

export default AllEventsPage;
