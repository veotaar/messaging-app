import { createFileRoute, redirect } from "@tanstack/react-router";
import {
  friendRequestsQueryOptions,
  friendsQueryOptions,
  queryClient,
  useCreateConversationMutation,
} from "@/api/queryOptions";
import ReceivedRequest from "@/components/ReceivedRequest";
import SentRequest from "@/components/SentRequest";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/home/friends")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
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
      context.queryClient.ensureQueryData(
        friendsQueryOptions(userId as string, token as string),
      ),
      context.queryClient.ensureQueryData(
        friendRequestsQueryOptions(userId as string, token as string),
      ),
    ]);
  },
});

function Friends() {
  const loaderData = Route.useLoaderData();
  const navigate = Route.useNavigate();
  const createConversationMutation = useCreateConversationMutation();
  const { token, userId } = useAuth();

  const onStartMessaging = (to: string, friendName: string) => {
    createConversationMutation.mutate(
      {
        to,
        token: token as string,
        userId: userId as string,
      },
      {
        onSuccess: async (data) => {
          await queryClient.invalidateQueries({ queryKey: ["conversations"] });
          await queryClient.refetchQueries({ queryKey: ["conversations"] });

          navigate({
            to: "/home/conversations/$chatId",
            params: {
              chatId: data.conversation._id,
            },
            search: {
              to: friendName,
            },
          });
        },
      },
    );
  };

  if (!loaderData) {
    return <p>loading your chats...</p>;
  }

  return (
    <div className="mx-auto max-w-sm bg-card p-4">
      <h2 className="font-bold text-lg">Your friends</h2>
      {loaderData[0].friends.length === 0 && (
        <div className="rounded border p-2">You don't have any friends yet</div>
      )}
      {loaderData[0].friends.map((friend) => (
        <div
          key={friend._id}
          className="mb-1 flex items-center justify-between gap-2 rounded border bg-card px-2 py-1 hover:bg-muted/50"
        >
          <p>{friend.username}</p>
          <Button
            variant={"outline"}
            onClick={() => onStartMessaging(friend._id, friend.username)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <title>start chat</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>
          </Button>
        </div>
      ))}
      <h2 className="mt-6 font-bold text-lg">Received friend requests</h2>
      {loaderData[1].received.length === 0 && (
        <div className="rounded border p-2">
          Received friend requests will be shown here
        </div>
      )}
      {loaderData[1] &&
        loaderData[1].received.map((req) => (
          <ReceivedRequest request={req} key={req._id} />
        ))}
      <h2 className="mt-2 font-bold text-lg">Sent friend requests</h2>
      {loaderData[1].sent.length === 0 && (
        <div className="rounded border p-2">
          Sent friend requests will be shown here
        </div>
      )}
      {loaderData[1] &&
        loaderData[1].sent.map((req) => (
          <SentRequest request={req} key={req._id} />
        ))}
    </div>
  );
}
