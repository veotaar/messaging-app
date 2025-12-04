const BASE_URL = import.meta.env.VITE_BASE_URL;

export type SentRequest = {
  _id: string;
  to: {
    _id: string;
    username: string;
  };
};

export type ReceivedRequest = {
  _id: string;
  from: {
    _id: string;
    username: string;
  };
};

export type FriendRequestResponse = {
  sent: SentRequest[];
  received: ReceivedRequest[];
};

export type FriendRequestResultResponse = {
  msg: string;
};

export type FriendRequestActionPayload = {
  token: string;
  requestId: string;
};

export const getFriendRequests = async (
  token: string,
): Promise<FriendRequestResponse> => {
  const url = `${BASE_URL}/friend-requests`;

  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
      Authorization: token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return response.json();
};

export const acceptFriendRequest = async ({
  token,
  requestId,
}: FriendRequestActionPayload): Promise<FriendRequestResultResponse> => {
  const url = `${BASE_URL}/friend-requests/${requestId}/accept`;

  const response = await fetch(url, {
    method: "PUT",
    mode: "cors",
    headers: {
      Authorization: token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return response.json();
};

export const rejectFriendRequest = async ({
  token,
  requestId,
}: FriendRequestActionPayload): Promise<FriendRequestResultResponse> => {
  const url = `${BASE_URL}/friend-requests/${requestId}/reject`;

  const response = await fetch(url, {
    method: "DELETE",
    mode: "cors",
    headers: {
      Authorization: token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return response.json();
};

export const deleteFriendRequest = async ({
  token,
  requestId,
}: FriendRequestActionPayload): Promise<FriendRequestResultResponse> => {
  const url = `${BASE_URL}/friend-requests/${requestId}`;

  const response = await fetch(url, {
    method: "DELETE",
    mode: "cors",
    headers: {
      Authorization: token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return response.json();
};
