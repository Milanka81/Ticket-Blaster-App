import Title from "../../Components/Title/Title.tsx";
import { useEffect } from "react";
import styles from "./ShoppingCartPage.module.css";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks.ts";
import {
  createPayment,
  clearCart,
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

  const cartItemsIds: string[] = cart.map((el) => {
    return el._id;
  });

  const clearShoppingCart = () => {
    clearCart(cartItemsIds).then(() => dispatch(getShoppingCart()));
  };

  const handlePayment = () => {
    createPayment(cart)
      .then((res) => {
        const clientSecret = res.data.clientSecret;
        navigate("/ecommerce/checkout", {
          state: { clientSecret, cartItems: cartItemsIds },
        });
      })
      .catch((error) => {
        console.error("Error creating payment:", error);
      });
  };
  if (!cart.length)
    return (
      <div className={styles.container}>
        <Title>Shopping Cart</Title>{" "}
        <p className={styles.message}>No items in the cart</p>
      </div>
    );
  return (
    <div className={styles.container}>
      <div className={styles.flexContainer}>
        <Title>Shopping Cart</Title>
        <button
          className={`${styles.btn} ${styles.clearBtn}`}
          onClick={clearShoppingCart}
        >
          Empty Cart
        </button>
      </div>
      <div className={styles.eventsContainer}>
        {cart.map((el) => (
          <ShoppingCartItem
            key={el._id}
            cart={el}
            showRemoveBtn={true}
            showPrintBtn={false}
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
