import { QueryClient, useMutation } from '@tanstack/react-query';
import { makeFriendRequest } from './friendRequest';

export const queryClient = new QueryClient();

export const useMakeFriendRequestMutation = () => {
  return useMutation({
    mutationKey: ['friend-request', 'create'],
    mutationFn: makeFriendRequest,
  });
};
