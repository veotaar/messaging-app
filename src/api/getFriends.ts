const BASE_URL = import.meta.env.VITE_BASE_URL;

export type Friend = {
  _id: string;
  username: string;
};

export type FriendsResponse = {
  friends: Friend[];
};

export const getFriends = async (userId: string, token: string): Promise<FriendsResponse> => {
  const url = `${BASE_URL}/users/${userId}/friends`;

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
