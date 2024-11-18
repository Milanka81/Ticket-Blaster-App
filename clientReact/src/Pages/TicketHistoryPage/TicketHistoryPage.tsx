import Title from "../../Components/Title/Title.tsx";
import { useEffect, useState } from "react";
import EventCard from "../../Components/EventCard/EventCard.tsx";
import styles from "./TicketHistoryPage.module.css";
import { getTicketsHistory } from "../../services/ecommerceService/index.ts";

interface Ticket {
  _id: string;
  event: {
    _id: string;
    imageCover: string;
    eventName: string;
    eventDate: string;
    description: string;
    location: string;
    category: string;
  };
}
const TicketHistoryPage = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {}, []);
  getTicketsHistory().then((res) => setTickets(res.data.tickets));
  if (!tickets) return <p>No tickets to display</p>;

  return (
    <div className={styles.container}>
      <Title>Tickets History</Title>
      <div className={styles.eventsContainer}>
        {tickets.map((el) => (
          <EventCard key={el._id} event={el.event} />
        ))}
      </div>
    </div>
  );
};

export default TicketHistoryPage;
