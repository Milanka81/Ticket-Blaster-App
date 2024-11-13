import { useAppDispatch, useAppSelector } from "../../hooks.ts";
import { useEffect } from "react";
import { getShoppingCart } from "../../store/ecommerceSlice.ts";
import Title from "../../Components/Title/Title";
import styles from "./CheckoutPage.module.css";
import ShoppingCartItem from "../../Components/ShoppingCartItem/ShoppingCartItem";

const CheckoutPage = () => {
  const cart = useAppSelector((state) => state.shoppingCart.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getShoppingCart());
  }, [dispatch]);

  return (
    <div className={styles.gridContainer}>
      <Title>Checkout</Title>
      <div className={styles.eventsContainer}>
        {cart.map((el) => (
          <ShoppingCartItem key={el.id} cart={el} />
        ))}
      </div>
    </div>
  );
};

export default CheckoutPage;
