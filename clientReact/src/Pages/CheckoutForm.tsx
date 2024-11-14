import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Form from "../Components/Form/Form";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      console.error("Error:", error);
    } else if (paymentIntent.status === "succeeded") {
      console.log("Payment successful!");
    }
  };

  return (
    <div className="">
      <Form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </Form>
    </div>
  );
}

export default CheckoutForm;
