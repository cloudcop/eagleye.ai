import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertDetailsDialog } from "@/components/alerts/AlertDetailsDialog";
import type { Alert, AlertStatus } from "@/types";
import { showSuccess } from "@/utils/toast";

const initialAlerts: Alert[] = [
  {
    id: 1,
    time: "2024-07-30 14:25:10",
    camera: "Aisle 3",
    type: "Suspicious Behavior",
    status: "Unconfirmed",
    severity: "Medium",
  },
  {
    id: 2,
    time: "2024-07-30 14:22:05",
    camera: "Entrance",
    type: "Banned Person Detected",
    status: "Confirmed",
    severity: "High",
  },
  {
    id: 3,
    time: "2024-07-30 13:50:41",
    camera: "Checkout 2",
    type: "Suspicious Behavior",
    status: "False Alarm",
    severity: "Low",
  },
  {
    id: 4,
    time: "2024-07-29 18:10:15",
    camera: "Aisle 5",
    type: "Concealment Detected",
    status: "Confirmed",
    severity: "High",
  },
];

const Alerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  const handleUpdateStatus = (id: number, status: AlertStatus) => {
    setAlerts(
      alerts.map((alert) => (alert.id === id ? { ...alert, status } : alert))
    );
    setSelectedAlert(null); // Close the dialog
    showSuccess(`Alert #${id} has been updated to "${status}".`);
  };

  const getStatusColor = (status: AlertStatus) => {
    switch (status) {
      case "Confirmed":
        return "bg-red-500";
      case "False Alarm":
        return "bg-green-500";
      default:
        return "bg-yellow-500";
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Alerts</h1>
      <Card>
        <CardHeader>
          <CardTitle>Alert History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Camera</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${getStatusColor(
                          alert.status
                        )}`}
                      />
                      {alert.status}
                    </div>
                  </TableCell>
                  <TableCell>{alert.time}</TableCell>
                  <TableCell>{alert.camera}</TableCell>
                  <TableCell>{alert.type}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        alert.severity === "High"
                          ? "destructive"
                          : alert.severity === "Medium"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {alert.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedAlert(alert)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <AlertDetailsDialog
        alert={selectedAlert}
        open={!!selectedAlert}
        onOpenChange={(open) => !open && setSelectedAlert(null)}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};

export default Alerts;