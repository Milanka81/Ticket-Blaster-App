import Title from "../../Components/Title/Title.tsx";
import styles from "./ThankYouPage.module.css";
// import { useNavigate } from "react-router";

import { useEffect, useState } from "react";
import { getLastPurchase } from "../../services/ecommerceService/index.ts";
import ShoppingCartItem from "../../Components/ShoppingCartItem/ShoppingCartItem.tsx";
interface TicketItem {
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
}

const ThankYouPage = () => {
  const [recentTickets, setRecentTickets] = useState<TicketItem[]>([]);
  useEffect(() => {
    getLastPurchase().then((res) => setRecentTickets(res.data.tickets));
  }, []);

  return (
    <div className={styles.container}>
      <Title>Thank you for the purchase!</Title>
      <div className={styles.eventsContainer}>
        {recentTickets &&
          recentTickets.map((el) => (
            <ShoppingCartItem
              key={el._id}
              cart={el}
              showRemoveBtn={false}
              showPrintBtn={true}
            />
          ))}
      </div>
    </div>
  );
};

export default ThankYouPage;
