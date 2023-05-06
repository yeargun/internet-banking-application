import styles from "../styles/uploadQuestion.module.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import TagInput from "components/TagInput";
import ImageUploader from "components/ImageUploader";
import { useUploadQuestionMutation } from "features/question/questionApiSlice";
// import { storage } from "../utils/firebase";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// TODO: Enterla yeni şık eklemeye geçsin
// TODO: Before upload popup should open and ask user if he wants to add tags
// for the question. should mention non required.
const markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`;
const firstChoicesUuid = uuidv4();
function UploadQuestion() {
  const [questionText, setQuestionText] = useState(markdown);

  // string keys remain insertion order es2015 so we can use key: text yes?
  const [choices, setChoices] = useState({ [firstChoicesUuid]: "" });
  const [currentlyEditingChoiceId, setCurrentlyEditingChoiceId] =
    useState(firstChoicesUuid);

  const [currentlyEditingChoiceStr, setCurrentlyEditingChoiceStr] =
    useState("");
  const [imageURLs, setImageURLs] = useState([]);
  const [imagesAreSelected, setImagesAreSelected] = useState(false);
  const [shouldStartUploadingImages, setShouldStartUploadingImages] =
    useState(false);
  const [correctChoiceKey, setCorrectChoiceKey] = useState(undefined);
  const [explanationText, setExplanationText] = useState();

  useEffect(() => {
    // means question data is ready to get uploaded with imageurls
    if (imageURLs.length > 0) {
      uploadQuestion({
        questionText,
        choices: Object.values(choices),
        rightChoice: getChoiceIndexByKey(correctChoiceKey),
        imageURLs: imageURLs,
        explanation: explanationText,
      });
    }
  }, [imageURLs]);

  const getChoiceIndexByKey = (key) => {
    const keys = Object.keys(choices);
    return keys.indexOf(key);
  };

  const [uploadQuestion, { isLoading }] = useUploadQuestionMutation();
  const dispatch = useDispatch();

  const questionTextChangeHandler = (e) => {
    setQuestionText(e.target.value);
  };

  const handleEditingChoiceStrChange = (e) => {
    setCurrentlyEditingChoiceStr(e.target.value);
  };

  const handleSetImageURLs = (imageURLs) => {
    setImageURLs((prevState) => imageURLs);
  };

  const handleSaveEditedChoice = (key) => {
    setChoices((prevState) => ({
      ...prevState,
      [key]: currentlyEditingChoiceStr,
    }));
    setCurrentlyEditingChoiceStr("");
    setCurrentlyEditingChoiceId(undefined);
  };

  const handleDiscardEditedChoice = (key) => {
    setCurrentlyEditingChoiceId(undefined);
    setCurrentlyEditingChoiceStr("");
  };

  const handleChoiceEditButtonPress = (key, text) => {
    setCurrentlyEditingChoiceStr(text);
    setCurrentlyEditingChoiceId(key);
  };

  const addAnotherChoice = () => {
    let uuid = uuidv4();
    setChoices((prevState) => ({
      ...prevState,
      [uuid]: "",
    }));
    setCurrentlyEditingChoiceId(uuid);
  };

  const removeChoiceWithKey = (key) => {
    const updatedObject = { ...choices };
    delete updatedObject[key];
    setChoices(updatedObject);
  };

  const handleUploadQuestion = () => {
    console.log("upload question");
    if (Object.entries(choices).length > 0 && questionText) {
      console.log("@@images are selcted?", imagesAreSelected);
      //formikwho?
      if (imagesAreSelected) setShouldStartUploadingImages(true);
      else if (correctChoiceKey == undefined) {
        //warn you should select right choice
        console.log("warn you should select right choice");
      } else {
        uploadQuestion({
          questionText,
          choices,
          rightChoice: 1,
          imageURLs,
        });
      }
    }
  };

  const currentlySelectedChoice = (key, text) => (
    <div key={key} className={styles.editingChoiceStrMdWrapper}>
      <textarea
        placeholder="enter the choice.."
        className={styles.editingChoiceStrInput}
        value={currentlyEditingChoiceStr}
        onChange={handleEditingChoiceStrChange}
      />
      <div className={styles.editingChoiceMdWrapper}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {currentlyEditingChoiceStr}
        </ReactMarkdown>

        {/* this should be check mark and close editing button */}
        <div className={styles.editingChoiceButtons}>
          <button
            className={styles.saveEditedChoiceButton}
            onClick={(e) => handleSaveEditedChoice(key)}
          >
            <Image
              className={styles.checkIcon}
              draggable={false}
              src={"/check-icon.svg"}
              alt={"check-icon"}
              width={10}
              height={10}
            />
          </button>
          <button
            className={styles.discardChangesEditedChoice}
            onClick={(e) => handleDiscardEditedChoice(key)}
          >
            x
          </button>
        </div>
      </div>
    </div>
  );

  const openedExplanation = () => (
    <div key={key} className={styles.editingChoiceStrMdWrapper}>
      <textarea
        placeholder="enter the choice.."
        className={styles.editingChoiceStrInput}
        value={explanationText}
        onChange={handleEditingChoiceStrChange}
      />
      <div className={styles.editingChoiceMdWrapper}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {explanationText}
        </ReactMarkdown>

        {/* this should be check mark and close editing button */}
        <div className={styles.editingChoiceButtons}>
          <button
            className={styles.saveEditedChoiceButton}
            onClick={(e) => handleSaveEditedChoice(key)}
          >
            <Image
              className={styles.checkIcon}
              draggable={false}
              src={"/check-icon.svg"}
              alt={"check-icon"}
              width={10}
              height={10}
            />
          </button>
          <button
            className={styles.discardChangesEditedChoice}
            onClick={(e) => handleDiscardEditedChoice(key)}
          >
            x
          </button>
        </div>
      </div>
    </div>
  );

  const handleSetImagesAreSelected = (bool) => {
    setImagesAreSelected((prevState) => bool);
    console.log("imagesAreSelected?", imagesAreSelected);
  };

  const handleCorrectChoiceChange = (key) => {
    if (key === correctChoiceKey) setCorrectChoiceKey(undefined);
    else setCorrectChoiceKey(key);
  };

  const correctChoiceStyling = (key) => {
    if (key === correctChoiceKey) return styles.correctChoice;
    else return styles.addedChoice;
  };

  const explanationTextChangeHandler = (e) => {
    setExplanationText(e.target.value);
  };

  return (
    <div className={styles.page}>
      <h1 style={{ margin: "45px 0px 2px 0px" }}></h1>
      <div className={styles.str2mdTable}>
        <div className={styles.tabs}>
          <div className={styles.strTab}>Question-text</div>
          <div className={styles.mdTab}>markdown</div>
        </div>
        <hr />
        <div className={styles.contents}>
          <textarea
            value={questionText}
            className={styles.textContent}
            placeholder="enter text..."
            onChange={questionTextChangeHandler}
          />
          <div className={styles.mdContent}>
            {/* sdfsdff */}
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {questionText}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      <ImageUploader
        shouldStartUploadingImages={shouldStartUploadingImages}
        setImageURLs={handleSetImageURLs}
        setImagesAreSelected={handleSetImagesAreSelected}
      />

      <div className={styles.choices}>
        {Object.entries(choices).map(([key, value]) => {
          if (key == currentlyEditingChoiceId) {
            return currentlySelectedChoice(key, value);
          } else
            return (
              <div
                onClick={(e) => handleCorrectChoiceChange(key)}
                className={styles.choiceAndTrueFalseWrapper}
              >
                <input
                  style={{ marginTop: 0, marginBottom: 0 }}
                  name="correct-choice"
                  type="radio"
                  checked={correctChoiceKey === key}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleCorrectChoiceChange(key);
                  }}
                />
                <div onClick={() => {}} className={correctChoiceStyling(key)}>
                  <ReactMarkdown
                    className={styles.addedChoiceMdContent}
                    remarkPlugins={[remarkGfm]}
                  >
                    {value}
                  </ReactMarkdown>
                  <div className={styles.addedChoiceButtons}>
                    <button
                      className={styles.editAddedChoiceButton}
                      onClick={(e) => {
                        e.stopPropagation(); // Stop the event from bubbling up to the parent div
                        handleChoiceEditButtonPress(key, value);
                      }}
                    >
                      <Image
                        className={styles.editIcon}
                        draggable={false}
                        src={"/edit-icon.svg"}
                        alt={"edit-icon"}
                        width={10}
                        height={10}
                      />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeChoiceWithKey(key);
                      }}
                      className={styles.removeAddedChoiceButton}
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            );
        })}
        <div
          className={styles.addExtraChoiceWrapper}
          onClick={addAnotherChoice}
        >
          Add another choice..
        </div>
      </div>

      <div className={styles.explanationStr2md}>
        <div className={styles.explanationTableTitle}>
          explanation(recommended)
        </div>

        <hr />
        <div className={styles.explanationContents}>
          <textarea
            value={explanationText}
            className={styles.explanationTextContent}
            placeholder="enter text..."
            onChange={explanationTextChangeHandler}
          />
          <div className={styles.explanationMdContent}>
            {/* sdfsdff */}
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {explanationText}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      {/* <TagInput className={styles.questionTags} /> */}
      <button className={styles.uploadButton} onClick={handleUploadQuestion}>
        Upload
      </button>
    </div>
  );
}

export default UploadQuestion;
