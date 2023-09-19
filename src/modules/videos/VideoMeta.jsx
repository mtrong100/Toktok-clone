import React from "react";

const VideoMeta = ({ username, date, hashtag, title, music }) => {
  return (
    <section>
      <div className="flex items-center gap-2">
        <h4 className="font-semibold cursor-pointer hover:underline">
          {username}
        </h4>
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
