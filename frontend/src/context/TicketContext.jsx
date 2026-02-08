import { createContext, useContext, useState } from "react";

const TicketContext = createContext(null);

export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);

  return (
    <TicketContext.Provider value={{ tickets, setTickets }}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTicket = () => useContext(TicketContext);
