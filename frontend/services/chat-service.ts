import api from "./api";

export const sendMessage = async (message: string) => {
  const response = await api.post("/chat", {
    message,
  });

  return response.data;
};