import Title from "../../Components/Title/Title.tsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import styles from "./ShoppingCartPage.module.css";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks.ts";
import { createPayment } from "../../services/ecommerceService/index.ts";
import ShoppingCartItem from "../../Components/ShoppingCartItem/ShoppingCartItem.tsx";
import { getShoppingCart } from "../../store/ecommerceSlice.ts";
import CheckoutPage from "../CheckoutPage/CheckoutPage.tsx";

const ShoppingCartPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.shoppingCart.cart);
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getShoppingCart());
  }, [dispatch]);

  const handlePayment = () => {
    createPayment(cart).then((res) => setClientSecret(res.data));
  };
  const stripePromise = loadStripe(
    "pk_test_51Px6L7Rr71tg4yvXK2U9aiuumSrEzxap2KNix5lbEezZeoc0qvxcvtGtts2jeXVTTeTaz7QP9xu61FqUnmNPIz3O00cMIG1E50"
  );
  return (
    <>
      {clientSecret ? (
        <Elements stripe={stripePromise}>
          <CheckoutPage secret={clientSecret} />
        </Elements>
      ) : (
        <div className={styles.container}>
          <Title>Shopping Cart</Title>
          <div className={styles.eventsContainer}>
            {cart.map((el) => (
              <ShoppingCartItem key={el.id} cart={el} showBtn={true} />
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
      )}
    </>
  );
};

export default ShoppingCartPage;
