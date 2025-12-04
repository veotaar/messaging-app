import { createFileRoute } from "@tanstack/react-router";
import LoginForm from "@/components/LoginForm";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  return (
    <div className="h-full w-full">
      <h1 className="my-6 text-center font-bold text-2xl">
        Login to your account
      </h1>
      <LoginForm />
    </div>
  );
}
