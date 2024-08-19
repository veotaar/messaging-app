import { QueryClient, useMutation, queryOptions } from '@tanstack/react-query';
import { makeFriendRequest } from './friendRequest';
import { getConversations } from './getConversations';
import { getMessages } from './getMessages';
import { findUserByEmail } from './findUserByEmail';

export const queryClient = new QueryClient();

export const useMakeFriendRequestMutation = () => {
  return useMutation({
    mutationKey: ['friend-request', 'create'],
    mutationFn: makeFriendRequest,
  });
};

export const conversationsQueryOptions = (userId: string, token: string) => {
  return queryOptions({
    queryKey: ['conversations'],
    queryFn: () => getConversations(userId, token),
  });
};

export const messagesQueryOptions = (chatId: string, page: number, limit: number, token: string) => {
  return queryOptions({
    queryKey: ['conversations', 'messages', { id: chatId }, { page: page }],
    queryFn: () => getMessages(chatId, page, limit, token),
  });
};

export const findUserQueryOptions = (email: string, token: string) => {
  return queryOptions({
    queryKey: ['find-user', { email: email }],
    queryFn: () => findUserByEmail(email, token),
  });
};
