import React from "react";
import { Link } from "react-router-dom";

const VideoMeta = ({ username, date, hashtag, title, music, slug }) => {
  return (
    <section>
      <div className="flex items-center gap-2">
        <Link
          to={`/${slug}`}
          className="font-semibold cursor-pointer hover:underline"
        >
          {username}
        </Link>
        <span>.</span>
        <span className="text-xs md:text-sm">{date}</span>
      </div>
      <p className="w-full max-w-sm my-1 text-sm leading-snug">
        {title}{" "}
        {hashtag && (
          <span className="font-semibold text-Skyblue ">{hashtag}</span>
        )}
      </p>
      {music && (
        <p className="inline-block font-mono text-sm font-medium capitalize">
          🎵 {music} 🎵
        </p>
      )}
    </section>
  );
};

export default VideoMeta;
