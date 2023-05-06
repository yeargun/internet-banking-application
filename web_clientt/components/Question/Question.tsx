import ConceptSection from "components/ConceptSection/ConceptSection";
import QuestionCard from "components/QuestionCard/QuestionCard";
import styles from "../../styles/Question.module.css";

interface Question {
  questionText: string;
  //cdn man :ok:
  imageUrl: string;
  choices: string[];
  concepts: string[];
  explanation: string | undefined;
  rightChoiceId: number | undefined;
  questionId: string | undefined;
  // discussion section opens after client answers the question
  // further content<T> is provided about explanation from the question creator
  // maybe markdown? Is Okay.

  // also even custom html,js? can be provided from the question asker.
  // dom purify?, security issues will arise
}

function Question(props: Question) {
  return (
    <div className={styles.question}>
      <ConceptSection concepts={props.concepts} />
      <QuestionCard {...props} />
    </div>
  );
}

export default Question;
