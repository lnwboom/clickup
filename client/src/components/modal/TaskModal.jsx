// src/components/Home/TaskModal.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskModal = ({ tasks, selectedTaskId, onClose, onSave }) => {
  const [activeTask, setActiveTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editedTasks, setEditedTasks] = useState(tasks);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/tasks/${selectedTaskId}`
        );
        setActiveTask(response.data);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };
    if (selectedTaskId) {
      fetchTask();
    }
  }, [selectedTaskId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setActiveTask({ ...activeTask, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const response = axios.patch(
        `http://localhost:3000/api/tasks/${activeTask._id}`,
        activeTask
      );
      onSave(response.data);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  if (!activeTask) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-3xl border-4 border-solid border-neutral-400 max-w-3xl w-full">
        <div className="m-4 flex space-x-2 overflow-x-auto border-b border-solid border-neutral-400">
          {tasks.map((task) => (
            <button
              key={task._id}
              onClick={() => setActiveTask(task._id)}
              className={`px-4 py-2 rounded-t-lg ${
                activeTask === task._id
                  ? "pb-4 text-violet-500 border-b-2 border-violet-500"
                  : ""
              }`}
            >
              {task.title}
            </button>
          ))}
        </div>
        <div className="p-4">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col self-center px-2.5 py-1.5 mb-5 w-full max-w-[999px] max-md:pr-5 max-md:max-w-full">
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={activeTask.title}
                  onChange={handleInputChange}
                  className="text-4xl font-semibold text-zinc-800 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="flex flex-wrap gap-2 justify-between content-start pr-12 mt-9 max-md:pr-5">
                <div className="flex gap-5 items-center self-start pr-20 whitespace-nowrap max-md:flex-wrap">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/8e11ee6d50c92c1ca70a034d5fd09f13fa4a73c1e347616f0574cd537236ddc2?"
                    className="shrink-0 self-stretch my-auto aspect-square fill-black w-[22px]"
                  />
                  <div className="self-stretch my-auto text-base font-medium text-right text-black">
                    Status
                  </div>
                  <select
                    name="status"
                    value={activeTask.status}
                    onChange={handleInputChange}
                    className="self-stretch px-2.5 py-1 text-xs rounded-md border border-solid border-stone-300 text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400"
                  >
                    <option value="TODO" className="text-stone-600">
                      TODO
                    </option>
                    <option value="IN PROGRESS" className="text-stone-600">
                      IN PROGRESS
                    </option>
                    <option value="COMPLETED" className="text-green-700">
                      COMPLETED
                    </option>
                  </select>
                </div>
                {/* <div className="flex gap-3 items-center max-md:flex-wrap">
                  <div className="flex flex-col items-center self-stretch px-1.5 my-auto">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/51ffcad71eac7121fc05ed8d3884be7fabb4f1deaabd71e7dc837e4e811dec0e?"
                      className=" aspect-[1.89] w-[15px]"
                    />
                  </div>
                  <div className="self-stretch my-auto text-base font-medium text-right text-black">
                    Assignee
                  </div>
                  <input
                    type="text"
                    name="assignee"
                    value={activeTask.assignee}
                    onChange={handleInputChange}
                    className="self-stretch px-3 py-1.5 text-xs whitespace-nowrap rounded-md border border-solid border-stone-300 text-stone-400"
                  />
                </div> */}
              </div>
              <div className="flex flex-wrap gap-5 justify-between content-start pr-14 mt-6 whitespace-nowrap max-md:pr-5">
                <div className="flex gap-5 px-px max-md:flex-wrap">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/6123589d7e3f37571ed3c141961c4170baf2246e6afa9e0b35983fcf6aa26a83?"
                    className="shrink-0 self-start w-6 aspect-square"
                  />
                  <div className="my-auto text-base font-medium text-black">
                    Date
                  </div>
                  <input
                    type="date"
                    name="date"
                    value={
                      activeTask.dueDate ? activeTask.dueDate.split("T")[0] : ""
                    }
                    onChange={handleInputChange}
                    className="px-3 py-1.5 text-xs rounded-md border border-solid border-stone-300 text-stone-400"
                  />
                </div>
                <div className="flex gap-3.5 justify-between px-0.5 max-md:flex-wrap">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/959303cd0233075c9bc3ab3ceaad4b1d7d0ed050234038d1ee094eff9c477813?"
                    className="shrink-0 self-start border border-black border-solid aspect-[0.85] stroke-[1px] stroke-black w-[17px]"
                  />
                  <div className="my-auto text-base font-medium text-black">
                    Priority
                  </div>
                  <select
                    name="priority"
                    value={activeTask.priority}
                    onChange={handleInputChange}
                    className="px-3 py-1.5 text-xs rounded-md border border-solid border-stone-300 text-stone-600 bg-white focus:outline-none focus:ring-2 focus:ring-stone-400"
                  >
                    <option value="Low" className="text-green-600">
                      Low
                    </option>
                    <option value="Normal" className="text-blue-600">
                      Normal
                    </option>
                    <option value="High" className="text-yellow-600">
                      High
                    </option>
                    <option value="Urgent" className="text-red-600">
                      Urgent
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={activeTask.description}
                onChange={handleInputChange}
                rows="3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              ></textarea>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Savign..." : "Save All"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
