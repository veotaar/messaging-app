import { createFileRoute } from "@tanstack/react-router";
import RegisterForm from "@/components/RegisterForm";

export const Route = createFileRoute("/register")({
  component: Register,
});

function Register() {
  return (
    <div className="h-full w-full">
      <h1 className="my-6 text-center font-bold text-2xl">
        Create your account
      </h1>
      <RegisterForm />
    </div>
  );
}
