import { useAppDispatch, useAppSelector } from "../../hooks.ts";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { getShoppingCart } from "../../store/ecommerceSlice.ts";
import Title from "../../Components/Title/Title";
import styles from "./CheckoutPage.module.css";
import ShoppingCartItem from "../../Components/ShoppingCartItem/ShoppingCartItem";
import { clearCart } from "../../services/ecommerceService/index.ts";

const CheckoutPage = () => {
  const { state } = useLocation();
  const { clientSecret, cartItems } = state;
  const cart = useAppSelector((state) => state.shoppingCart.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    dispatch(getShoppingCart());
  }, [dispatch]);

  const prices = cart.map((el) => ({
    price: el.event.ticketPrice,
    quantity: el.quantity,
  }));

  const total = prices.reduce(
    (acc, current) => acc + current.price * current.quantity,
    0
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsProcessing(true);
    if (!stripe || !elements) {
      console.error("Stripe.js hasn't loaded yet.");
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);

    if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
      console.error("Card elements are not ready.");
      return;
    }

    try {
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardNumberElement,
            billing_details: {
              name: fullName,
            },
          },
        }
      );
      if (error) {
        console.error("[Payment Confirmation Error]", error.message);
      } else if (paymentIntent) {
        console.log("[Payment Confirmed]", paymentIntent);

        clearCart(cartItems).then(() => navigate("/tickets"));
      }
    } catch (err) {
      console.error("Error handling payment:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const elementOptions = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Lato, sans-serif",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
      },
    },
  };

  return (
    <div>
      <Title>Checkout</Title>
      <div className={styles.gridContainer}>
        <div className={styles.eventsContainer}>
          {cart.map((el) => (
            <ShoppingCartItem
              key={el._id}
              cart={el}
              showRemoveBtn={false}
              showPrintBtn={false}
            />
          ))}
          <div className={styles.total}>
            <span>Total:</span>
            <span>{total} €</span>
          </div>
        </div>

        <div className={styles.inputLabelWrapper}>
          <label>Full Name</label>
          <input
            className={`${styles.input} ${styles.paddingTopBottom}`}
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <label>Card Number</label>
          <div className={styles.input}>
            <CardNumberElement options={elementOptions} />
          </div>
          <label>Expiry Date</label>
          <div className={styles.input}>
            <CardExpiryElement options={elementOptions} />
          </div>
          <label>CVC</label>
          <div className={styles.input}>
            <CardCvcElement options={elementOptions} />
          </div>
        </div>
      </div>
      <div className={styles.flexBtnsContainer}>
        <button className={styles.btn} onClick={() => navigate(-1)}>
          Back
        </button>
        <button
          className={`${styles.btn} ${styles.btnCheckoutBackground}`}
          onClick={handleSubmit}
          disabled={!stripe}
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
