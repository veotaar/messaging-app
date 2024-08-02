import { createFileRoute, redirect, Outlet } from '@tanstack/react-router';
import { conversationsQueryOptions } from '@/api/queryOptions';
import ChatList from '@/components/ChatList';

export const Route = createFileRoute('/conversations')({
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
    <div className="flex">
      <div>
        <ChatList conversations={loaderData.conversations} />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
