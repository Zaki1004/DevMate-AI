const API_URL = "http://localhost:5000/api/chat";

export const streamMessage = async (
  message: string,
  sourceCode?: string,
  image?: File,
  onChunk?: (chunk: string) => void,
) => {
  const formData = new FormData();

  formData.append("message", message);

  if (sourceCode?.trim()) {
    formData.append("sourceCode", sourceCode);
  }

  if (image) {
    formData.append("image", image);
  }

  const response = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Gagal menghubungi server.");
  }

  if (!response.body) {
    throw new Error("Streaming tidak tersedia.");
  }

  const reader = response.body.getReader();

  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();

    if (done) break;

    const chunk = decoder.decode(value, {
      stream: true,
    });

    onChunk?.(chunk);
  }
};