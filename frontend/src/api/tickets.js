import API from "./axios";

export const fetchTicketsByProject = (projectId, params = {}) =>
  API.get(`/tickets/project/${projectId}`, { params });

export const createTicket = (data) => API.post("/tickets", data);

export const updateTicketStatus = (id, status) =>
  API.patch(`/tickets/${id}/status`, { status });

export const assignTicket = (id, assigneeId) =>
  API.patch(`/tickets/${id}/assign`, { assigneeId });

export const deleteTicket = (id) =>
  API.delete(`/tickets/${id}`);
