import styles from "./DialogMessage.module.css";

interface DialogProps {
  message: string;
  btnName: string;
  handleClick: () => void;
  handleCancel: () => void;
}
const DialogMessage = ({
  message,
  btnName,
  handleClick,
  handleCancel,
}: DialogProps) => {
  return (
    <div className={styles.dialogContainer}>
      <p className={styles.title}>Are you sure?</p>
      <p className={styles.message}>{message}</p>
      <div className={styles.btnsContainer}>
        <button className={styles.btnCancel} onClick={handleCancel}>
          Cancel
        </button>
        <button className={styles.btnSubmit} onClick={handleClick}>
          {btnName}
        </button>
      </div>
    </div>
  );
};

export default DialogMessage;
