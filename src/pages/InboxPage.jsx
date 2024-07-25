import React, { useState, useEffect } from "react";
import { sampleMail as emails } from "../components/data/mail";

function InboxPage() {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isComposing, setIsComposing] = useState(false);
  return (
    <div className="mx-auto bg-white">
      <Header />
      <hr className="border-t border-neutral-300" />
      <div className="p-6">
        {isComposing ? (
          <ComposeEmail onClose={() => setIsComposing(false)} />
        ) : selectedEmail ? (
          <MailView
            email={selectedEmail}
            onBack={() => setSelectedEmail(null)}
          />
        ) : (
          <MailBox
            onSelectEmail={setSelectedEmail}
            onCompose={() => setIsComposing(true)}
          />
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

function MailBox({ onSelectEmail, onCompose }) {
  const [isAllChecked, setIsAllChecked] = useState(false);

  const handleAllCheckChange = (e) => {
    setIsAllChecked(e.target.checked);
  };

  return (
    <div className="flex flex-col gap-4">
      <WriteButton onClick={onCompose} />
      <div className="flex flex-col px-2.5 py-3.5 bg-white rounded-xl border border-solid border-stone-400">
        <div className="flex my-2 pl-2.5" onClick={(e) => e.stopPropagation()}>
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
            checked={isAllChecked}
            onChange={handleAllCheckChange}
          />
        </div>
        {emails.map((email) => (
          <EmailItem
            key={email.id}
            email={email}
            onSelect={() => onSelectEmail(email)}
            isChecked={isAllChecked}
          />
        ))}
      </div>
    </div>
  );
}
function WriteButton({ onClick }) {
  return (
    <div
      className="flex items-center gap-3.5 p-1.5 max-w-24 text-sm font-bold text-center capitalize whitespace-nowrap rounded-md border border-solid bg-neutral-200 border-stone-300 text-neutral-400 cursor-pointer hover:bg-neutral-300 transition-colors duration-200"
      onClick={onClick}
    >
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/13389e4e51488fd0a8cc93038d87f8daa701ce3f2792c52f8441d8564975a783?"
        className="shrink-0 w-5 aspect-square fill-neutral-400"
      />
      <div className="my-auto">Write</div>
    </div>
  );
}

function EmailItem({ email, onSelect, isChecked }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isItemChecked, setIsItemChecked] = useState(isChecked);

  useEffect(() => {
    setIsItemChecked(isChecked);
  }, [isChecked]);

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleCheckboxChange = (e) => {
    e.stopPropagation();
    setIsItemChecked(e.target.checked);
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
        <div
          className="flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
            checked={isItemChecked}
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
    <div className="bg-white rounded-3xl border border-solid border-stone-400 max-w-lg mx-auto">
      <div className="flex flex-col   px-5 py-4 w-full rounded-t-3xl  bg-slate-700  max-md:max-w-full">
        <div className="flex gap-5 justify-between max-md:flex-wrap max-md:max-w-full">
          <button
            onClick={onBack}
            className="items-center text-white hover:text-slate-300"
          >
            &larr; Back to Inbox
          </button>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/90b7f8fb701af50db4470fff6744e2c27e7d5df231855663ed4dc94a1d4d2ad5?"
            className="shrink-0 aspect-[1.1] fill-gray-100 w-[22px]"
          />
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">{email.subject}</h2>
        <div className="flex justify-between mb-4">
          <div>
            <span className="font-bold">From:</span> {email.from}
          </div>
          <div> {formatDateTime(email.date)}</div>
        </div>
        <div className="border-t pt-4">
          <div className="whitespace-pre-wrap">{email.body}</div>
        </div>
      </div>
    </div>
  );
}

function ComposeEmail({ onClose }) {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the email
    console.log("Sending email:", { to, subject, body });
    onClose();
  };

  return (
    <div className="bg-white rounded-xl border border-solid border-stone-400 p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Compose New Email</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          &times;
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="to" className="block mb-2 font-bold">
            To:
          </label>
          <input
            type="email"
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="subject" className="block mb-2 font-bold">
            Subject:
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="body" className="block mb-2 font-bold">
            Message:
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-2 border rounded"
            rows="10"
            required
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default InboxPage;
