import { createFileRoute, redirect } from '@tanstack/react-router';
import { conversationsQueryOptions } from '@/api/queryOptions';
import { useAuth } from '@/lib/auth';

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
  const { userId } = useAuth();

  if (!loaderData) {
    return <p>loading your chats...</p>;
  }

  return (
    <div>
      {loaderData.conversations.map((conversation) => {
        return (
          <div key={conversation._id}>
            <p>{conversation.participants.filter((user) => user._id !== userId).at(0)?.username}</p>
          </div>
        );
      })}
    </div>
  );
}
