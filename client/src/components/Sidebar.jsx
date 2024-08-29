// src/components/Sidebar.jsx
import { Link } from "react-router-dom";

import { HiMiniPencilSquare } from "react-icons/hi2";
import { LiaChartBarSolid } from "react-icons/lia";
import { CgFileDocument } from "react-icons/cg";
import { FiInbox } from "react-icons/fi";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { GoHome } from "react-icons/go";
function Sidebar() {
  return (
    <aside className="flex flex-col items-center px-3 py-20 bg-gray-300 border-r border-solid border-stone-300 w-16">
      <nav>
        <ul className="space-y-5">
          <li>
            <Link to="/" className="block p-2 rounded-xl hover:bg-violet-200">
              <GoHome className="w-6 h-6 text-[#535353]" />
            </Link>
          </li>
          <li>
            <Link
              to="/workspaces"
              className="block p-2 rounded-xl hover:bg-violet-200"
            >
              <HiOutlineViewGridAdd className="w-6 h-6 text-[#535353]" />
            </Link>
          </li>
          <li>
            <Link
              to="/inbox"
              className="block p-2 rounded-xl hover:bg-violet-200"
            >
              <FiInbox className="w-6 h-6 text-[#535353]" />
            </Link>
          </li>
          <li>
            <Link
              to="/docs"
              className="block p-2 rounded-xl hover:bg-violet-200"
            >
              <CgFileDocument className="w-6 h-6 text-[#535353]" />
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              className="block p-2 rounded-xl hover:bg-violet-200"
            >
              <LiaChartBarSolid className="w-6 h-6 text-[#535353]" />
            </Link>
          </li>
          <li>
            <Link
              to="/whiteboard"
              className="block p-2 rounded-xl hover:bg-violet-200"
            >
              <HiMiniPencilSquare className="w-6 h-6 text-[#535353]" />
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
