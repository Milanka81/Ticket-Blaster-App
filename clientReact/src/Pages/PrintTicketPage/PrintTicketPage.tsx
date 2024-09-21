import { useParams } from "react-router";

const PrintTicketPage = () => {
  const params = useParams<{ ticketId: string }>();
  return <div>PrintTicketPage {params.ticketId}</div>;
};

export default PrintTicketPage;
