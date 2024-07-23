const BASE_URL = import.meta.env.VITE_BASE_URL;

export type registerCredentials = {
  username: string;
  password: string;
  passwordConfirm: string;
  email: string;
};

export type loginCredentials = {
  email: string;
  password: string;
};

export type loginRegisterResponse = {
  user: {
    email: string;
    username: string;
    _id: string;
  };
  jwt: {
    token: string;
    expires: number;
  };
};

export const registerUser = async (credentials: registerCredentials): Promise<loginRegisterResponse> => {
  const url = `${BASE_URL}/users`;

  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(credentials),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return response.json();
};

export const loginUser = async (credentials: loginCredentials): Promise<loginRegisterResponse> => {
  const url = `${BASE_URL}/login`;

  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(credentials),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return response.json();
};
