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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertDetailsDialog } from "@/components/alerts/AlertDetailsDialog";
import type { Alert, AlertStatus, AlertSeverity } from "@/types";
import { useAppContext } from "@/context/AppContext";

const Alerts = () => {
  const { alerts, updateAlertStatus } = useAppContext();
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [severityFilter, setSeverityFilter] = useState<string>("all");

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

  const filteredAlerts = alerts.filter((alert) => {
    const statusMatch = statusFilter === "all" || alert.status === statusFilter;
    const severityMatch =
      severityFilter === "all" || alert.severity === severityFilter;
    return statusMatch && severityMatch;
  });

  const handleClearFilters = () => {
    setStatusFilter("all");
    setSeverityFilter("all");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Alerts</h1>
      <Card>
        <CardHeader>
          <CardTitle>Alert History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Unconfirmed">Unconfirmed</SelectItem>
                <SelectItem value="Confirmed">Confirmed</SelectItem>
                <SelectItem value="False Alarm">False Alarm</SelectItem>
              </SelectContent>
            </Select>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleClearFilters} className="w-full sm:w-auto">
              Clear Filters
            </Button>
          </div>
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
              {filteredAlerts.length > 0 ? (
                filteredAlerts.map((alert) => (
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No alerts match the current filters.
                  </TableCell>
                </TableRow>
              )}
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