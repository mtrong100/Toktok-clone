import React from "react";
import { twMerge } from "tailwind-merge";

const Input = ({
  type = "text",
  placeholder = "Write something...",
  className = "",
  children,
  register,
  name,
  error,
}) => {
  return (
    <section className="w-full">
      <div className="relative w-full">
        <input
          {...register(name)}
          type={type}
          placeholder={placeholder}
          className={twMerge(
            "w-full p-3 border rounded-md border-DimeGray focus:bg-MidnightGray focus:border-LightGrey",
            className
          )}
        />
        {children ? (
          <div className="absolute right-[15px] opacity-80 top-2/4 -translate-y-2/4">
            {children}
          </div>
        ) : null}
      </div>
      {error && (
        <p className="mt-3 font-normal text-Crimson">{error.message}</p>
      )}
    </section>
  );
};

export default Input;
