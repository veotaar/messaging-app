import { createFileRoute, Link, redirect } from "@tanstack/react-router";
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
      <div className="mx-auto max-w-3xl p-2">
        <p>
          <Link to="/login" className="underline underline-offset-8">
            Login
          </Link>{" "}
          or{" "}
          <Link to="/register" className="underline underline-offset-8">
            create an account
          </Link>{" "}
          to start messaging!
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl overflow-hidden text-ellipsis whitespace-nowrap p-2">
      <p>
        <Link to="/home" className="underline underline-offset-8">
          Go to dashboard
        </Link>
      </p>
    </div>
  );
}
