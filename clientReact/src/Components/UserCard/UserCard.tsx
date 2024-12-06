import { FC, useEffect, useState } from "react";
import styles from "./UserCard.module.css";
import { imgSrc } from "../../utils";
import {
  deleteUser,
  getUser,
  updateUserRole,
} from "../../services/userService";
import { useAppDispatch, useAppSelector } from "../../hooks.ts";
import { fetchUsers } from "../../store/usersSlice.ts";
import { closeModal, openModal } from "../../store/modalSlice.ts";
import ModalWindow from "../ModalWindow/ModalWindow.tsx";
import DialogMessage from "../DialogMessage/DialogMessage.tsx";
interface User {
  _id: string;
  avatarImage: string;
  fullName: string;
  email: string;
  role: string;
}

interface UserCardProps {
  user: User;
}

const UserCard: FC<UserCardProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  const [currentUser, setCurrentUser] = useState({
    role: "",
    _id: "",
  });
  const [delUser, setDelUser] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const isModalOpen = useAppSelector((state) => state.modal.isOpen);
  const selectedId = useAppSelector((state) => state.modal.selectedId);

  useEffect(() => {
    getUser(user._id).then((res) => setCurrentUser(res.data.data.user));
  }, [user._id]);
  const refreshUser = (id: string) =>
    getUser(id).then((res) => setCurrentUser(res.data.data.user));
  const newRole = currentUser.role === "admin" ? "user" : "admin";
  const btnName = `Make ${newRole[0].toUpperCase() + newRole.slice(1)}`;

  return (
    <div className={styles.adminCardContainer}>
      <img
        src={imgSrc(user.avatarImage)}
        alt={user.fullName}
        className={styles.avatarImage}
      />
      <div className={styles.infoContainer}>
        <p className={styles.fullName}>{user.fullName}</p>
        <p className={styles.email}>{user.email}</p>
      </div>
      <button
        className={`${styles.btn} ${styles.updateBtn}`}
        onClick={() => {
          setEditUser(true);
          dispatch(openModal(user._id));
        }}
      >
        {btnName}
      </button>
      <button
        className={styles.btn}
        onClick={() => {
          setDelUser(true);
          dispatch(openModal(user._id));
        }}
      >
        Delete
      </button>
      {delUser && isModalOpen && (
        <ModalWindow>
          <DialogMessage
            message="You are about to delete a user from a system. Please proceed with caution"
            btnName="Delete user"
            handleClick={() => {
              if (selectedId) {
                deleteUser(selectedId).then(() => {
                  dispatch(fetchUsers());
                  dispatch(closeModal());
                  setDelUser(false);
                });
              }
            }}
          />
        </ModalWindow>
      )}
      {editUser && isModalOpen && (
        <ModalWindow>
          <DialogMessage
            message={`You are about to ${
              currentUser.role === "admin"
                ? "downgrade a user from administrator"
                : "make a user administrator of the system"
            }. Please proceed with caution`}
            btnName={btnName}
            handleClick={() => {
              if (selectedId) {
                updateUserRole(selectedId, newRole).then(() => {
                  refreshUser(selectedId);
                  dispatch(closeModal());
                  setEditUser(false);
                });
              }
            }}
          />
        </ModalWindow>
      )}
    </div>
  );
};

export default UserCard;
