export const showContent = (content: string): string => {
  if (!content || content.length < 180) return content;
  return `${content.substring(0, 180)}...`;
};
