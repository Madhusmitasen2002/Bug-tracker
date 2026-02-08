const Ticket = require("../models/Ticket");

// CREATE TICKET
exports.createTicket = async (req, res) => {
  try {
    const {
      title,
      projectId,
      priority = "MEDIUM",
      status = "TODO",
    } = req.body;

    if (!title || !projectId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const ticket = await Ticket.create({
      title,
      project: projectId,
      priority,
      status,
      createdBy: req.userId,
    });

    res.status(201).json(ticket);
  } catch (error) {
    console.error("Create ticket error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ YOU WERE MISSING THIS
// GET TICKETS BY PROJECT
exports.getTicketsByProject = async (req, res) => {
  try {
    const tickets = await Ticket.find({
      project: req.params.projectId,
    }).sort({ createdAt: -1 });

    res.json(tickets);
  } catch (error) {
    console.error("Get tickets error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// UPDATE STATUS
exports.updateTicketStatus = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(ticket);
  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// DELETE TICKET
exports.deleteTicket = async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);
    res.json({ message: "Ticket deleted" });
  } catch (error) {
    console.error("Delete ticket error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
