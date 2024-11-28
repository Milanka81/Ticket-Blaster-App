import { useLocation } from "react-router-dom";
import Title from "../../Components/Title/Title.tsx";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks.ts";
import { filteredEvents } from "../../store/eventsSlice.ts";
import AdminEventCard from "../../Components/AdminEventCard/AdminEventCard.tsx";
import styles from "./AdminEventsPage.module.css";
import btnStyles from "../../Components/Button/Button.module.css";
import { useNavigate } from "react-router";
interface Event {
  _id: string;
  imageCover: string;
  eventName: string;
  eventDate: string;
  description: string;
  location: string;
  category: string;
}
const AdminEventsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category") || "";
  const dispatch = useAppDispatch();
  const events: Event[] = useAppSelector((state) => state.events.events);
  const results = useAppSelector((state) => state.events.results);
  const input = useAppSelector((state) => state.events.input);
  const [limit, setLimit] = useState(10);
  const page = 1;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setLimit(10);
  }, [category]);

  useEffect(() => {
    dispatch(filteredEvents({ page, limit, input, category }));
  }, [dispatch, page, limit, input, category]);

  if (!events) return <p>No events available</p>;

  return (
    <div className={styles.container}>
      <div className={styles.flexContainer}>
        <Title>Events</Title>

        <button
          className={`${btnStyles.btnMedium} ${btnStyles.colorWhite} ${btnStyles.backgroundPink}`}
          type="button"
          onClick={() => navigate("/admin/create-event")}
        >
          Create Event
        </button>
      </div>
      <div className={styles.searchContainer}>
        {events.map((el) => (
          <AdminEventCard key={el._id} event={el} />
        ))}
      </div>
      <button
        className={btnStyles.loadMoreButton}
        onClick={() => setLimit((limit) => limit + 10)}
        disabled={results < limit}
      >
        {results < limit ? `No more events to display` : `Load More events`}
      </button>
    </div>
  );
};

export default AdminEventsPage;
