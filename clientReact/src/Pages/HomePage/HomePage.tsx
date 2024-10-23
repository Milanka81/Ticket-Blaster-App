import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks.ts";
import { filteredEvents } from "../../store/eventsSlice.ts";
import EventCard from "../../Components/EventCard/EventCard.tsx";
interface Event {
  imageCover: string;
  eventName: string;
  eventDate: string;
  description: string;
  location: string;
}
const HomePage = () => {
  const dispatch = useAppDispatch();
  const events: Event[] = useAppSelector((state) => state.events.events);

  const page = 1;
  const limit = 10;
  const input = "";
  const category = "";

  useEffect(() => {
    dispatch(filteredEvents({ page, limit, input, category }));
  }, [dispatch, page, limit, input, category]);

  return (
    <>
      {events.length > 0 ? (
        <EventCard event={events[0]} />
      ) : (
        <p>No events available</p>
      )}
    </>
  );
};

export default HomePage;
