import React from "react";
import Header from "../header/Header";
import Sidebar from "../shared/Sidebar";
import { Outlet } from "react-router-dom";

const ProfileLayout = () => {
  return (
    <React.Fragment>
      <Header />
      <Sidebar />
      <main className="relative flex flex-col ml-[240px] pt-[70px]">
        <section className="w-full gap-8 px-8 py-5 ">
          <Outlet />
        </section>
      </main>
    </React.Fragment>
  );
};

export default ProfileLayout;
