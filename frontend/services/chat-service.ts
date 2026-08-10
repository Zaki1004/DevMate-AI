type ChatHistoryMessage = {
  role: "user" | "assistant";
  content: string;
};

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/chat`;

export const streamMessage = async (
  message: string,
  sourceCode?: string,
  image?: File,
  history: ChatHistoryMessage[] = [],
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

 formData.append(
  "history",
  JSON.stringify(history),
);

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