import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Tasks from "./pages/Tasks.jsx";
import Profile from "./pages/Profile.jsx";
import Settings from "./pages/Settings.jsx";
import NotificationSettings from "./pages/NotificationSettings.jsx";
import Doc from "./pages/Doc.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import WhiteboardPage from "./pages/Whiteboard.jsx";
import Inbox from "./pages/InboxPage.jsx";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";
import { useAuth } from "./context/AuthContext.jsx";
import { Navigate } from "react-router-dom";
import Workspace from "./pages/Workspace.jsx";
import Workspaces from "./components/Workspaces/Workspaces.jsx";
function App() {
  const { user, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <BrowserRouter>
      <div className=" bg-gray-100 flex flex-col font-poppins">
        <Header />
        <div className="flex flex-auto h-screen">
          <Sidebar />
          <main className="flex-grow">
            <Routes>
            <Route path="/workspaces" element={<Workspaces />} />
            <Route path="/workspace/:workspaceId" element={<Workspace />} />
              <Route
                path="/"
                element={user ? <Home /> : <Navigate to="/login" />}
              />
              <Route
                path="/docs"
                element={user ? <Doc /> : <Navigate to="/login" />}
              />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/signup"
                element={!user ? <Signup /> : <Navigate to="/" />}
              />
              <Route
                path="/tasks"
                element={user ? <Tasks /> : <Navigate to="/login" />}
              />
              <Route
                path="/profile"
                element={user ? <Profile /> : <Navigate to="/login" />}
              />
              <Route
                path="/settings"
                element={user ? <Settings /> : <Navigate to="/login" />}
              />
              <Route
                path="/notification-settings"
                element={
                  user ? <NotificationSettings /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/dashboard"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route
                path="/whiteboard"
                element={user ? <WhiteboardPage /> : <Navigate to="/login" />}
              />
              <Route
                path="/inbox"
                element={user ? <Inbox /> : <Navigate to="/login" />}
              />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
