import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { Button } from "../components/ui/button";
import { useAuth } from "../lib/auth";

export const Route = createFileRoute("/")({
  component: Index,
  beforeLoad: ({ context, location }) => {
    console.log(context);
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: "/home/conversations",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function Index() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-primary/5 via-background to-accent/5 px-4">
        <div className="mx-auto w-full max-w-4xl space-y-8 text-center">
          {/* Hero Section */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="text-muted-foreground">It's real-time!</span>
            </div>

            <h1 className="bg-linear-to-r from-foreground to-foreground/70 bg-clip-text font-bold text-5xl text-transparent tracking-tight sm:text-6xl md:text-7xl">
              Odin Messenger
            </h1>

            <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Instant messaging app demo, made with Express + MongoDB +
              Socket.io + React + Typescript
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to="/register">Get Started</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-primary/5 via-background to-accent/5 px-4">
      <div className="w-full max-w-md space-y-6 rounded-lg border bg-card p-8 text-center shadow-lg">
        <div className="space-y-2">
          <h2 className="font-bold text-3xl">Welcome Back!</h2>
          <p className="text-muted-foreground">You're already signed in</p>
        </div>
        <Button asChild size="lg" className="w-full">
          <Link to="/home/conversations">Go to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
