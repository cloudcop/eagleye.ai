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
import Footer from "@/components/layout/Footer";
import { BookPilotDialog } from "@/components/home/BookPilotDialog";

const HomePage = () => {
  return (
    <div className="relative flex flex-col min-h-screen w-full overflow-hidden bg-black text-white">
      <main className="relative z-20 flex flex-grow items-center">
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
              <BookPilotDialog />
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-cyan-400 text-black hover:bg-cyan-500 animate-button-glow" size="lg">
                    <PlayCircle className="mr-2 h-5 w-5" />
                    Watch Demo
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl bg-black border-gray-800 p-0">
                  <DialogHeader className="p-4">
                    <DialogTitle className="text-white">Eagleye.ai Demo</DialogTitle>
                  </DialogHeader>
                  <div className="aspect-video w-full">
                    <video
                      className="w-full h-full"
                      src="/EagleyeAI_Product_Demo_Video.mp4"
                      controls
                      autoPlay
                      muted
                      loop
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
             <Button asChild variant="link" className="mt-4 text-gray-400 hover:text-cyan-400">
                <Link to="/login">Continue to demo dashboard &rarr;</Link>
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
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;