import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
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