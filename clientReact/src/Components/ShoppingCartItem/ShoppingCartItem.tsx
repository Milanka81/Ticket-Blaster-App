import { FC, useState } from "react";
import styles from "./ShoppingCartItem.module.css";
import { imgSrc } from "../../utils";
import ModalWindow from "../ModalWindow/ModalWindow";
import DialogMessage from "../DialogMessage/DialogMessage";

interface CartItem {
  id: string;
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

interface ShoppingCartProps {
  cart: CartItem;
  handleClick: () => void;
}

const ShoppingCartItem: FC<ShoppingCartProps> = ({
  cart,
  handleClick,
}: ShoppingCartProps) => {
  const { event, quantity } = cart;

  const [showModal, setShowModal] = useState(false);
  const total = quantity * event.ticketPrice;
  const date = event.eventDate.slice(0, 10);

  return (
    <div className={styles.container}>
      <img
        src={imgSrc(event.imageCover)}
        alt={event.eventName}
        className={styles.image}
      />
      <div className={styles.infoContainer}>
        <p className={styles.eventName}>{event.eventName}</p>
        <p className={styles.date}>{date}</p>
        <p className={styles.location}>{event.location}</p>
      </div>
      <div className={styles.priceContainer}>
        <p className={styles.totalPrice}>{total} €</p>
        <p className={styles.quantity}>
          {quantity} x {event.ticketPrice} €
        </p>
        <button className={styles.btn} onClick={handleClick} type="button">
          Remove
        </button>
      </div>

      {showModal && (
        <ModalWindow>
          <DialogMessage
            message="You are about to remove an item from a cart"
            btnName="Remove"
            handleCancel={() => setShowModal(false)}
            handleClick={() => setShowModal(false)}
          />
        </ModalWindow>
      )}
    </div>
  );
};

export default ShoppingCartItem;
