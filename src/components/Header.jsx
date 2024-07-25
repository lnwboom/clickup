import React from "react";
import { Link } from "react-router-dom";
import UserDropdown from "./UserDropdown";
import { useState } from "react";
import NewModal from "../components/modal/NewModal";
import picAvatar from "../assets/avatar.png";
import grid from "../assets/grid.png";
import MenuDropdown from "./MenuDropdown";

function Header() {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState(false);

  const user = {
    name: "Sorawit Taochoo",
    email: "sorawittaochoo@gmail.com",
    avatar: picAvatar,
  };

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logging out");
  };

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="bg-slate-700 p-4 text-white">
      <nav className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          ClickUP
        </Link>

        <div className="flex-grow max-w-2xl mx-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-12 px-4 rounded-lg bg-slate-600 text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center space-x-4">
          <button
            className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-slate-600"
            onClick={() => setIsModalOpen(true)}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/fdfe43e42b67cf1b2d27485e7d2bc8292760dc2df070ba99ad88b8296522a7a5?"
              alt="New"
              className="w-6 h-6 rounded-full"
            />
            <span>New</span>
          </button>

          <div className="h-6 w-px bg-slate-500" />

          <div className="relative">
            <button
              onClick={() => setIsMenuDropdownOpen(!isMenuDropdownOpen)}
              className="p-2 rounded hover:bg-slate-600"
            >
              <img src={grid} alt="Menu" className="w-6 h-6" />
            </button>
            {isMenuDropdownOpen && (
              <div className="absolute right-0 mt-2 z-10">
                <MenuDropdown user={user} />
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              className="flex items-center space-x-2 p-2 rounded hover:bg-slate-600"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
              <span>{user.name}</span>
            </button>
            {isUserDropdownOpen && (
              <div className="absolute right-0 mt-2 z-10">
                <UserDropdown user={user} onLogout={handleLogout} />
              </div>
            )}
          </div>
        </div>
      </nav>

      <NewModal isOpen={isModalOpen} onClose={closeModal}>
        {/* <h2 className="text-lg text-black font-bold mb-4">Modal Title</h2>
          <p className="mb-4 text-black ">This is the content of the modal.</p>
          
          
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={closeModal}
          >
            Close Modal
          </button> */}
      </NewModal>
    </header>
  );
}


export default Header;
