import { useParams } from "react-router";

const ConcertPage = () => {
  const params = useParams<{ concertId: string }>();
  return <div>ConcertPage {params.concertId}</div>;
};

export default ConcertPage;
