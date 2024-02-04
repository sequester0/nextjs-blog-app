import styles from './singlePost.module.css';
import Image from "next/image";

const SinglePostPage = () => {
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
        <h1 className={styles.title}>Title</h1>
        <div className={styles.detail}>
          <Image
            className={styles.avatar}
            src="https://images.pexels.com/photos/15760122/pexels-photo-15760122/free-photo-of-kent-yol-insanlar-fransa.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            width={50}
            height={50}
          />
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Author</span>
            <span className={styles.detailValue}>Terry Jefferson</span>
          </div>
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>01.01.2024</span>
          </div>
        </div>
        <div className={styles.content}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget sagittis magna, vel auctor tortor. Suspendisse id libero non diam porta scelerisque. Cras at venenatis nisl, a mollis est. Mauris mi dolor, volutpat egestas erat vel, consectetur placerat erat. Etiam nec elit a elit rhoncus vulputate in tempor magna. In est massa, aliquet id arcu id, imperdiet elementum orci. Sed aliquam porttitor neque, at viverra mi interdum tincidunt. Cras tristique volutpat felis ut scelerisque. Etiam auctor hendrerit quam. Sed lectus turpis, rutrum venenatis ligula et, porta tincidunt leo. Nunc venenatis imperdiet lorem, eget fermentum ex vulputate et. Pellentesque suscipit libero mi, et auctor lacus varius vel.
        </div>
      </div>
    </div>
  )
}

export default SinglePostPage