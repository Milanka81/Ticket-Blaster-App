import styles from "./NextEvent.module.css";
import { FC } from "react";
import { useNavigate } from "react-router";
import { formatDate } from "../../utils";
interface Event {
  _id: string;
  imageCover: string;
  eventName: string;
  eventDate: string;
  description: string;
  location: string;
}

interface EventProps {
  event: Event;
}
const NextEvent: FC<EventProps> = ({ event }) => {
  const navigate = useNavigate();
  const serverBaseUrl = "http://localhost:9005";
  const imageUrl = event.imageCover
    ? `${serverBaseUrl}/images/${event.imageCover}`
    : "/img/favicon.svg";
  const backgroundStyle = {
    backgroundImage: `linear-gradient(
      to right,
      rgba(77, 2, 2, 0.722),
      rgba(239, 51, 51, 0.782)
    ), url(${imageUrl})`,
  };
  const date = formatDate(event.eventDate);
  return (
    <div className={styles.hero} style={backgroundStyle}>
      <p className={styles.title}>{event.eventName}</p>
      <div className={styles.infoContainer}>
        <p className={styles.dateLocation}>
          {date}, {event.location}
        </p>
        <button
          className={styles.getTicketBtn}
          onClick={() => {
            navigate(`/events/${event._id}`);
          }}
        >
          Get Tickets
        </button>
      </div>
    </div>
  );
};

export default NextEvent;
