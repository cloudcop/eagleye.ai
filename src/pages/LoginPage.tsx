import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Sub-component for the Login Form
const LoginForm = ({ onSubmit }: { onSubmit: (e: React.FormEvent) => void }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email-login">Email</Label>
            <Input id="email-login" type="email" placeholder="m@example.com" required defaultValue="demo@eagleye.ai" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password-login">Password</Label>
            <Input id="password-login" type="password" required defaultValue="password123" />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

// Sub-component for the Sign Up Form
const SignUpForm = ({ onSubmit }: { onSubmit: (e: React.FormEvent) => void }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>
          Create an account to get started.
        </Description>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
           <div className="space-y-2">
            <Label htmlFor="name-signup">Full Name</Label>
            <Input id="name-signup" placeholder="John Doe" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email-signup">Email</Label>
            <Input id="email-signup" type="email" placeholder="m@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password-signup">Password</Label>
            <Input id="password-signup" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 text-2xl font-semibold">
            <Eye className="h-7 w-7 text-primary" />
            <span>Eagleye.ai</span>
          </div>
        </div>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm onSubmit={handleAuth} />
          </TabsContent>
          <TabsContent value="signup">
            <SignUpForm onSubmit={handleAuth} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginPage;