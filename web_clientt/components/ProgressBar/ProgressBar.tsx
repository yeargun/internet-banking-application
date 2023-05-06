import styles from "../../styles/ProgressBar.module.css";

interface ProgressBarProps {
  percent: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percent }) => {
  const progressBarStyles = {
    width: `${percent}%`,
  };

  return (
    <div className={styles.progressBarContainer}>
      <div className={styles.progressBar} style={progressBarStyles}></div>
      <div className={styles.progressBarPercent}>{percent}%</div>
    </div>
  );
};

export default ProgressBar;
