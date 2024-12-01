import { FC, useState } from "react";
import styles from "./EventCard.module.css";
import { imgSrc, showContent } from "../../utils";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { openModal } from "../../store/modalSlice";
import ModalWindow from "../ModalWindow/ModalWindow";
import PrintTicketPage from "../../Pages/PrintTicketPage/PrintTicketPage";
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
  const dispatch = useAppDispatch();
  const isOpenModal = useAppSelector((state) => state.modal.isOpen);
  const [showPrintDialog, setShowPrintDialog] = useState(false);
  if (!event) return <p className={styles.message}>Event has been deleted</p>;
  const date = event.eventDate?.slice(0, 10);
  return (
    <div className={styles.cardContainer}>
      <img
        src={imgSrc(event.imageCover)}
        alt={event?.eventName}
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
          {pathname === "/ecommerce/tickets-history" ? (
            <button
              className={styles.getTicketBtn}
              onClick={() => {
                dispatch(openModal(ticketId));
                setShowPrintDialog(true);
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
      {showPrintDialog && isOpenModal && (
        <ModalWindow>
          <PrintTicketPage />
        </ModalWindow>
      )}
    </div>
  );
};

export default EventCard;
