import { createFileRoute, Link, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/home')({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <>
      <div className="flex gap-4 p-2">
        <Link to="/home/conversations" activeProps={{ className: `font-bold` }}>
          Conversations
        </Link>
        <Link to="/home/friends" activeProps={{ className: `font-bold` }}>
          Friends
        </Link>
        <Link to="/home/find-friends" activeProps={{ className: `font-bold` }}>
          Find Friends
        </Link>
      </div>
      <hr />
      <Outlet />
    </>
  );
}
