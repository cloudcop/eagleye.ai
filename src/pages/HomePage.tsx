import { Button } from "@/components/ui/button";
import { PlayCircle, ShieldCheck, TriangleAlert } from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0a192f] text-white">
      {/* Background Image and Gradient */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop)" }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f] via-[#0a192f] to-transparent"></div>

      {/* CCTV Camera Image */}
      <img
        src="/placeholder.svg"
        alt="CCTV Camera"
        className="absolute -top-4 left-1/2 w-48 h-auto opacity-30 z-10 -translate-x-1/2"
      />

      <div className="relative z-20 flex min-h-screen items-center">
        <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 md:grid-cols-2">
          {/* Left Column: Text and Buttons */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              AI CCTV that spots theft in seconds
            </h1>
            <p className="mt-4 text-3xl font-semibold text-cyan-400">
              Eagleye.AI
            </p>
            <p className="mt-2 text-lg text-gray-300">
              Smart Vision, Safer Shops
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
              <Button className="bg-cyan-400 text-black hover:bg-cyan-500" size="lg">
                Book a Pilot
              </Button>
              <Button variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black" size="lg">
                <PlayCircle className="mr-2 h-5 w-5" />
                Watch 45-sec Demo
              </Button>
            </div>
             <Button asChild variant="link" className="mt-4 text-gray-400 hover:text-cyan-400">
                <Link to="/dashboard">Continue to demo dashboard &rarr;</Link>
            </Button>
          </div>

          {/* Right Column: Visuals */}
          <div className="relative flex h-[500px] items-center justify-center">
            {/* Person Image with Bounding Box */}
            <div className="relative h-full w-full max-w-sm">
              <img
                src="https://images.unsplash.com/photo-1583339933813-815e483a8e5d?q=80&w=1887&auto=format&fit=crop"
                alt="Person in an aisle"
                className="h-full w-full rounded-lg object-cover"
              />
              <div className="absolute inset-4 rounded-lg border-2 border-cyan-400"></div>
              <div className="absolute top-8 left-8 flex items-center gap-2 rounded-full bg-yellow-400/20 px-3 py-1 text-sm text-yellow-300 backdrop-blur-sm">
                <TriangleAlert className="h-4 w-4" />
                <span>Alert</span>
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="absolute -bottom-8 -right-8 w-56 rounded-3xl border-4 border-gray-700 bg-[#1e2a3a] p-4 shadow-2xl sm:bottom-0 sm:right-0">
              <div className="flex flex-col items-center text-center text-white">
                <TriangleAlert className="h-10 w-10 text-yellow-400" />
                <p className="mt-2 font-semibold">
                  Possible shoplifting detected
                </p>
                <p className="text-sm text-gray-400">Aisle 3</p>
              </div>
              <div className="mt-4 flex justify-center">
                <ShieldCheck className="h-8 w-8 text-cyan-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;