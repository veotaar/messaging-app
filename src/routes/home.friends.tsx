import { createFileRoute, redirect } from '@tanstack/react-router';
import { friendsQueryOptions } from '@/api/queryOptions';

export const Route = createFileRoute('/home/friends')({
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
  component: Friends,
  loader: async ({ context }) => {
    const { userId, token } = context.auth;
    return await context.queryClient.ensureQueryData(friendsQueryOptions(userId as string, token as string));
  },
});

function Friends() {
  const loaderData = Route.useLoaderData();

  if (!loaderData) {
    return <p>loading your chats...</p>;
  }

  return (
    <div>
      {loaderData.friends.map((friend) => (
        <div key={friend._id}>
          <p>{friend.username}</p>
          <p>{friend._id}</p>
        </div>
      ))}
    </div>
  );
}
