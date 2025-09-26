import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Activity, CheckCircle, Users, Wifi } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { AlertsChart } from "@/components/dashboard/AlertsChart";
import { AlertTypeChart } from "@/components/dashboard/AlertTypeChart";
import { LiveFeed } from "@/components/dashboard/LiveFeed";

const Index = () => {
  const { alerts, bannedList } = useAppContext();

  const totalAlerts = alerts.length;
  const confirmedIncidents = alerts.filter(
    (alert) => alert.status === "Confirmed"
  ).length;
  const bannedIndividuals = bannedList.length;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAlerts}</div>
            <p className="text-xs text-muted-foreground">
              All-time system alerts
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Confirmed Incidents
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{confirmedIncidents}</div>
            <p className="text-xs text-muted-foreground">
              Requires further action
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Banned Individuals
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bannedIndividuals}</div>
            <p className="text-xs text-muted-foreground">
              Currently on the list
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <Wifi className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">Online</div>
            <p className="text-xs text-muted-foreground">
              All cameras operational
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <AlertsChart alerts={alerts} />
        <AlertTypeChart alerts={alerts} />
      </div>
      <LiveFeed />
    </div>
  );
};

export default Index;