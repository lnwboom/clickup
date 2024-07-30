import React, { useState } from "react";
import { Link } from "react-router-dom";
import NewModal from "../components/modal/NewModal";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { LiaChartBarSolid } from "react-icons/lia";
import { CgFileDocument } from "react-icons/cg";
import { FiInbox } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";

function MenuDropdown({ user }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const MenuButton = ({ icon: Icon, text, to }) => (
    <Link
      to={to}
      className="flex flex-col flex-1 items-center text-xs font-medium text-slate-700 justify-center"
    >
      <Icon className="w-6 h-6 text-[#535353] rounded border border-gray-300" />
      <div className="mt-3.5">{text}</div>
    </Link>
  );
  

  return (
    <div className="flex flex-col px-7 pt-3 pb-8 bg-white rounded-2xl border-0 border-solid shadow border-neutral-400 max-w-[291px]">
      <div className="flex gap-3 mt-2">
        <button className="flex flex-col flex-1" onClick={openModal}>
          <div className="flex justify-center items-center px-5 py-5 rounded-xl border border-gray-300 border-solid">
            <img
              src={user.avatar || "https://via.placeholder.com/30"}
              alt="User avatar"
              className="aspect-square w-[34px]"
            />
          </div>
          <div className="self-center mt-3.5 text-xs font-medium text-slate-700">
            Profile
          </div>
        </button>
        <MenuButton icon={FiInbox} text="Inbox" to="/inbox" />
        <MenuButton icon={CgFileDocument} text="New Doc" to="/docs" />
      </div>
      <div className="flex gap-3 items-start mt-3">
        <MenuButton icon={LiaChartBarSolid} text="Dashboard" to="/dashboard" />
        <MenuButton
          icon={HiMiniPencilSquare}
          text="Whiteboard"
          to="/whiteboard"
        />
        <MenuButton icon={FiSettings} text="Settings" to="/settings" />
      </div>
      <NewModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default MenuDropdown;
