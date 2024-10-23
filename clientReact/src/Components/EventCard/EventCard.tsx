import { FC } from "react";
import { useLocation } from "react-router-dom";
import styles from "./EventCard.module.css";

interface Event {
  imageCover: string;
  eventName: string;
  eventDate: string;
  description: string;
  location: string;
}

interface EventCardProps {
  event: Event;
}

const EventCard: FC<EventCardProps> = ({ event }) => {
  const location = useLocation();
  const fullPathname = location;
  console.log(fullPathname);

  return (
    <div className={styles.cardContainer}>
      <img src={event.imageCover} alt={event.eventName} />
      <p className={styles.eventName}>{event.eventName}</p>
      <p className={styles.eventDate}>{event.eventDate}</p>
      <p className={styles.description}>{event.description}</p>
      <p className={styles.location}>{event.location}</p>
    </div>
  );
};

export default EventCard;
