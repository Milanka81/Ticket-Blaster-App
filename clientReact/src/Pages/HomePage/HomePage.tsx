import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks.ts";
import { filteredEvents } from "../../store/eventsSlice.ts";
import EventCard from "../../Components/EventCard/EventCard.tsx";
import styles from "./HomePage.module.css";
import Title from "../../Components/Title/Title.tsx";
import NextEvent from "../../Components/NextEvent/nextEvent.tsx";
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

  const concertEvents = events.filter(
    (el) => el.category === "concert" && el._id !== events[0]._id
  );
  const standUpEvents = events.filter(
    (el) => el.category === "stand-up" && el._id !== events[0]._id
  );

  return (
    <div>
      {events[0] && <NextEvent event={events[0]} />}
      <div className={styles.eventsContainer}>
        <div className={styles.categoryContainer}>
          <Title>Musical Concerts</Title>
          {concertEvents.map((el) => (
            <EventCard key={el._id} event={el} />
          ))}
        </div>
        <div className={styles.categoryContainer}>
          <Title>Stand-up Comedy</Title>
          {standUpEvents.map((el) => (
            <EventCard key={el._id} event={el} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
