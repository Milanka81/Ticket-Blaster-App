import { FC, useState } from "react";
import styles from "./AdminEventCard.module.css";
import { imgSrc } from "../../utils";
import { useNavigate } from "react-router";
import ModalWindow from "../ModalWindow/ModalWindow";
import DialogMessage from "../DialogMessage/DialogMessage";
import { deleteEvent } from "../../services/eventService";
import { useAppDispatch } from "../../hooks.ts";
import { filteredEvents } from "../../store/eventsSlice.ts";
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const date = event.eventDate.slice(0, 10);

  return (
    <div className={styles.adminCardContainer}>
      <img
        src={imgSrc(event.imageCover)}
        alt={event.eventName}
        className={styles.imageAdmin}
      />
      <div className={styles.infoContainer}>
        <p className={styles.adminEventName}>{event.eventName}</p>
        <div className={styles.mainData}>
          <p className={styles.adminDate}>{date}</p>
          <p className={styles.location}>{event.location}</p>
        </div>
      </div>
      <button
        className={`${styles.btn} ${styles.updateBtn}`}
        onClick={() => {
          navigate(`/events/edit/${event._id}`);
        }}
      >
        Update
      </button>
      <button className={styles.btn} onClick={() => setShowModal(true)}>
        Delete
      </button>
      {showModal && (
        <ModalWindow>
          <DialogMessage
            message="You are about to delete an event from a system. Please proceed with caution"
            btnName="Delete event"
            handleCancel={() => setShowModal(false)}
            handleClick={() =>
              deleteEvent(event._id).then(() => {
                dispatch(
                  filteredEvents({
                    page: 1,
                    limit: 10,
                    input: "",
                    category: "",
                  })
                );
                setShowModal(false);
              })
            }
          />
        </ModalWindow>
      )}
    </div>
  );
};

export default AdminEventCard;
