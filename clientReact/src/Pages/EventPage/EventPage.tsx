import { useParams } from "react-router";

const EventPage = () => {
  const params = useParams<{ eventId: string }>();
  return <div>EventPage {params.eventId}</div>;
};

export default EventPage;
