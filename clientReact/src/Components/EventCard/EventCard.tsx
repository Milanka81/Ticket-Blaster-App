import { FC } from "react";
import styles from "./EventCard.module.css";
import { showContent } from "../../utils";
interface Event {
  imageCover: string;
  eventName: string;
  eventDate: string;
  description: string;
  location: string;
}

interface EventCardProps {
  event: Event;
  fullContent: boolean;
}

const EventCard: FC<EventCardProps> = ({ event, fullContent }) => {
  const serverBaseUrl = "http://localhost:9005";
  const imageUrl = event.imageCover
    ? `${serverBaseUrl}/images/${event.imageCover}`
    : "/img/favicon.svg";

  console.log(imageUrl);
  const dateToString = event.eventDate.toString();
  const date = dateToString.slice(0, 10);

  return (
    <div className={styles.cardContainer}>
      <img src={imageUrl} alt={event.eventName} className={styles.image} />
      <div className={styles.infoContainer}>
        <p className={styles.eventName}>{event.eventName}</p>
        <p className={styles.eventDate}>{date}</p>
        <p className={styles.description}>
          {showContent(event.description, fullContent)}
        </p>
        <div className={styles.locationGetTicketBtnContainer}>
          <p className={styles.location}>{event.location}</p>
          <button className={styles.getTicketBtn}>Get Tickets</button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
