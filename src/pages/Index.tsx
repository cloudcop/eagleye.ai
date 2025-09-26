import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Activity, CheckCircle, Users, Wifi } from "lucide-react";

const Index = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Alerts Today
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+5% from yesterday</p>
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
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">This week</p>
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
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">+2 since last month</p>
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
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Live Camera Feed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black aspect-video rounded-md flex items-center justify-center text-white">
                Camera 1 Feed
              </div>
              <div className="bg-black aspect-video rounded-md flex items-center justify-center text-white">
                Camera 2 Feed
              </div>
              <div className="bg-black aspect-video rounded-md flex items-center justify-center text-white">
                Camera 3 Feed
              </div>
              <div className="bg-black aspect-video rounded-md flex items-center justify-center text-white">
                Camera 4 Feed
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;