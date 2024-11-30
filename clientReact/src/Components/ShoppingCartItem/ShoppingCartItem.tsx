import { FC, useState } from "react";
import styles from "./ShoppingCartItem.module.css";
import { imgSrc } from "../../utils";
import ModalWindow from "../ModalWindow/ModalWindow";
import DialogMessage from "../DialogMessage/DialogMessage";
import { removeFromCart } from "../../services/ecommerceService";
import { useAppDispatch, useAppSelector } from "../../hooks.ts";
import { getShoppingCart } from "../../store/ecommerceSlice.ts";
import PrintTicketPage from "../../Pages/PrintTicketPage/PrintTicketPage.tsx";
import { openModal } from "../../store/modalSlice.ts";
interface CartItem {
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

interface ShoppingCartProps {
  cart: CartItem;
  showRemoveBtn: boolean;
  showPrintBtn: boolean;
}

const ShoppingCartItem: FC<ShoppingCartProps> = ({
  cart,
  showRemoveBtn,
  showPrintBtn,
}: ShoppingCartProps) => {
  const dispatch = useAppDispatch();
  const { event, quantity } = cart;
  const isOpenModal = useAppSelector((state) => state.modal.isOpen);
  const [showMessage, setShowMessage] = useState(false);
  const [showPrintDialog, setShowPrintDialog] = useState(false);
  const total = quantity * event.ticketPrice;
  const date = event.eventDate.slice(0, 10);

  const deleteItem = (id: string) => {
    removeFromCart(id).then(() => dispatch(getShoppingCart()));
  };
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
        <p className={styles.totalPrice}>{total} RSD</p>
        <p className={styles.quantity}>
          {quantity} x {event.ticketPrice} RSD
        </p>
        {showRemoveBtn ? (
          <button
            className={styles.btn}
            onClick={() => deleteItem(cart._id)}
            type="button"
          >
            Remove
          </button>
        ) : null}
        {showPrintBtn ? (
          <button
            className={styles.btn}
            onClick={() => {
              setShowPrintDialog(true);
              dispatch(openModal());
            }}
            type="button"
          >
            Print
          </button>
        ) : null}
      </div>

      {showMessage && (
        <ModalWindow>
          <DialogMessage
            message="You are about to remove an item from a cart"
            btnName="Remove"
            handleClick={() => setShowMessage(false)}
          />
        </ModalWindow>
      )}
      {showPrintDialog && isOpenModal && (
        <ModalWindow>
          <PrintTicketPage ticketId={cart._id} />
        </ModalWindow>
      )}
    </div>
  );
};

export default ShoppingCartItem;
