import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

import { useProject } from "../context/ProjectContext";
import { useTicket } from "../context/TicketContext";
import { useAuth } from "../context/AuthContext";

import API from "../api/axios";
import { fetchProjects, createProject, deleteProject } from "../api/projects";
import {
  fetchTicketsByProject,
  createTicket,
  updateTicketStatus,
  deleteTicket,
} from "../api/tickets";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function Workspace() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { projects, setProjects, activeProject, setActiveProject } =
    useProject();
  const { tickets, setTickets } = useTicket();

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");

  // ✅ CORRECT ticket creation state
  const [newTicket, setNewTicket] = useState({
    title: "",
    status: "TODO",
    priority: "MEDIUM",
  });

  /* LOGOUT */
  const handleLogout = async () => {
    await API.post("/auth/logout");
    navigate("/login");
  };

  /* LOAD DATA */
  useEffect(() => {
    fetchProjects().then((res) => setProjects(res.data));
  }, []);

  useEffect(() => {
    if (!activeProject) return;
    fetchTicketsByProject(activeProject._id).then((res) =>
      setTickets(res.data)
    );
  }, [activeProject]);

  /* GROUP TICKETS */
  const columns = {
    TODO: tickets.filter((t) => t.status === "TODO"),
    IN_PROGRESS: tickets.filter((t) => t.status === "IN_PROGRESS"),
    DONE: tickets.filter((t) => t.status === "DONE"),
  };

  return (
    <Layout>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 bg-white p-5 rounded shadow">
        <h1 className="text-2xl font-bold">Workspace</h1>

        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-full border flex items-center justify-center font-semibold">
            {user?.name?.[0]?.toUpperCase() ||
              user?.email?.[0]?.toUpperCase() ||
              "U"}
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* PROJECT HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Projects</h2>
        <button
          className="px-4 py-2 border rounded"
          onClick={() => setShowProjectModal(true)}
        >
          + New Project
        </button>
      </div>

      {/* PROJECT LIST */}
      <div className="flex flex-wrap gap-3 mb-6">
        {projects.map((p) => (
          <div
            key={p._id}
            className={`flex items-center gap-3 px-4 py-2 rounded border cursor-pointer ${
              activeProject?._id === p._id
                ? "bg-gray-200"
                : "bg-white"
            }`}
            onClick={() => setActiveProject(p)}
          >
            <span>{p.title}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!confirm("Delete project?")) return;
                deleteProject(p._id).then(() =>
                  fetchProjects().then((r) => {
                    setProjects(r.data);
                    setActiveProject(null);
                  })
                );
              }}
              className="text-red-500"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {!activeProject && (
        <p className="text-gray-600">
          Select a project to view tickets
        </p>
      )}

      {/* ACTIVE PROJECT */}
      {activeProject && (
        <>
          {/* CREATE TICKET */}
<div className="flex flex-wrap gap-3 mb-6 items-center">
  <input
    className="border p-2 rounded w-64"
    placeholder="Ticket title"
    value={newTicket.title}
    onChange={(e) =>
      setNewTicket((t) => ({ ...t, title: e.target.value }))
    }
  />

  {/* STATUS DROPDOWN */}
  <select
    className="border p-2 rounded"
    value={newTicket.status}
    onChange={(e) =>
      setNewTicket((t) => ({ ...t, status: e.target.value }))
    }
  >
    <option value="TODO">TODO</option>
    <option value="IN_PROGRESS">IN PROGRESS</option>
    <option value="DONE">DONE</option>
  </select>

  {/* PRIORITY DROPDOWN */}
  <select
    className="border p-2 rounded"
    value={newTicket.priority}
    onChange={(e) =>
      setNewTicket((t) => ({ ...t, priority: e.target.value }))
    }
  >
    <option value="LOW">LOW</option>
    <option value="MEDIUM">MEDIUM</option>
    <option value="HIGH">HIGH</option>
  </select>

  <button
    className="px-4 py-2 border rounded"
    onClick={() => {
      if (!newTicket.title) return;

      createTicket({
  title: newTicket.title,
  status: newTicket.status,
  priority: newTicket.priority,
  projectId: activeProject._id, 
}).then(() =>
        fetchTicketsByProject(activeProject._id).then((r) => {
          setTickets(r.data);
          setNewTicket({
            title: "",
            status: "TODO",
            priority: "MEDIUM",
          });
        })
      );
    }}
  >
    + Add Ticket
  </button>
</div>

          {/* KANBAN */}
          <DragDropContext
            onDragEnd={(r) => {
              if (!r.destination) return;
              updateTicketStatus(
                r.draggableId,
                r.destination.droppableId
              ).then(() =>
                fetchTicketsByProject(activeProject._id).then((r) =>
                  setTickets(r.data)
                )
              );
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.keys(columns).map((status) => (
                <Droppable droppableId={status} key={status}>
                  {(p) => (
                    <div
                      ref={p.innerRef}
                      {...p.droppableProps}
                      className={`rounded p-4 min-h-80 ${
                        status === "TODO"
                          ? "bg-blue-50"
                          : status === "IN_PROGRESS"
                          ? "bg-yellow-50"
                          : "bg-green-50"
                      }`}
                    >
                      <h3 className="text-center font-semibold mb-4">
                        {status.replace("_", " ")}
                      </h3>

                      {columns[status].map((t, i) => (
                        <Draggable
                          key={t._id}
                          draggableId={t._id}
                          index={i}
                        >
                          {(p) => (
                            <div
                              ref={p.innerRef}
                              {...p.draggableProps}
                              {...p.dragHandleProps}
                              className="border rounded p-3 mb-3 bg-white"
                            >
                              <p className="font-medium">{t.title}</p>
                              <p className="text-sm">
                                Priority: {t.priority}
                              </p>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {p.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </DragDropContext>
        </>
      )}
    </Layout>
  );
}
