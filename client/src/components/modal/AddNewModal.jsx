import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const NewModal = ({ isOpen, onClose, onAddTask, onAddDoc, onAddChat }) => {
  const { user } = useAuth();
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState("Task");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [file, setFile] = useState(null);
  const [chatTitle, setChatTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleAddTask = async () => {
    if (!user) {
      alert("Please log in to create a task.");
      return;
    }
    if (taskTitle && taskDate) {
      setIsLoading(true);
      try {
        const newTask = {
          title: taskTitle,
          description: taskDescription,
          dueDate: taskDate,
          status: "TODO",
          priority: 1,
          user: userId,
        };

        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:3000/api/tasks/tasks",
          newTask,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 201 || response.status === 200) {
          console.log("Task added successfully:", response.data);
          onClose();
          if (onAddTask) {
            onAddTask(response.data);
          }
        } else {
          throw new Error("Unexpected response status: " + response.status);
        }
      } catch (error) {
        console.error("Error adding task:", error);
        alert(
          "Error adding task: " +
            (error.response?.data?.message || error.message)
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Please fill in at least the title and due date.");
    }
  };

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  const handleAddDoc = () => {
    if (file) {
      onAddDoc(file);
      onClose();
    } else {
      alert("Please select a file to upload.");
    }
  };

  const handleAddChat = () => {
    if (chatTitle) {
      const newChat = {
        id: Date.now(),
        title: chatTitle,
        messages: [],
      };
      onAddChat(newChat);
      onClose();
    } else {
      alert("Please enter a chat title.");
    }
  };
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="flex flex-col justify-center max-w-[406px]">
        <div className="flex flex-col p-3.5 w-full bg-white rounded-3xl border-2 border-neutral-400">
          <div className="flex gap-5 justify-between self-center w-full text-xs font-medium whitespace-nowrap max-w-[370px]  text-neutral-400  border-b border-solid  border-neutral-400">
            <div className="flex gap-5 justify-between pr-5 my-auto    ">
              {["Task", "Doc", "Chat", "Whiteboard"].map((tab) => (
                <div
                  key={tab}
                  className={`cursor-pointer border-b-2 pb-4 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300${
                    activeTab === tab
                      ? "pb-4 text-violet-500 border-b-2 border-violet-500"
                      : ""
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </div>
              ))}
            </div>
            <button
              className="text-gray-600 hover:text-gray-900 flex items-start"
              onClick={onClose}
            >
              &times;
            </button>
          </div>
          {activeTab === "Task" && (
            <div className="flex z-10 flex-col px-3.5 w-full font-medium text-neutral-400">
              <div className="mt-7 text-sm">Task name</div>
              <input
                type="text"
                className="py-2.5 mt-2 text-xs rounded-md border border-solid bg-stone-50 border-stone-300 px-2"
                placeholder="Enter task name"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
              <div className="mt-6 text-sm">Description</div>
              <textarea
                className="py-2.5 mt-2 text-xs rounded-md border border-solid bg-stone-50 border-stone-300 px-2"
                placeholder="Add description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
              <div className="mt-6 text-sm">Due date</div>
              <input
                type="date"
                className="py-2.5 mt-2 text-xs rounded-md border border-solid bg-stone-50 border-stone-300 px-2"
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
              />
              <div className="flex flex-wrap gap-1.5 content-start pr-20 mt-3.5 text-xs text-stone-400">
                <div className="justify-center px-2.5 py-1 whitespace-nowrap rounded-md border border-solid border-stone-300">
                  TODO
                </div>
                <div className="justify-center px-2.5 py-1 whitespace-nowrap rounded-md border border-solid border-stone-300">
                  Assignee
                </div>
                <div className="justify-center px-2.5 py-1 rounded-md border border-solid border-stone-300">
                  Due date
                </div>
                <div className="justify-center px-2.5 py-1 whitespace-nowrap rounded-md border border-solid border-stone-300">
                  Priority
                </div>
              </div>
              <div className="mt-8 w-full border border-solid bg-neutral-400 border-neutral-400 min-h-[1px]" />
              <div className="flex gap-5 justify-between self-center mt-3 w-full max-w-[372px]">
                <div className="flex gap-3 my-auto">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/aa4adcef7da598ce9656cbba4ff6d2bd17fe416cb5e5615dd38687a201b8c60e?"
                    className="shrink-0  aspect-[1.05] border-neutral-400  stroke-neutral-400 w-[21px]"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/32593d4cf9b8dcc5cb10196f0fc6ce3958e24684fcb02bfa1b74fa2d26df0aab?"
                    className="shrink-0  aspect-[1.05] border-neutral-400 stroke-neutral-400 w-[21px]"
                  />
                </div>
                <button
                  className="justify-center px-2.5 py-1 text-sm font-semibold text-white bg-purple-500 rounded-xl"
                  onClick={handleAddTask}
                  disabled={isLoading}
                >
                  {isLoading ? "Creating..." : "Create Task"}
                </button>
              </div>
            </div>
          )}

          {activeTab === "Doc" && (
            <div className="flex z-10 flex-col px-3.5 w-full font-medium text-neutral-400">
              <div className="mt-7 text-sm">Upload Document</div>
              <input
                type="file"
                className="py-2.5 mt-2 text-xs rounded-md border border-solid bg-stone-50 border-stone-300 px-2"
                onChange={handleFileUpload}
              />

              <button
                className="mt-6 px-2.5 py-1 text-sm font-semibold text-white bg-purple-500 rounded-xl"
                onClick={handleAddDoc}
              >
                Upload Document
              </button>
            </div>
          )}
          {activeTab === "Chat" && (
            <div className="flex z-10 flex-col px-3.5 w-full font-medium text-neutral-400">
              <div className="mt-7 text-sm">Chat Title</div>
              <input
                type="text"
                className="py-2.5 mt-2 text-xs rounded-md border border-solid bg-stone-50 border-stone-300 px-2"
                placeholder="Enter chat title"
                value={chatTitle}
                onChange={(e) => setChatTitle(e.target.value)}
              />
              <button
                className="mt-6 px-2.5 py-1 text-sm font-semibold text-white bg-purple-500 rounded-xl"
                onClick={handleAddChat}
              >
                Create Chat Thread
              </button>
            </div>
          )}

          {activeTab === "Whiteboard" && (
            <div className="flex z-10 flex-col px-3.5 w-full font-medium text-neutral-400">
              <div className="mt-7 text-sm">
                Whiteboard functionality not implemented yet.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewModal;
