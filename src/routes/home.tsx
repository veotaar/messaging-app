import { createFileRoute, Link, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/home')({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <>
      <div>
        <Link to="/home/conversations" activeProps={{ className: `font-bold` }}>
          Conversations
        </Link>
      </div>
      <hr />
      <Outlet />
    </>
  );
}
