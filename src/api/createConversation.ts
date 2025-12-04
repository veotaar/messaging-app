const BASE_URL = import.meta.env.VITE_BASE_URL;

export type createConversationPayload = {
  to: string;
  token: string;
  userId: string;
};

type CreateConversationResponse = {
  conversation: {
    initiator: string;
    participants: string[];
    _id: string;
    messages: [];
  };
};

export const createConversation = async (
  payload: createConversationPayload,
): Promise<CreateConversationResponse> => {
  const url = `${BASE_URL}/conversations/${payload.userId}/${payload.to}`;

  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      Authorization: payload.token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return response.json();
};
