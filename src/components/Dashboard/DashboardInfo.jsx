import * as React from "react";
import { tasks } from "../data/data";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { IoMdClose, IoMdDownload, IoMdUndo, IoMdRedo } from "react-icons/io";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

function DashboardInfo({ onClose }) {
  const unassignedTasks = tasks.filter(
    (task) => task.status === "IN PROGRESS"
  ).length;
  const completedTasks = tasks.filter(
    (task) => task.status === "COMPLETED"
  ).length;

  const assigneeCounts = tasks.reduce((acc, task) => {
    if (task.assignee !== "Unassigned") {
      acc[task.assignee] = (acc[task.assignee] || 0) + 1;
    }
    return acc;
  }, {});

  const totalAssignedTasks = Object.values(assigneeCounts).reduce(
    (sum, count) => sum + count,
    0
  );
  const unassignedPercentage = (unassignedTasks / tasks.length) * 100;
  const assignedPercentage = 100 - unassignedPercentage;

  const pieChartData = {
    labels: ["Unassigned", "Assigned"],
    datasets: [
      {
        data: [unassignedPercentage, assignedPercentage],
        backgroundColor: ["#e879f9", "#f0abfc"],
        borderColor: ["#ffffff", "#ffffff"],
        borderWidth: 1,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.parsed.toFixed(1)}%`;
          },
        },
      },
    },
  };

  // Prepare data for bar chart
  const priorities = ["Low", "Normal", "High", "Urgent"];
  const statuses = ["TODO", "IN PROGRESS", "COMPLETED"];

  const barChartData = {
    labels: priorities,
    datasets: statuses.map((status, index) => ({
      label: status,
      data: priorities.map(
        (priority) =>
          tasks.filter(
            (task) => task.priority === priority && task.status === status
          ).length
      ),
      backgroundColor: ["#e76f51", "#e9c46a", "#2a9d8f"][index],
      borderColor: ["#FFFFFF", "#FFFFFF", "#FFFFFF"][index],
      borderWidth: 1,
    })),
  };

  const barChartOptions = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Tasks by Priority and Status",
      },
    },
  };

  return (
    <div className="flex flex-col m-6">
      <div className="flex justify-end mb-5">
        <button
          onClick={onClose}
          className="p-1 hover:bg-violet-100  rounded w-fit"
        >
          <IoMdClose size={"1.5rem"} />
        </button>
      </div>

      <div className="flex-wrap content-start w-full max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center font-semibold max-md:mt-6 max-md:max-w-full">
              <div className="flex flex-col p-4 bg-white rounded-xl border border-solid border-stone-500 max-md:pr-5 max-md:max-w-full">
                <div className="self-start text-base text-zinc-800">
                  Unassigned
                </div>
                <div className="my-14 text-4xl text-center text-black max-md:mt-10">
                  {unassignedTasks}
                  <br />
                  <span className="text-sm font-[275]">tasks in progress</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow p-4 w-full font-semibold bg-white rounded-xl border border-solid border-stone-500 max-md:mt-6 max-md:max-w-full">
              <div className="text-base text-zinc-800 max-md:max-w-full">
                Completed
              </div>
              <div className="my-14 text-4xl text-center text-black max-md:mt-10">
                {completedTasks}
                <br />
                <span className="text-sm font-[275]">tasks completed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-wrap content-start mt-7 w-full max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center text-base max-md:mt-6 max-md:max-w-full">
              <div className="flex flex-col items-center p-4 bg-white rounded-xl border border-solid border-stone-500 max-md:pr-5 max-md:max-w-full">
                <div className="self-start font-semibold text-zinc-800 max-md:max-w-full">
                  Total Tasks by Assignee
                </div>
                <div className="w-[330px] h-[300px] my-10">
                  <Pie data={pieChartData} options={pieChartOptions} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center max-md:mt-6 max-md:max-w-full">
              <div className="flex flex-col p-4 bg-white rounded-xl border border-solid border-stone-500 max-md:pr-5 max-md:max-w-full">
                <div className="text-base font-semibold text-zinc-800 max-md:max-w-full">
                  My Work
                </div>
                <div className="mt-10 h-[300px] ">
                  <Bar data={barChartData} options={barChartOptions} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardInfo;
