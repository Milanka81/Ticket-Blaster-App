import Title from "../../Components/Title/Title.tsx";
import { useEffect } from "react";
import styles from "./ShoppingCartPage.module.css";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks.ts";
import {
  createPayment,
  removeFromCart,
} from "../../services/ecommerceService/index.ts";
import ShoppingCartItem from "../../Components/ShoppingCartItem/ShoppingCartItem.tsx";
import { getShoppingCart } from "../../store/ecommerceSlice.ts";

const ShoppingCartPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.shoppingCart.cart);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getShoppingCart());
  }, [dispatch]);

  const handleClick = (id: string) => {
    removeFromCart(id).then(() => dispatch(getShoppingCart()));
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
