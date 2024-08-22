import React, { useState } from "react";
import AddAgenda from "./addAgenda";

const DateCard = ({ date, month, year, isCurrentMonth, event, onAddClick }) => (
  <div
    className={`flex flex-col p-2 border border-solid shadow border-neutral-200 ${
      isCurrentMonth ? "bg-white" : "bg-gray-100"
    } rounded-xl`}
  >
    {isCurrentMonth && (
      <>
        <div className="flex font-semibold gap-1 px-px text-zinc-800 justify-center items-center">
          <div className="grow text-base">{date} </div>
          <div className="shrink-0 w-px h-5 bg-zinc-800" />
          <div className="flex flex-col  whitespace-nowrap ">
            <div className="text-sm">{month} </div>
            <div className="text-xs">{year}</div>
          </div>
        </div>
        {event ? (
          <div className="mt-1 p-1 bg-neutral-100 rounded text-xs font-medium text-zinc-500">
            <div>{event.title}</div>
            <div>{event.time}</div>
          </div>
        ) : (
          <div
            className="flex flex-col justify-center items-center py-2 mt-1.5 border border-black border-dashed rounded-md cursor-pointer hover:bg-zinc-100"
            onClick={onAddClick}
          >
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAiNJREFUSEvF1kvoTVEUx/HPHxmQRyihPAoRAxNhRJkyMKKUjCQDKSkyk1dIZGQkpUjJADMDSpFHmSF55ZnHgDJRHnfVOf+O0zl3n3v+/9t/j+7trLW/e61+e6/fgBFaAyPE1St4NFZiLmZkh/6AV7iP300LaQpegH3YgMk1m3/DVRzBy9QBUuBxOIodiGqbrF84jgOI35WrG3gObmBJE1pFzAOs6xz6c1V+HXgx7mBKS2ie9h6r8La8TxV4Oh5h1hChefqTTueW42dxvyrwJWxMQL/jcRazDJMS8aexqxt4UQcaJ0yt21iTBd3C6kRCiCyu4Mc8rlzx+c5V2JKioldwbHkY+6vAY/EVE/oEfo15VeC1uNkAGiFtKo68hXgeP4qt3opzFeCikPLPIaxcLKcQAiuuOsGtx/UyeA+OVYCL1TVsiDrBxWFD4f9VvBsn+gwOxskyeBMu9rnV8T5cLoNj3N1t2Mu24ooX7GEZHEL7gqkN4G3AnzATf8vg+H8W2/oEPoOddS/XfDzrzNJRCXivFYczicdjcEpVDYkLnUu+OQHudUhEJ7cX96wCT0MM8XjUh2M9xQr8SIHje3ise8NgBMIIBvRduYJu1icqvoalLcsOMxFP5OAobFJxHjMeBzM1pgSX58TsDYN4qK3ZKx4wDMLezN5OrOlA2Nsr2dx9k+pSyt6W88dk5m12ydC/yAT5JwWsu8dN84Yc12vFQwbmG/wDmONpH9S+OtIAAAAASUVORK5CYII="
              className="aspect-square w-[13px] items-center"
              alt="Add"
            />
          </div>
        )}
      </>
    )}
  </div>
);

function CardAgenda() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 2)); // March 2024
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({
    4: { title: "#ประชุม", time: "11:30" },
    7: { title: "#ประชุม", time: "12:30" },
    10: { title: "#ประชุม", time: "12:30" },
  });

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const generateDates = () => {
    const dates = [];

    // Add empty cells for days before the 1st of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      dates.push({ date: "", isCurrentMonth: false });
    }

    // Add cells for each day of the month
    for (let i = 1; i <= daysInMonth; i++) {
      dates.push({
        date: i,
        isCurrentMonth: true,
        event: events[i],
      });
    }

    return dates;
  };

  const changeMonth = (delta) => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + delta)
    );
  };

  const handleAddClick = (date) => {
    setSelectedDate(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth(), date)
    );
  };

  const handleSaveEvent = (newEvent) => {
    setEvents((prevEvents) => ({
      ...prevEvents,
      [newEvent.date.getDate()]: {
        title: newEvent.description,
        time: newEvent.time,
      },
    }));
    setSelectedDate(null);
  };

  const handleCloseAddAgenda = () => {
    setSelectedDate(null);
  };

  const monthName = currentMonth.toLocaleString("en-US", { month: "long" });
  const year = currentMonth.getFullYear();

  return (
    <div className="flex flex-col p-4 bg-white rounded-xl border border-solid border-stone-300 ">
      <div className="text-base font-semibold text-zinc-800 mb-4">Agenda</div>
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => changeMonth(-1)} className="text-2xl">
          &lt;
        </button>
        <div className="text-lg font-semibold">{`${monthName} ${year}`}</div>
        <button onClick={() => changeMonth(1)} className="text-2xl">
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-semibold">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {generateDates().map((dateInfo, index) => (
          <DateCard
            key={index}
            date={dateInfo.date}
            month={monthName}
            year={year}
            isCurrentMonth={dateInfo.isCurrentMonth}
            event={dateInfo.event}
            onAddClick={() => handleAddClick(dateInfo.date)}
          />
        ))}
      </div>
      {selectedDate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <AddAgenda
            date={selectedDate}
            onSave={handleSaveEvent}
            onClose={handleCloseAddAgenda}
          />
        </div>
      )}
    </div>
  );
}

export default CardAgenda;
