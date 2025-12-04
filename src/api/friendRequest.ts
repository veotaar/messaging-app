const BASE_URL = import.meta.env.VITE_BASE_URL;

export type friendRequestPayload = {
  to: string;
  token: string;
};

type FriendRequestResponse = {
  friendRequest: {
    from: string;
    to: string;
    _id: string;
  };
};

export const makeFriendRequest = async (
  friendRequest: friendRequestPayload,
): Promise<FriendRequestResponse> => {
  const url = `${BASE_URL}/friend-requests`;

  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({ to: friendRequest.to }),
    headers: {
      Authorization: friendRequest.token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return response.json();
};
