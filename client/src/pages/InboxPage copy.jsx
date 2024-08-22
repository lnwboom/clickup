import React, { useState } from "react";
import { sampleMail as emails } from "../components/data/mail";

function InboxPage() {
  const [selectedEmail, setSelectedEmail] = useState(null);

  return (
    <div className="mx-auto bg-white">
      <Header />
      <hr className="border-t border-neutral-300" />
      <div className="p-6">
        {selectedEmail ? (
          <MailView
            email={selectedEmail}
            onBack={() => setSelectedEmail(null)}
          />
        ) : (
          <MailBox onSelectEmail={setSelectedEmail} />
        )}
      </div>
    </div>
  );
}

function Header() {
  const categories = ["Important", "Other", "Snoozed", "Cleared"];
  const [activeCategory, setActiveCategory] = useState("Important");

  return (
    <div className="flex gap-2.5 py-4 px-4 text-sm font-bold text-center capitalize">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/6146b43378b667fa9eff69bfb785f13d72eba22269bf461467eec6a33bd63438?"
        alt="Inbox icon"
        className="w-5 aspect-[0.91]"
      />
      <div className="my-auto">Inbox</div>
      <div className="shrink-0 w-px border border-solid bg-neutral-600 border-neutral-600 h-[25px]" />
      <div className="flex gap-4 my-auto">
        {categories.map((category) => (
          <div
            key={category}
            className={`cursor-pointer ${
              activeCategory === category ? "text-neutral-700" : "text-zinc-400"
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
}

function MailBox({ onSelectEmail }) {
  const [isChecked, setIsChecked] = useState(false);



  const handleCheckboxChange = (e) => {
    e.stopPropagation();
    setIsChecked(e.target.checked);
  };

  return (
    <div className="flex flex-col gap-4">
      <WriteButton />
      <div className="flex flex-col px-2.5 py-3.5 bg-white rounded-xl border border-solid border-stone-400">
      <div className="flex my-2 pl-2.5" onClick={(e) => e.stopPropagation()}>
          <input 
            type="checkbox" 
            className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        </div>
        {emails.map((email) => (
          <EmailItem
            key={email.id}
            email={email}
            onSelect={() => onSelectEmail(email)}
          />
        ))}
      </div>
    </div>
  );
}

function WriteButton() {
  return (
    <div className="flex items-center  gap-3.5 p-1.5 max-w-24 text-sm font-bold text-center capitalize whitespace-nowrap rounded-md border border-solid bg-neutral-200 border-stone-300 text-neutral-400">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/13389e4e51488fd0a8cc93038d87f8daa701ce3f2792c52f8441d8564975a783?"
        className="shrink-0 w-5 aspect-square fill-neutral-400"
      />
      <div className="my-auto">Write</div>
    </div>
  );
}

function EmailItem({ email, onSelect }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleCheckboxChange = (e) => {
    e.stopPropagation();
    setIsChecked(e.target.checked);
  };

  const formatDateTime = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div
      className="flex gap-3.5 px-2.5 py-3 mt-2.5 bg-white rounded-xl border-2 border-solid border-stone-300 max-md:flex-wrap max-md:max-w-full cursor-pointer hover:bg-gray-100"
      onClick={onSelect}
    >
      <div className="flex gap-3.5 items-center">
        <div className="flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
          <input 
            type="checkbox" 
            className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        </div>
       
        <div
          className="flex items-center justify-center cursor-pointer"
          onClick={handleFavoriteToggle}
        >
          {isFavorite ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.157c.969 0 1.371 1.24.588 1.81l-3.369 2.448a1 1 0 00-.364 1.118l1.286 3.958c.3.921-.755 1.688-1.538 1.118l-3.369-2.448a1 1 0 00-1.175 0l-3.369 2.448c-.783.57-1.838-.197-1.538-1.118l1.286-3.958a1 1 0 00-.364-1.118L2.073 9.385c-.783-.57-.381-1.81.588-1.81h4.157a1 1 0 00.95-.69l1.286-3.958z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400 hover:text-yellow-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.157c.969 0 1.371 1.24.588 1.81l-3.369 2.448a1 1 0 00-.364 1.118l1.286 3.958c.3.921-.755 1.688-1.538 1.118l-3.369-2.448a1 1 0 00-1.175 0l-3.369 2.448c-.783.57-1.838-.197-1.538-1.118l1.286-3.958a1 1 0 00-.364-1.118L2.073 9.385c-.783-.57-.381-1.81.588-1.81h4.157a1 1 0 00.95-.69l1.286-3.958z" />
            </svg>
          )}
        </div>
      </div>
      <div className="flex flex-wrap flex-1 gap-5 content-start font-medium">
        <div className="flex overflow-x-auto flex-wrap flex-1 gap-5 justify-between content-start">
          <div className="text-sm text-black">{email.from}</div>
          <div className="text-sm text-neutral-400 max-md:max-w-full">
            {email.subject}
          </div>
        </div>
        <div className="text-sm text-center text-stone-700">
          {formatDateTime(email.date)}
        </div>
      </div>
    </div>
  );
}

function MailView({ email, onBack }) {
  return (
    <div className="bg-white rounded-xl border border-solid border-stone-400 p-6 max-w-lg mx-auto">
      <button
        onClick={onBack}
        className="mb-4 text-blue-500 hover:text-blue-700"
      >
        &larr; Back to Inbox
      </button>
      <h2 className="text-2xl font-bold mb-4">{email.subject}</h2>
      <div className="flex justify-between mb-4">
        <div>
          <span className="font-bold">From:</span> {email.from}
        </div>
        <div>{email.date}</div>
      </div>
      <div className="border-t pt-4">
        <div className="whitespace-pre-wrap">{email.body}</div>
      </div>
    </div>
  );
}

export default InboxPage;
