import { Outlet } from "react-router";
import { useLocation } from "react-router-dom";
import Title from "../../Components/Title/Title.tsx";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks.ts";
import { filteredEvents } from "../../store/eventsSlice.ts";
import EventCard from "../../Components/EventCard/EventCard.tsx";
import styles from "../HomePage/HomePage.module.css";
interface Event {
  imageCover: string;
  eventName: string;
  eventDate: string;
  description: string;
  location: string;
  category: string;
}
const EventsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category") || "";
  const dispatch = useAppDispatch();
  const events: Event[] = useAppSelector((state) => state.events.events);

  const page = 1;
  const limit = 20;
  const input = "";

  useEffect(() => {
    dispatch(filteredEvents({ page, limit, input, category }));
  }, [dispatch, page, limit, input, category]);

  if (!events) return <p>No events available</p>;

  const title = category === "concert" ? "Musical Concerts" : "Stand-up Comedy";

  return (
    <>
      <Title>{title}</Title>
      <div className={styles.eventsContainer}>
        {events.map((el) => (
          <EventCard event={el} fullContent={false} />
        ))}
      </div>
      <Outlet />
    </>
  );
};

export default EventsPage;
