const BASE_URL = import.meta.env.VITE_BASE_URL;

export type ConversationPreview = {
  _id: string;
  initiator: string;
  participants: {
    _id: string;
    username: string;
  }[];
};

export type ConversationListResponse = {
  conversations: ConversationPreview[];
};

export const getConversations = async (
  userId: string,
  token: string,
): Promise<ConversationListResponse> => {
  const url = `${BASE_URL}/users/${userId}/conversations`;

  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
      Authorization: token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return response.json();
};
