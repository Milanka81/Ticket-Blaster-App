import { createPortal } from "react-dom";
import styles from "./ModalWindow.module.css";
interface ModalProps {
  children: React.ReactNode;
}
const ModalWindow = ({ children }: ModalProps) => {
  return createPortal(
    <div>
      <div className={styles.modal}>{children}</div>
    </div>,
    document.body
  );
};

export default ModalWindow;
