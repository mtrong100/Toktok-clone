import { IoClose } from "react-icons/io5";
import { Fragment } from "react";
import { FcGoogle } from "react-icons/fc";
import { Dialog, Transition } from "@headlessui/react";
import { TiktokLinks } from "../../constants/constants";
import useGoogleLogin from "../../hooks/useGoogleLogin";
import { FaGithub } from "react-icons/fa";
import useGithubLogin from "../../hooks/useGithubLogin";
/* =================================================================== */

export default function Modal({ isOpen, onClose }) {
  const { googleLogin } = useGoogleLogin(onClose);
  const { githubLogin } = useGithubLogin(onClose);

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
            <div className="fixed inset-0 backdrop-blur-md" />
          </Transition.Child>

          <div className="fixed inset-0 z-30 overflow-y-auto">
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

                  <GoogleAuth onClick={googleLogin} />
                  <GithubAuth onClick={githubLogin} />

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

function GoogleAuth({ onClick = () => {} }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-center px-4 py-3 mt-8 transition-all border border-transparent rounded-md cursor-pointer hover:border-DimeGray bg-CharcoalGray"
    >
      <span className="flex-shrink-0">
        <FcGoogle size={20} />
      </span>
      <div className="flex-1 font-medium text-center transition-all ">
        Continue with Google
      </div>
    </div>
  );
}

function GithubAuth({ onClick = () => {} }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-center px-4 py-3 mt-1 transition-all border border-transparent rounded-md cursor-pointer hover:border-DimeGray bg-CharcoalGray"
    >
      <span className="flex-shrink-0">
        <FaGithub size={20} />
      </span>
      <div className="flex-1 font-medium text-center transition-all ">
        Continue with Github
      </div>
    </div>
  );
}
