// src/components/Home/CardMyWork.jsx
import React, { useState, useEffect } from "react";
import { tasks as mockTasks } from "../data/data";
import TaskModal from "../modal/TaskModal";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

function CardMyWork() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const handleTaskClick = (taskId) => {
    setSelectedTask(taskId);
    setIsModalOpen(true);
  };

  const handleSaveTask = (updatedTasks) => {
    setTasks(updatedTasks);
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };
  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="flex flex-col px-3.5 py-3.5 bg-white rounded-xl border border-solid border-stone-300 text-stone-700">
      <div className="text-base font-semibold text-zinc-800 max-md:max-w-full">
        My Work
      </div>
      <div className="flex flex-col mt-6 space-y-2">
        {tasks.map((task) => (
          <WorkCard
            key={task._id}
            task={task}
            onClick={() => handleTaskClick(task._id)}
          />
        ))}
      </div>

      {isModalOpen && (
        <TaskModal
          tasks={tasks}
          selectedTaskId={selectedTask}
          onClose={handleCloseModal}
          onSave={handleSaveTask}
          onAddTask={handleAddTask}
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
