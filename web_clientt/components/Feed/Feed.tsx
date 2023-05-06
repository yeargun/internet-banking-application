import styles from "../../styles/Feed.module.css";
import Post from "./../Post/Post";
import recommendedPosts from "../../styles/RecommendedPosts.json";
function Feed() {
  return (
    <div className={styles.feedWrapper}>
      <ul>
        {recommendedPosts.map((post) => (
          <li key={post.id}>
            <Post highlightedComment={""} {...post} />
            <br />
            <br />
            <br />
            <br />
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Feed;
