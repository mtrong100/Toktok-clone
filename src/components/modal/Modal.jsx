import { IoClose } from "react-icons/io5";
import { Fragment } from "react";
import { FcGoogle } from "react-icons/fc";
import { Dialog, Transition } from "@headlessui/react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../utils/firebase-app";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import slugify from "slugify";
import { toast } from "react-toastify";
import { TiktokLinks, ToastConfig } from "../../constants/constants";
/* =================================================================== */

export default function Modal({ isOpen, onClose }) {
  const provider = new GoogleAuthProvider();

  const googleLogin = async () => {
    try {
      const results = await signInWithPopup(auth, provider);
      const data = results.user;
      if (!data || !data.uid) return;

      const userDocRef = doc(db, "users", data.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userDocData = userDocSnapshot.data();
        await updateDoc(userDocRef, {
          username: userDocData.username,
          slug: userDocData.slug,
          photoURL: userDocData.photoURL,
        });
      } else {
        await setDoc(doc(db, "users", data.uid), {
          userId: data.uid,
          username: data.displayName,
          slug: slugify(data.displayName, { lower: true }),
          email: data.email,
          photoURL: data.photoURL,
          createdAt: serverTimestamp(),
        });
      }

      toast.success("Welcome to tiktok!", ToastConfig);
      onClose();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform rounded-lg shadow-xl bg-MidnightGray text-LightGrey">
                  <span
                    onClick={onClose}
                    className="w-[35px] cursor-pointer text-white h-[35px] flex items-center rounded-full justify-center absolute top-3 right-3 bg-CharcoalGray hover:bg-DimeGray"
                  >
                    <IoClose size={20} />
                  </span>
                  <Dialog.Title
                    as="h3"
                    className="text-3xl font-semibold leading-6 text-center "
                  >
                    Join Tiktok
                  </Dialog.Title>

                  <div
                    onClick={googleLogin}
                    className="flex items-center justify-center px-4 py-3 mt-8 transition-all border border-transparent rounded-md cursor-pointer hover:border-DimeGray bg-CharcoalGray"
                  >
                    <span className="flex-shrink-0">
                      <FcGoogle size={20} />
                    </span>
                    <div className="flex-1 font-medium text-center transition-all ">
                      Continue with Google
                    </div>
                  </div>

                  <ul className="flex flex-wrap items-center gap-2 pt-2 mt-4 text-sm border-t border-DimeGray">
                    {TiktokLinks.map((item) => (
                      <li
                        className="transition-all cursor-pointer hover:text-Crimson hover:underline"
                        key={item}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
