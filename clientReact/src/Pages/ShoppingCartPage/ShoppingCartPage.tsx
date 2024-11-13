import Title from "../../Components/Title/Title.tsx";
import { useEffect, useState } from "react";
import styles from "./ShoppingCartPage.module.css";
import { useNavigate } from "react-router";
import {
  createPayment,
  getCart,
  removeFromCart,
} from "../../services/ecommerceService/index.ts";
import ShoppingCartItem from "../../Components/ShoppingCartItem/ShoppingCartItem.tsx";

interface Item {
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

const ShoppingCartPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [cart, setCart] = useState<Item[]>([]);

  useEffect(() => {
    getCart().then((res) => {
      setCart(res.data.myCart);
    });
  }, []);

  const handleClick = (id: string) => {
    removeFromCart(id).then(() =>
      getCart().then((res) => setCart(res.data.myCart))
    );
  };

  const handlePayment = () => {
    createPayment(cart).then((res) => console.log(res));
  };

  return (
    <div className={styles.container}>
      <Title>Shopping Cart</Title>
      <div className={styles.eventsContainer}>
        {cart.map((el) => (
          <ShoppingCartItem
            key={el.id}
            cart={el}
            handleClick={() => handleClick(el.id)}
          />
        ))}
      </div>
      <div className={styles.flexBtnsContainer}>
        <button className={styles.btn} onClick={() => navigate(-1)}>
          Back
        </button>
        <button
          className={`${styles.btn} ${styles.btnCheckoutBackground}`}
          onClick={() => handlePayment()}
        >
          Check Out
        </button>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
