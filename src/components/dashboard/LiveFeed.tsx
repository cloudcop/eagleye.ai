import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera } from "lucide-react";

const cameraFeeds = [
  { name: "Entrance" },
  { name: "Aisle 3" },
  { name: "Checkout 2" },
  { name: "Electronics" },
];

export const LiveFeed = () => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Live Camera Feeds</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cameraFeeds.map((feed, index) => (
            <div key={index} className="relative aspect-video w-full rounded-md bg-black flex items-center justify-center text-white overflow-hidden">
              <Camera className="h-12 w-12 text-gray-600" />
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-2 text-sm">
                <p>{feed.name}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};