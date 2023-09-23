import * as yup from "yup";

export const PostValidation = yup.object({
  title: yup.string().max(30),
  hashtag: yup.string().max(30),
  music: yup.string().max(50),
});

export const CmtValidation = yup.object({
  content: yup.string().max(150),
});

export const ProfileInfoValidation = yup.object({
  slug: yup
    .string()
    .transform((value) => (value ? value.trim() : value))
    .min(3)
    .max(20)
    .required("Please enter your Tiktok ID"),
  username: yup
    .string()
    .transform((value) => (value ? value.trim() : value))
    .min(3)
    .max(30)
    .required("Please enter your username"),
  bio: yup.string().max(80),
});
