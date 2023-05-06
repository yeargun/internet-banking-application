import styles from "../../styles/HeaderLeft.module.css";
function HeaderLeft() {
  return (
    <div className={styles.headerWrap}>
      <div className={styles.tabs}>
        <ul>
          <li>Profile</li>
          <li>Search</li>
          <li>Bookmarks</li>
          <li>Messages</li>
          <li>More</li>
        </ul>
      </div>
      <header>asdas</header>
    </div>
  );
}

export default HeaderLeft;
