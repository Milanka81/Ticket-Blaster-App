import Title from "../../Components/Title/Title.tsx";
import { useEffect, useState } from "react";
import styles from "./ShoppingCartPage.module.css";
import btnStyles from "../../Components/Button/Button.module.css";
import { useNavigate } from "react-router";
import { getCart } from "../../services/ecommerceService/index.ts";
import AdminEventCard from "../../Components/AdminEventCard/AdminEventCard.tsx";

interface CartItem {
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
}

const ShoppingCartPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    getCart().then((res) => setCart(res.data.myCart));
  }, []);
  console.log(cart);
  return (
    <div className={styles.container}>
      <div className={styles.flexContainer}>
        <Title>Shopping Cart</Title>
      </div>
      <div className={styles.searchContainer}>
        {cart.map((el) => (
          <AdminEventCard key={el.id} event={el.event} />
        ))}
      </div>
      {/* <button
        className={btnStyles.loadMoreButton}
        onClick={() => setLimit((limit) => limit + 10)}
        disabled={results < limit}
      >
        {results < limit ? `No more events to display` : `Load More events`}
      </button> */}
    </div>
    // </div>
  );
};

export default ShoppingCartPage;
