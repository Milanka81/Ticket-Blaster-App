import { Outlet } from "react-router";
import Title from "../../Components/Title/Title";
import styles from "./AllEventsPage.module.css";
import Input from "../../Components/Input/Input";

const AllEventsPage = () => {
  return (
    <div>
      <Title>Events</Title>
      <div className={styles.container}>
        <Input name="eventName" type="text" label="Event Name" />
        <div className={styles.inputLabelWrapper}>
          <label>Category</label>
          <select className={styles.input}>
            <option>Musical Concert</option>
            <option>Stand-up Comedy</option>
          </select>
        </div>
        <div className={styles.inputLabelWrapper}>
          <label>Date</label>
          <input className={styles.input} />
        </div>
        <div className={styles.imageContainer}>
          <input
            className={styles.uploadBtn}
            name="img"
            id="img"
            type="file"
            accept="image/*"
            onChange={() => {}}
          />
          <img className={styles.image} />
        </div>
        <div className={`${styles.details} ${styles.inputLabelWrapper}`}>
          <label>Event Datails</label>
          <input className={styles.inputDetails} />
        </div>
        <Input name="ticketPrice" type="number" label="Ticket Price" />
        <Input name="totalTickets" type="number" label="Total Tickets" />
      </div>
      <Outlet />
    </div>
  );
};

export default AllEventsPage;
