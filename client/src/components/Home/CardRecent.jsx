// src/components/Home/CardRecent.jsx
import React, { useState, useEffect } from "react";
import TaskModal from "../modal/TaskModal"
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const CardRecent = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [updateTrigger, setUpdateTrigger] = useState(0);

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get("http://localhost:3000/api/tasks", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTasks(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError("Failed to fetch tasks. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    if (user) {
      fetchTasks();
    }
  }, [user, updateTrigger]);

  const handleTaskClick = (taskId) => {
    setSelectedTask(taskId);
    setIsModalOpen(true);
  };

  const handleSaveTask = (updatedTask) => {
    setTasks(prevTasks => prevTasks.map(task => 
      task._id === updatedTask._id ? updatedTask : task
    ));
    setIsModalOpen(false);
    setSelectedTask(null);
    setUpdateTrigger(prev => prev + 1);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col justify-center text-base font-medium whitespace-nowrap text-zinc-500 max-md:mt-6 h-full">
      <div className="flex flex-col items-start px-3.5 pt-3.5 pb-9 bg-white rounded-xl border border-solid border-stone-300 h-full">
        <div className="flex gap-5 justify-between self-stretch font-semibold text-zinc-800 max-md:flex-wrap max-md:max-w-full">
          <div className="text-base font-semibold text-zinc-800 max-md:max-w-full">
            Recents
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8bb1816ef61449005531ac9864348f9c60e59f429ba1aa53382f14d4f44dfc9c?"
            className="shrink-0 self-start aspect-[4.17] fill-zinc-800 w-[21px]"
          />
        </div>

        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onClick={() => handleTaskClick(task._id)}
            />
          ))
        ) : (
          <div>No tasks available.</div>
        )}
      </div>

      {isModalOpen && (
        <TaskModal
          tasks={tasks}
          selectedTaskId={selectedTask}
          onClose={handleCloseModal}
          onSave={handleSaveTask}
        />
      )}
    </div>
  );
};

const TaskCard = ({ task, onClick }) => {
  return (
    <div
      key={task._id}
      className="flex gap-3 px-1.5 py-1 mt-1 bg-zinc-300 bg-opacity-0 w-full justify-between cursor-pointer hover:bg-zinc-100"
      onClick={onClick}
    >
      <div className="flex gap-3 items-center">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/aa4281007c805ec47e4aa6b79fe8f37f6dafaf4979dcae3741f5fbccd146e731?"
          className="shrink-0 aspect-[1.08] fill-zinc-500 w-[15px]"
        />
        <div>{task.title}</div>
      </div>
    </div>
  );
};

export default CardRecent;