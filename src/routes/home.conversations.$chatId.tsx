import { createFileRoute, redirect } from '@tanstack/react-router';
import { z } from 'zod';
import { messagesQueryOptions } from '@/api/queryOptions';

const chatSearchSchema = z.object({
  page: z.number().catch(1),
  limit: z.number().lte(20).catch(20),
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
  loaderDeps: ({ search: { page, limit } }) => ({ page, limit }),
  loader: async ({ params, context, deps: { page, limit } }) => {
    return await context.queryClient.ensureQueryData(
      messagesQueryOptions(params.chatId, page, limit, context.auth.token as string),
    );
  },
});

function Chat() {
  const loaderData = Route.useLoaderData();

  return (
    <div>
      {loaderData.messages.map((message) => (
        <div key={message._id}>
          {message.author.username}: {message.content}
        </div>
      ))}
    </div>
  );
}
