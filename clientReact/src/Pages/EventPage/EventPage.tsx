import { useEffect, useState, FC } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import Title from "../../Components/Title/Title";
import styles from "./EventPage.module.css";
import Input from "../../Components/Input/Input";
import { getEvent, postEvent, updateEvent } from "../../services/eventService";
import { useParams } from "react-router";
import { handleEmpty, imgSrc } from "../../utils";
import { useAppDispatch } from "../../hooks.ts";
import { filteredEvents } from "../../store/eventsSlice.ts";
type EventPageProps = {
  componentState: "add" | "edit";
};
const EventPage: FC<EventPageProps> = ({ componentState }) => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [event, setEvent] = useState({
    eventName: "",
    category: "",
    ticketPrice: "",
    totalTickets: "",
    description: "",
    imageCover: null,
    location: "",
    eventDate: "",
  });
  const formattedDate = event.eventDate?.slice(0, 10);

  useEffect(() => {
    if (eventId) {
      getEvent(eventId).then((res) => {
        if (res.data.data.event) {
          setEvent(res.data.data.event);
        }
      });
    }
  }, [eventId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: event,
    onSubmit: (values) => {
      switch (componentState) {
        case "add":
          postEvent(values)
            .then(() => navigate("/"))
            .catch((err) => console.log(err));
          break;
        case "edit":
          if (eventId && typeof values.imageCover === "string") {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { imageCover, ...data } = values;
            updateEvent(eventId, data).then(() => {
              dispatch(
                filteredEvents({
                  page: 1,
                  limit: 10,
                  input: "",
                  category: "",
                })
              );
              navigate(-1);
            });
          }
          if (
            eventId &&
            values.imageCover &&
            typeof values.imageCover === "object"
          ) {
            updateEvent(eventId, values).then(() => {
              dispatch(
                filteredEvents({
                  page: 1,
                  limit: 10,
                  input: "",
                  category: "",
                })
              );
              navigate(-1);
            });
          }
          break;
        default:
          navigate("/");
          break;
      }
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
            value={handleEmpty(formik.values.eventName)}
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
            value={handleEmpty(formik.values.category)}
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
            id="eventDate"
            name="eventDate"
            type="date"
            value={
              componentState === "add" ? formik.values.eventDate : formattedDate
            }
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
              src={
                typeof formik.values.imageCover === "string"
                  ? imgSrc(formik.values.imageCover)
                  : URL.createObjectURL(formik.values.imageCover)
              }
              alt={formik.values.eventName}
            />
          ) : (
            <img className={styles.imagePlaceholder} />
          )}

          {componentState === "edit" &&
            typeof formik.values.imageCover !== "string" && (
              <button
                className={styles.btnBack}
                onClick={() => {
                  formik.setFieldValue("imageCover", event.imageCover);
                }}
              >
                Drop image
              </button>
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
            value={handleEmpty(formik.values.description)}
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
            value={handleEmpty(formik.values.ticketPrice)}
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
            value={handleEmpty(formik.values.totalTickets)}
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
            value={handleEmpty(formik.values.location)}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.location && formik.errors.location && (
            <p className={styles.inputError}>{formik.errors.location}</p>
          )}
        </div>
        <div className={styles.flexDiv}>
          <button className={styles.btnAdd} type="submit">
            Save
          </button>
          <button
            className={styles.btnBack}
            type="button"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventPage;
