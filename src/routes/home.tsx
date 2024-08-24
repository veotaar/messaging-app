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
        <Link to="/home/friends" activeProps={{ className: `font-bold` }}>
          Friends
        </Link>
      </div>
      <hr />
      <Outlet />
    </>
  );
}
