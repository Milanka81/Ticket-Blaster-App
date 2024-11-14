import { useAppDispatch, useAppSelector } from "../../hooks.ts";
import { useStripe } from "@stripe/react-stripe-js";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getShoppingCart } from "../../store/ecommerceSlice.ts";
import Title from "../../Components/Title/Title";
import styles from "./CheckoutPage.module.css";
import ShoppingCartItem from "../../Components/ShoppingCartItem/ShoppingCartItem";
import Input from "../../Components/Input/Input";
import Form from "../../Components/Form/Form.tsx";
interface CheckoutPageProps {
  secret: string;
}
const CheckoutPage: FC<CheckoutPageProps> = ({ secret }) => {
  const cart = useAppSelector((state) => state.shoppingCart.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  // const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
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

  const formik = useFormik({
    initialValues: {
      fullName: "",
      cardNumber: "",
      expMonth: "",
      expYear: "",
      cvc: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full name is required"),
      cardNumber: Yup.number().required("Card number is required"),
      expMonth: Yup.number().required("Month of expiration is required"),
      expYear: Yup.number().required("Year of expiration is required"),
      cvc: Yup.number().required("PIN is required"),
    }),
    onSubmit: async (values) => {
      setIsProcessing(true);
      if (!stripe || !secret) {
        throw new Error(
          "Stripe is not properly loaded or clientSecret is missing"
        );
      }
      const paymentMethod = await stripe.createPaymentMethod({
        type: "card",
        card: {
          number: values.cardNumber,
          exp_month: parseInt(values.expMonth),
          exp_year: parseInt(values.expYear),
          cvc: values.cvc,
        },
        billing_details: {
          name: values.fullName,
        },
      });

      if (paymentMethod.error) {
        throw new Error(
          paymentMethod.error.message || "Payment method creation failed"
        );
      }

      // Confirm payment with metadata
      await stripe.confirmCardPayment(secret, {
        payment_method: paymentMethod.paymentMethod?.id,
        payment_method_options: {
          card: {
            metadata: { prices },
          },
        },
      });
      setIsProcessing(false);
    },
  });

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
        <Form onSubmit={formik.handleSubmit}>
          <div className={styles.inputErrorWrapper}>
            <Input
              name="fullName"
              type="text"
              label="Full Name"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <p className={styles.inputError}>{formik.errors.fullName}</p>
            )}
          </div>
          <div className={styles.inputErrorWrapper}>
            <Input
              name="cardNumber"
              type="number"
              label="Card Number"
              value={formik.values.cardNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.cardNumber && formik.errors.cardNumber && (
              <p className={styles.inputError}>{formik.errors.cardNumber}</p>
            )}
          </div>
          <div className={styles.inputErrorWrapper}>
            <Input
              name="expMonth"
              type="number"
              label="Expires"
              placeholder="MM"
              value={formik.values.expMonth}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.expMonth && formik.errors.expMonth && (
              <p className={styles.inputError}>{formik.errors.expMonth}</p>
            )}
          </div>
          <div className={styles.inputErrorWrapper}>
            <Input
              name="expYear"
              type="number"
              label="Expires"
              placeholder="YYYY"
              value={formik.values.expYear}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.expYear && formik.errors.expYear && (
              <p className={styles.inputError}>{formik.errors.expYear}</p>
            )}
          </div>
          <div className={styles.inputErrorWrapper}>
            <Input
              name="cvc"
              type="number"
              label="PIN"
              value={formik.values.cvc}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.cvc && formik.errors.cvc && (
              <p className={styles.inputError}>{formik.errors.cvc}</p>
            )}
          </div>
        </Form>
      </div>
      <div className={styles.flexBtnsContainer}>
        <button className={styles.btn} onClick={() => navigate(-1)}>
          Back
        </button>
        <button
          type="submit"
          className={`${styles.btn} ${styles.btnCheckoutBackground}`}
          // disabled={isProcessing || !stripe}
        >
          Pay Now
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
