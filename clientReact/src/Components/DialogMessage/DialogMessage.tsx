import { useAppDispatch } from "../../hooks";
import { closeModal } from "../../store/modalSlice";
import styles from "./DialogMessage.module.css";

interface DialogProps {
  message: string;
  btnName: string;
  handleClick: () => void;
}
const DialogMessage = ({ message, btnName, handleClick }: DialogProps) => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.dialogContainer}>
      <p className={styles.title}>Are you sure?</p>
      <p className={styles.message}>{message}</p>
      <div className={styles.btnsContainer}>
        <button
          className={styles.btnCancel}
          onClick={() => dispatch(closeModal())}
        >
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
