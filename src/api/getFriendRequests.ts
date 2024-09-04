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

export const getFriendRequests = async (token: string): Promise<FriendRequestResponse> => {
  const url = `${BASE_URL}/friend-requests`;

  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      Authorization: token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return response.json();
};
