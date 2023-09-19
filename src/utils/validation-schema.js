import * as yup from "yup";

export const PostValidation = yup.object({
  title: yup.string().max(30),
  hashtag: yup.string().max(30),
  music: yup.string().max(50),
});
