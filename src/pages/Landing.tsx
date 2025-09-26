import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldBan } from "lucide-react";

const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="text-center max-w-2xl mx-auto p-4">
        <ShieldBan className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to VeriSure AI
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          The intelligent security monitoring dashboard. Gain real-time
          insights, manage alerts, and maintain a secure environment with our
          advanced AI-powered platform.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/signin">Sign In</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link to="/signup">Create Account</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;