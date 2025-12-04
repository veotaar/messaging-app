import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { ModeToggle } from "@/components/ModeToggle";

export const Route = createFileRoute("/home")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <>
      <div className="pointer-events-none h-8 bg-background p-1 font-bold text-primary">
        ⚡Odin Messenger
      </div>

      <div className="flex bg-background">
        <div className="flex flex-col gap-2 bg-background p-2">
          <Link
            className="rounded border border-transparent hover:bg-secondary"
            to="/home/conversations"
            activeProps={{
              className: `font-bold shadow-sm bg-muted border-border`,
            }}
          >
            <div className="p-2 text-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <title>chats</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                />
              </svg>
            </div>
          </Link>
          <Link
            className="rounded border border-transparent hover:bg-secondary"
            to="/home/friends"
            activeProps={{
              className: `font-bold shadow-sm bg-muted border-border`,
            }}
          >
            <div className="p-2 text-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <title>friends</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </div>
          </Link>
          <Link
            className="rounded border border-transparent hover:bg-secondary"
            to="/home/find-friends"
            activeProps={{
              className: `font-bold shadow-sm bg-muted border-border`,
            }}
          >
            <div className="p-2 text-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <title>add friends</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                />
              </svg>
            </div>
          </Link>
          <div className="mt-auto mb-1 self-end">
            <ModeToggle />
          </div>
        </div>
        <div className="h-[calc(100svh-2.5rem)] w-[calc(100svw-4.2rem)] rounded border bg-card">
          <Outlet />
        </div>
      </div>
      <div className="h-2"></div>
    </>
  );
}
