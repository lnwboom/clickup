import React from "react";
import { Link } from "react-router-dom";
import UserDropdown from "./UserDropdown";
import { useState } from "react";
import NewModal from "./modal/AddNewModal";
import picAvatar from "../assets/avatar.png";
import grid from "../assets/grid.png";
import MenuDropdown from "./MenuDropdown";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaSearch } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { CgMenuGridO } from "react-icons/cg";

function Header({ onAddTask }) {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login"); // Redirect to login page after successful logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  const handleAddTask = () => {
    // Implement logout logic here
    console.log("N");
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

        <div className="flex flex-grow max-w-2xl mx-4">
          {/* <FaSearch className=""/> */}
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-12 px-4 rounded-lg bg-slate-600 text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center space-x-4">
          

          {user ? (
            <div className="flex items-center space-x-4">
              <button
            className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-slate-600"
            onClick={() => setIsModalOpen(true)}
            // onAddTask={onAddTask}
          >
            
            <FaCirclePlus className="w-5 h-5"  />
            <span>New</span>
          </button>

          <div className="h-6 w-px bg-slate-500" />

          <div className="relative">
            <button
              onClick={() => setIsMenuDropdownOpen(!isMenuDropdownOpen)}
              className="p-2 rounded hover:bg-slate-600"
            >
              <CgMenuGridO  className="w-8 h-8" />
            </button>
            {isMenuDropdownOpen && (
              <div className="absolute right-0 mt-2 z-10">
                <MenuDropdown user={user} />
              </div>
            )}
          </div>

              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center space-x-2 p-2 rounded hover:bg-slate-600"
              >
                <img
                  src={user.avatarUrl || "https://via.placeholder.com/40"}
                  alt={user.username}
                  className="w-8 h-8 rounded-full"
                />
                <span>{user.username}</span>
              </button>
              {isUserDropdownOpen && (
                <div className="absolute right-20 mt-80 z-20">
                  <UserDropdown user={user} onLogout={handleLogout} />
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                className="px-3 py-2 rounded hover:bg-slate-600"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-3 py-2 rounded hover:bg-slate-600"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </nav>

      <NewModal isOpen={isModalOpen} onClose={closeModal} onAddTask={onAddTask}>
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
