import { createContext, useContext, useState, ReactNode } from "react";

interface AuditLogEntry {
  id: number;
  timestamp: string;
  user: string;
  action: string;
  details: string;
}

interface AuditLogContextType {
  logs: AuditLogEntry[];
  addLogEntry: (action: string, details: string) => void;
}

const AuditLogContext = createContext<AuditLogContextType | undefined>(
  undefined
);

const initialLogs: AuditLogEntry[] = [
  {
    id: 1,
    timestamp: "2024-07-30 14:22:15",
    user: "manager@store.com",
    action: "Confirmed alert #2 (Banned Person)",
    details: "User confirmed alert for Jane Smith.",
  },
  {
    id: 2,
    timestamp: "2024-07-30 13:51:02",
    user: "staff@store.com",
    action: "Marked alert #3 as False Alarm",
    details: "User marked suspicious behavior alert as false.",
  },
  {
    id: 3,
    timestamp: "2024-07-29 10:05:30",
    user: "admin@region.com",
    action: "Added 'John Doe' to banned list",
    details: "Reason: Shoplifting. Ban type: Local.",
  },
];

export const AuditLogProvider = ({ children }: { children: ReactNode }) => {
  const [logs, setLogs] = useState<AuditLogEntry[]>(initialLogs);

  const addLogEntry = (action: string, details: string) => {
    const newLog: AuditLogEntry = {
      id: logs.length + 1,
      timestamp: new Date().toLocaleString(),
      user: "admin@eagleye.ai", // Hardcoded for demo
      action,
      details,
    };
    setLogs((prevLogs) => [newLog, ...prevLogs]);
  };

  return (
    <AuditLogContext.Provider value={{ logs, addLogEntry }}>
      {children}
    </AuditLogContext.Provider>
  );
};

export const useAuditLog = () => {
  const context = useContext(AuditLogContext);
  if (context === undefined) {
    throw new Error("useAuditLog must be used within an AuditLogProvider");
  }
  return context;
};