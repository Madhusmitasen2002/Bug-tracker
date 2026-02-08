import API from "./axios";

export const fetchComments = (ticketId) =>
  API.get(`/comments/${ticketId}`);

export const addComment = (ticketId, text) =>
  API.post(`/comments/${ticketId}`, { text });
