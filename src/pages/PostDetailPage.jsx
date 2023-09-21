import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetchDocRef from "../hooks/useFetchDocRef";
import { BiArrowBack } from "react-icons/bi";
import Skeleton from "../components/loading/Skeleton";
import UserAvatar from "../modules/user/UserAvatar";
import useQuerySnapshot from "../hooks/useQuerySnapshot";
import { formatDateTime } from "../utils/reuse-function";
import Button from "../components/button/Button";
import PostLike from "../modules/post/PostLike";
import PostCmt from "../modules/post/PostCmt";
import PostSave from "../modules/post/PostSave";
import useOnChange from "../hooks/useOnChange";
/* ====================================================== */

const TabMeta = [`Comments`, "Creator's videos"];
const PostDetailPage = () => {
  const { id: postId } = useParams();
  const { data, isLoading } = useFetchDocRef("posts", postId);
  const { data: user } = useQuerySnapshot("users", "userId", data?.userId);
  const [activeTab, setActiveTab] = useState("Comments");
  const date = formatDateTime(data?.createdAt);
  const { value, handleChange } = useOnChange();

  // FIX SCROLL BUG
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section className="flex flex-row h-screen">
      {/* Video container */}
      <div className="relative w-full flex items-center justify-center max-w-[992px] mx-auto overflow-hidden bg-black ">
        {isLoading && (
          <Skeleton className="z-20 w-[422px]  object-contain h-full rounded-sm"></Skeleton>
        )}
        {!isLoading && data && (
          <video
            controls
            loop
            // autoPlay
            src={data?.video}
            className="z-20 object-contain h-full rounded-sm"
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-50 blur-xl">
          {!isLoading && data && (
            <video muted src={data?.video} className="img-cover" />
          )}
        </div>
      </div>

      {/* Content */}
      <section className="flex-1 h-screen  overflow-y-auto min-h-[786px]">
        <div className="p-5">
          <div className="p-4 rounded-xl bg-MidnightGray">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <UserAvatar size="lg" avatar={user?.photoURL} />
                <div>
                  <h2 className="text-lg font-semibold capitalize">
                    {user?.username}
                  </h2>
                  <div className="flex items-center gap-1">
                    <small className="text-sm font-normal">{`@${user?.slug}`}</small>
                    <span className="font-semibold">.</span>
                    <small className="text-xs font-normal">{date}</small>
                  </div>
                </div>
              </div>

              <Button variant="solid" className="rounded-md">
                Follow
              </Button>
            </div>

            <div className="mt-4">
              <p className="w-full max-w-sm my-1 text-sm leading-snug">
                {data?.title}{" "}
                {data?.hashtag && (
                  <span className="font-semibold text-Skyblue ">
                    {data?.hashtag}
                  </span>
                )}
              </p>
              {data?.music && (
                <p className="inline-block font-mono text-sm font-medium capitalize">
                  🎵 {data?.music} 🎵
                </p>
              )}
            </div>
          </div>

          {/* Post action */}
          <section className="flex flex-row gap-5 my-5">
            <PostLike
              data={data}
              direction="flex-row "
              className="w-[35px] h-[35px]"
              size={20}
            />
            <PostCmt
              data={data}
              direction="flex-row "
              className="w-[35px] h-[35px]"
              size={20}
            />
            <PostSave
              data={data}
              direction="flex-row "
              className="w-[35px] h-[35px]"
              size={18}
            />
          </section>

          {/* Copy link */}
          <div className="flex items-center text-xs">
            <p className="p-2 bg-MidnightGray">
              https://toktok-clone-mu.vercel.app/video/{postId}
            </p>
            <span className="p-2 font-semibold rounded cursor-pointer bg-DarkGray">
              Copy link
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-center px-5 my-6">
          {TabMeta.map((item) => (
            <span
              onClick={() => setActiveTab(item)}
              className={`${
                activeTab === item
                  ? "text-white border-LightGrey"
                  : "opacity-50"
              } flex items-center justify-center border-b cursor-pointer transition-all border-transparent flex-1 py-2 font-medium`}
              key={item}
            >
              {item === "Comments" ? `Comments (16)` : item}
            </span>
          ))}
        </div>

        {/* Comment section */}
        <main className="">
          <ul className="h-full px-5">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui ipsam
            dicta ab molestias vero incidunt? Earum sed hic repellendus
            perspiciatis ad nihil voluptas eligendi pariatur cumque esse!
            Reiciendis, maxime eum! Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Eos incidunt ad tempore cumque facilis quisquam
            quos magnam a debitis explicabo, molestias, veritatis saepe sit
            laudantium repellat dolorum. Ad, cum reiciendis. Nisi velit fugiat,
            ex libero voluptas modi amet, explicabo quos nemo harum obcaecati
            illo. Voluptatum pariatur reiciendis aut, inventore ducimus mollitia
            ipsum voluptas architecto culpa similique consequuntur enim ut
            sequi? Nulla fugit nemo sapiente provident, dolor porro minus saepe
            ipsam, sed esse odio ipsum adipisci voluptatem voluptatum deserunt
            assumenda neque accusamus asperiores ut. Aspernatur aliquid
            doloremque voluptate, laboriosam porro hic. Ullam necessitatibus,
            obcaecati, molestias tenetur, explicabo autem repellendus fugiat
            error voluptates odit harum quaerat impedit natus aut corrupti ad
            cum officiis veniam distinctio quasi dicta iure. Facere consequuntur
            tempora sapiente. Minima quo at incidunt et ut reprehenderit id
            quasi blanditiis, numquam, rerum ab quidem neque dolores, sunt
            repellendus laboriosam obcaecati. Adipisci voluptates eveniet atque
            molestiae quas eius perspiciatis! Expedita, laborum? Assumenda
            consequatur vel porro dolorem rerum modi, totam dolorum
            perspiciatis. Fuga laborum aliquam laudantium accusantium expedita
            modi reprehenderit voluptatum quod. Tenetur, quis animi recusandae
            sit libero id ratione odit sunt. Dolor delectus beatae ipsum sint
            sapiente magnam dolorem libero eveniet fuga culpa officia voluptates
            enim ducimus quam odit fugiat cupiditate, tenetur numquam veritatis
            quasi voluptatibus? Sit inventore veritatis assumenda ducimus. Alias
            architecto animi laboriosam, ex officia nulla quisquam vitae
            incidunt, dolore, suscipit voluptatem similique labore. Voluptatum
          </ul>
          <section className="sticky bottom-0 flex items-center w-full gap-2 p-5 border-t bg-MainDark border-DimeGray">
            <input
              value={value}
              onChange={handleChange}
              type="text"
              className="w-full p-2 rounded-lg bg-CharcoalGray"
              placeholder="Write comments...."
            />
            <span
              className={`${
                value ? "text-Crimson" : "opacity-50"
              } flex-shrink-0 text-sm font-semibold  cursor-auto`}
            >
              Post
            </span>
          </section>
        </main>
      </section>

      {/* Back */}
      <Link
        to="/"
        className="fixed flex items-center rounded-full justify-center top-6 left-8 w-[40px] h-[40px] bg-[#3f3f3f] hover:bg-CharcoalGray text-white cursor-pointer"
      >
        <BiArrowBack size={22} />
      </Link>
    </section>
  );
};

export default PostDetailPage;
