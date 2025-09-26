export interface BannedPerson {
  id: number;
  name: string;
  reason: string;
  date: string;
  image?: string;
}

export type AlertStatus = "Unconfirmed" | "Confirmed" | "False Alarm";
export type AlertSeverity = "Low" | "Medium" | "High";

export interface Alert {
  id: number;
  timestamp: string; // Changed from 'time' to 'timestamp'
  camera: string;
  type: string;
  status: AlertStatus;
  severity: AlertSeverity;
  image?: string;
}