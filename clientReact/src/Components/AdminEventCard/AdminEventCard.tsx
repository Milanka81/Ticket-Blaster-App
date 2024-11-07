import { FC } from "react";
import styles from "./AdminEventCard.module.css";
import { imgSrc } from "../../utils";
// import { useNavigate } from "react-router";

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

const AdminEventCard: FC<EventCardProps> = ({ event }) => {
  // const navigate = useNavigate();

  const date = event.eventDate.slice(0, 10);

  return (
    <div className={`${styles.cardContainer} ${styles.adminCardContainer}`}>
      <img
        src={imgSrc(event.imageCover)}
        alt={event.eventName}
        className={styles.imageAdmin}
      />
      <div className={styles.infoContainer}>
        <p className={`${styles.eventName} ${styles.adminEventName}`}>
          {event.eventName}
        </p>
        <div className={styles.mainData}>
          <p className={`${styles.eventDate} ${styles.adminDate}`}>{date}</p>
        </div>
        <div className={styles.locationGetTicketBtnContainer}>
          <p className={styles.location}>{event.location}</p>
          <button className={styles.getTicketBtn} onClick={() => {}}>
            Delete Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminEventCard;
