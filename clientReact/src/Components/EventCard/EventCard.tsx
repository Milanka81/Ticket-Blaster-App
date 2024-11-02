import { FC } from "react";
import styles from "./EventCard.module.css";
import { showContent } from "../../utils";
import { useNavigate } from "react-router";
interface Event {
  _id: string;
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
  const navigate = useNavigate();
  const serverBaseUrl = "http://localhost:9005";
  const imageUrl = event.imageCover
    ? `${serverBaseUrl}/images/${event.imageCover}`
    : "/img/favicon.svg";

  const date = event.eventDate.slice(0, 10);

  return (
    <div className={styles.cardContainer}>
      <img src={imageUrl} alt={event.eventName} className={styles.image} />
      <div className={styles.infoContainer}>
        <p className={styles.eventName}>{event.eventName}</p>
        <p className={styles.eventDate}>{date}</p>
        <p className={styles.description}>{showContent(event.description)}</p>
        <div className={styles.locationGetTicketBtnContainer}>
          <p className={styles.location}>{event.location}</p>
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
    </div>
  );
};

export default EventCard;
