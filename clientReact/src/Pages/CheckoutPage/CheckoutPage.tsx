import { useAppDispatch, useAppSelector } from "../../hooks.ts";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getShoppingCart } from "../../store/ecommerceSlice.ts";
import Title from "../../Components/Title/Title";
import styles from "./CheckoutPage.module.css";
import ShoppingCartItem from "../../Components/ShoppingCartItem/ShoppingCartItem";

interface CheckoutPageProps {
  clientSecret: string;
}
const CheckoutPage: FC<CheckoutPageProps> = ({ clientSecret }) => {
  const cart = useAppSelector((state) => state.shoppingCart.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [fullName, setFullName] = useState("");

  const prices = cart.map((el) => ({
    price: el.event.ticketPrice,
    quantity: el.quantity,
  }));

  const total = prices.reduce(
    (acc, current) => acc + current.price * current.quantity,
    0
  );

  useEffect(() => {
    dispatch(getShoppingCart());
  }, [dispatch]);

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
            <ShoppingCartItem key={el.id} cart={el} showBtn={false} />
          ))}
          <p>Total: {total}</p>
        </div>

        <div className={styles.inputLabelWrapper}>
          <label>Full Name</label>
          <input
            className={styles.input}
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
