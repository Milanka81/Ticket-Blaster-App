import { useEffect, useState } from "react";
import styles from "./ViewEvent.module.css";
import { formatDate, imgSrc } from "../../utils";
import { useNavigate, useParams } from "react-router";
import { getEvent } from "../../services/eventService";
import { addToCart } from "../../services/ecommerceService";
import { useAppSelector } from "../../hooks";

const ViewEvent = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const loggedIn = useAppSelector((state) => state.loggedUser.isLoggedIn);
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    eventName: "",
    category: "",
    ticketPrice: "",
    totalTickets: "",
    description: "",
    imageCover: null,
    location: "",
    eventDate: "",
    availableTickets: "",
  });
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const date = formatDate(event.eventDate);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (eventId) {
      getEvent(eventId).then((res) => {
        if (res.data.data.event) {
          setEvent(res.data.data.event);
        }
      });
    }
  }, [eventId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < 0) {
      return;
    } else {
      setTicketQuantity(Number(e.target.value));
    }
  };
  const handleAdd = () => {
    if (!loggedIn) return navigate("/login");
    if (eventId) {
      addToCart(eventId, ticketQuantity).then(() =>
        navigate("/ecommerce/shopping-cart")
      );
    }
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.infoContainer}>
        <p className={styles.eventName}>{event.eventName}</p>
        <p className={styles.eventDate}>{date}</p>
        <p className={styles.location}>{event.location}</p>
        {+event.availableTickets <= 20 && +event.availableTickets > 0 ? (
          <p className={styles.ticketMessage}>
            Only <strong> {event.availableTickets} </strong> tickets left!
          </p>
        ) : null}
        {+event.availableTickets === 0 ? (
          <p className={styles.ticketMessage}>
            <strong> Sold out! </strong>
          </p>
        ) : null}
      </div>
      <img
        src={event.imageCover ? imgSrc(event.imageCover) : undefined}
        alt={event.eventName}
        className={styles.image}
      />
      <div className={styles.aboutContainer}>
        <p className={styles.about}>About</p>
        <p className={styles.description}>{event.description}</p>
        <p className={styles.ticketPrice}>
          Ticket Price:
          <span className={styles.price}> {event.ticketPrice} RSD</span>
        </p>
        <div className={styles.quantityAddBtn}>
          <input
            className={styles.input}
            name="tickets"
            type="number"
            id="tickets"
            min={1}
            defaultValue={ticketQuantity}
            onChange={handleChange}
          />
          <button
            className={styles.addBtn}
            onClick={handleAdd}
            disabled={+event.availableTickets === 0}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewEvent;
