import React, { useEffect } from "react";
import { TableTitle, ToastConfig } from "../constants/constants";
import { v4 } from "uuid";
import { AiOutlineDelete, AiFillHeart } from "react-icons/ai";
import { BsChatDotsFill } from "react-icons/bs";
import { formatDateTime } from "../utils/reuse-function";
import useFetchSubCollection from "../hooks/useFetchSubCollection";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../utils/firebase-app";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import useQueryCollection from "../hooks/useQueryCollection";
import { BiSearch } from "react-icons/bi";
import useOnChange from "../hooks/useOnChange";
/* ====================================================== */

const ManagePage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { value, handleChange } = useOnChange();
  const { data } = useQueryCollection("posts", "userId", currentUser?.userId);

  // Search user
  const filteredPost = data.filter((item) =>
    item.title.toLowerCase().includes(value.toLowerCase())
  );

  // FIX SCROLL BUG
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="w-full max-w-5xl p-5 mx-auto rounded-md shadow-xl bg-CharcoalGray">
      <section className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-semibold">Manage your posts</h1>
        <div className="flex items-center justify-between w-full py-3 px-4 relative max-w-[350px] bg-DarkGray gap-1 border  rounded-full group border-DimeGray hover:border-LightGrey">
          <input
            value={value}
            onChange={handleChange}
            type="text"
            placeholder="Search..."
            className="w-full caret-Crimson"
          />
          <span className="pl-2 border-l border-DimeGray">
            <BiSearch size={20} />
          </span>
        </div>
      </section>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            {TableTitle.map((item) => (
              <th
                key={item}
                className="px-4 py-2 text-lg font-medium text-left border-b border-DimeGray opacity-80"
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredPost.length > 0 &&
            filteredPost.map((item) => <TableItem key={v4} data={item} />)}
        </tbody>
      </table>
    </div>
  );
};

export default ManagePage;

function TableItem({ data }) {
  const date = formatDateTime(data?.createdAt);
  const { data: likes } = useFetchSubCollection("posts", data?.postId, "likes");
  const { data: comments } = useFetchSubCollection(
    "posts",
    data?.postId,
    "comments"
  );

  /* Delete post */
  const deletePost = async (postId) => {
    if (!postId) {
      toast.error("Fail to delete post!", ToastConfig);
      return;
    }

    try {
      const postDoc = doc(db, "posts", postId);

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Your post has been deleted.", "success");
          await deleteDoc(postDoc);
          toast.success("Deleted!", ToastConfig);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <tr key={v4()}>
      <td className="p-3 w-fit">
        <div className="flex items-start gap-5 ">
          <div className="h-[110px] w-[80px] ">
            <video
              muted
              src={data?.video}
              className="flex-shrink-0 rounded-sm img-cover"
            />
          </div>

          <div className="flex flex-col flex-1 gap-5 font-medium">
            <p>{data?.title}</p>
            <section className="flex items-center gap-4">
              <div className="flex items-center gap-1 opacity-60">
                <AiFillHeart size={15} />
                <span>{likes.length || "0"}</span>
              </div>
              <div className="flex items-center gap-1 opacity-60">
                <BsChatDotsFill size={15} />
                <span>{comments.length || "0"}</span>
              </div>
            </section>
          </div>
        </div>
      </td>
      <td className="p-3">
        <span
          onClick={() => deletePost(data?.postId)}
          className="cursor-pointer hover:text-Crimson w-[40px] h-[40px] flex items-center justify-center rounded-full hover:bg-MidnightGray"
        >
          <AiOutlineDelete size={22} />
        </span>
      </td>
      <td className="p-3 opacity-80">{date}</td>
      <td className="p-3 font-semibold text-green-500 opacity-90">
        <span className="px-4 py-2 text-sm rounded-md bg-opacity-10 bg-emerald-500">
          {data?.type}
        </span>
      </td>
    </tr>
  );
}
