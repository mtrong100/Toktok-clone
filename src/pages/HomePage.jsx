import React from "react";
import { BiSolidUpArrow } from "react-icons/bi";
import Header from "../components/header/Header";
import Sidebar from "../components/shared/Sidebar";

const HomePage = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <main className="relative flex flex-col ml-[240px] mt-[64px]">
        <div className="w-full max-w-[692px] py-5 mx-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
          quos repellat excepturi aut nam deleniti cumque, dolores quisquam
          mollitia eligendi hic dolorum facere provident ipsam facilis, nostrum
          veritatis. Possimus, unde?
        </div>
      </main>
    </>
  );
};

export default HomePage;
