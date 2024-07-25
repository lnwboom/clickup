import React from "react";
import NewModal from "../components/modal/NewModal";
import { useState } from "react";

function MenuDropdown({ user }) {
  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="flex flex-col px-7 pt-3 pb-8 bg-white rounded-2xl border-0 border-solid shadow border-neutral-400 max-w-[291px]">
      
      <div className="flex gap-3 mt-2 ">
        <button className="flex flex-col flex-1" onClick={openModal}>
          <div className="flex justify-center items-center px-5 py-5 rounded-xl border border-gray-300 border-solid">
            <img
              loading="lazy"
              src={user.avatar || "https://via.placeholder.com/30"}
              className="aspect-square w-[34px]"
            />
          </div>
          <div className="self-center mt-3.5 text-xs font-medium text-slate-700">
            Profile
          </div>
        </button>
        <div className="flex flex-col flex-1 items-center text-xs font-medium whitespace-nowrap text-slate-700">
          <img
            loading="lazy"
            srcSet="..."
            className="rounded-xl border border-gray-300 border-solid aspect-[0.97] w-[72px]"
          />
          <div className="mt-3.5">Inbox</div>
        </div>
        <div className="flex flex-col flex-1 text-xs font-medium text-slate-700">
          <img
            loading="lazy"
            srcSet="..."
            className="self-center rounded-xl border border-gray-300 border-solid aspect-[0.96] w-[71px]"
          />
          <div className="mt-3.5">New Doc</div>
        </div>
      </div>
      <div className="flex gap-3 items-start mt-3 text-xs font-medium whitespace-nowrap text-slate-700">
        <div className="flex flex-col flex-1">
          <img
            loading="lazy"
            srcSet="..."
            className="self-center rounded-xl border border-gray-300 border-solid aspect-[0.97] w-[72px]"
          />
          <div className="mt-3.5">Dashboard</div>
        </div>
        <div className="flex flex-col flex-1">
          <img
            loading="lazy"
            srcSet="..."
            className="self-center rounded-xl border border-gray-300 border-solid aspect-[0.97] w-[72px]"
          />
          <div className="mt-3.5">Writeboard</div>
        </div>
        <div className="flex flex-col flex-1 items-center self-stretch">
          <img
            loading="lazy"
            srcSet="..."
            className="rounded-xl border border-gray-300 border-solid aspect-[0.96] w-[71px]"
          />
          <div className="mt-3.5">Setting</div>
        </div>
      </div>
      <NewModal isOpen={isModalOpen} onClose={closeModal}></NewModal>
    </div>
    
  );
}

export default MenuDropdown;
