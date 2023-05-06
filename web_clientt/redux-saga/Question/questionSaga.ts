// import Question from "components/Question/Question";
// import { call, put, takeEvery, all, take, fork } from "redux-saga/effects";
// import { ARGUN } from "utils/api/axios";
// import {
//   answerQuestionSuccess,
//   getQuestionSuccess,
//   getQuestionError,
//   answerQuestionError,
// } from "./questionState";

// // takeEvery (actionType, saga) spawns a saga on each action dispatched to the store that matches actionType, e.g., FETCH_USER_DETAILS
// // call (fn, …args) creates an effect description that instructs the middleware to call the function fn with args as arguments, if any
// // put: (action) creates an effect description that instructs the middleware to schedule the dispatching of an action to the store

// function* workGetQuestionFetch() {
//   try {
//     const question: Question = yield call(() => ARGUN.get("/question/next"));
//     const formattedQuestion = yield question.json();
//     yield put(getQuestionSuccess(formattedQuestion));
//   } catch (error) {
//     yield put(getQuestionError(error));
//   }
// }

// function* workAnswerQuestionFetch() {
//   try {
//     const answer = yield call(() =>
//       ARGUN.post("/question/sendAnswer", { questionId: 1, choosenChoiceId: 1 })
//     );
//     const formattedAnswer = yield answer.json();
//     yield put(answerQuestionSuccess(formattedAnswer));
//   } catch (error) {
//     yield put(answerQuestionError(error));
//   }
// }

// // export function* questionSaga() {
// //   yield takeEvery("question/getQuestionFetch", workGetQuestionFetch);
// //   yield takeEvery("question/answerQuestionFetch", workAnswerQuestionFetch);
// // }

// export function* getQuestionSaga() {
//   yield takeEvery("question/getQuestionFetch", workGetQuestionFetch);
// }

// export function* sendAnswerSaga() {
//   yield takeEvery("question/answerQuestionFetch", workAnswerQuestionFetch);
// }

// // export const questionSagas = [
// //   takeEvery("question/getQuestionFetch", workGetQuestionFetch),
// //   takeEvery("question/answerQuestionFetch", workAnswerQuestionFetch),
// // ];

// export function* rootSaga() {
//   yield all([fork(sendAnswerSaga), fork(getQuestionSaga)]);
// }
