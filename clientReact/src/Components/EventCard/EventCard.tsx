import { FC } from "react";
import styles from "./EventCard.module.css";
import { imgSrc, showContent } from "../../utils";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
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
  ticketId: string;
}

const EventCard: FC<EventCardProps> = ({ event, ticketId }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const date = event.eventDate.slice(0, 10);
  return (
    <div className={styles.cardContainer}>
      <img
        src={imgSrc(event.imageCover)}
        alt={event.eventName}
        className={styles.image}
      />
      <div className={styles.infoContainer}>
        <p className={styles.eventName}>{event.eventName}</p>
        <div className={styles.mainData}>
          <p className={styles.eventDate}>{date}</p>

          <p className={styles.description}>{showContent(event.description)}</p>
        </div>
        <div className={styles.locationGetTicketBtnContainer}>
          <p className={styles.location}>{event.location}</p>
          {pathname === "/tickets-history" ? (
            <button
              className={styles.getTicketBtn}
              onClick={() => {
                navigate(`print-ticket/${ticketId}`);
              }}
            >
              Print
            </button>
          ) : (
            <button
              className={styles.getTicketBtn}
              onClick={() => {
                navigate(`/events/${event._id}`);
              }}
            >
              Get Tickets
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
