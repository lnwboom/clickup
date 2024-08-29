import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { FaStar } from 'react-icons/fa';
import { LuMoreVertical } from "react-icons/lu";

function Workspaces() {
  const [workspaces, setWorkspaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [currentWorkspace, setCurrentWorkspace] = useState(null);
  const [workspaceName, setWorkspaceName] = useState('');
  const [workspaceDescription, setWorkspaceDescription] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/workspaces', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWorkspaces(response.data);
    } catch (error) {
      console.error("Error fetching workspaces:", error);
      setError("Failed to fetch workspaces. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateWorkspace = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/api/workspaces', {
        name: workspaceName,
        description: workspaceDescription
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWorkspaces([...workspaces, response.data]);
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error creating workspace:", error);
      setError("Failed to create workspace. Please try again.");
    }
  };

  const handleEditWorkspace = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(`http://localhost:3000/api/workspaces/${currentWorkspace._id}`, {
        name: workspaceName,
        description: workspaceDescription
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWorkspaces(workspaces.map(w => w._id === currentWorkspace._id ? response.data : w));
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error editing workspace:", error);
      setError("Failed to edit workspace. Please try again.");
    }
  };

  const handleDeleteWorkspace = async (id) => {
    if (window.confirm("Are you sure you want to delete this workspace?")) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3000/api/workspaces/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setWorkspaces(workspaces.filter(w => w._id !== id));
      } catch (error) {
        console.error("Error deleting workspace:", error);
        setError("Failed to delete workspace. Please try again.");
      }
    }
  };

  const handleFavoriteWorkspace = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(`http://localhost:3000/api/workspaces/${id}/favorite`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWorkspaces(workspaces.map(w => w._id === id ? response.data : w));
    } catch (error) {
      console.error("Error favoriting workspace:", error);
      setError("Failed to favorite workspace. Please try again.");
    }
  };

  const openCreateModal = () => {
    setModalMode('create');
    setIsModalOpen(true);
  };

  const openEditModal = (workspace) => {
    setModalMode('edit');
    setCurrentWorkspace(workspace);
    setWorkspaceName(workspace.name);
    setWorkspaceDescription(workspace.description || '');
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setWorkspaceName('');
    setWorkspaceDescription('');
    setCurrentWorkspace(null);
  };

  // Custom Dropdown Menu
  const DropdownMenu = ({ workspace }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    return (
      <div className="relative" ref={dropdownRef}>
        <button onClick={() => setIsOpen(!isOpen)} className="p-1">
          <LuMoreVertical />
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            <button
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                openEditModal(workspace);
                setIsOpen(false);
              }}
            >
              Edit
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              onClick={() => {
                handleDeleteWorkspace(workspace._id);
                setIsOpen(false);
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Workspaces</h1>
        <button
          onClick={openCreateModal}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Create Workspace
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workspaces.map((workspace) => (
          <div key={workspace._id} className="p-4 border rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex justify-between items-start">
              <Link to={`/workspace/${workspace._id}`}>
                <h2 className="text-xl font-semibold">{workspace.name}</h2>
              </Link>
              <div className="flex space-x-2">
                <button onClick={() => handleFavoriteWorkspace(workspace._id)}>
                  <FaStar className={workspace.isFavorite ? "text-yellow-400" : "text-gray-400"} />
                </button>
                <DropdownMenu workspace={workspace} />
              </div>
            </div>
            <p className="text-gray-600 mt-2">{workspace.description}</p>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">{modalMode === 'create' ? 'Create' : 'Edit'} Workspace</h2>
            <form onSubmit={modalMode === 'create' ? handleCreateWorkspace : handleEditWorkspace}>
              <input
                type="text"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                placeholder="Workspace name"
                className="w-full p-2 border rounded-md mb-4"
                required
              />
              <textarea
                value={workspaceDescription}
                onChange={(e) => setWorkspaceDescription(e.target.value)}
                placeholder="Description (optional)"
                className="w-full p-2 border rounded-md mb-4"
                rows="3"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  {modalMode === 'create' ? 'Create' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Workspaces;