import { useState } from "react";
import CardRecent from "../components/Home/CardRecent";
import CardAiStandup from "../components/Home/CardAiStandup";
import CardAssigned from "../components/Home/CardAssigned";
import CardMyWork from "../components/Home/CardMyWork";
import CardAgenda from "../components/Home/CardAgenda";

function Home() {
  return (
    <div className="mx-auto bg-white">
      <Header />
      <hr className="border-t border-neutral-300" />
      <div className="grid grid-cols-2 gap-4 py-4 mt-4 px-4 m-4 items-start ">
        <CardRecent />

        <CardAgenda />
        <CardMyWork />
        <div className="flex flex-col gap-4 h-full">
          <CardAssigned />
          <CardAiStandup />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="flex gap-2.5 py-4 px-4 text-sm font-bold text-center capitalize">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/bb4256fdb84a5398f8c5e0614119720abe5ec290b5f8cd7bd8604f0dc993ba0a?"
        alt="Doc icon"
        className="w-5 aspect-[0.91]"
      />
      <div className="my-auto">Home</div>
    </div>
  );
}

export default Home;
