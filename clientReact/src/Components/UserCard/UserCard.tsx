import { FC } from "react";
import styles from "./UserCard.module.css";
import { imgSrc } from "../../utils";
import { updateUserRole } from "../../services/userService";
import { useAppDispatch } from "../../hooks.ts";
import { fetchUsers } from "../../store/usersSlice.ts";
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
  const handleUpdateRole = (userId: string, newRole: string) => {
    updateUserRole(userId, newRole).then(() => dispatch(fetchUsers()));
  };
  const newRole = user.role === "admin" ? "user" : "admin";
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
        onClick={() => handleUpdateRole(user._id, newRole)}
      >
        {btnName}
      </button>
      <button className={styles.btn} onClick={() => {}}>
        Delete
      </button>
    </div>
  );
};

export default UserCard;
