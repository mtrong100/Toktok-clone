import React from "react";
import Header from "../header/Header";
import Sidebar from "../shared/Sidebar";
import { Outlet } from "react-router-dom";
import ButtonScrollTop from "../button/ButtonScrollTop";

const MainLayout = () => {
  return (
    <React.Fragment>
      <Header />
      <Sidebar />
      <main className="relative flex flex-col ml-[240px] pt-[70px]">
        <section className="w-full max-w-[690px] py-5 mx-auto flex flex-col gap-8">
          <Outlet />
        </section>
      </main>
      <ButtonScrollTop />
    </React.Fragment>
  );
};

export default MainLayout;
