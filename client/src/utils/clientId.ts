const CLIENT_ID_KEY = 'chatbot_client_id';

export const getClientId = (): string => {
  let clientId = sessionStorage.getItem(CLIENT_ID_KEY);

  if (!clientId) {
    clientId =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem(CLIENT_ID_KEY, clientId);
  }

  return clientId;
};
