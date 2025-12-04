import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/home/")({
  component: HomeIndexComponent,
});

function HomeIndexComponent() {
  return (
    <div>
      <p>Home component</p>
    </div>
  );
}
