import { FC } from "react";
import styles from "./AdminEventCard.module.css";
import { formatDate, imgSrc } from "../../utils";
import { useNavigate } from "react-router";
import ModalWindow from "../ModalWindow/ModalWindow";
import DialogMessage from "../DialogMessage/DialogMessage";
import { deleteEvent } from "../../services/eventService";
import { useAppDispatch, useAppSelector } from "../../hooks.ts";
import { filteredEvents } from "../../store/eventsSlice.ts";
import { closeModal, openModal } from "../../store/modalSlice.ts";

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
  const isModalOpen = useAppSelector((state) => state.modal.isOpen);
  const selectedId = useAppSelector((state) => state.modal.selectedId);
  const date = formatDate(event.eventDate);

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
          navigate(`/admin/edit/${event._id}`);
        }}
      >
        Update
      </button>
      <button
        className={styles.btn}
        onClick={() => {
          dispatch(openModal(event._id));
        }}
      >
        Delete
      </button>
      {isModalOpen && (
        <ModalWindow>
          <DialogMessage
            message="You are about to delete an event from a system. Please proceed with caution"
            btnName="Delete event"
            handleClick={() => {
              if (selectedId) {
                deleteEvent(selectedId).then(() => {
                  dispatch(
                    filteredEvents({
                      page: 1,
                      limit: 10,
                      input: "",
                      category: "",
                    })
                  );
                  dispatch(closeModal());
                });
              }
            }}
          />
        </ModalWindow>
      )}
    </div>
  );
};

export default AdminEventCard;
