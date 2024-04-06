import styles from './blog.module.css';
import PostCard from "@/components/postCard/postCard";
import {getPosts} from "@/lib/data";

// Fetch data with an external API
// const getData = async () => {
//   const res = await fetch('http://localhost:3000/api/blog', {next:{revalidate: 3600}});
//
//   if (!res.ok) {
//     throw new Error('Network response was not ok');
//   }
//
//   return res.json();
// }

const BlogPage = async () => {
  const posts = await getPosts();

  // const posts = await getPosts();

  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div className={styles.post} key={post.id}>
          <PostCard post={post}/>
        </div>
      ))}
    </div>
  )
}

export default BlogPage;