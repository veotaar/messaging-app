const BASE_URL = import.meta.env.VITE_BASE_URL;

export type Message = {
  _id: string;
  author: {
    _id: string;
    username: string;
  };
  content: string;
  conversation: string;
  createdAt: string;
  updatedAt: string;
};

export type MessagesResponse = {
  messages: Message[];
};

export const getMessages = async (
  chatId: string,
  page: number,
  limit: number,
  token: string,
): Promise<MessagesResponse> => {
  const url = `${BASE_URL}/conversations/${chatId}/messages?page=${page}&limit=${limit}`;

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
