import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotificationSettings from "./pages/NotificationSettings";
import Doc from "./pages/Doc";
import Dashboard from "./pages/Dashboard";
import Whiteboard from "./pages/Whiteboard";
import Inbox from "./pages/InboxPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 flex flex-col font-poppins">
        <Header />
        <div className="flex flex-grow">
          <Sidebar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/docs" element={<Doc />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route
                path="/notification-settings"
                element={<NotificationSettings />}
              />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/whiteboard" element={<Whiteboard />} />
              <Route path="/inbox" element={<Inbox />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
