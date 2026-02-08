import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ProjectProvider } from "./context/ProjectContext";
import { TicketProvider } from "./context/TicketContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ProjectProvider>
        <TicketProvider>
          <App />
        </TicketProvider>
      </ProjectProvider>
    </AuthProvider>
  </BrowserRouter>
);
