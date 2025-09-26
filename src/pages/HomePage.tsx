import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <div className="text-center p-8 max-w-2xl">
        <ShieldCheck className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Welcome to VeriSure AI
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Your advanced AI-powered security monitoring solution. Keep your
          premises safe with real-time alerts and intelligent threat detection.
        </p>
        <div className="mt-8">
          <Button asChild size="lg">
            <Link to="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;