import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CardMyWork from '../components/Home/CardMyWork';
import CardRecent from '../components/Home/CardRecent';
import CardAgenda from '../components/Home/CardAgenda';
import CardAssigned from '../components/Home/CardAssigned';
import CardAiStandup from '../components/Home/CardAiStandup';

function Workspace() {
  const { workspaceId } = useParams();
  const [workspace, setWorkspace] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkspace = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/workspaces/${workspaceId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setWorkspace(response.data);
      } catch (error) {
        console.error("Error fetching workspace:", error);
        setError("Failed to fetch workspace. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkspace();
  }, [workspaceId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!workspace) return <div>Workspace not found.</div>;

  return (
    <div className="mx-auto bg-white min-h-screen flex flex-col">
      <h1 className="text-2xl font-bold p-4">{workspace.name}</h1>
      <hr className="border-t border-neutral-300" />

      <div className="flex flex-col m-6">
        <div className="flex-wrap content-start w-full max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
              <CardRecent />
            </div>
            <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
              <CardAgenda />
            </div>
          </div>
          <div className="flex-wrap content-start mt-7 w-full max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col">
              <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                <CardMyWork />
              </div>
              <div className="flex flex-col gap-6 w-6/12 max-md:ml-0 max-md:w-full">
                <CardAssigned />
                <CardAiStandup />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Workspace;