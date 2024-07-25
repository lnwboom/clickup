import React, { useState, useEffect } from "react";
import { sampleData as docData } from "../../components/data/doc";
import picAvatar from "../../assets/avatar.png"

function DocModal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    // Initialize tabs with all documents
    const initialTabs = docData.map((doc) => ({
      id: doc.name,
      title: doc.name,
      content: doc,
    }));
    setTabs(initialTabs);
    setActiveTab(initialTabs[0].id);
  }, []);

  const createNewDoc = () => {
    const newDoc = {
      name: `New Document ${tabs.length + 1}`,
      location: "",
      tag: "",
      dateUp: new Date().toISOString().split("T")[0],
      dateView: new Date().toISOString().split("T")[0],
      sharing: "Private",
    };
    const newTab = {
      id: newDoc.name,
      title: newDoc.name,
      content: newDoc,
    };
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.id);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="flex flex-col justify-center shadow-sm w-full max-w-4xl">
        <div className="pl-px w-full bg-white rounded-3xl border-solid border-[3px] border-neutral-400 max-md:pr-5 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col ml-3 mb-3 w-[19%] max-md:ml-0 max-md:w-full">
              <div className="flex grow gap-0 text-sm font-medium text-zinc-700 max-md:mt-10">
                <div className="flex  z-10 flex-col self-start pb-1.5 mt-6 w-full">
                  <div className="self-start ml-5 text-base font-semibold text-zinc-800 max-md:ml-2.5">
                    Doc
                  </div>
                  <div className="shrink-0 my-4 h-0.5 border-2 border-solid bg-neutral-400 border-neutral-400" />
                  {tabs.map((tab) => (
                    <div
                      key={tab.id}
                      className={`cursor-pointer px-1.5 py-1 mt-1.5 flex gap-3 whitespace-nowrap ${
                        activeTab === tab.id
                          ? "bg-zinc-300"
                          : "bg-zinc-300 bg-opacity-0"
                      } text-neutral-400 hover:bg-gray-50`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/196bcf73de5ee31824ded05d69f52b0041245f726a26e598537cf0c4d1851089?"
                        className="shrink-0 aspect-[0.93] fill-zinc-700 "
                      />
                      {tab.title}
                    </div>
                  ))}
                  <div
                    className="flex gap-3 px-1.5 py-1 mt-1.5 bg-zinc-300 bg-opacity-0 text-neutral-400 cursor-pointer"
                    onClick={createNewDoc}
                  >
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/061fe056f867972b6e9c9736cb6923894188ce4e343eaf5d3f1ca36deefbbc2d?"
                      className="shrink-0 w-3.5 aspect-square fill-neutral-400"
                    />
                    <div>New Page</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="shrink-0 border-2 border-solid bg-neutral-400 border-neutral-400" />
            <div className="flex flex-col ml-5 w-[81%] max-md:ml-0 max-md:w-full">
              {activeTab && (
                <DocumentContent
                  document={tabs.find((tab) => tab.id === activeTab).content}
                  onClose={onClose}
                />
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 self-start pr-3 pt-3"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DocumentContent({ document, onClose }) {
  return (
    <div className="flex gap-5 justify-between mt-12 mb-12 text-xs max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
      <div className="flex flex-col font-medium">
        <div className="text-4xl font-semibold text-zinc-800">
          {document.name}
        </div>
        <div className="flex gap-2.5 items-center mt-5">
          <img
            loading="lazy"
            src={picAvatar || "https://via.placeholder.com/30"}
            className="shrink-0 self-stretch  rounded-full w-[21px]"
          />
          <div className="self-stretch my-auto text-neutral-700">You</div>
          <div className="flex-auto self-stretch my-auto text-stone-400">
            Last Update: {document.dateView}
          </div>
        </div>

        <textarea
          className="py-2.5 mt-6 text-xs rounded-md border border-solid bg-stone-50 border-stone-300 px-2 text-neutral-400"
          placeholder="Add description"
        />
        {/* Add more document content here */}
      </div>
    </div>
  );
}

export default DocModal;
