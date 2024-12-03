import { createFileRoute, redirect } from '@tanstack/react-router';
import { friendsQueryOptions, friendRequestsQueryOptions } from '@/api/queryOptions';
import ReceivedRequest from '@/components/ReceivedRequest';
import SentRequest from '@/components/SentRequest';

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
    // return await context.queryClient.ensureQueryData(friendsQueryOptions(userId as string, token as string));
    return await Promise.all([
      context.queryClient.ensureQueryData(friendsQueryOptions(userId as string, token as string)),
      context.queryClient.ensureQueryData(friendRequestsQueryOptions(userId as string, token as string)),
    ]);
  },
});

function Friends() {
  const loaderData = Route.useLoaderData();

  if (!loaderData) {
    return <p>loading your chats...</p>;
  }

  return (
    <div>
      <h2>Your friends</h2>
      {loaderData[0].friends.map((friend) => (
        <div key={friend._id}>
          <p>{friend.username}</p>
          <p>{friend._id}</p>
        </div>
      ))}
      <h2>Received friend requests</h2>
      {loaderData[1] && loaderData[1].received.map((req) => <ReceivedRequest request={req} key={req._id} />)}
      <h2>Sent friend requests</h2>
      {loaderData[1] && loaderData[1].sent.map((req) => <SentRequest request={req} key={req._id} />)}
    </div>
  );
}
