import { QueryClient, useMutation, queryOptions } from '@tanstack/react-query';
import { makeFriendRequest } from './friendRequest';
import { getConversations } from './getConversations';
import { findUserByEmail } from './findUserByEmail';
import { getFriends } from './getFriends';
import {
  getFriendRequests,
  acceptFriendRequest,
  rejectFriendRequest,
  deleteFriendRequest,
  FriendRequestActionPayload,
} from './getFriendRequests';
import { sendMessage } from './sendMessage';

export const queryClient = new QueryClient();

export const useMakeFriendRequestMutation = () => {
  return useMutation({
    mutationKey: ['friend-request', 'create'],
    mutationFn: makeFriendRequest,
  });
};

export const useSendMessageMutation = (conversationId: string) => {
  return useMutation({
    mutationKey: ['new-message', { conversation: conversationId }],
    mutationFn: sendMessage,
  });
};

export const useAcceptFriendRequestMutation = (payload: FriendRequestActionPayload) => {
  return useMutation({
    mutationKey: ['friend-request', 'accept', { id: payload.requestId }],
    mutationFn: acceptFriendRequest,
  });
};

export const useRejectFriendRequestMutation = (payload: FriendRequestActionPayload) => {
  return useMutation({
    mutationKey: ['friend-request', 'reject', { id: payload.requestId }],
    mutationFn: rejectFriendRequest,
  });
};

export const useDeleteFriendRequestMutation = (payload: FriendRequestActionPayload) => {
  return useMutation({
    mutationKey: ['friend-request', 'delete', { id: payload.requestId }],
    mutationFn: deleteFriendRequest,
  });
};

export const conversationsQueryOptions = (userId: string, token: string) => {
  return queryOptions({
    queryKey: ['conversations'],
    queryFn: () => getConversations(userId, token),
  });
};

export const findUserQueryOptions = (email: string, token: string) => {
  return queryOptions({
    queryKey: ['find-user', { email: email }],
    queryFn: () => findUserByEmail(email, token),
  });
};

export const friendsQueryOptions = (userId: string, token: string) => {
  return queryOptions({
    queryKey: ['user', 'friends', { id: userId }],
    queryFn: () => getFriends(userId, token),
  });
};

export const friendRequestsQueryOptions = (userId: string, token: string) => {
  return queryOptions({
    queryKey: ['user', 'friend-requests', { id: userId }],
    queryFn: () => getFriendRequests(token),
  });
};
