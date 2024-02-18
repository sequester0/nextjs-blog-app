import styles from './singlePost.module.css';
import Image from "next/image";
import PostUser from "@/components/postUser/postUser";
import {Suspense} from "react";
import {getPost} from "@/lib/api";

// Fetch data with API
// const getData = async (slug) => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`);
//
//   if (!res.ok) {
//     throw new Error('Network response was not ok');
//   }
//
//   return res.json();
// }

const SinglePostPage = async ({params}) => {

  const {slug} = params;
  // const post = await getData(slug);
  const post = await getPost(slug);
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src="https://images.pexels.com/photos/15760122/pexels-photo-15760122/free-photo-of-kent-yol-insanlar-fransa.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
          fill
          className={styles.image}
        />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post?.title}</h1>
        <div className={styles.detail}>
          <Image
            className={styles.avatar}
            src="https://images.pexels.com/photos/15760122/pexels-photo-15760122/free-photo-of-kent-yol-insanlar-fransa.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            width={50}
            height={50}
          />
          {post && (
            <Suspense fallback={<div>Loading...</div>}>
              <PostUser userId={post.userId}/>
            </Suspense>
          )}
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>01.01.2024</span>
          </div>
        </div>
        <div className={styles.content}>
          {post.body}
        </div>
      </div>
    </div>
  )
}

export default SinglePostPage