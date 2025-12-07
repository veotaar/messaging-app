import { createFileRoute, redirect } from "@tanstack/react-router";
import { format } from "date-fns";
import * as React from "react";
import { z } from "zod";
import MessageBox from "@/components/MessageBox";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import useMessages from "@/hooks/useMessages";
import useSocket from "@/hooks/useSocket";
import { useAuth } from "@/lib/auth";
import { socket } from "@/lib/socket";
import { cn } from "@/lib/utils";

const chatSearchSchema = z.object({
  to: z.string(),
});

export const Route = createFileRoute("/home/conversations/$chatId")({
  component: Chat,
  validateSearch: chatSearchSchema,
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
});

function Chat() {
  const { token, userId } = useAuth();
  const { chatId } = Route.useParams();
  const { liveMessages } = useSocket();
  const { to } = Route.useSearch();

  const messagesEndRef = React.useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  };

  const {
    data,
    error,
    fetchPreviousPage,
    fetchNextPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingPreviousPage,
    status,
  } = useMessages(chatId, token as string);

  // biome-ignore lint/correctness/useExhaustiveDependencies: r
  React.useEffect(() => {
    socket.emit("joinChat", chatId);
    scrollToBottom();
  }, [chatId]);

  React.useEffect(() => {
    if (!data) return;

    const isMessagesTooFew = data.pages[0].messagesData.messages.length < 20;

    if (isMessagesTooFew && hasPreviousPage) {
      fetchPreviousPage();
      return;
    }

    if (hasNextPage) {
      fetchNextPage();
    }
  }, [data, hasPreviousPage, fetchPreviousPage, hasNextPage, fetchNextPage]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: r
  React.useEffect(() => {
    scrollToBottom();
  }, [liveMessages]);

  if (status === "pending") {
    return (
      <div>
        <p>Loading chat...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="border-b p-3 font-bold">{to}</div>
      <ScrollArea className="h-[calc(100%-2.75rem)] px-4">
        <Button
          onClick={() => fetchPreviousPage()}
          disabled={!hasPreviousPage || isFetchingPreviousPage}
          className={cn({ hidden: !hasPreviousPage })}
        >
          {isFetchingPreviousPage
            ? "Loading previous messages"
            : hasPreviousPage
              ? "Load More"
              : "Nothing more to load"}
        </Button>
        <div className="mb-[0.05rem] flex flex-col gap-[0.05rem]">
          {data &&
            data.pages.map((group, _i) => (
              <div key={group.messagesData.messages[0]._id}>
                <div className="flex flex-col items-end gap-[0.1rem] whitespace-pre-wrap">
                  {group.messagesData.messages.map((message) => (
                    <div
                      className={cn(
                        "flex gap-4 rounded-md bg-primary px-2 py-2 text-primary-foreground dark:text-foreground",
                        {
                          "self-start bg-accent text-foreground":
                            message.author._id !== userId,
                        },
                      )}
                      key={message._id}
                    >
                      <div>{message.content}</div>
                      <div className="self-end text-xs">
                        {format(message.createdAt, "kk:mm")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
        <div className="flex flex-col items-end gap-[0.1rem] whitespace-pre-wrap">
          {liveMessages &&
            liveMessages
              .filter((message) => message.newMessage.conversation === chatId)
              .map((message) => (
                <div
                  className={cn(
                    "flex gap-4 rounded-md bg-primary px-2 py-2 text-primary-foreground dark:text-foreground",
                    {
                      "self-start bg-accent text-foreground":
                        message.newMessage.author !== userId,
                    },
                  )}
                  key={message.newMessage._id}
                >
                  <div>{message.newMessage.content}</div>
                  <div className="self-end text-xs">
                    {format(message.newMessage.createdAt, "kk:mm")}
                  </div>
                </div>
              ))}
        </div>

        <div ref={messagesEndRef} />
      </ScrollArea>
      <div className="h-11 w-full overflow-hidden">
        <MessageBox chatId={chatId} />
      </div>
    </div>
  );
}
