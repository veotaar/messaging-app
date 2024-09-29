import * as React from 'react';
import { createFileRoute, redirect } from '@tanstack/react-router';
import MessageBox from '@/components/MessageBox';
import { useAuth } from '@/lib/auth';
import useMessages from '@/hooks/useMessages';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/home/conversations/$chatId')({
  component: Chat,
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

  const { data, error, fetchPreviousPage, hasPreviousPage, isFetchingPreviousPage, status } = useMessages(
    chatId,
    token as string,
  );

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
    <div>
      <Button onClick={() => fetchPreviousPage()} disabled={!hasPreviousPage || isFetchingPreviousPage}>
        {isFetchingPreviousPage ? 'Loading previous messages' : hasPreviousPage ? 'Load More' : 'Nothing more to load'}
      </Button>
      <div>
        {data.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.messagesData.messages.map((message) => (
              <div key={message._id}>
                {message.author.username}: {message.content}
              </div>
            ))}
          </React.Fragment>
        ))}
        <div>
          <MessageBox chatId={chatId} />
        </div>
      </div>
    </div>
  );
}
