import { QueryClient, useMutation, queryOptions } from '@tanstack/react-query';
import { makeFriendRequest } from './friendRequest';
import { getConversations } from './getConversations';

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
