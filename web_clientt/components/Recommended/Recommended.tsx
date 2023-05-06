import styles from "../../styles/Recommended.module.css";

function Recommended() {
  return (
    <div className={styles.recommendedWrapper}>
      <h1>accounts/tags we recommend:</h1>
      <ul>
        <li>acc1</li>
        <li>acc2</li>
        <li>acc3</li>
      </ul>
    </div>
  );
}

export default Recommended;
