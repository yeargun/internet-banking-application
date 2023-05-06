import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
  name: "question",
  initialState: {
    rightChoiceId: undefined,
    explanation: undefined,
    questionId: undefined,
    questionText: undefined,
    choices: undefined,
    concepts: undefined,
  },
  reducers: {
    // ####
    setNextQuestion: (state, action) => {
      state.choices = action.payload.choices;
      state.questionText = action.payload.questionText;
      state.questionId = action.payload.questionId;
      state.explanation = undefined;
      state.rightChoiceId = undefined;
    },
    // ####
    setRightQuestionDetails: (state, action) => {
      const { rightChoiceId, explanation } = action.payload;
      state.rightChoiceId = rightChoiceId;
      state.explanation = explanation;
    },
    // ####
  },
});

export const { setNextQuestion, setRightQuestionDetails } =
  questionSlice.actions;
export default questionSlice.reducer;

export const selectQuestion = (state) => state.question;
export const selectAnswerData = (state) => {
  return {
    explanation: state.question.explanation,
    rightChoiceId: state.question.rightChoiceId,
  };
};
