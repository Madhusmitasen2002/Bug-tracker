const Project = require("../models/Project");

// CREATE PROJECT
exports.createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Project title is required" });
    }

    const project = await Project.create({
      title,
      description,
      owner: req.userId,
      members: [req.userId],
    });

    res.status(201).json(project);
  } catch (error) {
    console.error("Create project error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// GET PROJECTS
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.userId,
    }).sort({ createdAt: -1 });

    res.json(projects);
  } catch (error) {
    console.error("Get projects error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// DELETE PROJECT
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    if (project.owner.toString() !== req.userId) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await project.deleteOne();
    res.json({ message: "Project deleted" });
  } catch (error) {
    console.error("Delete project error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
