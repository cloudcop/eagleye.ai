import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const HomePage = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <div className="relative z-20 flex min-h-screen items-center">
        <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 md:grid-cols-2">
          {/* Left Column: Text and Buttons */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              AI CCTV that spots theft in seconds
            </h1>
            <p className="mt-4 text-3xl font-semibold text-cyan-400">
              Eagleye.ai
            </p>
            <p className="mt-2 text-lg text-gray-300">
              Smart Vision, Safer Shops
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
              <Button className="bg-cyan-400 text-black hover:bg-cyan-500" size="lg">
                Book a Pilot
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-cyan-400 text-black hover:bg-cyan-500" size="lg">
                    <PlayCircle className="mr-2 h-5 w-5" />
                    Watch 45-sec Demo
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl bg-black border-gray-800 p-0">
                  <DialogHeader className="p-4">
                    <DialogTitle className="text-white">Eagleye.ai Demo</DialogTitle>
                  </DialogHeader>
                  <div className="aspect-video w-full bg-gray-900 flex items-center justify-center text-center p-8">
                    <p className="text-gray-400">
                      (Video player placeholder)
                      <br /><br />
                      This 45-second video demonstrates the Eagleye.ai dashboard. It shows how real-time alerts are generated, how staff can review incidents, manage the banned list, and track all actions in the audit log for compliance.
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
             <Button asChild variant="link" className="mt-4 text-gray-400 hover:text-cyan-400">
                <Link to="/dashboard">Continue to demo dashboard &rarr;</Link>
            </Button>
          </div>

          {/* Right Column: Visuals */}
          <div className="relative flex items-center justify-center">
            <img
              src="/hero-image.png"
              alt="AI surveillance detecting potential shoplifting with a mobile alert"
              className="max-w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;