// import { Outlet } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import Title from "../../Components/Title/Title";
import styles from "./AllEventsPage.module.css";
import Input from "../../Components/Input/Input";
import { postEvent } from "../../services/eventService";

const AllEventsPage = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      eventName: "",
      category: "",
      ticketPrice: "",
      totalTickets: "",
      description: "",
      imageCover: null,
      location: "",
      eventDate: "",
    },
    onSubmit: (values) => {
      postEvent(values).then(() => navigate("/"));
    },
    validationSchema: Yup.object().shape({
      // imageCover: Yup.mixed().required("Image is required"),
      eventName: Yup.string().required("Event name is required"),
      category: Yup.string().required("Event category is required"),
      ticketPrice: Yup.number().integer().required("Ticket price is required"),
      totalTickets: Yup.number()
        .integer()
        .required("Amount of total tickets available is required"),
      description: Yup.string().required("Event description is required"),
      location: Yup.string().required("Event location is required"),
      eventDate: Yup.string().required("Event date is required"),
    }),
  });

  return (
    <div>
      <Title>Events</Title>
      <form
        className={styles.container}
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
      >
        <div className={styles.flexDiv}>
          <Input
            name="eventName"
            type="text"
            label="Event Name"
            id="eventName"
            value={formik.values.eventName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.eventName && formik.errors.eventName && (
            <p className={styles.inputError}>{formik.errors.eventName}</p>
          )}
        </div>
        <div className={styles.inputLabelWrapper}>
          <label htmlFor="category">Category</label>
          <select
            className={styles.input}
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option defaultValue="" hidden>
              Select Category
            </option>
            <option value="concert">Musical Concert</option>
            <option value="stand-up">Stand-up Comedy</option>
          </select>
          {formik.touched.category && formik.errors.category && (
            <p className={styles.inputError}>{formik.errors.category}</p>
          )}
        </div>
        <div className={styles.inputLabelWrapper}>
          <label htmlFor="eventDate">Date</label>
          <input
            className={styles.input}
            placeholder="yyyy/dd/mm"
            id="eventDate"
            name="eventDate"
            type="date"
            value={formik.values.eventDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.eventDate && formik.errors.eventDate && (
            <p className={styles.inputError}>{formik.errors.eventDate}</p>
          )}
        </div>
        <div className={styles.imageContainer}>
          <label htmlFor="imageCover" className={styles.uploadBtn}>
            Upload Event Art
          </label>
          <input
            name="imageCover"
            id="imageCover"
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                formik.setFieldValue("imageCover", file);
              }
            }}
          />
          {formik.values.imageCover ? (
            <img
              className={styles.uploadedImage}
              src={URL.createObjectURL(formik.values.imageCover)}
              alt="event image"
            />
          ) : (
            <img className={styles.image} />
          )}
          {formik.touched.imageCover && formik.errors.imageCover && (
            <p className={styles.inputError}>{formik.errors.imageCover}</p>
          )}
        </div>
        <div className={`${styles.details} ${styles.inputLabelWrapper}`}>
          <label htmlFor="description">Event Datails</label>
          <input
            className={styles.inputDetails}
            id="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.description && formik.errors.description && (
            <p className={styles.inputError}>{formik.errors.description}</p>
          )}
        </div>
        <div className={styles.flexDiv}>
          <Input
            name="ticketPrice"
            type="number"
            label="Ticket Price"
            id="ticketPrice"
            value={formik.values.ticketPrice}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.ticketPrice && formik.errors.ticketPrice && (
            <p className={styles.inputError}>{formik.errors.ticketPrice}</p>
          )}
        </div>
        <div className={styles.flexDiv}>
          <Input
            name="totalTickets"
            type="number"
            label="Total Tickets"
            id="totalTickets"
            value={formik.values.totalTickets}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.totalTickets && formik.errors.totalTickets && (
            <p className={styles.inputError}>{formik.errors.totalTickets}</p>
          )}
        </div>
        <div className={`${styles.flexDiv} ${styles.location}`}>
          <Input
            name="location"
            type="text"
            label="Event Location"
            id="location"
            value={formik.values.location}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.location && formik.errors.location && (
            <p className={styles.inputError}>{formik.errors.location}</p>
          )}
        </div>
        <button className={styles.btnAdd} type="submit">
          Add Event
        </button>
      </form>
      {/* <Outlet /> */}
    </div>
  );
};

export default AllEventsPage;
