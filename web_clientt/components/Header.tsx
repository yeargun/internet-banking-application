import styles from "../styles/Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function Header() {
  const [onHoverProfile, setOnHoverProfile] = useState<boolean>(false);
  const [onHoverUpload, setOnHoverUpload] = useState<boolean>(false);

  return (
    <div className={styles.headerWrapper}>
      <h1>Bank24 | "Banking made easy" </h1>
    </div>
  );
}

export default Header;

{
  /* <Stack direction="row" spacing={2}> */
}
{
  /* <IconButton
          className={styles.iconButton}
          size="large"
          aria-label="delete"
          id="1"
        >
          <PersonRoundedIcon />
        </IconButton>
        <IconButton className={styles.iconButton} aria-label="delete" id="2">
          <PersonRoundedIcon />
        </IconButton>
        <IconButton className={styles.iconButton} aria-label="delete" id="3">
          <UploadRoundedIcon />
        </IconButton>
        <IconButton
          className={styles.iconButton}
          size="large"
          aria-label="Profile"
          id="4"
        >
          <PersonRoundedIcon size="large" />
        </IconButton> */
}
{
  /* </Stack> */
}
