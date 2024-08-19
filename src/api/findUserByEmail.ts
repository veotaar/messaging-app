const BASE_URL = import.meta.env.VITE_BASE_URL;

export type FindByEmailResponse = {
  user: {
    _id: string;
    email: string;
    username: string;
  };
};

export const findUserByEmail = async (email: string, token: string): Promise<FindByEmailResponse> => {
  const url = `${BASE_URL}/users?email=${email}`;

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
