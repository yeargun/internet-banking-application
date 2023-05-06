import { apiSlice } from "utils/api/apiSlice";
export const questionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendAnswer: builder.mutation({
      query: (answerDetails) => ({
        url: "/question/sendAnswer",
        method: "POST",
        body: { ...answerDetails },
      }),
    }),
    getNextQuestion: builder.mutation({
      query: (credentials) => ({
        url: "/question/next",
        method: "GET",
      }),
    }),
    uploadQuestion: builder.mutation({
      query: (questionData) => ({
        url: "/question/upload",
        method: "POST",
        body: { ...questionData },
      }),
    }),
  }),
});

export const {
  useSendAnswerMutation,
  useGetNextQuestionMutation,
  useUploadQuestionMutation,
} = questionApiSlice;
