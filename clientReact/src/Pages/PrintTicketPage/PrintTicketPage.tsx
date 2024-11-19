import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getPrintTicket } from "../../services/ecommerceService";
import styles from "./PrintTicketPage.module.css";
import ModalWindow from "../../Components/ModalWindow/ModalWindow";
interface Ticket {
  _id: string;
  event: {
    _id: string;
    imageCover: string;
    eventName: string;
    eventDate: string;
    description: string;
    location: string;
    ticketPrice: number;
  };
  quantity: number;
  qrCode: string;
}

const PrintTicketPage = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const [ticket, setTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    if (ticketId) {
      getPrintTicket(ticketId).then((res) => setTicket(res.data.ticket));
    }
  }, [ticketId]);
  const date = ticket?.event.eventDate.slice(0, 10);

  return (
    <ModalWindow>
      <div className={styles.container}>
        <img className={styles.logo} src="/img/Path 2.svg"></img>
        <img
          className={styles.image}
          src={`http://localhost:9005/images/${ticket?.event.imageCover}`}
          alt={ticket?.event.eventName}
        />
        <div className={styles.flexContainer}>
          <div className={styles.infoContainer}>
            <p className={styles.eventName}>{ticket?.event.eventName}</p>
            <p className={styles.date}>{date}</p>
            <p className={styles.location}>{ticket?.event.location}</p>
          </div>
          <img className={styles.qr} src={ticket?.qrCode} alt="qrCode" />
        </div>
      </div>
    </ModalWindow>
  );
};

export default PrintTicketPage;
