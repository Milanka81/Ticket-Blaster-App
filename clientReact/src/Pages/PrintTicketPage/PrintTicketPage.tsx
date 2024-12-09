import { useEffect, useState, useRef } from "react";
import { getPrintTicket } from "../../services/ecommerceService";
import styles from "./PrintTicketPage.module.css";
import { useReactToPrint } from "react-to-print";
import { useAppSelector } from "../../hooks";
import { formatDate } from "../../utils";

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
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const selectedId = useAppSelector((state) => state.modal.selectedId);
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  useEffect(() => {
    if (selectedId) {
      getPrintTicket(selectedId).then((res) => setTicket(res.data.ticket));
    }
  }, [selectedId]);
  const date = formatDate(ticket?.event.eventDate || "");

  return (
    <div>
      <div ref={contentRef} className={styles.container}>
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
      <button
        className={styles.printTicketBtn}
        onClick={() => reactToPrintFn()}
      >
        Print Ticket
      </button>
    </div>
  );
};

export default PrintTicketPage;
