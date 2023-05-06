import ProgressBar from "components/ProgressBar/ProgressBar";
import styles from "../../styles/ConceptSection.module.css";

interface ConceptSection {
  concepts: string[];
}

function ConceptSection({ concepts: concepts }: ConceptSection) {
  const conceptsString = concepts
    .map((concept) => `${concept}, `)
    .join(" ")
    .slice(0, -2);

  return (
    <>
      <div className={styles.concepts}>
        <header className={styles.conceptsText}>{conceptsString}</header>
        <ProgressBar percent={50} />
      </div>
      <br />
    </>
  );
}

export default ConceptSection;
