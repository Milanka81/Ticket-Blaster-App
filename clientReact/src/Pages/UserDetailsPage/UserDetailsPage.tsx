import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../Components/Input/Input";
import Title from "../../Components/Title/Title";
import styles from "./UserDetailsPage.module.css";
import { imgSrc } from "../../utils";
import { useState } from "react";
import ReusablePasswordForm from "../../Components/ReusablePasswordForm/ReusablePasswordForm";
import { changePassword } from "../../services/userService";

const UserDetailsPage = () => {
  const [showPasswordFields, setShowPasswordFieleds] = useState(false);
  const [message, setMessage] = useState("");
  const handleChangePassword = (values: {
    password: string;
    passwordConfirm: string;
  }) => {
    changePassword(values)
      .then(() => {
        setMessage("Password has been changed successfully");
      })
      .catch(() => setMessage("Something went wrong"));
  };
  const formik = useFormik({
    initialValues: {
      avatarImage: "",
      fullName: "",
      email: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full name is required"),
      email: Yup.string()
        .email("Email is not valid")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div className={styles.container}>
      <Title>User Details</Title>

      <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
        <div className={styles.avatarContainer}>
          <input
            name="avatarImage"
            id="avatarImage"
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                formik.setFieldValue("avatarImage", file);
              }
            }}
          />
          {formik.values.avatarImage ? (
            <img
              className={styles.uploadedImage}
              src={
                typeof formik.values.avatarImage === "string"
                  ? imgSrc(formik.values.avatarImage)
                  : URL.createObjectURL(formik.values.avatarImage)
              }
              alt={formik.values.fullName}
            />
          ) : (
            <img className={styles.imagePlaceholder} />
          )}
          <button
            className={`${styles.btn} ${styles.updateBtn}`}
            onClick={() => {}}
          >
            Update Avatar
          </button>
        </div>
        <div className={styles.inputErrorWrapper}>
          <Input
            name="fullName"
            type="text"
            label="Full Name"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.fullName && formik.errors.fullName && (
            <p className={styles.inputError}>{formik.errors.fullName}</p>
          )}
        </div>

        <div className={styles.inputErrorWrapper}>
          <Input
            name="email"
            type="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <p className={styles.inputError}>{formik.errors.email}</p>
          )}
        </div>
        <button
          className={`${styles.btn} ${styles.justifySelf}`}
          type="submit"
          onClick={() => {}}
        >
          Submit
        </button>
      </form>
      <div className={styles.flex}>
        <p className={styles.password}>Password</p>
        <button
          className={`${styles.btn} ${styles.btnBackground}`}
          onClick={() => setShowPasswordFieleds(true)}
        >
          Change Password
        </button>
      </div>
      {showPasswordFields && (
        <ReusablePasswordForm
          onSubmit={handleChangePassword}
          buttonText="Submit"
          buttonClassName={styles.btn}
        />
      )}
      {message && (
        <div className={styles.infoMessageContainer}>
          <p className={styles.infoMessage}>🔖 {message}</p>
        </div>
      )}
    </div>
  );
};

export default UserDetailsPage;
