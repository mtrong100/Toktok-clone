import useUploadVideo from "../hooks/useUploadVideo";
import React, { useState } from "react";
import Input from "../components/form/Input";
import Dropdown from "../components/form/Dropdown";
import Button from "../components/button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { ToastConfig } from "../constants/constants";
import { PostValidation } from "../utils/validation-schema";
import { HiMusicalNote } from "react-icons/hi2";
import { HiHashtag } from "react-icons/hi";
import { FcUpload } from "react-icons/fc";
import UploadingGif from "/uploading.gif";
import { db } from "../utils/firebase-app";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import slugify from "slugify";
import { toast } from "react-toastify";
import { useEffect } from "react";
/* ====================================================== */

const UploadPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: yupResolver(PostValidation),
    defaultValues: {
      title: "",
      hashtag: "",
      music: "",
    },
  });
  const { video, setVideo, progress, selectFile } = useUploadVideo();
  const [selected, setSelected] = useState("Public");

  /* Add new post */
  const handleAddPost = async (values) => {
    if (!isValid || !video) return;

    try {
      const postRef = collection(db, "posts");
      const postDocRef = await addDoc(postRef, {
        video: video,
        type: selected,
        slug: slugify(values.title, { lower: true }),
        userId: currentUser?.userId,
        createdAt: serverTimestamp(),
        ...values,
      });

      await updateDoc(postDocRef, {
        postId: postDocRef.id,
      });

      setVideo("");
      setSelected("Public");
      reset({ title: "", hashtag: "", music: "" });

      toast.success("New video added", ToastConfig);
    } catch (error) {
      console.log(error);
    }
  };

  const discardPost = async () => {
    setVideo("");
    setSelected("Public");
    reset({ title: "", hashtag: "", music: "" });
  };

  // FIX SCROLL BUG
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section className="w-full max-w-5xl p-5 mx-auto rounded-md shadow-xl bg-CharcoalGray">
      <h1 className="text-2xl font-semibold text-whit">Upload video</h1>
      <p className="mt-2 font-normal opacity-80">
        Post a video to your account
      </p>

      {/* Video display */}
      <div className="flex items-start justify-between gap-10 my-5">
        {video ? (
          <div
            className={`${
              video ? "bg-primaryGradient" : ""
            } relative border-[8px] border-black shadow-xl rounded-xl`}
          >
            <video
              controls
              loop
              autoPlay
              muted
              src={video}
              className="w-[281px] h-[500px] rounded-sm "
            />
          </div>
        ) : (
          <label
            className={`flex flex-col  cursor-pointer  items-center justify-center  rounded-md border border-dashed p-5 border-DimeGray hover:bg-MidnightGray min-h-[500px] w-full max-w-[300px]`}
          >
            {!video && progress === 0 && (
              <React.Fragment>
                <input
                  onChange={selectFile}
                  type="file"
                  className="hidden-input"
                />
                <span className="text-4xl">
                  <FcUpload />
                </span>
                <p className="mt-3">Upload your file</p>
              </React.Fragment>
            )}

            {!video && progress !== 0 && (
              <React.Fragment>
                <div className="text-xl font-semibold text-center text-Crimson">
                  {Math.round(progress)}%
                </div>
                <div className="w-20 h-20 mt-3">
                  <img
                    src={UploadingGif}
                    className="img-cover"
                    alt="uploading"
                  />
                </div>
              </React.Fragment>
            )}
          </label>
        )}

        <form
          onSubmit={handleSubmit(handleAddPost)}
          className="flex flex-col flex-1 w-full gap-5"
        >
          <Input
            name="title"
            error={errors.title}
            register={register}
            placeholder="Enter your title..."
          />

          <Input
            name="hashtag"
            error={errors.hashtag}
            register={register}
            placeholder="Hashtag: #tiktok #trending #hot...."
          >
            <HiHashtag size={20} />
          </Input>

          <Input
            name="music"
            error={errors.music}
            register={register}
            placeholder="Music: Perfect - Ed Sheeran"
          >
            <HiMusicalNote size={20} />
          </Input>

          <section className="my-2">
            <h3 className="font-medium opacity-90">
              Who can watch this video?
            </h3>
            <Dropdown selected={selected} setSelected={setSelected} />
          </section>

          <section className="flex items-center gap-5 mt-5">
            <Button
              onClick={discardPost}
              variant="bordered"
              isLoading={isSubmitting}
              className="h-[49px] w-[164px] text-white border-DimeGray hover:bg-MainDark hover:bg-opacity-100"
            >
              Discard
            </Button>
            <Button
              isLoading={isSubmitting}
              type="submit"
              variant="solid"
              className="h-[48px] w-[164px] text-white"
            >
              Post
            </Button>
          </section>
        </form>
      </div>
    </section>
  );
};

export default UploadPage;
