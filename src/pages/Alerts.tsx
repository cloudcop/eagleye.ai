import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Alerts = () => {
  const alerts = [
    { id: 1, time: "2024-07-30 14:25:10", camera: "Aisle 3", type: "Suspicious Behavior", status: "Unconfirmed", severity: "Medium" },
    { id: 2, time: "2024-07-30 14:22:05", camera: "Entrance", type: "Banned Person Detected", status: "Confirmed", severity: "High" },
    { id: 3, time: "2024-07-30 13:50:41", camera: "Checkout 2", type: "Suspicious Behavior", status: "False Alarm", severity: "Low" },
    { id: 4, time: "2024-07-29 18:10:15", camera: "Aisle 5", type: "Concealment Detected", status: "Confirmed", severity: "High" },
  ];

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
                <TableHead>Time</TableHead>
                <TableHead>Camera</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell>{alert.time}</TableCell>
                  <TableCell>{alert.camera}</TableCell>
                  <TableCell>{alert.type}</TableCell>
                  <TableCell>
                    <Badge variant={alert.severity === 'High' ? 'destructive' : alert.severity === 'Medium' ? 'secondary' : 'outline'}>
                      {alert.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>{alert.status}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Alerts;