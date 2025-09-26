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
import { useAppContext } from "@/context/AppContext";

const Alerts = () => {
  const { alerts, updateAlertStatus } = useAppContext();
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  const handleUpdateStatus = (id: number, status: AlertStatus) => {
    updateAlertStatus(id, status);
    setSelectedAlert(null); // Close the dialog
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