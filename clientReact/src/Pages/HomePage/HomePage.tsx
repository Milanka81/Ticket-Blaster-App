import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks.ts";
import { filteredEvents } from "../../store/eventsSlice.ts";
import EventCard from "../../Components/EventCard/EventCard.tsx";
import styles from "./HomePage.module.css";
import Title from "../../Components/Title/Title.tsx";
interface Event {
  imageCover: string;
  eventName: string;
  eventDate: string;
  description: string;
  location: string;
  category: string;
}
const HomePage = () => {
  const dispatch = useAppDispatch();
  const events: Event[] = useAppSelector((state) => state.events.events);

  const page = 1;
  const limit = 20;
  const input = "";
  const category = "";

  useEffect(() => {
    dispatch(filteredEvents({ page, limit, input, category }));
  }, [dispatch, page, limit, input, category]);

  if (!events) return <p>No events available</p>;

  const concertEvents = events.filter((el) => el.category === "concert");
  const standUpEvents = events.filter((el) => el.category === "stand-up");

  return (
    <div>
      <div className={styles.eventsContainer}>
        <div className={styles.categoryContainer}>
          <Title>Musical Concerts</Title>
          {concertEvents.map((el) => (
            <EventCard event={el} fullContent={false} />
          ))}
        </div>
        <div className={styles.categoryContainer}>
          <Title>Stand-up Comedy</Title>
          {standUpEvents.map((el) => (
            <EventCard event={el} fullContent={false} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
