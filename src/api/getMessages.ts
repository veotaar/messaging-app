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
  messagesData: {
    currentPage: number;
    hasNextPage: boolean;
    nextPage: number | null;
    hasPreviousPage: boolean;
    previousPage: number | null;
    messages: Message[];
  };
};

export const getMessages = async ({
  pageParam,
  chatId,
  token,
}: {
  pageParam: number;
  chatId: string;
  token: string;
}): Promise<MessagesResponse> => {
  const url = `${BASE_URL}/conversations/${chatId}/messages?page=${pageParam}`;

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
