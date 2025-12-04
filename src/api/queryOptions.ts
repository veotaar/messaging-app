import { QueryClient, queryOptions, useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { createConversation } from "./createConversation";
import { findUserByEmail } from "./findUserByEmail";
import { makeFriendRequest } from "./friendRequest";
import { getConversations } from "./getConversations";
import {
  acceptFriendRequest,
  deleteFriendRequest,
  type FriendRequestActionPayload,
  getFriendRequests,
  rejectFriendRequest,
} from "./getFriendRequests";
import { getFriends } from "./getFriends";
import { sendMessage } from "./sendMessage";

export const queryClient = new QueryClient();

export const useMakeFriendRequestMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["friend-request", "create"],
    mutationFn: makeFriendRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user", "friend-requests"],
      });
      await queryClient.refetchQueries({
        queryKey: ["user", "friend-requests"],
      });
      await router.invalidate();
    },
  });
};

export const useSendMessageMutation = (conversationId: string) => {
  return useMutation({
    mutationKey: ["new-message", { conversation: conversationId }],
    mutationFn: sendMessage,
  });
};

export const useAcceptFriendRequestMutation = (
  payload: FriendRequestActionPayload,
) => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["friend-request", "accept", { id: payload.requestId }],
    mutationFn: acceptFriendRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user", "friend-requests"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["user", "friends"],
      });
      await queryClient.refetchQueries({
        queryKey: ["user", "friend-requests"],
      });
      await queryClient.refetchQueries({ queryKey: ["user", "friends"] });
      await router.invalidate();
    },
  });
};

export const useRejectFriendRequestMutation = (
  payload: FriendRequestActionPayload,
) => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["friend-request", "reject", { id: payload.requestId }],
    mutationFn: rejectFriendRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user", "friend-requests"],
      });
      await queryClient.refetchQueries({
        queryKey: ["user", "friend-requests"],
      });
      await router.invalidate();
    },
  });
};

export const useDeleteFriendRequestMutation = (
  payload: FriendRequestActionPayload,
) => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["friend-request", "delete", { id: payload.requestId }],
    mutationFn: deleteFriendRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user", "friend-requests"],
      });
      await queryClient.refetchQueries({
        queryKey: ["user", "friend-requests"],
      });
      await router.invalidate();
    },
  });
};

export const useCreateConversationMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["conversations", "create"],
    mutationFn: createConversation,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["conversations"],
      });
      await queryClient.refetchQueries({ queryKey: ["conversations"] });
      await router.invalidate();
    },
  });
};

export const conversationsQueryOptions = (userId: string, token: string) => {
  return queryOptions({
    queryKey: ["conversations"],
    queryFn: () => getConversations(userId, token),
  });
};

export const findUserQueryOptions = (email: string, token: string) => {
  return queryOptions({
    queryKey: ["find-user", { email: email }],
    queryFn: () => findUserByEmail(email, token),
  });
};

export const friendsQueryOptions = (userId: string, token: string) => {
  return queryOptions({
    queryKey: ["user", "friends", { id: userId }],
    queryFn: () => getFriends(userId, token),
  });
};

export const friendRequestsQueryOptions = (userId: string, token: string) => {
  return queryOptions({
    queryKey: ["user", "friend-requests", { id: userId }],
    queryFn: () => getFriendRequests(token),
  });
};
