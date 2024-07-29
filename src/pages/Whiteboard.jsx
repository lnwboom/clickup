import React, { useState } from "react";
import { WhiteboardData as Data } from "../components/data/whiteboard";
import DocModal from "../components/Doc/DocModal";
import WhiteboardInfo from "../components/Whiteboard.jsx/WhiteBoardInfo";

function WhiteboardPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeWhiteboard, setActiveWhiteboard] = useState(null);

  const tabs = ["All", "My Whiteboards"];
  const tableHeaders = [
    "Name",
    "Location",
    "Tag",
    "Date Up",
    "Date View",
    "Sharing",
  ];

  return (
    <div className="mx-auto bg-white h-screen flex flex-col">
    <Header />
    <hr className="border-t border-neutral-300" />
    <div className="flex-grow overflow-hidden">
      {activeWhiteboard ? (
        <WhiteboardInfo onClose={() => setActiveWhiteboard(null)} />
      ) : (
        <div className="p-6 h-full overflow-auto">
          <DocumentCategories setActiveWhiteboard={setActiveWhiteboard} />
          <TabsAndSearch
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            tabs={tabs}
          />
          <DocumentTable headers={tableHeaders} />
        </div>
      )}
    </div>
  </div>
  );
}

function Header() {
  return (
    <div className="flex gap-2.5 py-4 px-4 text-sm font-bold text-center capitalize">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/95b3fe81f1127cefe9ccb891a2771ce997f0393e1170053360d88837f870fa82?"
        alt="Doc icon"
        className="w-5 aspect-[0.91]"
      />
      <div className="my-auto">Whiteboard</div>
    </div>
  );
}

function DocumentCategories({ setActiveWhiteboard }) {
  const categories = [
    {
      title: "Recent",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b3aaec90d8da4f591294e7af6bf6da8409cab186d5623b4f8646f29dffc0f4f3?",
    },
    {
      title: "Favorites",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/dc655d120b1dce80913502faf291d872bd8b46eb2d0556cfee46c9cdb7d2ba73?",
    },
    {
      title: "Created by Me",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/6087c67eff4db433f15a97e22b36cc68da1f0099031e4346513640b128f91a74?",
    },
  ];

  return (
    <div className="flex gap-5 mb-10">
      {categories.map((category, index) => (
        <DocumentCategory
          key={index}
          {...category}
          setActiveWhiteboard={setActiveWhiteboard}
        />
      ))}
    </div>
  );
}

function DocumentCategory({ title, icon, setActiveWhiteboard }) {
  const handleCategoryClick = () => {
    setActiveWhiteboard(title);
  };

  return (
    <div
      className="flex-1 p-4 bg-white rounded-xl border border-solid border-stone-300 cursor-pointer"
      onClick={handleCategoryClick}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-semibold text-zinc-800">{title}</h3>
        <img src={icon} alt={`${title} icon`} className="w-3.5 aspect-[3.45]" />
      </div>
      <DocumentList limit={3} />
    </div>
  );
}

function DocumentList({ limit = 3 }) {
  return (
    <ul>
      {Data.slice(0, limit).map((doc, index) => (
        <li
          key={index}
          className="flex items-center gap-3 py-1 text-sm text-neutral-400 hover:bg-gray-50"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/906eed0f2f3b0c871148eb73c9f84b3fa7883b2dfe392de5fcfbe95cdeaba43f?"
            alt={doc.name}
            className="w-3.5 aspect-[0.88]"
          />
          <span>{doc.name}</span>
        </li>
      ))}
    </ul>
  );
}

function TabsAndSearch({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  tabs,
}) {
  return (
    <div className="flex justify-between items-center mb-5">
      <div className="flex gap-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-2 py-1.5 ${
              activeTab === tab
                ? "border-b-2 border-zinc-800 text-zinc-800"
                : "text-zinc-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-md border border-gray-300">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0748e29b938b5dbb90d1d9a47540182ece6d225dc1e35770bda3c3d9d94e04f2?"
          alt="Search icon"
          className="w-3 aspect-[1.09]"
        />
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent outline-none"
        />
      </div>
    </div>
  );
}

function DocumentTable({ headers }) {
  return (
    <table className="w-full text-sm text-zinc-500">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th
              key={index}
              className="py-2.5 text-left border-t border-b border-neutral-200"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Data.map((row, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="py-2 border-b border-neutral-200">{row.name}</td>
            <td className="py-2 border-b border-neutral-200">{row.location}</td>
            <td className="py-2 border-b border-neutral-200">
              <span className="px-2 py-1 bg-gray-200 rounded-full text-xs">
                {row.tag}
              </span>
            </td>
            <td className="py-2 border-b border-neutral-200">{row.dateUp}</td>
            <td className="py-2 border-b border-neutral-200">{row.dateView}</td>
            <td className="py-2 border-b border-neutral-200">{row.sharing}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default WhiteboardPage;
