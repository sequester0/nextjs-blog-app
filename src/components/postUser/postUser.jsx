import styles from "./postUser.module.css";
import {getUser} from "@/lib/api";

// const getData = async (userId) => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {cache: "no-store"});
//
//   if (!res.ok) {
//     throw new Error('Network response was not ok');
//   }
//
//   return res.json();
// }

const PostUser = async ({userId}) => {
  // const user = await getData(userId);
  const user = await getUser(userId);
  return (
    <div className={styles.container}>
      <span className={styles.title}>Author</span>
      <span className={styles.username}>{user.userName}</span>
    </div>
  );
};

export default PostUser;