const BASE_URL = import.meta.env.VITE_BASE_URL;

export type NewMessageResponse = {
  newMessage: {
    _id: string;
    author: string;
    content: string;
    conversation: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type NewMessagePayload = {
  token: string;
  conversationId: string;
  content: string;
};

export const sendMessage = async (
  newMessage: NewMessagePayload,
): Promise<NewMessageResponse> => {
  const url = `${BASE_URL}/conversations/${newMessage.conversationId}`;

  const response = await fetch(url, {
    method: "PUT",
    mode: "cors",
    body: JSON.stringify({ content: newMessage.content }),
    headers: {
      Authorization: newMessage.token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return response.json();
};
