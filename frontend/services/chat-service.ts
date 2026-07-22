import api from "./api";

export const sendMessage = async (
  message: string,
  sourceCode?: string,
  image?: File
) => {
  const formData = new FormData();

  formData.append("message", message);

  if (sourceCode?.trim()) {
    formData.append("sourceCode", sourceCode);
  }

  if (image) {
    formData.append("image", image);
  }

  const response = await api.post(
    "/chat",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};