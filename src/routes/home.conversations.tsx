import { createFileRoute, redirect, Outlet } from '@tanstack/react-router';
import { conversationsQueryOptions } from '@/api/queryOptions';
import ChatList from '@/components/ChatList';

export const Route = createFileRoute('/home/conversations')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: Conversations,
  loader: async ({ context }) => {
    const { userId, token } = context.auth;
    return await context.queryClient.ensureQueryData(conversationsQueryOptions(userId as string, token as string));
  },
});

function Conversations() {
  const loaderData = Route.useLoaderData();

  if (!loaderData) {
    return <p>loading your chats...</p>;
  }

  return (
    <div className="flex h-full">
      <div className="rounded-l-md border-r p-2">
        <ChatList conversations={loaderData.conversations} />
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}
