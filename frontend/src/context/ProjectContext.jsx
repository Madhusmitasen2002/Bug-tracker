import { createContext, useContext, useState } from "react";

const ProjectContext = createContext(null);

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState(null);

  return (
    <ProjectContext.Provider
      value={{ projects, setProjects, activeProject, setActiveProject }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);
