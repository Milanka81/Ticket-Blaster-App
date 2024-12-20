import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks.ts";
import { filteredEvents } from "../../store/eventsSlice.ts";
import EventCard from "../../Components/EventCard/EventCard.tsx";
import styles from "./HomePage.module.css";
import Title from "../../Components/Title/Title.tsx";
import NextEvent from "../../Components/NextEvent/NextEvent.tsx";
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
const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const events: Event[] = useAppSelector((state) => state.events.events);

  const page = 1;
  const limit = 0;
  const input = "";
  const category = "";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(filteredEvents({ page, limit, input, category }));
  }, [dispatch, page, limit, input, category]);

  if (!events) return <p className={styles.message}>No events available</p>;

  const concertEvents = events
    .filter((el) => el.category === "concert" && el._id !== events[0]._id)
    .slice(0, 5);
  const standUpEvents = events
    .filter((el) => el.category === "stand-up" && el._id !== events[0]._id)
    .slice(0, 5);

  return (
    <div>
      {events[0] && <NextEvent event={events[0]} />}
      <div className={styles.eventsContainer}>
        <div className={styles.categoryContainer}>
          <Title>Musical Concerts</Title>
          {concertEvents.map((el) => (
            <EventCard key={el._id} event={el} ticketId="" />
          ))}
          <button
            className={btnStyle.loadMoreButton}
            onClick={() => navigate("/events?category=concert")}
          >
            See All Musical Concerts
          </button>
        </div>
        <div className={styles.categoryContainer}>
          <Title>Stand-up Comedy</Title>
          {standUpEvents.map((el) => (
            <EventCard key={el._id} event={el} ticketId="" />
          ))}
          <button
            className={btnStyle.loadMoreButton}
            onClick={() => navigate("/events?category=stand-up")}
          >
            See All Stand-up Comedy Shows
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
