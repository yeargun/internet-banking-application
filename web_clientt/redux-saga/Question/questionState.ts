// import { createSlice } from "@reduxjs/toolkit";

// export const questionSlice = createSlice({
//   name: "question",
//   initialState: {
//     question: undefined,
//     isLoadingQuestion: false,
//     isLoadingAnswer: false,
//     rightChoiceId: undefined,
//     explanation: undefined,
//   },
//   reducers: {
//     // ####
//     getQuestionFetch: (state) => {
//       state.isLoadingQuestion = true;
//     },
//     getQuestionSuccess: (state, action) => {
//       state.question = action.payload;
//       state.isLoadingQuestion = false;
//       state.rightChoiceId = undefined;
//       state.explanation = undefined;
//     },
//     getQuestionError: (state) => {
//       state.isLoadingQuestion = false;
//     },
//     // ####
//     answerQuestionFetch: (state) => {
//       state.isLoadingAnswer = true;
//     },
//     answerQuestionSuccess: (state, action) => {
//       state.rightChoiceId = action.payload.rightChoiceId;
//       state.explanation = action.payload.explanation;
//       state.isLoadingAnswer = false;
//     },
//     answerQuestionError: (state) => {
//       state.isLoadingAnswer = false;
//     },
//     // ####
//   },
// });

// export const {
//   getQuestionFetch,
//   getQuestionError,
//   getQuestionSuccess,
//   answerQuestionError,
//   answerQuestionFetch,
//   answerQuestionSuccess,
// } = questionSlice.actions;

// export default questionSlice.reducer;
