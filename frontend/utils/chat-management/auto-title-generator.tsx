const MAX_TITLE_LENGTH = 40;

export const generateConversationTitle = (message: string): string => {
  const title = message.replace(/\s+/g, " ").trim();

  if (title.length <= MAX_TITLE_LENGTH) {
    return title;
  }

  return `${title.slice(0, MAX_TITLE_LENGTH).trim()}...`;
};
