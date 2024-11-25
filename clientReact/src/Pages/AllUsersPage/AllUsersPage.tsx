import Title from "../../Components/Title/Title.tsx";
import { useEffect, useState } from "react";
import styles from "./AllUsersPage.module.css";
import { getAllUsers } from "../../services/userService/index.tsx";
import UserCard from "../../Components/UserCard/UserCard.tsx";
interface User {
  _id: string;
  avatarImage: string;
  fullName: string;
  email: string;
  role: string;
}
const AllUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getAllUsers().then((res) => setUsers(res.data.users));
  }, []);

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
