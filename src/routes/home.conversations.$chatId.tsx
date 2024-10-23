import * as React from 'react';
import { createFileRoute, redirect } from '@tanstack/react-router';
import MessageBox from '@/components/MessageBox';
import { useAuth } from '@/lib/auth';
import useMessages from '@/hooks/useMessages';
import { Button } from '@/components/ui/button';
import useSocket from '@/hooks/useSocket';
import { socket } from '@/lib/socket';
import { z } from 'zod';
import { ScrollArea } from '@/components/ui/scroll-area';

const chatSearchSchema = z.object({
  to: z.string(),
});

export const Route = createFileRoute('/home/conversations/$chatId')({
  component: Chat,
  validateSearch: chatSearchSchema,
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
});

function Chat() {
  const { token } = useAuth();
  const { chatId } = Route.useParams();
  const { liveMessages } = useSocket();
  const { to } = Route.useSearch();

  const messagesEndRef = React.useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'instant' });
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

  React.useEffect(() => {
    socket.emit('joinChat', chatId);
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

  React.useEffect(() => {
    scrollToBottom();
  }, [liveMessages]);

  if (status === 'pending') {
    return (
      <div>
        <p>Loading chat...</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-2">
      <ScrollArea className="h-[calc(100%-2.75rem)]">
        <Button onClick={() => fetchPreviousPage()} disabled={!hasPreviousPage || isFetchingPreviousPage}>
          {isFetchingPreviousPage
            ? 'Loading previous messages'
            : hasPreviousPage
              ? 'Load More'
              : 'Nothing more to load'}
        </Button>
        {data.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.messagesData.messages.map((message) => (
              <div key={message._id}>
                {message.author.username}: {message.content}
              </div>
            ))}
          </React.Fragment>
        ))}
        {liveMessages &&
          liveMessages
            .filter((message) => message.newMessage.conversation === chatId)
            .map((message) => (
              <div key={message.newMessage._id}>
                {to}: {message.newMessage.content}
              </div>
            ))}
        <div ref={messagesEndRef} />
      </ScrollArea>
      <div className="h-11 w-full overflow-hidden">
        <MessageBox chatId={chatId} />
      </div>
    </div>
  );
}
