const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getCommentsByTicket,
  addComment,
} = require("../controllers/comment.controller");

const router = express.Router();

// GET comments for a ticket
router.get("/:ticketId", authMiddleware, getCommentsByTicket);

// ADD comment
router.post("/:ticketId", authMiddleware, addComment);

module.exports = router;
