import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AuditLog = () => {
  const logs = [
    { id: 1, timestamp: "2024-07-30 14:22:15", user: "manager@store.com", action: "Confirmed alert #2 (Banned Person)", details: "User confirmed alert for Jane Smith." },
    { id: 2, timestamp: "2024-07-30 13:51:02", user: "staff@store.com", action: "Marked alert #3 as False Alarm", details: "User marked suspicious behavior alert as false." },
    { id: 3, timestamp: "2024-07-29 10:05:30", user: "admin@region.com", action: "Added 'John Doe' to banned list", details: "Reason: Shoplifting. Ban type: Local." },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Audit Log</h1>
      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.timestamp}</TableCell>
                  <TableCell>{log.user}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.details}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditLog;