// src/components/Home/CardMyWork.jsx
import React, { useState, useEffect } from "react";
import TaskModal from "../modal/TaskModal";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

function CardMyWork() {
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
    <div className="flex flex-col px-3.5 py-3.5 bg-white rounded-xl border border-solid border-stone-300 text-stone-700">
      <div className="text-base font-semibold text-zinc-800 max-md:max-w-full">
        My Work
      </div>
      <div className="flex flex-col mt-6 space-y-2">
      {tasks.length > 0 ? (
          tasks.map((task) => (
            <WorkCard
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
}

const WorkCard = ({ task, onClick }) => {
  return (
    <div
      className="flex gap-5 justify-between px-2.5 py-2 bg-white rounded-xl border border-solid border-zinc-300 max-md:flex-wrap max-md:max-w-full cursor-pointer hover:bg-gray-100"
      onClick={onClick}
    >
      <div className="flex flex-col py-1.5">
        <div className="flex gap-2.5 text-base font-semibold">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/05402f5a66f1ab148e476354a24ec40e7d8ce2c16b870e8009808e704dfd9bb0?"
            className="shrink-0 w-4 aspect-[1.14] fill-stone-700"
          />
          <div className="flex-auto">{task.title} </div>
        </div>
        <div className="mt-3 text-xs font-light">
          กำหนดงาน {new Date(task.dueDate).toLocaleDateString()}
        </div>
      </div>
      <div className="justify-center p-0.5 my-auto text-xs font-light text-center">
        อัปเดทล่าสุด <br /> {new Date(task.updatedAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default CardMyWork;
