import { createContext, useContext, useState, ReactNode } from "react";
import type { Alert, AlertStatus, BannedPerson } from "@/types";
import { useAuditLog } from "./AuditLogContext";
import { showSuccess } from "@/utils/toast";

// Initial Data
const initialAlerts: Alert[] = [
  { id: 1, time: "2024-07-30 14:25:10", camera: "Aisle 3", type: "Suspicious Behavior", status: "Unconfirmed", severity: "Medium" },
  { id: 2, time: "2024-07-30 14:22:05", camera: "Entrance", type: "Banned Person Detected", status: "Confirmed", severity: "High" },
  { id: 3, time: "2024-07-30 13:50:41", camera: "Checkout 2", type: "Suspicious Behavior", status: "False Alarm", severity: "Low" },
  { id: 4, time: "2024-07-29 18:10:15", camera: "Aisle 5", type: "Concealment Detected", status: "Confirmed", severity: "High" },
];

const initialBannedList: BannedPerson[] = [
  { id: 1, name: "John Doe", reason: "Shoplifting", date: "2024-07-15", image: "https://github.com/shadcn.png" },
  { id: 2, name: "Jane Smith", reason: "Repeat Offender", date: "2024-06-20" },
  { id: 3, name: "Unknown Male", reason: "Suspicious Activity", date: "2024-05-10" },
];

// Context Type
interface AppContextType {
  alerts: Alert[];
  bannedList: BannedPerson[];
  updateAlertStatus: (id: number, status: AlertStatus) => void;
  addPerson: (newPerson: Omit<BannedPerson, "id" | "date">) => void;
  editPerson: (updatedPerson: BannedPerson) => void;
  removePerson: (id: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider Component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [bannedList, setBannedList] = useState<BannedPerson[]>(initialBannedList);
  const { addLogEntry } = useAuditLog();

  const updateAlertStatus = (id: number, status: AlertStatus) => {
    const alertToUpdate = alerts.find((alert) => alert.id === id);
    if (!alertToUpdate) return;

    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, status } : alert)));
    showSuccess(`Alert #${id} has been updated to "${status}".`);
    addLogEntry(`Updated Alert #${id} to ${status}`, `Alert type: ${alertToUpdate.type} from ${alertToUpdate.camera}.`);
  };

  const addPerson = (newPerson: Omit<BannedPerson, "id" | "date">) => {
    const personToAdd: BannedPerson = {
      ...newPerson,
      id: Math.max(0, ...bannedList.map((p) => p.id)) + 1,
      date: new Date().toISOString().split("T")[0],
    };
    setBannedList([personToAdd, ...bannedList]);
    showSuccess(`${personToAdd.name} has been added to the banned list.`);
    addLogEntry(`Added '${personToAdd.name}' to banned list`, `Reason: ${personToAdd.reason}`);
  };

  const editPerson = (updatedPerson: BannedPerson) => {
    setBannedList(bannedList.map((p) => (p.id === updatedPerson.id ? updatedPerson : p)));
    showSuccess(`${updatedPerson.name}'s details have been updated.`);
    addLogEntry(`Edited '${updatedPerson.name}' on banned list`, `Updated details for person ID #${updatedPerson.id}.`);
  };

  const removePerson = (id: number) => {
    const person = bannedList.find((p) => p.id === id);
    if (person) {
      setBannedList(bannedList.filter((p) => p.id !== id));
      showSuccess(`${person.name} has been removed from the banned list.`);
      addLogEntry(`Removed '${person.name}' from banned list`, `Person ID #${id} was permanently removed.`);
    }
  };

  return (
    <AppContext.Provider value={{ alerts, bannedList, updateAlertStatus, addPerson, editPerson, removePerson }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom Hook
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};