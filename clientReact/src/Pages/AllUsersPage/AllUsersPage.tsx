import Title from "../../Components/Title/Title.tsx";
import { useEffect } from "react";
import styles from "./AllUsersPage.module.css";
import UserCard from "../../Components/UserCard/UserCard.tsx";
import { useAppDispatch, useAppSelector } from "../../hooks.ts";
import { fetchUsers } from "../../store/usersSlice.ts";
interface User {
  _id: string;
  avatarImage: string;
  fullName: string;
  email: string;
  role: string;
}
const AllUsersPage = () => {
  const dispatch = useAppDispatch();
  const users: User[] = useAppSelector((state) => state.loggedUsers.users);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.flexContainer}>
        <Title>Users</Title>
      </div>
      <div className={styles.searchContainer}>
        {users.map((el) => (
          <UserCard key={el._id} user={el} />
        ))}
      </div>
    </div>
  );
};

export default AllUsersPage;
