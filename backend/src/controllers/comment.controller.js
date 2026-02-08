const Comment = require("../models/Comment");

// GET COMMENTS BY TICKET
exports.getCommentsByTicket = async (req, res) => {
  try {
    const comments = await Comment.find({
      ticket: req.params.ticketId,
    }).sort({ createdAt: 1 });

    res.json(comments);
  } catch (error) {
    console.error("Get comments error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// ADD COMMENT
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Comment text is required" });
    }

    const comment = await Comment.create({
      text,
      ticket: req.params.ticketId,
      user: req.userId,
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error("Add comment error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
