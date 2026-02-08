const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  createTicket,
  getTicketsByProject,
  updateTicketStatus,
  deleteTicket,
} = require("../controllers/ticket.controller");

// CREATE
router.post("/", authMiddleware, createTicket);

// GET BY PROJECT
router.get(
  "/project/:projectId",
  authMiddleware,
  getTicketsByProject
);

// UPDATE STATUS
router.put("/:id/status", authMiddleware, updateTicketStatus);

// DELETE
router.delete("/:id", authMiddleware, deleteTicket);

module.exports = router;
