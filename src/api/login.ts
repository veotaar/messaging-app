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
  console.log(url);

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  console.log(response);

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return response.json();
};
