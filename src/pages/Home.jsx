import { useState } from "react";
import CardRecent from "../components/Home/CardRecent";
import CardAiStandup from "../components/Home/CardAiStandup";
import CardAssigned from "../components/Home/CardAssigned";
import CardMyWork from "../components/Home/CardMyWork";
import CardAgenda from "../components/Home/CardAgenda";

function Home() {
  return (
    <div className="mx-auto bg-white h-screen flex flex-col">
      <Header />
      <hr className="border-t border-neutral-300" />

      <div className="flex flex-col m-6 ">
        <div className="flex-wrap content-start w-full max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
              <CardRecent />
            </div>
            <div className="flex flex-col  w-6/12 max-md:ml-0 max-md:w-full">
              <CardAgenda />
            </div>
          </div>
          <div className="flex-wrap content-start mt-7 w-full max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col">
              <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                <CardMyWork />
              </div>
              <div className="flex flex-col gap-6 w-6/12 max-md:ml-0 max-md:w-full">
                <CardAssigned />
                <CardAiStandup/>
              </div>
            </div>
          </div>
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
