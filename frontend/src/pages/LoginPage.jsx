import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MessageCircle,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { isPending: loading, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    loginMutation({ email: email.trim(), password });
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-bg items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full border border-primary-foreground/20" />
          <div className="absolute bottom-32 right-16 w-48 h-48 rounded-full border border-primary-foreground/20" />
          <div className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full border border-primary-foreground/20" />
        </div>
        <div className="relative z-10 text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-8">
            <MessageCircle className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-primary-foreground mb-4 tracking-tight">
            Welcome back to
            <br />
            Collab Sphere
          </h1>
          <p className="text-primary-foreground/80 text-lg leading-relaxed">
            Connect with learners worldwide. Practice languages, share code, and
            grow together.
          </p>
        </div>
      </div>

      {/* Right side - form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Collab Sphere</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight mb-2">
              Sign in to your account
            </h2>
            <p className="text-muted-foreground text-sm">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-primary font-medium hover:underline"
              >
                Sign up free
              </Link>
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium">
              {error.response?.data?.message || "Login failed"}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary/50 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full h-11 pl-10 pr-11 rounded-xl border border-border bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl gradient-bg text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all shadow-glow flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
