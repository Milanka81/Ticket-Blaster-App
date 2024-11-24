import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../Components/Input/Input";
import Title from "../../Components/Title/Title";
import styles from "./UserDetailsPage.module.css";
import { getCroppedImg, handleEmpty, imgSrc } from "../../utils";
import { useCallback, useEffect, useState } from "react";
import ReusablePasswordForm from "../../Components/ReusablePasswordForm/ReusablePasswordForm";
import {
  changePassword,
  getMyAccount,
  updateAccount,
} from "../../services/userService";
import { useAppDispatch } from "../../hooks";
import { fetchMyAccount } from "../../store/userSlice";
import Cropper from "react-easy-crop";
import { Area } from "react-easy-crop";

const UserDetailsPage = () => {
  const dispatch = useAppDispatch();
  const [showPasswordFields, setShowPasswordFieleds] = useState(false);
  const [messageAccount, setMessageAccount] = useState("");
  const [messagePassword, setMessagePassword] = useState("");
  const [account, setAccount] = useState({
    fullName: "",
    email: "",
    avatarImage: null,
  });
  useEffect(() => {
    getMyAccount().then((res) => setAccount(res.data.user));
  }, []);

  const [image, setImage] = useState<string | undefined>(undefined);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [showCropper, setShowCropper] = useState(false);

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropSave = async () => {
    if (image && croppedAreaPixels) {
      const croppedImg = await getCroppedImg(image, croppedAreaPixels);
      formik.setFieldValue("avatarImage", croppedImg);
      setShowCropper(false);
    }
  };

  const handleChangePassword = (values: {
    password: string;
    passwordConfirm: string;
  }) => {
    changePassword(values)
      .then(() => {
        setMessagePassword("Password has been changed successfully");
      })
      .catch(() => setMessagePassword("Something went wrong"));
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: account,
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full name is required"),
      email: Yup.string()
        .email("Email is not valid")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      updateAccount(values).then(() => {
        setMessageAccount("Account updated successfully");
        dispatch(fetchMyAccount());
      });
    },
  });

  console.log(formik.values.avatarImage);
  return (
    <div className={styles.container}>
      <Title>User Details</Title>

      <form
        className={styles.formContainer}
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
      >
        <div className={styles.avatarContainer}>
          <input
            name="avatarImage"
            id="avatarImage"
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />

          {formik.values.avatarImage ? (
            <img
              className={styles.avatarImage}
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
          <label
            htmlFor="avatarImage"
            className={`${styles.btn} ${styles.updateBtn}`}
          >
            Upload Avatar
          </label>
        </div>

        <div className={styles.inputErrorWrapper}>
          <Input
            name="fullName"
            type="text"
            label="Full Name"
            value={handleEmpty(formik.values.fullName)}
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
            value={handleEmpty(formik.values.email)}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <p className={styles.inputError}>{formik.errors.email}</p>
          )}
        </div>
        {showCropper && (
          <div>
            <div
              style={{
                position: "relative",
                width: "200px",
                height: "250px",
              }}
            >
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnBackground} ${styles.btnHeight}`}
              onClick={handleCropSave}
            >
              Save Crop
            </button>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnHeight}`}
              onClick={() => setShowCropper(false)}
            >
              Cancel
            </button>
          </div>
        )}
        <button
          className={`${styles.btn} ${styles.justifySelf}`}
          type="submit"
          onClick={() => {}}
        >
          Submit
        </button>
        {messageAccount && (
          <div className={styles.infoMessageContainer}>
            <p className={styles.infoMessage}>🔖 {messageAccount}</p>
          </div>
        )}
      </form>
      <div className={styles.flex}>
        <p className={styles.password}>Password</p>
        <button
          className={`${styles.btn} ${styles.btnBackground}`}
          onClick={() => setShowPasswordFieleds(() => !showPasswordFields)}
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
      {messagePassword && (
        <div className={styles.infoMessageContainer}>
          <p className={styles.infoMessage}>🔖 {messagePassword}</p>
        </div>
      )}
    </div>
  );
};

export default UserDetailsPage;
