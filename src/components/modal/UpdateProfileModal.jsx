import { IoClose } from "react-icons/io5";
import { Fragment } from "react";
import { FcGoogle } from "react-icons/fc";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import Input from "../form/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { AiOutlineEdit } from "react-icons/ai";
import Button from "../button/Button";
import { ProfileInfoValidation } from "../../utils/validation-schema";
import useUploadImage from "../../hooks/useUploadImage";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useQuerySnapshot from "../../hooks/useQuerySnapshot";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase-app";
import { toast } from "react-toastify";
import { ToastConfig } from "../../constants/constants";
import slugify from "slugify";
/* =================================================================== */

export default function UpdateProfileModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { photo, setPhoto, progress, handleSelectImage } = useUploadImage();
  const { data: user } = useQuerySnapshot(
    "users",
    "userId",
    currentUser?.userId
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: yupResolver(ProfileInfoValidation),
    defaultValues: {
      slug: "",
      username: "",
      bio: "",
    },
  });

  /* Reset */
  useEffect(() => {
    setPhoto(user?.photoURL);
    reset({
      slug: user?.slug,
      username: user?.username,
      bio: user?.bio || "",
    });
  }, [reset, setPhoto, user?.bio, user?.photoURL, user?.slug, user?.username]);

  const updateProfile = async (values) => {
    if (!isValid) return;
    if (!currentUser?.userId) {
      navigate("/");
    }

    try {
      const userDoc = doc(db, "users", currentUser?.userId);
      await updateDoc(userDoc, {
        photoURL: photo,
        slug: slugify(values.slug, { lower: true }),
        ...values,
      });

      setPhoto("");
      reset({
        slug: "",
        username: "",
        bio: "",
      });
      onClose();
      navigate("/");
      toast.success("Updated!", ToastConfig);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[600px] overflow-hidden text-left align-middle transition-all transform rounded-lg shadow-xl bg-MidnightGray text-LightGrey">
                  <div className="flex items-center justify-between px-5 pt-5 ">
                    <h1 className="text-[24px] font-semibold">Edit profile</h1>
                    <span
                      onClick={onClose}
                      className="w-[35px] cursor-pointer text-white h-[35px] flex items-center rounded-full justify-center  bg-CharcoalGray hover:bg-DimeGray"
                    >
                      <IoClose size={20} />
                      <input type="file" className="hidden-input" />
                    </span>
                  </div>
                  <div className="h-[1px] w-full bg-DimeGray my-5"></div>

                  {/* Main form */}
                  <form
                    onSubmit={handleSubmit(updateProfile)}
                    className="flex flex-col gap-5 px-5 pb-6"
                  >
                    {/* Profile photo */}
                    <section className="flex items-start ">
                      <h1 className="flex-shrink-0 text-lg font-semibold text-white ">
                        Profile photo
                      </h1>

                      <div className="w-[100px] h-[100px] relative flex items-center justify-center  mx-auto">
                        {photo && progress === 0 && (
                          <img
                            className="rounded-full img-cover"
                            src={photo}
                            alt="user-avatar"
                          />
                        )}

                        {photo && progress !== 0 && (
                          <div className="w-[25px] h-[25px] animate-spin rounded-full border-t-2 border-t-transparent border-2 border-solid border-Crimson"></div>
                        )}

                        <div className="absolute bottom-0 right-0 ">
                          <label
                            htmlFor="image"
                            className="flex rounded-full border border-DimeGray cursor-pointer items-center justify-center w-[32px] h-[32px] bg-MainDark hover:bg-CharcoalGray text-white"
                          >
                            <AiOutlineEdit />
                          </label>
                          <input
                            onChange={handleSelectImage}
                            type="file"
                            className="hidden-input"
                            id="image"
                          />
                        </div>
                      </div>
                    </section>

                    {/* Titkok id */}
                    <div className="flex items-start gap-10">
                      <h1 className="flex-shrink-0 text-lg font-semibold text-white w-[90px]">
                        Tiktok ID
                      </h1>
                      <Input
                        name="slug"
                        error={errors.slug}
                        register={register}
                        placeholder="Enter your Tiktok ID..."
                        className="bg-DarkGray"
                      />
                    </div>

                    {/* Username */}
                    <div className="flex items-start gap-10">
                      <h1 className="flex-shrink-0 text-lg font-semibold text-white w-[90px]">
                        Username
                      </h1>
                      <Input
                        name="username"
                        error={errors.username}
                        register={register}
                        placeholder="Enter your username..."
                        className="flex-1 bg-DarkGray"
                      />
                    </div>

                    {/* Bio */}
                    <div className="flex items-start gap-10">
                      <h1 className="flex-shrink-0 text-lg font-semibold text-white w-[90px]">
                        Bio
                      </h1>
                      <textarea
                        name="bio"
                        {...register("bio")}
                        placeholder="Enter your bio..."
                        className="w-full p-3 border bg-DarkGray rounded-md resize-none border-DimeGray min-h-[100px] focus:bg-MidnightGray focus:border-LightGrey"
                      ></textarea>
                    </div>
                  </form>

                  <div className="h-[1px] w-full bg-DimeGray"></div>
                  <section className="flex items-center justify-end gap-5 p-5">
                    <Button variant="bordered" className="rounded-md">
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSubmit(updateProfile)}
                      type="submit"
                      variant="solid"
                      isLoading={isSubmitting}
                      className="text-white rounded-md"
                    >
                      Update
                    </Button>
                  </section>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
