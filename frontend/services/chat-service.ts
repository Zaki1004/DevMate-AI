import api from "./api";

export const sendMessage = async (
  message: string,
  image?: File
) => {
  const formData = new FormData();

  formData.append("message", message);

  if (image) {
    formData.append("image", image);
  }

  const response = await api.post("/chat", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};