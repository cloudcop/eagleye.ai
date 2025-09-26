import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import type { Alert, AlertStatus, BannedPerson, AlertSeverity } from "@/types";
import { useAuditLog } from "./AuditLogContext";
import { showSuccess, showAlert } from "@/utils/toast";
import { subDays } from "date-fns";

// Helper to generate realistic past timestamps
const generateTimestamp = (daysAgo: number) => subDays(new Date(), daysAgo).toISOString();

// Initial Data with realistic timestamps
const initialAlerts: Alert[] = [
  { id: 1, timestamp: generateTimestamp(0), camera: "Aisle 3", type: "Suspicious Behavior", status: "Unconfirmed", severity: "Medium" },
  { id: 2, timestamp: generateTimestamp(1), camera: "Entrance", type: "Banned Person Detected", status: "Confirmed", severity: "High" },
  { id: 3, timestamp: generateTimestamp(2), camera: "Checkout 2", type: "Suspicious Behavior", status: "False Alarm", severity: "Low" },
  { id: 4, timestamp: generateTimestamp(3), camera: "Aisle 5", type: "Concealment Detected", status: "Confirmed", severity: "High" },
  { id: 5, timestamp: generateTimestamp(4), camera: "Electronics", type: "Loitering", status: "Unconfirmed", severity: "Low" },
  { id: 6, timestamp: generateTimestamp(5), camera: "Entrance", type: "Suspicious Behavior", status: "False Alarm", severity: "Medium" },
  { id: 7, timestamp: generateTimestamp(6), camera: "Stockroom", type: "Banned Person Detected", status: "Confirmed", severity: "High" },
];

const initialBannedList: BannedPerson[] = [
  { id: 1, name: "John Doe", reason: "Shoplifting", date: "2024-07-15", image: "https://github.com/shadcn.png" },
  { id: 2, name: "Jane Smith", reason: "Repeat Offender", date: "2024-06-20" },
  { id: 3, name: "Unknown Male", reason: "Suspicious Activity", date: "2024-05-10" },
];

// Helper to get data from localStorage
const getFromStorage = <T,>(key: string, fallback: T): T => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.error(`Error reading from localStorage key “${key}”:`, error);
    return fallback;
  }
};

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
  const [alerts, setAlerts] = useState<Alert[]>(() => getFromStorage("eagleye_alerts", initialAlerts));
  const [bannedList, setBannedList] = useState<BannedPerson[]>(() => getFromStorage("eagleye_banned_list", initialBannedList));
  const { addLogEntry } = useAuditLog();

  useEffect(() => {
    localStorage.setItem("eagleye_alerts", JSON.stringify(alerts));
  }, [alerts]);

  useEffect(() => {
    localStorage.setItem("eagleye_banned_list", JSON.stringify(bannedList));
  }, [bannedList]);

  // Real-time alert simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Only generate and show alerts when on the dashboard
      if (window.location.pathname.startsWith('/dashboard')) {
        const cameras = ["Entrance", "Aisle 1", "Checkout 4", "Stockroom", "Electronics"];
        const types = ["Suspicious Behavior", "Banned Person Detected", "Concealment Detected", "Loitering"];
        const severities: AlertSeverity[] = ["Low", "Medium", "High"];

        setAlerts(prevAlerts => {
          const newAlert: Alert = {
            id: Math.max(0, ...prevAlerts.map((a) => a.id)) + 1,
            timestamp: new Date().toISOString(),
            camera: cameras[Math.floor(Math.random() * cameras.length)],
            type: types[Math.floor(Math.random() * types.length)],
            status: "Unconfirmed",
            severity: severities[Math.floor(Math.random() * severities.length)],
          };
          
          showAlert(`New Alert: ${newAlert.severity} Severity`, `[${newAlert.camera}] ${newAlert.type}`);
          
          return [newAlert, ...prevAlerts];
        });
      }
    }, 15000); // Every 15 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []); // Empty dependency array ensures this effect runs only once.

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