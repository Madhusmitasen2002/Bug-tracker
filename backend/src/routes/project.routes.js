const express = require("express");
const {
  createProject,
  getProjects,
  deleteProject,
} = require("../controllers/project.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", authMiddleware, getProjects);
router.post("/", authMiddleware, createProject);
router.delete("/:id", authMiddleware, deleteProject);

module.exports = router;
