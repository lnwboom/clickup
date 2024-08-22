import React, { useState } from "react";

function addAgenda({ date, onSave, onClose }) {
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("00:00");
  const [assignee, setAssignee] = useState("");

  const handleSave = () => {
    const newEvent = {
      date,
      description,
      time,
      assignee
    };
    onSave(newEvent);
  };

  return (
    <div className="bg-white p-6 rounded-lg max-w-3xl w-full">
      <div className="flex gap-5 justify-between w-full text-zinc-800">
        <div className="flex gap-1 px-px">
          <div className="grow text-2xl">{date.getDate()} </div>
          <div className="flex gap-0.5 font-semibold whitespace-nowrap">
            <div className="shrink-0 w-px bg-zinc-800 h-[19px]" />
            <div className="flex flex-col self-start">
              <div className="text-xs">{date.toLocaleString('en-US', { month: 'long' })}</div>
              <div className="text-xs">{date.getFullYear()}</div>
            </div>
          </div>
        </div>
        <div className="my-auto text-xl font-semibold text-center">
          {date.toLocaleString('en-US', { weekday: 'short' })}
        </div>
      </div>
      <div className="flex gap-1 py-2.5 mt-6 text-xs font-medium rounded-md border border-solid bg-stone-50 border-stone-300">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d7248a35a0bb2ae0aaff70290b1140e1dd2b97bc9994616f3b56b9f02f7ab48b?"
          className="shrink-0 w-3 aspect-[0.85] fill-zinc-700"
        />
        <input
          type="text"
          className="flex-auto bg-transparent outline-none"
          placeholder="Add description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex gap-5 px-px mt-3.5 w-full text-sm font-medium">
        <div className="flex  gap-1.5">
          <div className="grow my-auto">Time : </div>
          <input
            type="time"
            className="justify-center px-1 py-1 rounded border border-solid bg-stone-50 border-stone-300"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/05402f5a66f1ab148e476354a24ec40e7d8ce2c16b870e8009808e704dfd9bb0?"
            className="shrink-0 self-stretch my-auto w-5 aspect-[1.33] fill-zinc-700"
          />
          <div className="self-stretch my-auto">:</div>
          <input
            type="text"
            className="justify-center py-1.5 rounded border border-solid bg-stone-50 border-stone-300"
            placeholder="Assignee"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
        >
          Save
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default addAgenda;