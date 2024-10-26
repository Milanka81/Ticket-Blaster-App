import { Outlet } from "react-router";
import { useLocation } from "react-router-dom";
import Title from "../../Components/Title/Title.tsx";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks.ts";
import { filteredEvents } from "../../store/eventsSlice.ts";
import EventCard from "../../Components/EventCard/EventCard.tsx";
import styles from "./EventsPage.module.css";
import btnStyle from "../../Components/Button/Button.module.css";
interface Event {
  _id: string;
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
  const results = useAppSelector((state) => state.events.results);
  const [limit, setLimit] = useState(1);

  const page = 1;
  const input = "";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setLimit(1);
  }, [category]);

  useEffect(() => {
    dispatch(filteredEvents({ page, limit, input, category }));
  }, [dispatch, page, limit, input, category]);

  if (!events) return <p>No events available</p>;

  const title = category === "concert" ? "Musical Concerts" : "Stand-up Comedy";
  const btnName =
    category === "concert" ? "Musical Concerts" : "Stand-up Comedy Shows";

  return (
    <div className={styles.container}>
      <Title>{title}</Title>
      <div className={styles.eventsContainer}>
        {events.map((el) => (
          <EventCard key={el._id} event={el} />
        ))}
      </div>
      <button
        className={btnStyle.loadMoreButton}
        onClick={() => setLimit((limit) => limit + 1)}
        disabled={results < limit}
      >
        Load More {btnName}
      </button>
      <Outlet />
    </div>
  );
};

export default EventsPage;
