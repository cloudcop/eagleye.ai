import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const cameraFeeds = [
  { name: "Entrance", src: "https://videos.pexels.com/video-files/3209828/3209828-hd_1280_720_25fps.mp4" },
  { name: "Aisle 3", src: "https://videos.pexels.com/video-files/853875/853875-hd_1280_720_30fps.mp4" },
  { name: "Checkout 2", src: "https://videos.pexels.com/video-files/4434246/4434246-hd_1280_720_25fps.mp4" },
  { name: "Electronics", src: "https://videos.pexels.com/video-files/5944228/5944228-hd_1280_720_24fps.mp4" },
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
              <video
                src={feed.src}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
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