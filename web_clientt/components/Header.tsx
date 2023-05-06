import styles from "../styles/Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function Header() {
  const [onHoverProfile, setOnHoverProfile] = useState<boolean>(false);
  const [onHoverUpload, setOnHoverUpload] = useState<boolean>(false);

  return (
    <div className={styles.headerWrapper}>
      {/* <Link
        href="/upload"
        onMouseOver={(e) => setOnHoverProfile(true)}
        onMouseOut={(e) => setOnHoverProfile(false)}
        className={styles.wrapperLink}
      >
        {onHoverProfile ? (
          <h3 className={styles.onHoverText}>Upload</h3>
        ) : (
          <Image
            className={styles.headerIcon + "profile"}
            src={"/settings-icon.png"}
            alt={"settings-icon"}
            width={40}
            height={40}
          />
        )}
      </Link>
      <Link
        href="/upload"
        onMouseOver={(e) => setOnHoverProfile(true)}
        onMouseOut={(e) => setOnHoverProfile(false)}
        className={styles.wrapperLink}
      >
        {onHoverProfile ? (
          <h3 className={styles.onHoverText}>Upload</h3>
        ) : (
          <Image
            className={styles.headerIcon + "profile"}
            src={"/settings-icon.png"}
            alt={"settings-icon"}
            width={40}
            height={40}
          />
        )}
      </Link> */}
      <Link
        href="/uploadQuestion"
        onMouseOver={(e) => setOnHoverUpload(true)}
        onMouseOut={(e) => setOnHoverUpload(false)}
        className={styles.wrapperLink}
        draggable={false}
      >
        <div className={styles.iconAndTextWrapper}>
          {onHoverUpload ? (
            <h3 className={styles.onHoverText}>Upload</h3>
          ) : (
            <Image
              draggable={false}
              className={styles.headerIcon}
              src={"/upload-icon.png"}
              alt={"upload-icon"}
              width={50}
              height={40}
            />
          )}
        </div>
      </Link>
      <Link
        draggable={false}
        href="/profile"
        onMouseOver={(e) => setOnHoverProfile(true)}
        onMouseOut={(e) => setOnHoverProfile(false)}
        className={styles.wrapperLink}
      >
        <div className={styles.iconAndTextWrapper}>
          {onHoverProfile ? (
            <h3 className={styles.onHoverText}>Profile</h3>
          ) : (
            <Image
              draggable={false}
              className={styles.headerIcon}
              src={"/profile-icon.png"}
              alt={"profile-icon"}
              width={40}
              height={40}
            />
          )}
        </div>
      </Link>
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
